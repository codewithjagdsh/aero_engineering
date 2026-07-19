export type ProcessStep = {
  step: number;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Consultation",
    description:
      "We study your site, payload, and workflow to recommend the right lift configuration.",
  },
  {
    step: 2,
    title: "Design",
    description:
      "Engineering drawings, shaft layouts, and load calculations are prepared for approval.",
  },
  {
    step: 3,
    title: "Manufacturing",
    description:
      "Structures, cars, and controls are fabricated under quality checks at our facility.",
  },
  {
    step: 4,
    title: "Installation",
    description:
      "Trained crews install guides, machines, and landing equipment with site safety discipline.",
  },
  {
    step: 5,
    title: "Testing",
    description:
      "Load trials, interlock verification, and performance checks confirm readiness.",
  },
  {
    step: 6,
    title: "Support",
    description:
      "We remain available for maintenance guidance, spare parts, and operational training.",
  },
];
