"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FacilityType, TreatmentType } from "@/models/schema";
import { cn } from "@/lib/utils";
import FacilitesModel from "./FicalitiesModel";

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
          "flex-row flex-nowrap overflow-x-auto sm:py-3 pb-8 px-6 md:px-16 justify-start scrollbar-hide"
        )}
      >
        {facilities.map((facility) => (
          <motion.div
            key={facility.id}
            className="group cursor-pointer flex-shrink-0 flex flex-col  bg-slate-50 !p-4 rounded-xl"
            whileHover={{ y: -5 }}
            onClick={() => handleTreatmentClick(facility)}
          >
            <div className="rounded-2xl overflow-hidden mb-6 aspect-video bg-slate-50">
              <Image
                src={facility.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuCstbqzyyuLm5qCQhe2HB1bp39zPiR0v_XHFMSKt8bxWWm91Li4qBmJYFvpOKea1-uJDafqaNY0vuCyeIyJ-RzF4A-3LMup23IPtVyb9Gbrn6OUaeuaEUFLYYYc9xUoUmrHd1MdtlKx934__KVoy25HhFm1kjnHkTwJel3L5xPj5T8ec0B8AhyCDRSG_RvWVAB6_i0jLJcEnU67Stef8sMGUgU4_vDJo2bFRH9bpqMWUhst49UDEp3qucLsrXQtRgs57quXHJM8PQY"}
                alt={facility.name}
                width={320}
                height={180}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/icons/image.svg";
                }}
              />
            </div>
            <h5 className="text-xl font-bold mb-2 text-slate-900 line-clamp-1">{facility.name}</h5>
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
