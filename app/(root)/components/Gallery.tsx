import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import Image from "next/image";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// TODO : need to dicsuss on the aspect ratios
const Gallery = ({ media }: { media: { url: string; type: "IMAGE" | "CERTIFICATE" }[] }) => {
  const images = media.filter((m) => m.type === "IMAGE").map((m) => m.url);
  
  return (
    <div className="py-20 flex flex-col items-center space-y-12">
      <div className="flex flex-col items-center gap-4 text-center px-4">
        <span className="text-primary font-bold tracking-widest uppercase text-xs">Visual Journey</span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">Moments of care</h2>
        <p className="text-sm font-sans italic text-slate-500 font-medium max-w-screen-md">
          Experience Our Facilities, Expertise, and Compassion in Every Image
        </p>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-12 relative group">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {images.map((img, index) => (
              <CarouselItem
                key={index}
                className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div 
                  className={`transition-all duration-700 ease-in-out ${
                    index % 2 === 0 ? "pt-0 pb-12" : "pt-12 pb-0"
                  }`}
                >
                  <div className="group/card relative overflow-hidden rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white aspect-[3/4]">
                    <Image
                      src={img}
                      alt={`care moment ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="hidden md:flex -left-6 lg:-left-12 h-12 w-12 border-none bg-white shadow-xl hover:bg-primary hover:text-white transition-all" />
          <CarouselNext className="hidden md:flex -right-6 lg:-right-12 h-12 w-12 border-none bg-white shadow-xl hover:bg-primary hover:text-white transition-all" />
        </Carousel>
      </div>
    </div>
  );
};

export default Gallery;
