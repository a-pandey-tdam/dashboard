"use client";

import { useAtomValue } from "jotai";
import { FilePlus2 } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchData } from "@/api/fetchData";
import { ticketChartDataAtom } from "@/lib/atoms";
import ChartTitle from "../../components/chart-title";
import Chart from "./chart";
import { DatePickerWithRange } from "./components/date-range-picker";
import MetricCard from "./components/metric-card";
import { averagesProps, Average, TicketMetric} from "@/types/types";
import Loader from "@/components/ui/loader";


const calMetricCardValue = (
  data: TicketMetric[],
  type: string
) => {
  const filteredData = data.filter((item) => item.type === type);
  return Math.round(
    filteredData.reduce((acc, curr) => acc + curr.count, 0) /
      filteredData.length,
  );
};

export default function AverageTicketsCreated({title, file, series1, series2}: averagesProps) {
  const [loading, setLoading] = useState<boolean>(true); 
  const [averages, setAverages] = useState<Average[]>([]); 
  const ticketChartData = useAtomValue(ticketChartDataAtom)(averages, series1, series2);
  const avg1 = calMetricCardValue(ticketChartData, series1);
  const avg2 = calMetricCardValue(ticketChartData, series2);


  useEffect(() => {
    let timerId: NodeJS.Timeout;

    async function getData(){
      setLoading(true);
      try{
        const data = await fetchData<Average[]>(file)
        console.log(data);
        setAverages(data);
      } catch (error){
        console.error('Error fetching metric data:', error);
      } finally {
        setLoading(false);
      }
    }
    getData();

    timerId = setInterval(getData, 60_000);

    return () => clearInterval(timerId)
  }, []);


  return (
    <section className="flex h-full flex-col gap-2 transition delay-150">
      { loading ? (
      <Loader/>
      ): (
        <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <ChartTitle title={title} icon={FilePlus2} />
        <DatePickerWithRange averages={averages} />
      </div>
      <div className="flex flex-wrap">
        <div className="my-4 flex w-52 shrink-0 flex-col justify-center gap-6">
          <MetricCard
            title= {`Avg. ${series1}`}
            value={avg1}
            color="#3161F8"
          />
          <MetricCard
            title= {`Avg. ${series2}`}
            value={avg2}
            color="#60C2FB"
          />
        </div>
        <div className="relative h-96 min-w-[320px] flex-1">
          <Chart averages={averages} series1 = {series1} series2 = {series2} />
        </div>
      </div>
      </>
      )}
    </section>
  );
}
