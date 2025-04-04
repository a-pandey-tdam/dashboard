"use client"

import { Rss } from "lucide-react";
import ChartTitle from "../../components/chart-title";
import Chart from "./chart";
import { useState, useEffect } from "react";
import { fetchData } from "@/api/fetchData";
import type { channelProps, Channel } from "@/types/types";
import Loader from "@/components/ui/loader";

export default function TicketByChannels({title, file, label}:channelProps ) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    async function getData(){
      setLoading(true);
      try{
        const data = await fetchData<Channel[]>(file)
        setChannels(data);
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
      ) : (
        <>
        <ChartTitle title={title} icon={Rss} />
        <div className="relative flex min-h-64 flex-grow flex-col justify-center">
          <Chart ticketByChannels={channels} label = {label} />
        </div>
        </>
      )}
    </section>
  );
}
