"use client";

import CustomDialog from "@/components/custom/CustomDialog";
import CustomDrawer from "@/components/custom/CustomDrawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { TreatmentType } from "@/models/schema";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ModelCard = ({
  active,
  id,
}: {
  active: TreatmentType;
  id: string;
}) => (
  <div
    className="w-full md:max-w-[500px] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-y-auto"
  >
    <div className="p-4 pt-2">
      <div className="relative w-full aspect-square max-h-[300px] rounded-2xl overflow-hidden border mb-6">
        <Image
          priority
          fill
          src={active.image}
          alt={active.name}
          className="object-cover object-top"
        />
      </div>

      <div className="space-y-4 px-2">
        <h3 className="font-bold text-neutral-800 text-2xl">
          {active.name}
        </h3>

        <p className="text-neutral-600 text-[15px] leading-relaxed tracking-wide font-medium pb-4">
          {active.description}
        </p>
      </div>
    </div>
  </div>
);
const TreatmentModal = ({
  active,
  id,
  open,
  setOpen,
}: {
  active: TreatmentType | null;
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !active) return null;

  return isMobile ? (
    <CustomDrawer open={open} setOpen={setOpen} title={active.name} className="!p-0">
      <ModelCard active={active} id={id} />
    </CustomDrawer>
  ) : (
    <CustomDialog
      open={open}
      setOpen={setOpen}
      className="!p-0 !rounded-3xl !w-fit border-none max-h-[85vh] overflow-y-auto"
    >
      <ModelCard active={active} id={id} />
    </CustomDialog>
  );
};

export default TreatmentModal;
