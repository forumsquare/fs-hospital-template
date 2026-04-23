"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export default function CustomDrawer({
  children,
  trigger,
  triggerOptions,
  open,
  setOpen,
  className,
  title,
}: {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  triggerOptions?: {
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
  };
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
  title?: string;
}) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {trigger && (
        <DrawerTrigger className={triggerOptions?.className}>
          {trigger}
        </DrawerTrigger>
      )}
      <DrawerContent
        className={cn([`h-fit max-h-[80%] pb-5 z-[10000000] rounded-t-3xl `, className])}
      >
        {/* <DrawerTrigger className=" fixed top-4 right-4">
          <X />
        </DrawerTrigger> */}
        {/* <DrawerHeader> */}
        <DrawerTitle className="bg-primary py-2 bg-clip-text text-transparent font-extrabold ml-2">
          {title}
        </DrawerTitle>
        {/* </DrawerHeader> */}
        {children}
      </DrawerContent>
    </Drawer>
  );
}
