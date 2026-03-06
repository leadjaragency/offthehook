"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";

const GST = 0.05;

function generatePickupTimes(): string[] {
  const times: string[] = ["ASAP"];
  const now = new Date();
  const minutes = Math.ceil(now.getMinutes() / 15) * 15;
  now.setMinutes(minutes, 0, 0);
  for (let i = 0; i < 16; i++) {
    now.setMinutes(now.getMinutes() + 15);
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    times.push(`${hour12}:${m} ${period}`);
  }
  return times;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    pickupTime: "ASAP",
    specialInstructions: "",
  });

  const subtotal = getTotal();
  const tax = subtotal * GST;
  const total = subtotal + tax;
  const pickupTimes = generatePickupTimes();

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    if (!form.name.trim()) { toast.error("Please enter your name."); return false; }
    if (!form.phone.trim()) { toast.error("Please enter your phone number."); return false; }
    if (!form.email.trim() || !form.email.includes("@")) { toast.error("Please enter a valid email."); return false; }
    if (items.length === 0) { toast.error("Your cart is empty."); return false; }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, form, subtotal, tax, total }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Fallback: save order directly and go to confirmation
        const orderRes = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items, form, subtotal, tax, total }),
        });
        const orderData = await orderRes.json();
        clearCart();
        router.push(`/order/confirmation?order=${orderData.orderNumber}`);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center">
        <div>
          <h2 className="text-2xl font-bold text-navy mb-3">Your cart is empty</h2>
          <p className="text-gray-500 font-sans mb-6">Add items from the menu before checking out.</p>
          <Button onClick={() => router.push("/order")} className="bg-navy hover:bg-navy/90 text-white">
            Back to Order
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="bg-navy text-white py-10 px-4 text-center">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-white/60 font-sans text-sm mt-2">Review your order and complete your details</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Customer form */}
        <div className="space-y-6">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-navy text-lg">Your Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="John Smith"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="(403) 555-0123"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-1">
                  <Clock className="w-4 h-4" /> Pickup Time *
                </Label>
                <Select value={form.pickupTime} onValueChange={(v) => update("pickupTime", v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pickupTimes.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="instructions" className="text-sm font-medium text-gray-700">Special Instructions (optional)</Label>
                <textarea
                  id="instructions"
                  value={form.specialInstructions}
                  onChange={(e) => update("specialInstructions", e.target.value)}
                  placeholder="Allergies, special requests..."
                  rows={3}
                  className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-navy resize-none"
                />
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gold hover:bg-gold/90 text-navy font-bold py-6 text-base"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
            ) : (
              <><CreditCard className="w-4 h-4 mr-2" /> Pay ${total.toFixed(2)}</>
            )}
          </Button>
        </div>

        {/* Right: Order summary */}
        <div>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-navy text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex justify-between items-start text-sm">
                  <div className="flex-1 font-sans">
                    <p className="font-medium text-gray-800">
                      {item.quantity}x {item.name}
                    </p>
                    {item.selectedOption && (
                      <p className="text-xs text-gray-500">{item.selectedOption}</p>
                    )}
                    {item.addOns && item.addOns.length > 0 && (
                      <p className="text-xs text-gray-500">+ {item.addOns.map((a) => a.name).join(", ")}</p>
                    )}
                  </div>
                  <span className="font-semibold text-navy ml-4 shrink-0">
                    ${((item.price + (item.addOns?.reduce((s, a) => s + a.price, 0) ?? 0)) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm font-sans text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-sans text-gray-600">
                <span>GST (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-navy text-base">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
