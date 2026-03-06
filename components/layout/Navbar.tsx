"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingCart, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store";
import { businessInfo } from "@/lib/menu-data";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Off the Hook logo"
              width={52}
              height={52}
              className="object-contain drop-shadow-md"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-gold font-serif text-lg font-bold tracking-wide">
                Off the Hook
              </span>
              <span className="text-white/60 text-[10px] tracking-widest uppercase">
                From Sea to Land
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative pb-1 ${
                  pathname === link.href
                    ? "text-gold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${businessInfo.phone}`}
              className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {businessInfo.phone}
            </a>

            <Link href="/order">
              <Button
                size="sm"
                className="bg-gold hover:bg-gold/90 text-navy font-semibold relative"
              >
                <ShoppingCart className="w-4 h-4 mr-1.5" />
                Order Online
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 min-w-[1.25rem] h-5 flex items-center justify-center">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-navy border-white/10 w-72">
                <div className="flex flex-col h-full pt-6">
                  <div className="mb-8 flex items-center gap-3">
                    <Image
                      src="/images/logo.png"
                      alt="Off the Hook logo"
                      width={56}
                      height={56}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <span className="text-gold font-serif text-xl font-bold block">Off the Hook</span>
                      <p className="text-white/60 text-[10px] tracking-widest uppercase">From Sea to Land</p>
                    </div>
                  </div>
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                          pathname === link.href
                            ? "bg-gold/20 text-gold"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href="/order"
                      onClick={() => setMobileOpen(false)}
                      className="mt-2 px-4 py-3 rounded-lg bg-gold text-navy font-semibold text-center"
                    >
                      Order Online
                    </Link>
                  </nav>
                  <div className="mt-auto pb-6">
                    <a
                      href={`tel:${businessInfo.phone}`}
                      className="flex items-center gap-2 text-white/60 hover:text-white text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      {businessInfo.phone}
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
