import { NextRequest, NextResponse } from "next/server";

function generateOrderNumber(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `OTH-${num}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, form, subtotal, tax, total } = body;

    const orderNumber = generateOrderNumber();

    // Save to Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from("orders").insert({
        order_number: orderNumber,
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone,
        items,
        subtotal,
        tax,
        total,
        special_instructions: form.specialInstructions,
        order_type: "pickup",
        pickup_time: form.pickupTime,
        status: "pending",
        payment_status: "pending",
      });
    }

    return NextResponse.json({ success: true, orderNumber });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
