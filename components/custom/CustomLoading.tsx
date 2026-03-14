"use client";
import { cn } from "@/lib/utils";
import React from "react";

const CustomLoading = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(["flex justify-center items-center h-screen", className])}
    >
      <div className="w-16 h-16 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default CustomLoading;
