"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { LoadingSpinner } from "./ServerComponents";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const FormSaveBtn = ({
  form,
  isLoading,
  title,
  className,
}: {
  form: UseFormReturn<any>;
  title?: string;
  isLoading: boolean;
  className?: string;
}) => {
  const { formState } = form;
  // console.log("dirty field "  ,  formState.isDirty );
  // console.log("is valid form state " , formState.isValid );
  // console.log("change fields "  , formState.dirtyFields );
  // console.log("validating fields "  , formState.validatingFields );
  // console.log("error fields "  , formState.errors  ,getValues() );
  const isDirty =
    formState.isDirty &&
    Object.keys(formState.dirtyFields).length > 0 &&
    formState.isValid;
  return (
    <div className="w-full flex items-center">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Button
          disabled={!isDirty}
          variant={isDirty ? "default" : "outline"}
          className={cn(["w-full mx-auto ", className])}
        >
          {title ?? "Save"}
        </Button>
      )}
    </div>
  );
};

export const CustomToolTip = ({
  children,
  content,
}: {
  children: ReactNode;
  content: ReactNode;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const TimingButton = () => {
  return (
    <button className=" text-sm px-8 py-2 rounded-full  bg-gradient-to-br from-orange-200 to-red-300  flex items-center justify-center gap-x-2 shadow-lg shadow-orange-600/30 font-bold font-sans text-orange-800  ">
      <div className="w-2 h-2 rounded-full  bg-orange-500  " />
      <span className="animate-pulse">Available Now</span>
    </button>
  );
};

export const HeroButtons = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div className="flex gap-5 items-center justify-center font-semibold ">
      <Button
        onClick={() => {
          router.push("/specializations");
        }}
        size={isMobile ? "sm" : "lg"}
        variant={"outline"}
        className="shadow-none font-bold !py-6 rounded-xl "
      >
        Explore Services
      </Button>
      <Button
        onClick={() => router.push("#doctors")}
        size={isMobile ? "sm" : "lg"}
        className="font-bold  py-6 rounded-xl"
      >
        Explore Doctors
      </Button>
    </div>
  );
};
