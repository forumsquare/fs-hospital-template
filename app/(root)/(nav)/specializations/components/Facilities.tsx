"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FacilityType, TreatmentType } from "@/models/schema";
import { cn } from "@/lib/utils";
import FacilitesModel from "./FicalitiesModel";

// Renders the facility's actual backend image (from `images[0]`), falling back
// to a local placeholder only when there is genuinely no image or it fails to
// load. Keeps its own error state so one broken URL doesn't affect the others.
const FacilityImage = ({ src, alt }: { src: string; alt: string }) => {
  const [errored, setErrored] = useState(false);
  const usePlaceholder = errored || !src;
  return (
    <Image
      src={usePlaceholder ? "/icons/hospital.svg" : src}
      alt={alt}
      width={320}
      height={180}
      onError={() => setErrored(true)}
      className={cn(
        "w-full h-full transition-transform duration-500 group-hover:scale-105",
        usePlaceholder ? "object-contain p-10 opacity-30" : "object-cover",
      )}
    />
  );
};

const Facilites = ({
  facilities,
  showHorizontal,
}: {
  facilities: FacilityType[];
  showHorizontal?: boolean;
}) => {
  const [active, setActive] = useState<FacilityType | null>(null);
  const [id, setId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleTreatmentClick = (treatment: FacilityType) => {
    setActive(treatment);
    setId(treatment.id);
    setOpen(true);
  };

  return (
    <>
      <ul
        className={cn(
          "mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-8 ",
          showHorizontal &&
            "flex-row flex-nowrap overflow-x-auto sm:py-3 pb-8 px-6 md:px-16 justify-start scrollbar-hide",
        )}
      >
        {facilities.map((facility) => (
          <motion.div
            key={facility.id}
            className="group border cursor-pointer flex-shrink-0 flex flex-col  bg-slate-50 !p-4 rounded-xl"
            whileHover={{ y: -5 }}
            onClick={() => handleTreatmentClick(facility)}
          >
            <div className="rounded-2xl overflow-hidden mb-6 aspect-video bg-slate-100">
              <FacilityImage
                // SSR data carries the raw `images` array; the client-mapped
                // shape carries a singular `image`. Support both so the real
                // backend image always renders.
                src={(facility as any).images?.[0] || facility.image || ""}
                alt={facility.name}
              />
            </div>
            <h5 className="text-xl font-bold mb-2 text-slate-900 line-clamp-1">
              {facility.name}
            </h5>
            <p className="text-slate-500 text-sm line-clamp-2">
              {facility.description}
            </p>
          </motion.div>
        ))}
      </ul>
      <AnimatePresence>
        {open && (
          <FacilitesModel
            active={active}
            id={id}
            open={open}
            setOpen={setOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Facilites;
