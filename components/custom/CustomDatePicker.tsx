import React, { FC, useState } from "react";
import { FormDescription, FormMessage } from "../ui/form";
import { FormControl } from "../ui/form";
import { FormField, FormLabel } from "../ui/form";
import { FormItem } from "../ui/form";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Control, FieldValues } from "react-hook-form";
import { format } from "date-fns";
// import { DayPicker } from "react-day-picker";
import { CalendarDatePicker } from "./calender-date-picker";

export type DatePickerProps<T extends FieldValues> = {
  control: Control<T>;
  label: string;
  subLabel?: string;
  description?: string;
  placeholder?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  showTextArea?: boolean;
  required?: boolean;
  name: string;
  className?: string;
  closeOnSelect?: boolean;
};
const CustomDatePicker: FC<DatePickerProps<any>> = ({
  control,
  name,
  label,
  closeOnSelect = true,
  subLabel,
  description,
  placeholder,
  leading,
  trailing,
  showTextArea,
  required,
  className,
}) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Update the default month based on the selected year
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setSelectedYear(newYear);
  };
  return (
    <FormField
      control={control}
      name={name as string}
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-2 pt-1">
          <FormLabel className="ml-1 text-start font-semibold text-sm">
            {label}
          </FormLabel>
          {/* <Popover> */}
          {/* <PopoverTrigger asChild> */}
          <FormControl>
            <CalendarDatePicker
              date={
                field.value
                  ? { from: new Date(field.value) }
                  : { from: undefined }
              }
              onDateSelect={({ from, to }) => {
                field.onChange(from.toString());
              }}
              variant="outline"
              numberOfMonths={1}
              placeholder="Select a date"
              triggerClassName={cn(
                "flex justify-start rounded-2xl shadow-none hover:bg-white !border border-primary/10 bg-white text-primary py-[1.45rem] px-3 ",
                !field.value && "text-muted-foreground"
              )}
              yearsRange={100}
              closeOnSelect={true}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomDatePicker;
