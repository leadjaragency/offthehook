"use client";

import Image from "next/image";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Star, ChefHat, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
} from "@/lib/menu-data";

const categories = [
  { id: "family-meals", label: "Family Meals" },
  { id: "fish-meals", label: "Fish Meals" },
  { id: "specialty-catches", label: "Specialty Catches" },
  { id: "burgers", label: "Burgers" },
  { id: "meals", label: "Meals" },
  { id: "appys", label: "Appys" },
  { id: "kids-meals", label: "Kids Meals" },
  { id: "drinks", label: "Drinks" },
  { id: "desserts", label: "Desserts" },
  { id: "sides", label: "Sides" },
];

function MenuItemCard({ item, onAdd }: { item: MenuItem; onAdd: (item: MenuItem) => void }) {
  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex justify-between items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="font-semibold text-navy text-sm">{item.name}</h4>
            {item.popular && (
              <Badge className="bg-gold/20 text-gold border-gold/30 text-[10px] px-1.5 py-0">
                <Star className="w-2.5 h-2.5 mr-0.5 fill-gold" />Popular
              </Badge>
            )}
            {item.featured && (
              <Badge className="bg-[#2A7B88]/10 text-[#2A7B88] border-[#2A7B88]/30 text-[10px] px-1.5 py-0">
                <ChefHat className="w-2.5 h-2.5 mr-0.5" />Chef&apos;s Pick
              </Badge>
            )}
          </div>
          {item.description && (
            <p className="text-xs text-gray-500 leading-relaxed font-sans">{item.description}</p>
          )}
          {item.options && (
            <p className="text-xs text-gray-400 mt-1 font-sans italic">
              Options: {item.options.map((o) => o.label).join(", ")}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="font-bold text-navy text-sm">${item.price.toFixed(2)}</span>
          <Button
            size="sm"
            variant="outline"
            className="border-navy text-navy hover:bg-navy hover:text-white text-xs px-2 py-1 h-7"
            onClick={() => onAdd(item)}
          >
            + Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState("family-meals");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const addItem = useCartStore((s) => s.addItem);
  const itemCount = useCartStore((s) => s.getItemCount());

  const handleAdd = (item: MenuItem) => {
    addItem({ menuItemId: item.id, name: item.name, price: item.price, quantity: 1 });
    toast.success(`${item.name} added to cart!`);
  };

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveTab(id);
  };

  // Update active tab on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveTab(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Page header */}
      <div className="relative bg-navy text-white py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/halibut-meal.png"
            alt="Off the Hook fish and chips"
            fill
            className="object-cover object-top opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="relative z-10">
          <p className="text-gold text-xs uppercase tracking-widest font-sans mb-3">Everything We Serve</p>
          <h1 className="text-5xl font-bold mb-3">Our Menu</h1>
          <p className="text-white/60 font-sans">Fresh-battered seafood, burgers, appys & more</p>
        </div>
      </div>

      {/* Sticky category tabs */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-1 py-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollTo(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium font-sans whitespace-nowrap transition-colors ${
                  activeTab === cat.id
                    ? "bg-navy text-white"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">

        {/* FAMILY MEALS */}
        <section id="family-meals" ref={(el) => { sectionRefs.current["family-meals"] = el; }}>
          <h2 className="text-3xl font-bold text-navy mb-2">Family Meals</h2>
          <p className="text-sm text-gray-500 font-sans mb-6 flex items-center gap-1.5">
            All family meals include: Large French Fries, Large Coleslaw, Large Gravy & 5 Dinner Rolls
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {familyMeals.map((item) => (
              <MenuItemCard key={item.id} item={item} onAdd={handleAdd} />
            ))}
          </div>
        </section>

        <Separator />

        {/* FISH MEALS — special price grid */}
        <section id="fish-meals" ref={(el) => { sectionRefs.current["fish-meals"] = el; }}>
          <h2 className="text-3xl font-bold text-navy mb-2">Fish Meals</h2>
          <p className="text-sm text-gray-500 font-sans mb-6">
            All fish meals include: Fries, Coleslaw & a Dinner Roll
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-5 py-3 font-semibold">Fish</th>
                  <th className="text-center px-5 py-3 font-semibold">1 Piece</th>
                  <th className="text-center px-5 py-3 font-semibold">2 Pieces</th>
                  <th className="text-center px-5 py-3 font-semibold">3 Pieces</th>
                </tr>
              </thead>
              <tbody>
                {fishMeals.map((fish, i) => (
                  <tr key={fish.fish} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-5 py-3 font-semibold text-navy">{fish.fish}</td>
                    {fish.prices.map((p) => (
                      <td key={p.pieces} className="text-center px-5 py-3 text-gray-700 font-medium">
                        ${p.price.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 font-sans mt-3">
            * To add fish meals to cart, visit the{" "}
            <Link href="/order" className="text-[#2A7B88] hover:underline">Order Online</Link> page to select your fish type and piece count.
          </p>
        </section>

        <Separator />

        {/* SPECIALTY CATCHES */}
        <section id="specialty-catches" ref={(el) => { sectionRefs.current["specialty-catches"] = el; }}>
          <h2 className="text-3xl font-bold text-navy mb-6">Specialty Catches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialtyCatches.map((item) => (
              <MenuItemCard key={item.id} item={item} onAdd={handleAdd} />
            ))}
          </div>
        </section>

        <Separator />

        {/* BURGERS */}
        <section id="burgers" ref={(el) => { sectionRefs.current["burgers"] = el; }}>
          <h2 className="text-3xl font-bold text-navy mb-6">Burgers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {burgers.map((item) => (
              <MenuItemCard key={item.id} item={item} onAdd={handleAdd} />
            ))}
          </div>
          <div className="bg-gold/5 border border-gold/20 rounded-xl p-5">
            <h4 className="font-semibold text-navy text-sm mb-3">Burger Add-Ons</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {burgerAddOns.map((addon) => (
                <div key={addon.name} className="flex justify-between items-center bg-white rounded-lg px-3 py-2 border border-gray-100 text-xs font-sans">
                  <span className="text-gray-700">{addon.name}</span>
                  <span className="font-semibold text-navy ml-2">+${addon.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* MEALS */}
        <section id="meals" ref={(el) => { sectionRefs.current["meals"] = el; }}>
          <h2 className="text-3xl font-bold text-navy mb-6">Meals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {meals.map((item) => (
              <MenuItemCard key={item.id} item={item} onAdd={handleAdd} />
            ))}
          </div>
        </section>

        <Separator />

        {/* APPYS */}
        <section id="appys" ref={(el) => { sectionRefs.current["appys"] = el; }}>
          <h2 className="text-3xl font-bold text-navy mb-6">Appys</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appys.map((item) => (
              <MenuItemCard key={item.id} item={item} onAdd={handleAdd} />
            ))}
          </div>
        </section>

        <Separator />

        {/* POUTINE CALLOUT BANNER */}
        <div className="relative rounded-2xl overflow-hidden h-48 my-4">
          <Image
            src="/images/poutine.png"
            alt="Off the Hook Poutine"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy/65" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-gold text-xs uppercase tracking-widest font-sans mb-2">A Calgary Favourite</p>
            <h3 className="text-white text-3xl font-bold mb-3">Poutine — $8.99</h3>
            <p className="text-white/70 font-sans text-sm max-w-md">Crispy fries, cheese curds, rich gravy. Add a drizzle of love.</p>
          </div>
        </div>

        {/* KIDS MEALS */}
        <section id="kids-meals" ref={(el) => { sectionRefs.current["kids-meals"] = el; }}>
          <h2 className="text-3xl font-bold text-navy mb-2">Kids Meals</h2>
          <div className="bg-[#2A7B88]/5 border border-[#2A7B88]/20 rounded-xl p-4 mb-6 flex items-start gap-3">
            <Baby className="w-5 h-5 text-[#2A7B88] shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600 font-sans">
              All kids meals are <span className="font-semibold text-navy">$11.99</span> and include a{" "}
              <span className="font-medium">Juice Box, French Fries, a Toy, and a Snack Cake</span>.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {kidsMeals.map((item) => (
              <MenuItemCard key={item.id} item={item} onAdd={handleAdd} />
            ))}
          </div>
        </section>

        <Separator />

        {/* DRINKS */}
        <section id="drinks" ref={(el) => { sectionRefs.current["drinks"] = el; }}>
          <h2 className="text-3xl font-bold text-navy mb-6">Drinks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {drinks.map((item) => (
              <MenuItemCard key={item.id} item={item} onAdd={handleAdd} />
            ))}
          </div>
        </section>

        <Separator />

        {/* DESSERTS */}
        <section id="desserts" ref={(el) => { sectionRefs.current["desserts"] = el; }}>
          <h2 className="text-3xl font-bold text-navy mb-6">Desserts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {desserts.map((item) => (
              <MenuItemCard key={item.id} item={item} onAdd={handleAdd} />
            ))}
          </div>
        </section>

        <Separator />

        {/* SIDES */}
        <section id="sides" ref={(el) => { sectionRefs.current["sides"] = el; }}>
          <h2 className="text-3xl font-bold text-navy mb-6">Sides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sides.map((item) => (
              <MenuItemCard key={item.id} item={item} onAdd={handleAdd} />
            ))}
          </div>
        </section>
      </div>

      {/* Floating cart button */}
      {itemCount > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Link href="/order">
            <Button className="bg-navy hover:bg-navy/90 text-white shadow-xl rounded-full px-6 py-6 text-sm font-semibold">
              <ShoppingCart className="w-5 h-5 mr-2" />
              View Cart ({itemCount})
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
