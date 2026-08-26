"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const Gallery = ({ media }: { media: { url: string; type: "IMAGE" | "CERTIFICATE" }[] }) => {
  const images = media.filter((m) => m.type === "IMAGE").map((m) => m.url);

  const [api, setApi] = useState<CarouselApi>();
  // Whether the photos actually overflow the track. Driven by embla's snap list
  // so it stays correct across breakpoints (a set that scrolls on mobile may fit
  // entirely on desktop). When false we hide the arrows and disable looping.
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    if (!api) return;
    const update = () => setCanScroll(api.scrollSnapList().length > 1);
    update();
    api.on("reInit", update);
    return () => {
      api.off("reInit", update);
    };
  }, [api]);

  if (images.length === 0) return null;

  return (
    <div className="py-20 flex flex-col items-center space-y-12">
      <div className="flex flex-col items-center gap-4 text-center px-4">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">Moments of care</h2>
        <p className="text-sm font-sans italic text-slate-500 font-medium max-w-screen-md">
          Experience Our Facilities, Expertise, and Compassion in Every Image
        </p>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto px-12 md:px-20 lg:px-32 relative group">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: canScroll,
          }}
          className="w-full"
        >
          {/* basis-auto + intrinsic image width => a justified row of equal-height
              slides. Portrait and landscape photos keep their own aspect ratio. */}
          <CarouselContent className={cn("-ml-6", !canScroll && "justify-center")}>
            {images.map((img, index) => (
              <CarouselItem key={index} className="pl-6 basis-auto">
                <div className="group/card relative overflow-hidden rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`care moment ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-72 sm:h-80 lg:h-96 w-auto max-w-[85vw] md:max-w-[36rem] object-cover transition-transform duration-700 group-hover/card:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {canScroll && (
            <>
              <CarouselPrevious className="flex -left-6 md:-left-10 lg:-left-16 h-12 w-12 border-none bg-white shadow-xl hover:bg-primary hover:text-white transition-all z-10" />
              <CarouselNext className="flex -right-6 md:-right-10 lg:-right-16 h-12 w-12 border-none bg-white shadow-xl hover:bg-primary hover:text-white transition-all z-10" />
            </>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default Gallery;
