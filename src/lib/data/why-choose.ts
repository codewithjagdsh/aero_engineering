import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Wrench,
  ShieldCheck,
  HardHat,
  Settings,
  Truck,
  IndianRupee,
  Users,
} from "lucide-react";

export type WhyChooseItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const whyChooseItems: WhyChooseItem[] = [
  {
    title: "Certified Manufacturing",
    description:
      "Production processes follow disciplined quality checks so every lift leaves the factory ready for industrial duty.",
    icon: BadgeCheck,
  },
  {
    title: "Custom Engineering",
    description:
      "Shafts, platforms, and controls are tailored to your building, payload, and workflow—not forced into a one-size template.",
    icon: Wrench,
  },
  {
    title: "High Safety Standards",
    description:
      "Interlocks, overload protection, and emergency provisions are designed into the system from the first drawing.",
    icon: ShieldCheck,
  },
  {
    title: "Installation Support",
    description:
      "Experienced crews coordinate with your site team to install cleanly, safely, and with minimal disruption.",
    icon: HardHat,
  },
  {
    title: "Maintenance",
    description:
      "Clear serviceability, spare parts guidance, and practical maintenance support keep uptime high.",
    icon: Settings,
  },
  {
    title: "Fast Delivery",
    description:
      "Structured manufacturing schedules and proactive communication help projects stay on committed timelines.",
    icon: Truck,
  },
  {
    title: "Competitive Pricing",
    description:
      "Transparent quotes focused on total value—durable equipment without unnecessary fluff.",
    icon: IndianRupee,
  },
  {
    title: "Experienced Engineers",
    description:
      "Decades of industrial lifting expertise behind every consultation, drawing, and commissioning plan.",
    icon: Users,
  },
];
