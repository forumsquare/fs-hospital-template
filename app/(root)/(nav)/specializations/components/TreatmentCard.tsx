"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TreatmentType } from "@/models/schema";
import TreatmentModal from "./TreatmentModal";
import { cn, formatAmount } from "@/lib/utils";
import { CustomButton } from "@/components/custom/CustomButtons";
import { ArrowRightIcon, Clock } from "lucide-react";

const TestTreatmentCards = ({
  treatments,
  showHorizontal,
}: {
  treatments: TreatmentType[];
  showHorizontal?: boolean;
}) => {
  const [active, setActive] = useState<TreatmentType | null>(null);
  const [id, setId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleTreatmentClick = (treatment: TreatmentType) => {
    setActive(treatment);
    setId(treatment.id);
    setOpen(true);
  };

  return (
    <>
      <ul
        className={cn(
          "mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7  ",
          showHorizontal &&
          "flex-row flex-nowrap overflow-x-auto py-8 md:pb-12 px-6 md:px-16 justify-start scrollbar-hide"
        )}
      >
        {treatments.map((treatment) => (
          <motion.div
            key={treatment.id}
            className="bg-white border border-slate-100 rounded-[24px] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col flex-shrink-0"
            whileHover={{ y: -5 }}
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={treatment.image || "/icons/image-placeholder.svg"}
                alt={treatment.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              // onError={(e) => {
              //   const target = e.target as HTMLImageElement;
              //   target.src = "/icons/image.svg"; // Fallback to icon
              // }}
              />
              {treatment.discount && treatment.discount > 0 ? (
                <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full uppercase tracking-tighter">
                  {treatment.discount}% OFF
                </div>
              ) : (
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-tighter">
                  Popular
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold line-clamp-2">{treatment.name}</h4>
                {treatment.duration && (
                  <div className="flex items-center text-xs text-slate-500 gap-1 whitespace-nowrap ml-4">
                    <Clock className="size-4" /> {treatment.duration}
                  </div>
                )}
              </div>

              <div className="relative mb-6 flex-1 h-[40px] overflow-hidden">
                <p className="text-slate-500 !line-clamp-3 text-sm leading-[20px]">
                  {treatment.description}
                </p>
                <div className="absolute bottom-0 inset-x-0 h-5 bg-gradient-to-t from-white via-white/80 to-transparent backdrop-blur-[1px] pointer-events-none fade-out-mask"></div>
              </div>

              <div className="flex items-center justify-between mt-auto">
                {treatment.amount && treatment.amount > 0 ? (
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-green-600">
                      {formatAmount(treatment.amount - (treatment.amount * (treatment.discount || 0)) / 100)}
                    </span>
                    {treatment.discount && treatment.discount > 0 ? (
                      <span className="text-xs text-slate-400 line-through">
                        {formatAmount(treatment.amount)}
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <span className="text-sm font-semibold text-primary">Price on request</span>
                )}
                <button
                  onClick={() => handleTreatmentClick(treatment)}
                  className="group bg-transparent border-none flex items-center gap-2 text-slate-900 hover:text-primary font-bold text-sm transition-colors cursor-pointer"
                >
                  Know More
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
      <AnimatePresence>
        {open && (
          <TreatmentModal
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

export default TestTreatmentCards;

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
