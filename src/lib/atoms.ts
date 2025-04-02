import { addDays, endOfDay, isWithinInterval, startOfDay } from "date-fns";
import { atom } from "jotai";
import type { DateRange } from "react-day-picker";
import type { TicketMetric, Average } from "@/types/types";

const defaultStartDate = new Date(2025, 1, 5);

export const dateRangeAtom = atom<DateRange | undefined>({
  from: defaultStartDate,
  to: addDays(defaultStartDate, 6),
});


export const ticketChartDataAtom = atom((get) => (averages: Average[], series1: string, series2: string) => {
  const dateRange = get(dateRangeAtom);

  if (!dateRange?.from || !dateRange?.to) return [];

  const startDate = startOfDay(dateRange.from);
  const endDate = endOfDay(dateRange.to);

  return averages
    .filter((item) => {
      const [year, month, day] = item.date.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      return isWithinInterval(date, { start: startDate, end: endDate });
    })
    .flatMap((item) => {
      const res: TicketMetric[] = [
        {
          date: item.date,
          type: series1,
          count: item.data1,
        },
        {
          date: item.date,
          type: series2,
          count: item.data2,
        },
      ];
      return res;
    });
});
