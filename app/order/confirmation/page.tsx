"use client";


import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { businessInfo } from "@/lib/menu-data";
import { motion } from "framer-motion";
import { Suspense } from "react";

function ConfirmationContent() {
  const params = useSearchParams();
  const orderNumber = params.get("order") ?? "OTH-000000";

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-14 h-14 text-green-500" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1 className="text-3xl font-bold text-navy mb-2">Order Received!</h1>
          <p className="text-gray-500 font-sans mb-2">
            Your order has been received! We&apos;ll have it ready for you.
          </p>
          <div className="inline-block bg-gold/10 border border-gold/30 rounded-lg px-4 py-2 mb-8">
            <p className="text-xs text-gray-500 font-sans">Order Number</p>
            <p className="text-2xl font-bold text-navy tracking-wider">{orderNumber}</p>
          </div>

          <Card className="border-0 shadow-md mb-8 text-left">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-navy text-sm">Pickup Location</p>
                  <p className="text-gray-500 font-sans text-sm">{businessInfo.fullAddress}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <div>
                  <p className="font-semibold text-navy text-sm">Questions?</p>
                  <a href={`tel:${businessInfo.phone}`} className="text-gray-500 font-sans text-sm hover:text-navy">
                    {businessInfo.phone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3 justify-center">
            <Link href="/">
              <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white">
                Back to Home
              </Button>
            </Link>
            <Link href="/order">
              <Button className="bg-gold hover:bg-gold/90 text-navy font-bold">
                Order Again
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}
