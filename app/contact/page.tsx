"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, Instagram, ExternalLink, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { businessInfo } from "@/lib/menu-data";
import { toast } from "sonner";

const hours = [
  { days: "Sunday", time: businessInfo.hours.sunday },
  { days: "Monday", time: businessInfo.hours.monday },
  { days: "Tuesday", time: businessInfo.hours.tuesday },
  { days: "Wednesday", time: businessInfo.hours.wednesday },
  { days: "Thursday", time: businessInfo.hours.thursday },
  { days: "Friday", time: businessInfo.hours.friday },
  { days: "Saturday", time: businessInfo.hours.saturday },
];

const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    // Save to Supabase contact_submissions if configured
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Message sent! We'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send. Please call us instead.");
      }
    } catch {
      toast.error("Failed to send. Please call us instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-navy text-white py-16 px-4 text-center">
        <p className="text-gold text-xs uppercase tracking-widest font-sans mb-3">Get in Touch</p>
        <h1 className="text-5xl font-bold mb-3">Contact Us</h1>
        <p className="text-white/60 font-sans">We&apos;d love to hear from you.</p>
      </div>

      {/* Map */}
      <div className="h-72 sm:h-96 bg-gray-200 flex items-center justify-center relative">
        <div className="text-center text-gray-400 font-sans">
          <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p className="font-semibold">7003 Ogden Road SE</p>
          <p>Calgary, AB T2C 1B5</p>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${businessInfo.coordinates.lat},${businessInfo.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[#2A7B88] hover:underline text-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Open in Google Maps
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-navy mb-6">Find Us</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-navy mb-0.5">Address</p>
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
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-navy mb-0.5">Phone</p>
                  <a href={`tel:${businessInfo.phone}`} className="text-gray-500 font-sans text-sm hover:text-navy transition-colors">
                    {businessInfo.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                  <Instagram className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-navy mb-0.5">Instagram</p>
                  <a
                    href={businessInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 font-sans text-sm hover:text-navy transition-colors"
                  >
                    {businessInfo.instagram}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Hours table */}
          <div>
            <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" /> Hours
            </h3>
            <Card className="border-0 shadow-sm overflow-hidden">
              <table className="w-full text-sm font-sans">
                <tbody>
                  {hours.map((h) => {
                    const isToday = h.days === today;
                    return (
                      <tr
                        key={h.days}
                        className={`border-b last:border-0 ${isToday ? "bg-gold/5" : ""}`}
                      >
                        <td className={`px-4 py-2.5 font-medium ${isToday ? "text-gold" : "text-navy"}`}>
                          {h.days} {isToday && <span className="text-[10px] text-gold ml-1">(today)</span>}
                        </td>
                        <td className="px-4 py-2.5 text-gray-500 text-right">{h.time}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        </div>

        {/* Contact form */}
        <div>
          <h2 className="text-2xl font-bold text-navy mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
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
              <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message</Label>
              <textarea
                id="message"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="How can we help you?"
                rows={5}
                className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-navy resize-none"
              />
            </div>
            <Button type="submit" disabled={sending} className="bg-navy hover:bg-navy/90 text-white w-full">
              {sending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</>
              ) : (
                <><Send className="w-4 h-4 mr-2" />Send Message</>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
