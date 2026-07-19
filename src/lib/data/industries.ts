import type { LucideIcon } from "lucide-react";
import {
  Factory,
  Warehouse,
  Hospital,
  Hotel,
  UtensilsCrossed,
  Building2,
  Store,
  Landmark,
} from "lucide-react";

export type Industry = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  relevantProducts: string[];
};

export const industries: Industry[] = [
  {
    slug: "factories",
    name: "Factories",
    description:
      "Move raw materials, WIP, and finished goods between production floors with lifts built for shift-after-shift duty.",
    icon: Factory,
    relevantProducts: ["goods-lift", "hydraulic-goods-lift", "electric-goods-lift"],
  },
  {
    slug: "industrial-plants",
    name: "Industrial Plants",
    description:
      "Handle drums, tooling, and process materials with custom material-handling elevators for plant conditions.",
    icon: Building2,
    relevantProducts: ["goods-lift", "electric-goods-lift", "hydraulic-goods-lift"],
  },
  {
    slug: "hotels",
    name: "Hotels",
    description:
      "Connect kitchens, laundry, and service floors while keeping guest areas calm and unobstructed.",
    icon: Hotel,
    relevantProducts: ["restaurant-dumbwaiter", "dumbwaiter", "electric-goods-lift"],
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    description:
      "Keep food moving from basement kitchens to dining floors with compact, food-service dumbwaiters.",
    icon: UtensilsCrossed,
    relevantProducts: ["restaurant-dumbwaiter", "dumbwaiter"],
  },
  {
    slug: "warehouses",
    name: "Warehouses",
    description:
      "Streamline mezzanine transfers and multi-level storage with platforms sized for pallets and cages.",
    icon: Warehouse,
    relevantProducts: ["goods-lift", "hydraulic-goods-lift", "electric-goods-lift"],
  },
  {
    slug: "retail",
    name: "Retail",
    description:
      "Back-of-house goods lifts and service elevators keep inventory flowing without disrupting shop floors.",
    icon: Store,
    relevantProducts: ["goods-lift", "dumbwaiter"],
  },
  {
    slug: "commercial-buildings",
    name: "Commercial Buildings",
    description:
      "Support facility operations across offices, malls, and mixed-use towers with reliable service lifts.",
    icon: Landmark,
    relevantProducts: ["electric-goods-lift", "dumbwaiter", "goods-lift"],
  },
  {
    slug: "hospitals",
    name: "Hospitals",
    description:
      "Support pharmacy, CSSD, and meal logistics with hygienic, quiet dumbwaiters designed for clinical workflows.",
    icon: Hospital,
    relevantProducts: ["hospital-dumbwaiter", "dumbwaiter"],
  },
];
