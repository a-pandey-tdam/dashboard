"use client";

import { format, parseISO } from "date-fns";
import { useAtom } from "jotai";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { dateRangeAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import type { Average } from "@/types/types";

export function DatePickerWithRange( {averages} : {averages: Average[]}) {
  const [dateRange, setDateRange] = useAtom(dateRangeAtom);

  const defaultDate: Date = new Date(2024, 10, 15);

  const firstAvailableDate = averages.length > 0 
  ? averages.reduce(
      (minDate, current) => {
        const currentDate = parseISO(current.date);
        return currentDate < minDate ? currentDate : minDate;
      },
      parseISO(averages[0].date),
    )
  : defaultDate;

const lastAvailableDate = averages.length > 0 
  ? averages.reduce(
      (maxDate, current) => {
        const currentDate = parseISO(current.date);
        return currentDate > maxDate ? currentDate : maxDate;
      },
      parseISO(averages[averages.length - 1].date),
    )
  : defaultDate; 

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[276px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            fromDate={firstAvailableDate}
            toDate={lastAvailableDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
