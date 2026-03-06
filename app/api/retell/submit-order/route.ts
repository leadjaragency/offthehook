import { NextRequest, NextResponse } from "next/server";

function generateOrderNumber(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `OTH-${num}`;
}

export async function POST(req: NextRequest) {
  try {
    const { customer_name, customer_phone, items, pickup_time, special_instructions } = await req.json();

    if (!customer_name || !customer_phone || !items) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();

    // Save to Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from("orders").insert({
        order_number: orderNumber,
        customer_name,
        customer_phone,
        customer_email: null,
        items: [{ name: items, quantity: 1, price: 0 }],
        subtotal: 0,
        tax: 0,
        total: 0,
        special_instructions: special_instructions ?? "",
        order_type: "pickup",
        pickup_time,
        source: "voice",
        status: "pending",
        payment_status: "cash",
      });
    }

    // Send email notification to owner via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const ownerEmail = process.env.OWNER_EMAIL;

    if (resendKey && ownerEmail) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "orders@offthehookyyc.ca",
          to: ownerEmail,
          subject: `New Voice Order — ${orderNumber}`,
          html: `
            <h2>New Phone Order Received</h2>
            <p><strong>Order #:</strong> ${orderNumber}</p>
            <p><strong>Customer:</strong> ${customer_name}</p>
            <p><strong>Phone:</strong> ${customer_phone}</p>
            <p><strong>Pickup Time:</strong> ${pickup_time}</p>
            <p><strong>Items:</strong><br/>${items}</p>
            ${special_instructions ? `<p><strong>Special Instructions:</strong> ${special_instructions}</p>` : ""}
            <p><em>Order placed via voice agent</em></p>
          `,
        }),
      });
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      estimatedReady: "20-30 minutes",
    });
  } catch (error) {
    console.error("Retell submit-order error:", error);
    return NextResponse.json({ error: "Failed to submit order" }, { status: 500 });
  }
}
