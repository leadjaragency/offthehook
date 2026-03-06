"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Phone, Clock, Star, Fish, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { businessInfo } from "@/lib/menu-data";
import { useCartStore } from "@/lib/store";
import { toast } from "sonner";

const featuredItems = [
  {
    id: "ml-001",
    name: "Newfie Mess",
    description: "Our signature East Coast poutine — big, delicious, and pure comfort food.",
    price: 17.5,
    badge: "Signature",
    image: "/images/newfie-mess.png",
  },
  {
    id: "sc-002",
    name: "Captain's Catch",
    description: "Pollock, Haddock, Cod, 5 Jumbo Shrimp & 4 Jumbo Scallops. Fries, Coleslaw & Roll included.",
    price: 39.0,
    badge: "Popular",
    image: "/images/halibut-meal.png",
  },
  {
    id: "fm-004",
    name: "Family Captain's Catch",
    description: "2 Pollock, 2 Haddock, 2 Cod, 10 Jumbo Shrimp, 8 Jumbo Scallops. Feeds the whole crew.",
    price: 79.99,
    badge: "Family",
    image: "/images/poutine.png",
  },
  {
    id: "sc-001",
    name: "Admiral Catch",
    description: "Pollock, Haddock, Cod with 4 Jumbo Scallops & 5 Lobster Bites. Our most indulgent catch.",
    price: 59.0,
    badge: "Chef's Pick",
    image: "/images/seafood-app.png",
  },
];

const features = [
  {
    icon: Fish,
    title: "East Coast Tradition",
    description: "Recipes straight from Newfoundland, brought to Calgary with the same love and craftsmanship.",
  },
  {
    icon: Heart,
    title: "Generous Portions",
    description: "We don't do small here. Every plate is loaded — enough to share, enough to satisfy.",
  },
  {
    icon: Star,
    title: "Fresh Daily",
    description: "Quality ingredients, battered fresh every day. You can taste the difference.",
  },
];

const testimonials = [
  {
    quote: "Best fish n chips in the city. Large portion sizes. Great value.",
    author: "Google Review",
  },
  {
    quote: "The Newfie Mess is big, delicious and comfort food! Poutine with a super hero cape!",
    author: "Yelp Review",
  },
  {
    quote: "Super light tasting fish and chips. Onion rings are about the best I've ever tasted.",
    author: "TripAdvisor Review",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function HomePage() {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (item: (typeof featuredItems)[0]) => {
    addItem({ menuItemId: item.id, name: item.name, price: item.price, quantity: 1 });
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-navy overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #2A7B88 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, #D4952A 0%, transparent 40%)`,
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex justify-center mb-6">
              <Image
                src="/images/Good Cheers.png"
                alt="Off the Hook"
                width={160}
                height={160}
                className="rounded-full object-cover shadow-2xl border-4 border-gold/30"
                priority
              />
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-white text-5xl sm:text-7xl font-bold mb-3 leading-tight">
              Off the Hook
            </motion.h1>
            <motion.p variants={fadeUp} className="text-gold text-sm uppercase tracking-[0.3em] mb-3 font-sans">
              From Sea to Land
            </motion.p>
            <motion.p variants={fadeUp} className="text-white/70 text-lg sm:text-xl mb-4 font-sans max-w-2xl mx-auto">
              Newfoundland-Inspired Seafood in Calgary
            </motion.p>
            <motion.p variants={fadeUp} className="text-white/50 text-sm mb-10 font-sans flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
              <span className="flex items-center gap-1">
                <MapPin className="inline w-4 h-4 text-gold" />
                {businessInfo.fullAddress}
              </span>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="flex items-center gap-1">
                <Clock className="inline w-4 h-4 text-gold" />
                {businessInfo.hoursSummary}
              </span>
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <Link href="/menu">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:text-white font-sans">
                  View Menu
                </Button>
              </Link>
              <Link href="/order">
                <Button size="lg" className="bg-gold hover:bg-gold/90 text-navy font-bold font-sans">
                  Order Online
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED ITEMS */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="text-[#2A7B88] text-sm uppercase tracking-widest font-sans mb-2">Must Try</p>
            <h2 className="text-4xl font-bold text-navy">Fan Favourites</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <motion.div key={item.id} variants={fadeUp}>
                <Card className="h-full flex flex-col border-0 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-gold text-navy font-semibold text-xs shadow-md">
                      {item.badge}
                    </Badge>
                  </div>
                  <CardContent className="flex flex-col flex-1 p-5">
                    <h3 className="font-bold text-lg text-navy mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-500 font-sans leading-relaxed flex-1 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-navy">${item.price.toFixed(2)}</span>
                      <Button size="sm" className="bg-navy hover:bg-navy/90 text-white" onClick={() => handleAddToCart(item)}>
                        Add to Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* WHY OFF THE HOOK */}
      <section className="bg-[#1B3A5C]/5 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <p className="text-[#2A7B88] text-sm uppercase tracking-widest font-sans mb-2">Why We&apos;re Different</p>
              <h2 className="text-4xl font-bold text-navy">Why Off the Hook?</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feat) => (
                <motion.div key={feat.title} variants={fadeUp}>
                  <Card className="text-center border-0 shadow-sm hover:shadow-lg transition-shadow p-8">
                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
                      <feat.icon className="w-8 h-8 text-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-3">{feat.title}</h3>
                    <p className="text-gray-500 font-sans text-sm leading-relaxed">{feat.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="text-[#2A7B88] text-sm uppercase tracking-widest font-sans mb-2">What People Say</p>
            <h2 className="text-4xl font-bold text-navy">Our Guests Love Us</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="border-0 shadow-md bg-navy text-white p-8 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="text-white/80 font-sans text-sm leading-relaxed flex-1 italic mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="text-gold text-xs font-semibold uppercase tracking-widest">— {t.author}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* LOCATION BANNER */}
      <section className="bg-[#1B3A5C]/5 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <p className="text-[#2A7B88] text-sm uppercase tracking-widest font-sans mb-2">Find Us</p>
              <h2 className="text-4xl font-bold text-navy">Come Visit Us</h2>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden shadow-lg h-80 bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-400 font-sans text-sm">
                  <MapPin className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                  <p>7003 Ogden Road SE</p>
                  <p>Calgary, AB T2C 1B5</p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${businessInfo.coordinates.lat},${businessInfo.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-[#2A7B88] hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy mb-1">Address</p>
                    <p className="text-gray-500 font-sans text-sm">{businessInfo.fullAddress}</p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${businessInfo.coordinates.lat},${businessInfo.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2A7B88] text-sm hover:underline mt-1 inline-block font-sans"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy mb-1">Phone</p>
                    <a href={`tel:${businessInfo.phone}`} className="text-gray-500 font-sans text-sm hover:text-navy transition-colors">
                      {businessInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy mb-1">Hours</p>
                    <p className="text-gray-500 font-sans text-sm">Sunday – Thursday: 11:00 AM – 9:00 PM</p>
                    <p className="text-gray-500 font-sans text-sm">Friday – Saturday: 11:00 AM – 10:00 PM</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-navy py-20 px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-2xl mx-auto"
        >
          <motion.h2 variants={fadeUp} className="text-white text-4xl font-bold mb-4">
            Ready to Order?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/60 font-sans mb-8">
            Place your order online for pickup — fresh, hot, and ready when you are.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/order">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-navy font-bold font-sans px-10">
                Order Online Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
