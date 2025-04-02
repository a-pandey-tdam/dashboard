"use client";

import { useAtomValue } from "jotai";
import { VChart } from "@visactor/react-vchart";
import type { IBarChartSpec } from "@visactor/vchart";
import { ticketChartDataAtom } from "@/lib/atoms";
import type { TicketMetric, Average } from "@/types/types";


const generateSpec = (data: TicketMetric[]): IBarChartSpec => ({
  type: "bar",
  data: [
    {
      id: "barData",
      values: data,
    },
  ],
  xField: "date",
  yField: "count",
  seriesField: "type",
  padding: [10, 0, 10, 0],
  legends: {
    visible: false,
  },
  stack: false,
  tooltip: {
    trigger: ["click", "hover"],
  },
  bar: {
    state: {
      hover: {
        outerBorder: {
          distance: 2,
          lineWidth: 2,
        },
      },
    },
    style: {
      cornerRadius: [12, 12, 12, 12],
      zIndex: (datum) => {
        return datum.type === "data2" ? 2 : 1;
      },
    },
  },
});

interface ChartProps {
  averages: Average[];
  series1: string;
  series2: string;
}

export default function Chart({ averages, series1, series2 }: ChartProps) {
  const ticketChartData = useAtomValue(ticketChartDataAtom)(averages, series1, series2);
  const spec = generateSpec(ticketChartData);
  return <VChart spec={spec} />;
}
