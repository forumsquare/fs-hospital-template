"use client";

import React from "react";
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
  const [mounted, setMounted] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  React.useEffect(() => {
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

export default FacilitesModel;
