"use client";

import { useAtomValue } from "jotai";
import { FilePlus2 } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchData } from "@/api/fetchData";
import { ticketChartDataAtom } from "@/lib/atoms";
import type { TicketMetric } from "@/types/types";
import ChartTitle from "../../components/chart-title";
import Chart from "./chart";
import { DatePickerWithRange } from "./components/date-range-picker";
import MetricCard from "./components/metric-card";


type Average = {
  date: string;
  emails: number;
  errors_caught: number;
}

const calMetricCardValue = (
  data: TicketMetric[],
  type: "emails" | "errors_caught",
) => {
  const filteredData = data.filter((item) => item.type === type);
  return Math.round(
    filteredData.reduce((acc, curr) => acc + curr.count, 0) /
      filteredData.length,
  );
};

export default function AverageTicketsCreated() {
  const [averages, setAverages] = useState<Average[]>([]); 
  const ticketChartData = useAtomValue(ticketChartDataAtom)(averages);
  const avgCreated = calMetricCardValue(ticketChartData, "emails");
  const avgResolved = calMetricCardValue(ticketChartData, "errors_caught");


  useEffect(() => {
    let timerId: NodeJS.Timeout;

    async function getMetrics(){
      try{
        const data = await fetchData<Average[]>('averages.json')
        console.log(data)
        setAverages(data);
      } catch (error){
        console.error('Error fetching metric data:', error);
      }
    }
    getMetrics();

    timerId = setInterval(getMetrics, 60_000);

    return () => clearInterval(timerId)
  }, []);


  return (
    <section className="flex h-full flex-col gap-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <ChartTitle title="Emails Monitored" icon={FilePlus2} />
        <DatePickerWithRange averages={averages} />
      </div>
      <div className="flex flex-wrap">
        <div className="my-4 flex w-52 shrink-0 flex-col justify-center gap-6">
          <MetricCard
            title="Avg. Emails Monitored"
            value={avgCreated}
            color="#60C2FB"
          />
          <MetricCard
            title="Avg. Errors Caught"
            value={avgResolved}
            color="#3161F8"
          />
        </div>
        <div className="relative h-96 min-w-[320px] flex-1">
          <Chart averages={averages}/>
        </div>
      </div>
    </section>
  );
}
