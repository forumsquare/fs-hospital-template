"use client";

import React from "react";
import Image from "next/image";
import { AddressType } from "@/models/schema";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LocationsSection({ addresses }: { addresses: AddressType[] }) {
  const [selectedIdx, setSelectedIdx] = React.useState(0);
  
  if (!addresses || addresses.length === 0) return null;
  
  const selectedAddress = addresses[selectedIdx];
  const query = selectedAddress.lat && selectedAddress.lng 
    ? `${selectedAddress.lat},${selectedAddress.lng}` 
    : encodeURIComponent(`${selectedAddress.address}, ${selectedAddress.city}`);

  return (
    <section className="w-full py-10 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Find Your Nearest Location
          </h2>
          <p className="text-slate-500 font-medium max-w-lg mx-auto">
            Choose the most convenient sanctuary for your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {addresses.map((address, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedIdx(idx)}
              className={`cursor-pointer bg-white rounded-[24px] p-8 transition-all duration-300 border flex flex-col h-full ${
                selectedIdx === idx 
                  ? "border-blue-500 shadow-[0_8px_40px_rgb(59,130,246,0.1)] ring-1 ring-blue-500" 
                  : "border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                selectedIdx === idx ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
              }`}>
                <MapPin className={`w-6 h-6 ${selectedIdx === idx ? "fill-white/20" : "fill-blue-600/20"}`} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {address.area || address.city || "Primary Center"}
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                {address.address}, {address.area && `${address.area},`} {address.city}, {address.state} {address.zipcode}
              </p>

              <div className="space-y-4">
                {(address.contactNo || (address as any).phone?.[0]) && (
                  <div className="flex items-center text-slate-600 text-sm">
                    <Phone className="w-4 h-4 mr-3 text-slate-400" />
                    <span>+91 {address.contactNo || (address as any).phone?.[0]}</span>
                  </div>
                )}

                <div className="flex items-center text-slate-600 text-sm">
                  <Clock className="w-4 h-4 mr-3 text-slate-400" />
                  <span>09:00 AM - 08:00 PM</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Network Map Representation */}
        <div className="rounded-[32px] overflow-hidden bg-[#f8fbff] aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] relative shadow-2xl border border-slate-100">
          <iframe
            style={{ height: "100%", width: "100%", border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"}`}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
