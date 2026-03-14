import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FC } from "react";
import { Control, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";

export type DropDownItemType = {
  value: string;
  label: string;
};

type CustomSelectProps<T extends FieldValues> = {
  control?: Control<T>;
  name: string;
  label: string;
  placeholder: string;
  items: DropDownItemType[];
  onChange?: (v: string) => void;
};

export const CustomSelect: FC<CustomSelectProps<any>> = ({
  name,
  label,
  control,
  items,
  onChange,
  placeholder,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        console.log(field.value);
        return (
          <FormItem className="w-full space-y-2">
            <FormLabel className="ml-1 text-start font-semibold text-sm">
              {label}
            </FormLabel>
            <Select
              // required
              disabled={field.disabled}
              defaultValue={field.value}
              onValueChange={onChange ?? field.onChange}
            >
              <SelectTrigger
                className={cn(
                  "w-full bg-white !border text-sm ring-offset-background focus-within:ring-1 focus-within:ring-offset-[0px] focus-within:ring-ring/30  focus-within:ring-offset-white border-primary/10 rounded-2xl shadow-none  "
                )}
              >
                {field.value ? (
                  items.find(
                    (v) => v.value.toString() === field.value.toString()
                  )?.label
                ) : (
                  <span className="text-muted-foreground"> {placeholder}</span>
                )}
              </SelectTrigger>
              <FormControl>
                <SelectContent className="border-none rounded-2xl shadow-lg  bg-white py-2 px-2 z-[100000000000000] ">
                  <SelectGroup>
                    {items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}{" "}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </FormControl>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
