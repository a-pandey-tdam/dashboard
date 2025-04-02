import { Gauge, type LucideIcon, MessagesSquare } from "lucide-react";

export type SiteConfig = typeof siteConfig;
export type Navigation = {
  icon: LucideIcon;
  name: string;
  href: string;
};

export const siteConfig = {
  title: "Email Assistant Dashboard",
  description: "Dashboard for TDAMBI",
};

export const navigations: Navigation[] = [
  {
    icon: Gauge,
    name: "Email Assistant",
    href: "/",
  },
  {
    icon: MessagesSquare,
    name: "Compliance Checker",
    href: "/compliance",
  },
];
