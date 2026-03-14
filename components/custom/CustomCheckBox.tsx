"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"


import React, { FC, ReactNode } from 'react'
import { Control, FieldValues } from "react-hook-form"

type CustomCheckBoxProps<T extends FieldValues> = {
    name:string,
    control : Control<T>,
    label:ReactNode,
    description?:string,
    className?:string,
    disabled?:boolean
}

const CustomCheckBox:FC<CustomCheckBoxProps<any>> = ({name , control , label ,description , className , disabled = false}) => {
    return (
        <FormField
        control={control}
        name={name as  string}
        render={({ field }) => (
          <FormItem className={cn(["flex flex-row items-start space-x-3 space-y-0 p-4 " ,className])}>
            <FormControl>
              <Checkbox
                checked={field.value}
                disabled={disabled}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">{label} </FormLabel>
                <FormDescription>{description}</FormDescription>
            </div>
          </FormItem>
        )}
      />
      )
}

export default CustomCheckBox

