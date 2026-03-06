import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Fish, Heart, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Off the Hook — Newfoundland-inspired seafood brought to Calgary's Ogden community.",
};

const highlights = [
  {
    icon: Fish,
    title: "Fresh-Battered Fish",
    description: "Five types of fish battered fresh daily: Pollock, Haddock, Cod, Salmon, and Halibut.",
  },
  {
    icon: Heart,
    title: "Newfie Mess — Our Signature",
    description: "East Coast poutine done right. Big, hearty, and packed with East Coast soul.",
  },
  {
    icon: Users,
    title: "East Coast Hospitality",
    description: "Come as a stranger, leave as family. That's the Newfoundland way — and it's our way too.",
  },
  {
    icon: Star,
    title: "Family-Sized Portions",
    description: "We believe food is meant to be shared. Our portions reflect that generosity.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-navy text-white py-20 px-4 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, #2A7B88 0%, transparent 50%),
                              radial-gradient(circle at 70% 30%, #D4952A 0%, transparent 40%)`,
          }}
        />
        <div className="relative z-10">
          <p className="text-gold text-xs uppercase tracking-widest font-sans mb-3">Our Story</p>
          <h1 className="text-5xl font-bold mb-4">Who We Are</h1>
          <p className="text-white/60 font-sans max-w-xl mx-auto">
            A little piece of Newfoundland, right in the heart of Calgary.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Image side */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square lg:aspect-auto lg:h-[520px]">
            <Image
              src="/images/seafood-app.png"
              alt="Off the Hook signature seafood"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white font-serif text-2xl font-bold leading-tight">East Coast flavours,<br/>Calgary heart.</p>
            </div>
          </div>
          {/* Text side */}
          <div className="prose prose-lg max-w-none font-sans text-gray-600 space-y-6">
          <p className="text-lg leading-relaxed">
            Off the Hook was born from a simple desire: to bring the warmth, generosity, and incredible seafood of Newfoundland to Alberta. We&apos;re Newfoundland transplants who couldn&apos;t find the East Coast food we grew up loving — so we made it ourselves.
          </p>
          <p className="leading-relaxed">
            We opened our doors in 2025 right here in the Ogden community of Calgary&apos;s SE, and the response has been overwhelming. Families, regulars, and first-timers all come through our doors and leave with full bellies and big smiles.
          </p>
          <p className="leading-relaxed">
            Everything we serve is rooted in tradition. Our fish is fresh-battered daily. Our Newfie Mess is legendary. Our portions are generous because that&apos;s how we were raised — you never leave a Newfoundlander&apos;s table hungry.
          </p>
          <p className="leading-relaxed">
            Whether you&apos;re a Calgary local looking for something different, or a fellow Newfoundlander craving a taste of home, we&apos;re here for you. From sea to land — welcome to Off the Hook.
          </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-navy/5 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#2A7B88] text-sm uppercase tracking-widest font-sans mb-2">Our Specialties</p>
            <h2 className="text-4xl font-bold text-navy">What We&apos;re Known For</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h) => (
              <Card key={h.title} className="border-0 shadow-sm hover:shadow-lg transition-shadow text-center p-6">
                <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <h.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-bold text-navy mb-2 text-base">{h.title}</h3>
                <p className="text-gray-500 font-sans text-sm leading-relaxed">{h.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-[#2A7B88] text-sm uppercase tracking-widest font-sans mb-3">What Drives Us</p>
        <h2 className="text-4xl font-bold text-navy mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            { title: "Freshness", body: "Every piece of fish is battered to order. We don't cut corners on quality." },
            { title: "Community", body: "We're part of the Ogden neighbourhood. We show up for our community because they show up for us." },
            { title: "Generosity", body: "Newfoundland hospitality means you always get more than you expected. That's a promise." },
          ].map((v) => (
            <div key={v.title} className="border-l-4 border-gold pl-5 py-2">
              <h4 className="font-bold text-navy mb-2">{v.title}</h4>
              <p className="text-gray-500 font-sans text-sm leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 px-4 text-center">
        <h2 className="text-white text-3xl font-bold mb-4">Come Taste the East Coast</h2>
        <p className="text-white/60 font-sans mb-8">Order online or come visit us at 7003 Ogden Road SE, Calgary.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/order">
            <Button className="bg-gold hover:bg-gold/90 text-navy font-bold">Order Online</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:text-white">
              Find Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
