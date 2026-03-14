"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TreatmentType } from "@/models/schema";
import TreatmentModal from "./TreatmentModal";
import { cn, formatAmount } from "@/lib/utils";
import { CustomButton } from "@/components/custom/CustomButtons";
import { ArrowRightIcon } from "lucide-react";

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
          "mx-auto w-full flex flex-wrap justify-center gap-7 px-6 ",
          showHorizontal &&
            "flex-row flex-nowrap overflow-x-auto py-8 md:pb-12 px-16 justify-start"
        )}
      >
        {treatments.map((treatment) => (
          <motion.div
            key={treatment.id}
            className="w-72 bg-white rounded-2xl overflow-hidden border border-slate-100 flex flex-col flex-shrink-0 hover:shadow-xl transition-all duration-300 group"
            whileHover={{ y: -5 }}
          >
            <div className="relative aspect-[4/3] w-full bg-slate-50 overflow-hidden">
               <Image
                src={treatment.image || "/icons/image-placeholder.svg"} 
                alt={treatment.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/icons/image.svg"; // Fallback to icon
                }}
              />
            </div>
            
            <div className="flex-1 flex flex-col p-6 space-y-4">
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-bold text-slate-900 line-clamp-2 min-h-[3rem] leading-tight">
                  {treatment.name}
                </h3>
                
                <div className="flex flex-col gap-1 min-h-[3.5rem] justify-center">
                  {treatment.amount && treatment.amount > 0 ? (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <p className="text-xl font-bold text-green-600">
                          {formatAmount(treatment.amount - (treatment.amount * (treatment.discount || 0)) / 100)}
                        </p>
                        {treatment.discount && treatment.discount > 0 ? (
                          <span className="text-sm text-slate-400 line-through">
                            {formatAmount(treatment.amount)}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <p className="text-lg font-bold text-slate-400 italic">Price on request</p>
                  )}
                  
                  {treatment.discount && treatment.discount > 0 ? (
                    <div className="text-sm font-bold text-red-500">
                      {treatment.discount}% off
                    </div>
                  ) : null}
                </div>
              </div>
              
              <CustomButton
                className="w-full rounded-full bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 font-bold group/btn"
                onClick={() => handleTreatmentClick(treatment)}
              >
                <span>Know More</span>
                <ArrowRightIcon className="w-4 h-4 ml-2 animate-bounce-x" />
              </CustomButton>
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
            setOpen={() => setOpen((prev) => !prev)}
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
