import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leading, trailing, ...props }, ref) => {
    return (
      <div className="flex items-center gap-x-3 h-12 w-full rounded-2xl  border px-3 py-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-offset-[0px] focus-within:ring-ring/30  focus-within:ring-offset-white bg-white ">
        {leading && <span className="">{leading}</span>}
        <input
          type={type}
          className={cn(
            "w-full text-neutral-700 text-sm   font-semibold placeholder:font-semibold left-2 placeholder:text-black/50 placeholder:text-[13px] bg-transparent focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 ",
            className
          )}
          ref={ref}
          {...props}
        />
        {trailing && <span className="">{trailing}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
