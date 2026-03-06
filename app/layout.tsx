import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Off the Hook — Newfoundland Seafood in Calgary",
    default: "Off the Hook — From Sea to Land | Newfoundland Seafood in Calgary",
  },
  description:
    "Newfoundland-inspired fish & chips, seafood, and comfort food in Calgary's Ogden community. Fresh-battered fish, Newfie Mess, Family Meals, and more.",
  keywords: [
    "fish and chips Calgary",
    "seafood Calgary",
    "best fish and chips Calgary SE",
    "Ogden restaurant Calgary",
    "Newfoundland food Calgary",
    "Off the Hook Calgary",
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    siteName: "Off the Hook — From Sea to Land",
    type: "website",
    images: [{ url: "/images/Good Cheers.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-[#FAFAFA] text-[#2D2D2D]">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
