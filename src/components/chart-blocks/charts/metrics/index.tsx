"use client"

import Container from "@/components/container";
import { fetchData } from "@/api/fetchData";
import MetricCard from "./components/metric-card";
import type { metricsProps, Metric } from "@/types/types";
import Loader from "@/components/ui/loader";

import { useState, useEffect } from 'react';

export default function Metrics({file}: metricsProps) {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {

    async function getData() {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const data = await fetchData<Metric[]>(file);
        // console.log(data);
        setMetrics(data);
      } catch (error) {
        // console.error('Error fetching metric data:', error);
      } finally {
        setLoading(false); // Set loading to false when fetching ends
      }
    }

    getData();
    const timerId: NodeJS.Timeout = setInterval(getData, 60_000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <Container className="grid grid-cols-1 gap-y-6 border-b border-border py-4 phone:grid-cols-2 laptop:grid-cols-4 transition delay-150">
      {loading ? (
        <Loader/>
      ) : (
        metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))
      )}
    </Container>
  );
}