import React from "react";
import { cn, formatIndVal } from "@/lib/utils";
import {
  HeroButtons,
  TimingButton,
} from "@/components/custom/ClientComponents";
import { StoreInfoType } from "@/models/schema";

const Hero = ({ store }: { store: StoreInfoType }) => {
  const CountContainer = ({
    title,
    value,
  }: {
    title: string;
    value: number;
  }) => {
    return (
      <div className="size-[150px] rounded-3xl flex flex-col items-center justify-center gap-y-3 bg-gradient-to-br from-white bg-blur-3xl border to-secondary/80 text-secondary-foreground">
        <h3 className="text-3xl font-extrabold text-nowrap">
          {formatIndVal(value)}+
        </h3>
        <p className="text-sm text-wrap font-medium italic">{title}</p>
      </div>
    );
  };

  return (
    <section className=" text-center space-y-9 flex flex-col sm:items-start justify-center p-4  md:p-10 py-8 sm:py-20  overflow-hidden  relative md:h-fit min-h-screen">
      <div className="absolute top-0 inset-0 hero-bg !max-w-screen bg-cover bg-right bg-no-repeat h-screen scale-x-[-1]  " />

      {/* Content */}
      <div className="relative z-10 space-y-9 flex flex-col items-center">
        <TimingButton />
        <div className="space-y-2">
          <h4 className="text-7xl font-[900] tracking-wide text-foreground drop-shadow-xl">
            {store.name}
          </h4>
          <h4 className="text-md font-semibold text-primary/80">
            {store.tagline}
          </h4>
        </div>
        <HeroButtons />
        <div className="flex items-center justify-around gap-4 w-fit rounded-xl flex-wrap ">
          <p className="font-sans  italic text-lg font-medium tracking-wide max-w-lg  p-4 rounded-lg text-chart-3 ">
            {store.about}
          </p>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center pt-5">
          {/* Fallback to static achievements as they aren't in the store schema yet */}
          <CountContainer title="Hair Procedures" value={1200} />
          <CountContainer title="Skin Procedures" value={2100} />
          <CountContainer title="Years of Experience" value={6} />
          <CountContainer title="Consultations" value={36000} />
        </ul>
      </div>
    </section>
  );
};

export default Hero;
