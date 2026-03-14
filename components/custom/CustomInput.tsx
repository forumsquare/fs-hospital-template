"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC, InputHTMLAttributes, ReactNode } from "react";
import { Control, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { AutosizeTextarea } from "../ui/auto-size-textarea";

type CustomInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: string;
  label?: string;
  subLabel?: ReactNode;
  description?: string;
  placeholder?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  isTextArea?: boolean;
  className?: string;
  labelClassName?: string;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

const CustomInput: FC<CustomInputProps<any>> = ({
  control,
  name,
  description,
  placeholder,
  label,
  leading,
  trailing,
  isTextArea,
  className,
  labelClassName,
  ...props
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          {label && (
            <FormLabel
              className={cn([
                " bg-gradient-to-b from-black to-neutral-400  bg-clip-text text-transparent font-extrabold ml-2 text-sm",
                labelClassName,
              ])}
              //   subLabel={subLabel}
            >
              {label}
            </FormLabel>
          )}
          <FormControl className={className}>
            {isTextArea ? (
              <AutosizeTextarea
                placeholder={placeholder}
                {...field}
                {...props}
                className={className}
                cols={6}
                minHeight={150}
              />
            ) : (
              <Input
                placeholder={placeholder}
                {...field}
                leading={leading}
                trailing={trailing}
                {...props}
                className={cn(["no-spinner", className])}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-xs font-bold ml-3 pt-1 text-red-300" />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
