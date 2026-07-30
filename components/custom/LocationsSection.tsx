"use client";

import React from "react";
import Image from "next/image";
import { AddressType } from "@/models/schema";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BranchTiming = {
  day: number;
  fromTime: string;
  toTime: string;
  addressId?: string | null;
};

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatTimingTime = (value: string) => {
  try {
    return new Date(value).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return value;
  }
};

export default function LocationsSection({
  addresses,
  timings,
}: {
  addresses: AddressType[];
  timings?: BranchTiming[];
}) {
  const [selectedIdx, setSelectedIdx] = React.useState(0);

  if (!addresses || addresses.length === 0) return null;

  const selectedAddress = addresses[selectedIdx];
  const query =
    selectedAddress.lat && selectedAddress.lng
      ? `${selectedAddress.lat},${selectedAddress.lng}`
      : encodeURIComponent(
          `${selectedAddress.address}, ${selectedAddress.city}`,
        );

  // Timings for the currently selected branch, grouped by weekday.
  const branchTimings = (timings ?? []).filter(
    (t) => t.addressId === selectedAddress.id,
  );
  const timingsByDay = branchTimings.reduce(
    (acc, t) => {
      (acc[t.day] ??= []).push(t);
      return acc;
    },
    {} as Record<number, BranchTiming[]>,
  );
  const hasBranchTimings = branchTimings.length > 0;

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

        <div
          className={cn([
            "grid grid-cols-1 md:grid-cols-2  gap-8 mb-20",
            addresses.length > 2 && "lg:grid-cols-3",
          ])}
        >
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
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                  selectedIdx === idx
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                <MapPin
                  className={`w-6 h-6 ${selectedIdx === idx ? "fill-white/20" : "fill-blue-600/20"}`}
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {address.area || address.city || "Primary Center"}
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                {address.address}, {address.area && `${address.area},`}{" "}
                {address.city}, {address.state} {address.zipcode}
              </p>

              <div className="space-y-4">
                {(address.contactNo || (address as any).phone?.[0]) && (
                  <div className="flex items-center text-slate-600 text-sm">
                    <Phone className="w-4 h-4 mr-3 text-slate-400" />
                    <span>
                      +91 {address.contactNo || (address as any).phone?.[0]}
                    </span>
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

        {/* Map + timings for the selected branch */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-[32px] overflow-hidden bg-[#f8fbff] aspect-[4/5] sm:aspect-[16/9] relative shadow-2xl border border-slate-100">
            <iframe
              style={{ height: "100%", width: "100%", border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"}`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
            ></iframe>
          </div>

          <div className="rounded-[32px] border border-slate-100 bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Timings</h3>
            </div>
            <p className="text-slate-500 text-sm mb-5">
              {selectedAddress.area ||
                selectedAddress.city ||
                "Selected branch"}
            </p>

            {hasBranchTimings ? (
              <ul className="space-y-2.5">
                {DAY_NAMES.map((day, index) => {
                  const dayTimings = timingsByDay[index];
                  const isClosed = !dayTimings || dayTimings.length === 0;
                  return (
                    <li
                      key={index}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="font-medium text-slate-700">{day}</span>
                      {isClosed ? (
                        <span className="text-slate-400 italic">Closed</span>
                      ) : (
                        <span className="text-slate-600 whitespace-nowrap tabular-nums">
                          {formatTimingTime(dayTimings[0].fromTime)} -{" "}
                          {formatTimingTime(
                            dayTimings[dayTimings.length - 1].toTime,
                          )}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-slate-400 italic mt-2">
                Timings not available for this branch.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
