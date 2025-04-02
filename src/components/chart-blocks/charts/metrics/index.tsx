"use client"

import Container from "@/components/container";
import { fetchData } from "@/api/fetchData";
import MetricCard from "./components/metric-card";
import type { metricsProps, Metric } from "@/types/types";

import { useState, useEffect } from 'react'


export default function Metrics({file}: metricsProps) {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    async function getMetrics(){
      try{
        const data = await fetchData<Metric[]>(file)
        setMetrics(data);
      } catch (error){
        console.error('Error fetching metric data:', error);
      }
    }
    getMetrics();

    timerId = setInterval(getMetrics, 60_000);

    return () => clearInterval(timerId)
  }, []);

  return (
    <Container className="grid grid-cols-1 gap-y-6 border-b border-border py-4 phone:grid-cols-2 laptop:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </Container>
  );
}
