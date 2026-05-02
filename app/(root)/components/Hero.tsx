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
      <div className="size-32 sm:size-[150px] rounded-3xl flex flex-col items-center justify-center gap-y-2 sm:gap-y-3 bg-gradient-to-br from-white bg-blur-3xl border to-secondary/80 text-secondary-foreground shadow-lg">
        <h3 className="text-xl sm:text-3xl font-extrabold text-nowrap">
          {formatIndVal(value)}+
        </h3>
        <p className="text-[10px] sm:text-sm text-center px-2 font-medium italic">{title}</p>
      </div>
    );
  };

  return (
    <section className="text-center space-y-9 flex flex-col items-start justify-center p-4 md:p-10 py-12 sm:py-20 overflow-hidden relative min-h-screen">
      <div className="absolute top-0 inset-0 hero-bg !max-w-screen bg-cover bg-right bg-no-repeat h-full scale-x-[-1]" />

      {/* Content */}
      <div className="relative z-10 space-y-6 sm:space-y-9 flex flex-col items-center  !w-fit ">
        <TimingButton />
        <div className="space-y-2 px-4">
          <h1 className="text-4xl sm:text-7xl font-[900] tracking-tight text-slate-900 drop-shadow-sm leading-tight">
            {store.name}
          </h1>
          <h2 className="text-sm sm:text-lg font-semibold text-primary/70 uppercase tracking-widest">
            {store.tagline}
          </h2>
        </div>
        <HeroButtons />
        <div className="flex items-center justify-center gap-4 w-full px-4">
          <p className="font-sans italic text-base sm:text-lg font-medium tracking-wide max-w-lg text-slate-600 leading-relaxed">
            {store.about}
          </p>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center justify-center pt-8 w-full max-w-fit mx-auto">
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
