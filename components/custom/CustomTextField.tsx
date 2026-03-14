import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { FC, InputHTMLAttributes } from "react";
import { Control, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type TextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  label: string;
  subLabel?: string;
  description?: string;
  placeholder?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  showTextArea?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const CustomTextField: FC<TextFieldProps<any>> = ({
  control,
  required,
  label,
  description,
  leading,
  trailing,
  showTextArea,
  subLabel,
  name,
  placeholder,
  type,
  onChange,
  ...props
}) => {
  return (
    <FormField
      control={control}
      name={name as string}
      render={({ field }) => {
        return (
          <FormItem className="w-full space-y-2">
            <div>
              <FormLabel className="ml-1 text-start font-semibold text-sm">
                {label}
                <span className="text-black/40 text-xs ml-2">{subLabel}</span>
              </FormLabel>
              {description && (
                <FormDescription className="flex items-center gap-x-1 ml-1 text-[11px] text-black/40 font-medium">
                  {/* <Image
                                    src="/icons/alert.svg"
                                    alt="highlite"
                                    width={20}
                                    height={20}
                                    className='opacity-[0.5]'
                                /> */}
                  {description}
                </FormDescription>
              )}
            </div>
            <FormControl>
              {showTextArea ? (
                <Textarea
                  {...field}
                  placeholder={placeholder}
                  required={required}
                />
              ) : (
                <Input
                  {...field}
                  leading={leading}
                  placeholder={placeholder}
                  trailing={trailing}
                  {...props}
                  required={required}
                  type={type}
                  className="no-spinner"
                  value={field.value ?? ""}
                  onChange={(v) => {
                    if (type === "number") {
                      const numericValue = parseFloat(v.target.value);
                      field.onChange(
                        isNaN(numericValue) ? "" : numericValue.toString()
                      );
                    } else {
                      field.onChange(v.target.value);
                    }
                    onChange?.(v);
                  }}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default CustomTextField;
