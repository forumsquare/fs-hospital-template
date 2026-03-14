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
          "mx-auto w-full flex flex-wrap justify-center gap-7 px-6 mb-8 ",
          showHorizontal &&
          "flex-row flex-nowrap overflow-x-auto sm:py-3 pb-8 px-16 justify-start"
        )}
      >
        {facilities.map((facility) => (
          <motion.div
            key={facility.id}
            className="w-64 cursor-pointer bg-white rounded-xl overflow-hidden border flex-shrink-0 hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleTreatmentClick(facility)}
          >
            <Image
              src={facility.image}
              alt={facility.name}
              width={256}
              height={160}
              className="rounded-t-lg object-cover h-40"
            />
            <div className=" space-y-2 p-5">
              <h3 className="text-xl font-bold">{facility.name}</h3>
              <p className="text-gray-500 text-sm">
                {facility.description.length > 80
                  ? facility.description.slice(0, 80) + "..."
                  : facility.description}
              </p>
              {/* {facility.amount && (
                <p className="text-lg font-bold text-green-700 flex items-center gap-2">
                  {formatAmount(facility.amount)}
                </p>
              )}
              {facility.discount && (
                <p className="text-sm text-red-500">{facility.discount}% off</p>
              )}
              <CustomButton
                className="w-full rounded-full bg-card border-2 text-primary"
                onClick={() => handleTreatmentClick(facility)}
              >
                Know More
                <ArrowRightIcon className="w-4 h-4 animate-bounce-x" />
              </CustomButton> */}
            </div>
          </motion.div>
        ))}
      </ul>
      <AnimatePresence>
        {open && (
          <FacilitesModel
            active={active}
            id={id}
            open={open}
            setOpen={() => setOpen((prev) => !prev)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Facilites;
