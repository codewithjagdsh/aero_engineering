export type ProjectCategory = "industrial" | "commercial" | "hospitality";

export type Project = {
  id: string;
  title: string;
  location: string;
  industry: string;
  liftType: string;
  category: ProjectCategory;
  image: string;
  summary: string;
};

/** Selected Aero installations; customer identities remain private. */
export const projects: Project[] = [
  {
    id: "p1",
    title: "Heavy-Duty Enclosed Goods Lift",
    location: "Tamil Nadu",
    industry: "Industrial",
    liftType: "Goods Lift",
    category: "industrial",
    image: "/assets/gallery/aero-installation-08.png",
    summary:
      "A wide enclosed platform designed for safe material movement in an industrial facility.",
  },
  {
    id: "p2",
    title: "Multi-Floor Plant Material Lift",
    location: "Tamil Nadu",
    industry: "Manufacturing",
    liftType: "Electric Goods Lift",
    category: "industrial",
    image: "/assets/gallery/aero-installation-04.png",
    summary:
      "A multi-level lift structure supporting material movement between production floors.",
  },
  {
    id: "p3",
    title: "Commercial Kitchen Dumbwaiter",
    location: "Coimbatore, Tamil Nadu",
    industry: "Hospitality",
    liftType: "Restaurant Dumbwaiter",
    category: "hospitality",
    image: "/assets/gallery/aero-installation-01.png",
    summary:
      "Compact service lift connecting a high-volume kitchen with dining and service floors.",
  },
  {
    id: "p4",
    title: "Commercial Food-Service Lift",
    location: "Tamil Nadu",
    industry: "Hospitality",
    liftType: "Restaurant Dumbwaiter",
    category: "commercial",
    image: "/assets/gallery/aero-installation-03.png",
    summary:
      "A compact service lift built to improve movement between kitchen and service areas.",
  },
  {
    id: "p5",
    title: "Large-Capacity Goods Lift",
    location: "Tamil Nadu",
    industry: "Commercial",
    liftType: "Goods Lift",
    category: "commercial",
    image: "/assets/gallery/aero-installation-10.png",
    summary:
      "A large enclosed goods car designed for dependable commercial material handling.",
  },
  {
    id: "p6",
    title: "Industrial Landing Goods Lift",
    location: "Tamil Nadu",
    industry: "Manufacturing",
    liftType: "Custom Goods Lift",
    category: "industrial",
    image: "/assets/gallery/aero-installation-06.png",
    summary:
      "A custom landing arrangement engineered around the facility's available shaft space.",
  },
];
