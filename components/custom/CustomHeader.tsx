"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const CustomHeader = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <div
      className={cn(
        `flex items-center w-full md:w-[550px] bg-gradient-to-r from-primary/80  to-primary text-white p-2 py-2 mb-4 gap-5 rounded-full relative`,
        className
      )}
    >
      <Button
        className=" absolute size-7 hover:text-white !p-0 rounded-full bg-white text-primary text-lg hover:bg-primary/50 duration-300"
        onClick={() => router.back()}
      >
        <ChevronLeft className="size-5" />
      </Button>
      <h4 className="text-sm sm:text-xl font-bold  text-center mx-auto">
        {title}
      </h4>
    </div>
  );
};
