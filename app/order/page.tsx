"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";
import {
  familyMeals,
  fishMeals,
  specialtyCatches,
  kidsMeals,
  burgers,
  burgerAddOns,
  meals,
  appys,
  drinks,
  desserts,
  sides,
  type MenuItem,
  type AddOn,
} from "@/lib/menu-data";

const GST = 0.05;

// ── Cart Sidebar ─────────────────────────────────────────────────────────────

function CartSidebar() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();
  const subtotal = getTotal();
  const tax = subtotal * GST;
  const total = subtotal + tax;
  const count = getItemCount();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-navy text-lg flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" /> Your Cart
        </h3>
        {count > 0 && <Badge className="bg-navy text-white">{count} items</Badge>}
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 font-sans">
          <ShoppingCart className="w-12 h-12 mb-3 opacity-30" />
          <p className="text-sm">Your cart is empty.</p>
          <p className="text-xs mt-1">Add items from the menu to get started.</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {items.map((item) => (
              <div key={item.cartItemId} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-navy text-sm leading-tight">{item.name}</p>
                  <button onClick={() => removeItem(item.cartItemId)} className="text-gray-400 hover:text-red-500 ml-2 shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {item.selectedOption && (
                  <p className="text-xs text-gray-500 font-sans mb-1">{item.selectedOption}</p>
                )}
                {item.addOns && item.addOns.length > 0 && (
                  <p className="text-xs text-gray-500 font-sans mb-1">
                    + {item.addOns.map((a) => a.name).join(", ")}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="font-semibold text-navy text-sm">
                    ${((item.price + (item.addOns?.reduce((s, a) => s + a.price, 0) ?? 0)) * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t pt-4">
            <div className="flex justify-between text-sm font-sans text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-sans text-gray-600">
              <span>GST (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-navy">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link href="/order/checkout" className="block mt-3">
              <Button className="w-full bg-gold hover:bg-gold/90 text-navy font-bold">
                Proceed to Checkout <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

// ── Add to Cart Button with options ──────────────────────────────────────────

function AddItemRow({ item }: { item: MenuItem }) {
  const [qty, setQty] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const addItem = useCartStore((s) => s.addItem);

  const isBurger = item.category === "Burgers";

  const toggleAddOn = (addon: AddOn) => {
    setSelectedAddOns((prev) =>
      prev.find((a) => a.name === addon.name)
        ? prev.filter((a) => a.name !== addon.name)
        : [...prev, addon]
    );
  };

  const handleAdd = () => {
    if (item.options && item.options.length > 0 && !selectedOption) {
      toast.error("Please select an option first.");
      return;
    }
    const optionObj = item.options?.find((o) => o.label === selectedOption);
    const price = optionObj?.price ?? item.price;
    addItem({
      menuItemId: item.id,
      name: item.name,
      price,
      quantity: qty,
      selectedOption: selectedOption || undefined,
      addOns: isBurger ? selectedAddOns : undefined,
    });
    toast.success(`${item.name} added to cart!`);
    setQty(1);
    setSelectedOption("");
    setSelectedAddOns([]);
  };

  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-3 mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-navy text-sm">{item.name}</h4>
            {item.description && (
              <p className="text-xs text-gray-500 font-sans mt-0.5 leading-relaxed">{item.description}</p>
            )}
          </div>
          <span className="font-bold text-navy text-sm shrink-0">${item.price.toFixed(2)}</span>
        </div>

        {/* Options selector */}
        {item.options && item.options.length > 0 && (
          <div className="mb-3">
            <Select value={selectedOption} onValueChange={setSelectedOption}>
              <SelectTrigger className="h-8 text-xs border-gray-200">
                <SelectValue placeholder="Select option..." />
              </SelectTrigger>
              <SelectContent>
                {item.options.map((opt) => (
                  <SelectItem key={opt.label} value={opt.label} className="text-xs">
                    {opt.label} — ${opt.price.toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Burger add-ons */}
        {isBurger && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {burgerAddOns.map((addon) => {
              const active = selectedAddOns.find((a) => a.name === addon.name);
              return (
                <button
                  key={addon.name}
                  onClick={() => toggleAddOn(addon)}
                  className={`text-[10px] font-sans px-2 py-1 rounded-full border transition-colors ${
                    active
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-gray-600 border-gray-200 hover:border-navy hover:text-navy"
                  }`}
                >
                  {addon.name} +${addon.price.toFixed(2)}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-7 text-center text-sm font-medium">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <Button size="sm" className="bg-navy hover:bg-navy/90 text-white text-xs flex-1" onClick={handleAdd}>
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Fish Meal Selector ────────────────────────────────────────────────────────

function FishMealSelector() {
  const [selectedFish, setSelectedFish] = useState("");
  const [selectedPieces, setSelectedPieces] = useState("");
  const addItem = useCartStore((s) => s.addItem);

  const fishData = fishMeals.find((f) => f.fish === selectedFish);
  const priceData = fishData?.prices.find((p) => p.pieces === Number(selectedPieces));

  const handleAdd = () => {
    if (!selectedFish || !selectedPieces || !priceData) {
      toast.error("Please select a fish type and piece count.");
      return;
    }
    addItem({
      menuItemId: `fish-${selectedFish.toLowerCase()}-${selectedPieces}pc`,
      name: `${selectedFish} (${selectedPieces} pc)`,
      price: priceData.price,
      quantity: 1,
      selectedOption: `${selectedFish} — ${selectedPieces} piece`,
    });
    toast.success(`${selectedFish} (${selectedPieces} pc) added to cart!`);
    setSelectedFish("");
    setSelectedPieces("");
  };

  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardContent className="p-4">
        <p className="text-xs text-gray-500 font-sans mb-3">Select your fish and piece count. All meals include Fries, Coleslaw & Dinner Roll.</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <Select value={selectedFish} onValueChange={setSelectedFish}>
            <SelectTrigger className="h-8 text-xs border-gray-200 w-40">
              <SelectValue placeholder="Select fish..." />
            </SelectTrigger>
            <SelectContent>
              {fishMeals.map((f) => (
                <SelectItem key={f.fish} value={f.fish} className="text-xs">{f.fish}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPieces} onValueChange={setSelectedPieces} disabled={!selectedFish}>
            <SelectTrigger className="h-8 text-xs border-gray-200 w-36">
              <SelectValue placeholder="Pieces..." />
            </SelectTrigger>
            <SelectContent>
              {fishData?.prices.map((p) => (
                <SelectItem key={p.pieces} value={String(p.pieces)} className="text-xs">
                  {p.pieces} piece{p.pieces > 1 ? "s" : ""} — ${p.price.toFixed(2)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {priceData && (
            <span className="flex items-center font-bold text-navy text-sm">${priceData.price.toFixed(2)}</span>
          )}
        </div>
        <Button size="sm" className="bg-navy hover:bg-navy/90 text-white text-xs" onClick={handleAdd}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────

function SectionHeading({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-bold text-navy">{title}</h2>
      {note && <p className="text-xs text-gray-500 font-sans mt-1">{note}</p>}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function OrderPage() {
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <div>
      {/* Header */}
      <div className="bg-navy text-white py-10 px-4 text-center">
        <p className="text-gold text-xs uppercase tracking-widest font-sans mb-2">Pickup Order</p>
        <h1 className="text-4xl font-bold">Order Online</h1>
        <p className="text-white/60 font-sans text-sm mt-2">Add items to your cart, then proceed to checkout</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* ── Menu (left) ── */}
          <div className="flex-1 min-w-0 space-y-12">

            <div>
              <SectionHeading title="Family Meals" note="Includes Large Fries, Coleslaw, Gravy & 5 Dinner Rolls" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {familyMeals.map((item) => <AddItemRow key={item.id} item={item} />)}
              </div>
            </div>

            <Separator />

            <div>
              <SectionHeading title="Fish Meals" note="All include Fries, Coleslaw & a Dinner Roll" />
              <FishMealSelector />
            </div>

            <Separator />

            <div>
              <SectionHeading title="Specialty Catches" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {specialtyCatches.map((item) => <AddItemRow key={item.id} item={item} />)}
              </div>
            </div>

            <Separator />

            <div>
              <SectionHeading title="Burgers" note="Customize with add-ons" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {burgers.map((item) => <AddItemRow key={item.id} item={item} />)}
              </div>
            </div>

            <Separator />

            <div>
              <SectionHeading title="Meals" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {meals.map((item) => <AddItemRow key={item.id} item={item} />)}
              </div>
            </div>

            <Separator />

            <div>
              <SectionHeading title="Appys" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {appys.map((item) => <AddItemRow key={item.id} item={item} />)}
              </div>
            </div>

            <Separator />

            <div>
              <SectionHeading title="Kids Meals" note="All $11.99 — includes Juice Box, Fries, Toy & Snack Cake" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {kidsMeals.map((item) => <AddItemRow key={item.id} item={item} />)}
              </div>
            </div>

            <Separator />

            <div>
              <SectionHeading title="Drinks" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {drinks.map((item) => <AddItemRow key={item.id} item={item} />)}
              </div>
            </div>

            <Separator />

            <div>
              <SectionHeading title="Desserts" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {desserts.map((item) => <AddItemRow key={item.id} item={item} />)}
              </div>
            </div>

            <Separator />

            <div>
              <SectionHeading title="Sides" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {sides.map((item) => <AddItemRow key={item.id} item={item} />)}
              </div>
            </div>
          </div>

          {/* ── Sticky Cart Sidebar (desktop) ── */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24">
              <Card className="border border-gray-200 shadow-md">
                <CardContent className="p-5 h-[calc(100vh-8rem)] flex flex-col">
                  <CartSidebar />
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile floating cart button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-navy text-white shadow-xl rounded-full px-6 py-6 font-semibold relative">
              <ShoppingCart className="w-5 h-5 mr-2" />
              View Cart
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-gold text-navy text-xs px-1.5 min-w-[1.25rem] h-5">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-96 flex flex-col">
            <SheetHeader className="mb-4">
              <SheetTitle className="text-navy">Your Cart</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto">
              <CartSidebar />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
