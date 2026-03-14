import { ButtonProps } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export const CustomButton = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Button
      size="lg"
      className={cn(
        "bg-secondary text-primary border-2 font-bold  hover:scale-[1.05] hover:bg-gray-200 transition-all active:scale-[0.95] duration-300  p-2 sm:p-3 flex-1 !border-primary/20 rounded-xl",
        className
      )}
      variant="outline"
      {...props}
    >
      {children}
    </Button>
  );
};

export const CancelButton = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <CustomButton
      className={cn(
        "border-none bg-gradient-to-r from-destructive to-chart-4 text-red-100",
        className
      )}
      {...props}
    >
      {children}
    </CustomButton>
  );
};

export const SubmitButton = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <CustomButton
      className={cn(
        "bg-green-500 hover:bg-green-600 border-none text-secondary hover:text-secondary",
        className
      )}
      {...props}
    >
      {children}
    </CustomButton>
  );
};
