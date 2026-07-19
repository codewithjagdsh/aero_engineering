export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Aero delivered a goods lift that fits our warehouse mezzanine perfectly. Installation was orderly, and the platform has held up under daily pallet traffic.",
    name: "Rajesh Mehta",
    role: "Plant Manager",
    company: "Western Packaging Industries",
  },
  {
    id: "2",
    quote:
      "Our hospital dumbwaiter reduced corridor congestion between pharmacy and wards. The stainless finish and quiet operation were exactly what we needed.",
    name: "Dr. Ananya Shah",
    role: "Facilities Director",
    company: "City Care Multispecialty",
  },
  {
    id: "3",
    quote:
      "From consultation to commissioning, Aero’s engineers were clear and practical. The restaurant dumbwaiter shortened kitchen-to-floor trips during peak hours.",
    name: "Imran Khan",
    role: "Operations Head",
    company: "Horizon Hospitality Group",
  },
  {
    id: "4",
    quote:
      "We needed a custom material lift for drums between process floors. Aero engineered within our shaft constraints and met the timeline we committed to production.",
    name: "Priya Nair",
    role: "Projects Lead",
    company: "Vertex Chemtech",
  },
];
