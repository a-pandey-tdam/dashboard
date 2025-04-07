import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { chartTitle } from "@/components/primitives";
import { cn } from "@/lib/utils";

export default function MetricCard({
  title,
  value,
  change,
  className,
}: {
  title: string;
  value: string;
  change: number;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col p-4", className)}> 
      <h2 className={cn(chartTitle({ color: "mute", size: "lg" }), "mb-2")}> 
        {title}
      </h2>
      <div className="flex items-center gap-4"> {/* Increased gap */}
        <span className="text-3xl font-semibold">{value}</span> 
        <ChangeIndicator change={change} />
      </div>
      <div className="text-sm text-muted-foreground mt-2">Compared to yesterday</div> 
    </section>
  );
}

function ChangeIndicator({ change }: { change: number }) {
  return (
    <span
      className={cn(
        "flex items-center rounded-md px-2 py-1 text-sm font-medium", 
        change > 0
          ? "bg-green-100 text-green-600 dark:bg-green-800" 
          : "bg-red-100 text-red-600 dark:bg-red-800", 
      )}
    >
      {change > 0 ? "+" : ""}
      {Math.round(change * 100)}%
      {change > 0 ? (
        <ArrowUpRight className="ml-1 inline-block h-5 w-5" /> 
      ) : (
        <ArrowDownRight className="ml-1 inline-block h-5 w-5" /> 
      )}
    </span>
  );
}
