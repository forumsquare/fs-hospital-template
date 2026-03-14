"use client";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function CustomDialog({
  children,
  open,
  setOpen,
  title,
  className,
  trigger,
  triggerClassName,
  closeButton = true,
  showOverlay = false,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen?: (open: boolean) => void;
  title?: string;
  className?: string;
  trigger?: React.ReactNode;
  triggerClassName?: string;
  closeButton?: boolean;
  showOverlay?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && (
        <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>
      )}
      {showOverlay && <DialogOverlay className="z-[10000000000]" />}
      <DialogContent
        className={cn(
          className,
          closeButton ? "" : "[&>button]:hidden",
          "outline-none"
        )}
      >
        <DialogTitle
          className={`bg-primary  bg-clip-text text-transparent font-extrabold ml-2 ${
            title ? "" : "hidden"
          }`}
        >
          {title}
        </DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
