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
import { ReactNode, useEffect, useState } from "react";
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

type Timing = { day: number; fromTime: string; toTime: string };

// Is the hospital open right now, based on its configured timings? Times are
// stored as UTC timestamps; parsing with `new Date()` converts them to the
// viewer's local clock — the same conversion the footer uses to display hours —
// so the status stays consistent with the shown timings.
const isHospitalOpen = (timings?: Timing[]) => {
  // No timings configured: we can't claim it's closed, so keep it available.
  if (!timings || timings.length === 0) return true;
  const now = new Date();
  const day = now.getDay();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return timings.some((t) => {
    if (t.day !== day) return false;
    const from = new Date(t.fromTime);
    const to = new Date(t.toTime);
    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return false;
    const fromMinutes = from.getHours() * 60 + from.getMinutes();
    const toMinutes = to.getHours() * 60 + to.getMinutes();
    return nowMinutes >= fromMinutes && nowMinutes <= toMinutes;
  });
};

export const TimingButton = ({ timings }: { timings?: Timing[] }) => {
  // Resolved on the client (viewer's clock) after mount, and refreshed every
  // minute. `null` = not yet determined (SSR / first paint) -> neutral styling,
  // which keeps server and client markup identical (no hydration mismatch).
  const [status, setStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setStatus(isHospitalOpen(timings));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [timings]);

  const open = status === true;
  const label =
    status === null ? "Open Hours" : open ? "Available Now" : "Closed";

  return (
    <button
      className={cn(
        "text-sm px-8 py-2 rounded-full flex items-center justify-center gap-x-2 shadow-lg font-bold font-sans transition-colors",
        open
          ? "bg-gradient-to-br from-orange-200 to-red-300 text-orange-800 shadow-orange-600/30"
          : "bg-gradient-to-br from-slate-200 to-slate-300 text-slate-600 shadow-slate-500/20",
      )}
    >
      <div
        className={cn(
          "w-2 h-2 rounded-full",
          open ? "bg-orange-500 animate-pulse" : "bg-slate-400",
        )}
      />
      <span className={open ? "animate-pulse" : ""}>{label}</span>
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
