"use client"

import { Rss } from "lucide-react";
import ChartTitle from "../../components/chart-title";
import Chart from "./chart";
import { useState, useEffect } from "react";
import { fetchData } from "@/api/fetchData";
import type { channelProps, Channel } from "@/types/types";

export default function TicketByChannels({title, file, label}:channelProps ) {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    async function getMetrics(){
      try{
        const data = await fetchData<Channel[]>(file)
        setChannels(data);
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
      <ChartTitle title={title} icon={Rss} />
      <div className="relative flex min-h-64 flex-grow flex-col justify-center">
        <Chart ticketByChannels={channels} label = {label} />
      </div>
    </section>
  );
}
