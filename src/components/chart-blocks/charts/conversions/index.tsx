"use client";

import { CirclePercent } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchData } from "@/api/fetchData";
import { addThousandsSeparator } from "@/lib/utils";
import ChartTitle from "../../components/chart-title";
import Chart from "./chart";

type Convertion = {
  name: string;
  value: number;
}

export default function Convertions() {
  const [convertions, setConvertions] = useState<Convertion[]>([]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    async function getMetrics() {
      try {
        const data = await fetchData<Convertion[]>('convertions.json');
        setConvertions(data);
      } catch (error) {
        console.error('Error fetching metric data:', error);
      }
    }
    getMetrics();

    timerId = setInterval(getMetrics, 60_000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <section className="flex h-full flex-col gap-2">
      <ChartTitle title="Totals" icon={CirclePercent} />
      <Indicator convertions={convertions} />
      <div className="relative max-h-80 flex-grow">
        <Chart convertions={convertions} />
      </div>
    </section>
  );
}

function Indicator({ convertions }: { convertions: Convertion[] }) {
  return (
    <div className="mt-3">
      <span className="mr-1 text-2xl font-medium">
        {addThousandsSeparator(
          convertions.reduce((acc, curr) => acc + curr.value, 0),
        )}
      </span>
      <span className="text-muted-foreground/60">Emails</span>
    </div>
  );
}