export type ProductFeature = {
  title: string;
  description: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: "goods-lift" | "dumbwaiter";
  tagline: string;
  description: string;
  image: string;
  featured?: boolean;
  features: ProductFeature[];
  specifications: ProductSpec[];
  applications: string[];
  advantages: string[];
};

/**
 * Product catalog — drives mega menu, listing page, and dynamic [slug] routes.
 */
export const products: Product[] = [
  {
    slug: "goods-lift",
    name: "Goods Lift",
    shortName: "Goods Lift",
    category: "goods-lift",
    featured: true,
    tagline: "Heavy-duty vertical transport for industrial floors.",
    description:
      "Our flagship Goods Lift is engineered for factories, warehouses, and multi-storey plants that move materials every hour of the day. Built with robust structural members, safety interlocks, and customizable platform sizes, it delivers dependable performance under continuous industrial loads.",
    image: "/assets/gallery/aero-installation-08.png",
    features: [
      {
        title: "High Load Capacity",
        description:
          "Designed for payloads from 500 kg to 5,000 kg with reinforced car frames and floor plating.",
      },
      {
        title: "Safety Interlocks",
        description:
          "Door locks, overload sensors, and emergency stop systems meet industrial safety expectations.",
      },
      {
        title: "Custom Platform Sizes",
        description:
          "Platform dimensions and opening configurations tailored to your aisle and pallet flow.",
      },
      {
        title: "Durable Construction",
        description:
          "MS structure with industrial coatings engineered for dusty, high-use environments.",
      },
    ],
    specifications: [
      { label: "Capacity", value: "500 kg – 5,000 kg" },
      { label: "Travel Height", value: "Up to 30 m (custom)" },
      { label: "Speed", value: "0.15 – 0.5 m/s" },
      { label: "Power", value: "3-phase industrial supply" },
      { label: "Doors", value: "Collapsible / swinging / automatic" },
      { label: "Control", value: "PLC / push-button landing panels" },
    ],
    applications: [
      "Factories",
      "Warehouses",
      "Multi-storey plants",
      "Logistics hubs",
      "Manufacturing lines",
    ],
    advantages: [
      "Built for continuous industrial duty cycles",
      "Custom engineering for site constraints",
      "Simplified maintenance access",
      "Proven safety architecture",
      "Competitive total cost of ownership",
    ],
  },
  {
    slug: "hydraulic-goods-lift",
    name: "Hydraulic Goods Lift",
    shortName: "Hydraulic Goods Lift",
    category: "goods-lift",
    featured: true,
    tagline: "Smooth hydraulic power for mid-rise material movement.",
    description:
      "Hydraulic Goods Lifts from Aero Engineering offer quiet, controlled vertical travel ideal for facilities where machine-room space is limited. The hydraulic drive delivers smooth starts and stops while maintaining excellent load stability for pallets, drums, and equipment.",
    image: "/assets/gallery/aero-installation-12.png",
    features: [
      {
        title: "Hydraulic Drive",
        description:
          "Reliable hydraulic power unit with soft start/stop for stable load handling.",
      },
      {
        title: "Compact Machine Space",
        description:
          "Optimized footprint when overhead machine rooms are constrained.",
      },
      {
        title: "Smooth Ride Quality",
        description:
          "Controlled acceleration reduces product shift and operator stress.",
      },
      {
        title: "Overload Protection",
        description:
          "Pressure and load monitoring protect both equipment and cargo.",
      },
    ],
    specifications: [
      { label: "Capacity", value: "500 kg – 3,000 kg" },
      { label: "Travel Height", value: "Up to 12–15 m (typical)" },
      { label: "Speed", value: "0.15 – 0.35 m/s" },
      { label: "Drive", value: "Hydraulic power unit" },
      { label: "Car Type", value: "Open / enclosed platform" },
      { label: "Safety", value: "Rupture valve, overload, door interlocks" },
    ],
    applications: [
      "Warehouses",
      "Automobile workshops",
      "Pharma plants",
      "G+3 industrial buildings",
      "Mezzanine transfers",
    ],
    advantages: [
      "Excellent for medium travel heights",
      "Lower machine-room complexity",
      "Stable under uneven load placement",
      "Quiet operation for mixed-use buildings",
      "Easy-to-service hydraulic components",
    ],
  },
  {
    slug: "electric-goods-lift",
    name: "Electric Goods Lift",
    shortName: "Electric Goods Lift",
    category: "goods-lift",
    featured: true,
    tagline: "Electric traction performance for taller industrial shafts.",
    description:
      "When your facility needs higher travel, faster cycles, or multi-floor logistics, our Electric Goods Lift delivers traction-driven efficiency. Precision guides, industrial controllers, and heavy-duty car frames ensure consistent throughput across shifts.",
    image: "/assets/gallery/aero-installation-04.png",
    features: [
      {
        title: "Traction Drive",
        description:
          "Electric traction systems suited for taller shafts and higher duty cycles.",
      },
      {
        title: "Multi-Floor Controllers",
        description:
          "Landing call logic designed for busy industrial and commercial traffic.",
      },
      {
        title: "Energy Efficient Motors",
        description:
          "Modern drive packages reduce operating costs over long service life.",
      },
      {
        title: "Precision Guidance",
        description:
          "Guide rails and counterweight systems keep the car aligned under load.",
      },
    ],
    specifications: [
      { label: "Capacity", value: "500 kg – 5,000 kg" },
      { label: "Travel Height", value: "Up to 30+ m" },
      { label: "Speed", value: "0.25 – 0.75 m/s" },
      { label: "Drive", value: "Electric traction / geared" },
      { label: "Floors", value: "Multi-landing configurable" },
      { label: "Duty", value: "Industrial continuous use" },
    ],
    applications: [
      "High-rise industrial plants",
      "Commercial warehouses",
      "Shopping complexes (back-of-house)",
      "Hotels (service floors)",
      "Distribution centers",
    ],
    advantages: [
      "Scales with building height",
      "Higher throughput potential",
      "Efficient for multi-floor logistics",
      "Configurable landing arrangements",
      "Long-term serviceability",
    ],
  },
  {
    slug: "dumbwaiter",
    name: "Dumbwaiter",
    shortName: "Dumbwaiter",
    category: "dumbwaiter",
    featured: true,
    tagline: "Compact service lifts for kitchens, labs, and work floors.",
    description:
      "Aero dumbwaiters streamline the movement of food trays, documents, samples, and light goods between floors. Compact shafts, quiet operation, and hygienic interiors make them a practical upgrade for restaurants, clinics, offices, and boutique hotels.",
    image: "/assets/gallery/aero-installation-02.png",
    features: [
      {
        title: "Compact Shaft Design",
        description:
          "Small footprint engineered for retrofit shafts and new constructions alike.",
      },
      {
        title: "Quiet Operation",
        description:
          "Low-noise mechanisms suitable for guest-facing and clinical environments.",
      },
      {
        title: "Hygienic Interiors",
        description:
          "Easy-clean finishes for food service and controlled environments.",
      },
      {
        title: "Simple Controls",
        description:
          "Intuitive call buttons and interlocks for everyday staff use.",
      },
    ],
    specifications: [
      { label: "Capacity", value: "50 kg – 300 kg" },
      { label: "Cabin Type", value: "Tray / Multi-shelf options" },
      { label: "Cabin Size", value: "Custom (small to mid)" },
      { label: "Speed", value: "0.2 – 0.5 m/s" },
      { label: "Floors", value: "2 – 4 landings typical" },
      { label: "Doors", value: "Manual" },
      { label: "Finish", value: "SS / Powder-coated options" },
    ],
    applications: [
      "Restaurants",
      "Hotels",
      "Clinics",
      "Offices",
      "Laboratories",
    ],
    advantages: [
      "Saves staff time on stair trips",
      "Improves kitchen and pantry flow",
      "Fits tight architectural constraints",
      "Low operating cost",
      "Quick installation in many layouts",
    ],
  },
  {
    slug: "hospital-dumbwaiter",
    name: "Hospital Dumbwaiter",
    shortName: "Hospital Dumbwaiter",
    category: "dumbwaiter",
    tagline: "Sterile-friendly vertical logistics for healthcare campuses.",
    description:
      "Purpose-configured for hospitals and diagnostic centers, our Hospital Dumbwaiter supports safe transfer of medicines, linens, lab samples, and meal trays. Stainless options, interlocks, and cleanable surfaces align with clinical workflow and hygiene expectations.",
    image: "/assets/gallery/aero-installation-01.png",
    features: [
      {
        title: "Clinical Workflow Ready",
        description:
          "Configured for pharmacy, CSSD, pathology, and ward pantry routes.",
      },
      {
        title: "Stainless Options",
        description:
          "SS interiors for easy disinfection and contamination control.",
      },
      {
        title: "Access Control Ready",
        description:
          "Landing restrictions and interlocks for authorized staff transfer.",
      },
      {
        title: "Reliable Duty Cycle",
        description:
          "Built for frequent short trips common in hospital operations.",
      },
    ],
    specifications: [
      { label: "Capacity", value: "50 kg – 250 kg" },
      { label: "Finish", value: "Stainless steel preferred" },
      { label: "Floors", value: "Multi-ward / multi-block" },
      { label: "Speed", value: "0.2 – 0.45 m/s" },
      { label: "Safety", value: "Door interlocks, overload" },
      { label: "Hygiene", value: "Wipe-clean car interiors" },
    ],
    applications: [
      "Hospitals",
      "Nursing homes",
      "Diagnostic labs",
      "Pharma clean zones",
      "Medical colleges",
    ],
    advantages: [
      "Separates clean and soiled logistics paths",
      "Reduces corridor trolley traffic",
      "Supports infection-control SOPs",
      "Quiet enough for ward proximity",
      "Configurable landing permissions",
    ],
  },
  {
    slug: "restaurant-dumbwaiter",
    name: "Restaurant Dumbwaiter",
    shortName: "Restaurant Dumbwaiter",
    category: "dumbwaiter",
    tagline: "Kitchen-to-floor service lifts that keep hospitality flowing.",
    description:
      "Designed around restaurant and hotel kitchen operations, this dumbwaiter moves hot food, crockery, and supplies between basement kitchens, mezzanines, and dining floors with speed and hygiene in mind—so staff stay on service, not on stairs.",
    image: "/assets/gallery/aero-installation-03.png",
    features: [
      {
        title: "Food Service Oriented",
        description:
          "Tray-friendly car sizes and finishes suited to F&B operations.",
      },
      {
        title: "Fast Floor-to-Floor",
        description:
          "Optimized for short hospitality travel heights and peak dinner rushes.",
      },
      {
        title: "Heat-Tolerant Design",
        description:
          "Materials and seals selected for kitchen-adjacent environments.",
      },
      {
        title: "Staff-Friendly UI",
        description:
          "Clear call panels and durable buttons for high-touch use.",
      },
    ],
    specifications: [
      { label: "Capacity", value: "50 kg – 300 kg" },
      { label: "Cabin Type", value: "Tray / Multi-shelf options" },
      { label: "Floors", value: "2 – 4 typical" },
      { label: "Finish", value: "SS / food-grade options" },
      { label: "Speed", value: "0.25 – 0.5 m/s" },
      { label: "Doors", value: "Manual" },
    ],
    applications: [
      "Restaurants",
      "Hotels",
      "Banquet halls",
      "Cloud kitchens",
      "Cafés with basements",
    ],
    advantages: [
      "Improves table turnaround",
      "Keeps kitchens productive",
      "Reduces spillage risk vs. stairs",
      "Compact for packed F&B layouts",
      "Easy daily wipe-down routines",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
