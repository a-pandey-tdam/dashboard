import type { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Metric = {
  title: string;
  value: string;
  change: number;
}

export type TicketMetric = {
  date: string;
  type: string;
  count: number;
};

export type averagesProps = {
  title: string,
  file: string,
  series1: string;
  series2: string;
};

export type metricsProps = {
  file: string,
}

export type latestProps = {
  title: string,
}

export type Average = {
  date: string;
  data1: number;
  data2: number;
}