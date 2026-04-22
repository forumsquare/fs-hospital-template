"use client";

import CustomDialog from "@/components/custom/CustomDialog";
import CustomDrawer from "@/components/custom/CustomDrawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { TreatmentType } from "@/models/schema";
import { motion } from "framer-motion";
import Image from "next/image";

export const ModelCard = ({
  active,
  id,
}: {
  active: TreatmentType;
  id: string;
}) => (
  <motion.div
    //   layoutId={`card-${active.id}-${id}`}
    //   ref={ref}
    className="w-full md:max-w-[500px] pt-6  h-full  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-y-auto"
  >
    <motion.div>
      <Image
        priority
        width={200}
        height={200}
        src={active.image}
        alt={active.name}
        className="w-[250px] sm:w-[300px] sm:h-[300px] lg:h-full rounded-2xl object-cover object-top mx-auto mt-2 border "
      />
    </motion.div>

    <div className="flex justify-between items-start p-4 ">
      <div className="space-y-4">
        <motion.h3
          layoutId={`title-${active.id}-${id}`}
          className="font-bold text-neutral-700  text-xl"
        >
          {active.name}
        </motion.h3>

        <motion.p
          layoutId={`description-${active.description}-${id}`}
          className="text-neutral-600  text-[15px] leading-[26px] tracking-wide  font-medium pb-0"
        >
          {active.description}
        </motion.p>
      </div>
    </div>
  </motion.div>
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
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!active) return null;
  return isMobile ? (
    <CustomDrawer open={open} setOpen={setOpen} className="max-h-[80%] !p-0">
      <ModelCard active={active} id={id} />
    </CustomDrawer>
  ) : (
    <CustomDialog
      open={open}
      setOpen={setOpen}
      className="!p-0 !rounded-3xl !w-fit border-none max-h-[60%] overflow-y-auto"
    >
      <ModelCard active={active} id={id} />
    </CustomDialog>
  );
};

export default TreatmentModal;
