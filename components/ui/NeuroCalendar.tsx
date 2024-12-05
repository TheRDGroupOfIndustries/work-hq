import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

import { DayPicker } from "react-day-picker";
import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
      date: Date | undefined; // Selected date
      setDate: (date: Date | undefined) => void; // Callback to set the selected date
        label: string; // Optional label
        name: string; // Optional name
        containerStyle?: string; // Optional container style
        disabledCalendar?: boolean; // Optional disabled calendar
    };
export default function NeuroCalendar({ date, setDate, className, classNames, name, containerStyle, label, disabledCalendar}: CalendarProps) {
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
     //in form of 23 June 2021
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  const yestarday = new Date(new Date(new Date()).getDate()-1)
  return <div className={`mb-0 ${containerStyle} ${
    disabledCalendar ? "cursor-not-allowed" : "cursor-pointer"
  }
  }`}>
  {label && (
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-0">
      {label}
    </label>
  )}

  { disabledCalendar ? <div>
    <input type="text" name={name} id={name} value={formatDate(date)} readOnly className="neuro-input-style" />
  </div>:<DayPicker mode="single" onSelect={setDate} selected={date} 
  
      disabled={{after:disabledCalendar ? yestarday:undefined, before: new Date()}}
      className={cn("p-3 mx-auto w-full", className)}
      classNames={{
        months: "flex flex-col sm:flex-row flex-center space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 rounded-lg shadow-neuro-3 p-4 px-6",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 p-0 opacity-50 hover:opacity-100 bg-transparent shadow-md rounded-full"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:rounded-full [&:has([aria-selected])]:bg-blue-500 rounded-full hover:shadow-neuro-3 transition duration-300"
        ),
        day: cn(
          "h-8 w-8 p-0 font-normal bg-transparent text-gray-800 hover:text-gray-900",
          "focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full"
        ),
        day_selected:
          "bg-blue-500 text-white shadow-neuro-3 hover:shadow-neuro-hover focus:ring-blue-500",
        day_today:
          "bg-accent text-accent-foreground shadow-neuro-3 hover:shadow-neuro-hover",
        day_outside:
          "day-outside text-muted-foreground opacity-50 bg-transparent",
        day_disabled:
          "text-muted-foreground opacity-50 cursor-not-allowed bg-gray-200",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => (
          <ChevronLeft className="h-4 w-4 text-gray-500 hover:text-gray-700" />
        ),
        IconRight: () => (
          <ChevronRight className="h-4 w-4 text-gray-500 hover:text-gray-700" />
        ),
      }}
  />
    }
  </div>
}