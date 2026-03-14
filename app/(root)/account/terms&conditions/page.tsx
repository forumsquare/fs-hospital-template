import { CustomHeader } from "@/components/custom/CustomHeader";
import { LucideTrash2 } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <section className="py-8 h-screen">
      <CustomHeader title="Terms & Conditions" className="mx-auto w-full" />
      <div className="w-full h-full flex justify-center items-center flex-col">
        <LucideTrash2 className="size-96 text-muted-foreground" />
        <div className="text-3xl font-bold">Nothing For Now</div>
      </div>
    </section>
  );
};

export default page;
