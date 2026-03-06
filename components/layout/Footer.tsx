import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Instagram } from "lucide-react";
import { businessInfo } from "@/lib/menu-data";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Off the Hook logo"
                width={56}
                height={56}
                className="object-contain drop-shadow-md"
              />
              <div>
                <h3 className="text-gold font-serif text-xl font-bold leading-tight">Off the Hook</h3>
                <p className="text-white/50 text-[10px] tracking-widest uppercase">From Sea to Land</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Newfoundland-inspired seafood brought to the heart of Calgary. Fresh, generous, and made with East Coast pride.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/menu", label: "Menu" },
                { href: "/order", label: "Order Online" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Hours</h4>
            <ul className="space-y-1.5 text-sm">
              <li className="flex justify-between gap-4">
                <span className="text-white/60">Sun – Thu</span>
                <span>11:00 AM – 9:00 PM</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="text-white/60">Fri – Sat</span>
                <span>11:00 AM – 10:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span>{businessInfo.fullAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={`tel:${businessInfo.phone}`} className="hover:text-gold transition-colors">
                  {businessInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-gold shrink-0" />
                <a
                  href={businessInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  {businessInfo.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} Off the Hook — From Sea to Land. All rights reserved.</p>
          <p>7003 Ogden Road SE, Calgary, AB</p>
        </div>
      </div>
    </footer>
  );
}
