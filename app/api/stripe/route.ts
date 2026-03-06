import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    // Stripe not configured — fall through to confirmation without payment
    return NextResponse.json({ url: null });
  }

  try {
    const stripe = new Stripe(stripeKey, { apiVersion: "2026-02-25.clover" });
    const { items, form } = await req.json();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item: { name: string; price: number; quantity: number; selectedOption?: string; addOns?: { name: string; price: number }[] }) => ({
        price_data: {
          currency: "cad",
          product_data: {
            name: item.selectedOption ? `${item.name} (${item.selectedOption})` : item.name,
          },
          unit_amount: Math.round(
            (item.price + (item.addOns?.reduce((s: number, a: { price: number }) => s + a.price, 0) ?? 0)) * 100
          ),
        },
        quantity: item.quantity,
      })),
      metadata: {
        customer_name: form.name,
        customer_phone: form.phone,
        customer_email: form.email,
        pickup_time: form.pickupTime,
        special_instructions: form.specialInstructions ?? "",
      },
      success_url: `${siteUrl}/order/confirmation?order=OTH-{CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/order/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json({ url: null });
  }
}
