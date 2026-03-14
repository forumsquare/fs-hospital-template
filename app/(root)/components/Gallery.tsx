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
    <div className="py-6 pt-10 flex flex-col items-center space-y-6">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-5xl font-bold">Moments of care</h2>
        <p className="text-center text-sm font-sans italic text-primary/50 font-medium max-w-screen-md px-2">
          Experience Our Facilities, Expertise, and Compassion in Every Image
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="max-w-[calc(100vw-2rem)] mx-auto"
      >
        <CarouselContent>
          {images.map((img) => (
            <CarouselItem
              key={img}
              className=" md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div
                key={img}
                className="w-[343px] sm:w-[360px] aspect-[4/3]   shadow-md shadow-black/20 rounded-2xl"
              >
                <Image
                  src={img}
                  alt="gallery"
                  width={300}
                  height={300}
                  className="w-full h-full  object-cover object-center rounded-2xl"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 sm:left-5 shadow-[0_0_10px_10px_rgba(0,0,0,0.2)]" />
        <CarouselNext className="right-2 sm:right-5 shadow-[0_0_10px_10px_rgba(0,0,0,0.2)]" />
      </Carousel>
    </div>
  );
};

export default Gallery;
