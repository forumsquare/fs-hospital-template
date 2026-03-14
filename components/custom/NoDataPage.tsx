import { cn } from "@/lib/utils";
import React from "react";

const NoDataPage = ({
  className,
  title = "No Data Available at the Moment",
}: {
  className?: string;
  title?: string;
}) => {
  return (
    <div
      className={cn([
        "min-h-[calc(100vh-20rem)] flex items-center justify-center text-xl text-black/60 font-bold",
        className,
      ])}
    >
      <h3 className="text-center">{title}</h3>
    </div>
  );
};

export default NoDataPage;
