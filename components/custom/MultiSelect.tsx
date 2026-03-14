import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { DropDownItemType } from "@/models/types";
import { Checkbox } from "@radix-ui/react-checkbox";

type MultiSelectProps = {
  name: string;
  label: string;
  placeholder: string;
  items: DropDownItemType[];
  form: UseFormReturn<any>;
  showAll?: boolean;
  description?: ReactNode;
};

const MultiSelect: FC<MultiSelectProps> = ({
  form,
  name,
  label,
  placeholder,
  items,
  description,
  showAll = false,
}) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setShowPopUp(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="w-full space-y-[4px]">
            <FormLabel className="ml-1 text-start">{label}</FormLabel>
            {description && (
              <FormDescription className="text-xs mx-2 pb-2 text-zinc-400 font-medium">
                {description}
              </FormDescription>
            )}
            <Popover open={showPopUp}>
              <PopoverTrigger asChild>
                <button
                  className={cn([
                    "flex items-center gap-3  w-full rounded-xl border border-input/20 bg-white   px-3 py-2 text-sm ring-offset-background focus-visible:outline-none  focus-within:ring-1 focus-within:ring-offset-[2.5px] focus-within:ring-ring/30  focus-within:ring-offset-white text-[13px]",
                  ])}
                  onClick={() => setShowPopUp(true)}
                >
                  {!field.value || field.value.length < 1 ? (
                    <span className="text-black/50 font-medium">
                      {placeholder}
                    </span>
                  ) : (
                    <ul
                      className={cn([
                        "gap-3 flex overflow-x-scroll whitespace-nowrap w-full ",
                        showAll && "flex-wrap",
                      ])}
                    >
                      {(showAll ? field.value : field.value.slice(0, 2)).map(
                        (val: string) => (
                          <p
                            key={val}
                            className="text-wrap text-start flex items-center justify-start gap-x-2 bg-primary/20 rounded-lg px-2.5 py-[4px] text-[12.5px] text-black font-medium overflow-hidden"
                          >
                            <span
                              className="text-primary rounded-full border border-primary w-4 h-4 flex items-center  justify-center hover:scale-[1.07] active:scale-[0.98] "
                              onClick={() =>
                                field.onChange([
                                  ...field.value.filter(
                                    (item: string) => item !== val
                                  ),
                                ])
                              }
                            >
                              x
                            </span>
                            {items.find((item) => item.value == val)!.label}
                          </p>
                        )
                      )}
                      {!showAll && field.value.length - 2 > 0 && (
                        <span className="bg-primary/20 rounded-full px-2.5 py-[2px] text-[13px] text-black font-medium flex items-center justify-center">
                          +{field.value.length - 2} more
                        </span>
                      )}
                    </ul>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent
                ref={popoverRef}
                className="bg-white border border-input/20 rounded-2xl p-0 border-none overflow-hidden"
              >
                <ul className="p-3">
                  {items.map((item) => {
                    return (
                      <FormField
                        key={item.value}
                        control={form.control}
                        name={name}
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.value}
                              className="flex gap-x-2 items-center cursor-pointer hover:bg-primary/10 rounded-md py-1 px-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.value)}
                                  className=""
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange(
                                          field.value
                                            ? [...field.value, item.value]
                                            : [item.value]
                                        )
                                      : field.onChange(
                                          field.value?.filter(
                                            (value: string) =>
                                              item.value !== value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer w-full">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    );
                  })}
                </ul>
                <div className="flex border-t-[1px] border-input/20  rounded-bl-[15px] h-9 ">
                  <button
                    className="rounded-none flex-1 hover:bg-pink-950/20 text-[13px]"
                    onClick={() => {
                      field.onChange([]);
                      setShowPopUp(false);
                    }}
                  >
                    reset
                  </button>
                  <div className="border-t-[1px] border-input/20 w-[1px] bg-input/20 " />
                  <button
                    className="rounded-none flex-1 hover:bg-primary/50 text-[13px] font-medium group"
                    onClick={() => setShowPopUp(false)}
                  >
                    Close
                  </button>
                </div>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default MultiSelect;
