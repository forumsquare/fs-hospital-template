"use client";

import CustomDialog from "@/components/custom/CustomDialog";
import CustomDrawer from "@/components/custom/CustomDrawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { FacilityType } from "@/models/schema";
import { ModelCard } from "./TreatmentModal";

const FacilitesModel = ({
  active,
  id,
  open,
  setOpen,
}: {
  active: FacilityType | null;
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

export default FacilitesModel;
