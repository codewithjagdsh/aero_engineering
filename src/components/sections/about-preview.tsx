import { ArrowRight, Shield, Lightbulb, Award } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection } from "@/components/shared/animated-section";
import { LinkButton } from "@/components/shared/link-button";

const pillars = [
  {
    icon: Award,
    title: "Our Story",
    text: "Facility managers don’t need showroom glamour — they need lifts that clear pallets, protect operators, and survive dusty, multi-shift duty. That belief shaped Aero Engineering into a focused manufacturer of goods lifts, hydraulic goods lifts and specialty dumbwaiters.",
  },
  {
    icon: Lightbulb,
    title: "Vision",
    text: "Set the benchmark for precision material-handling goods lifts in India through engineering depth and customer partnership.",
  },
  {
    icon: Shield,
    title: "Safety",
    text: "Interlocks, safety and emergency provisions are non-negotiable design requirements.",
  },
];

/** Home about teaser with story, vision, and safety. */
export function AboutPreview() {
  return (
    <AnimatedSection className="section-padding">
      <div className="container-narrow">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="About Us"
              title="Precision engineering for vertical industry logistics"
              description="Aero Engineering manufactures goods lifts and dumbwaiters for Indian factories, hotels, restaurants, bakeries, warehouses, and commercial buildings—combining custom design with disciplined production."
            />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              From early consultations through fabrication and commissioning,
              our engineers stay close to payload requirements, shaft
              constraints, and maintenance practicality. The result is equipment
              specified for your building—not a generic brochure fit.
            </p>
            <LinkButton
              href="/about"
              className="mt-8 rounded-full bg-navy text-white hover:bg-steel dark:bg-electric dark:text-navy"
            >
              Our story
              <ArrowRight className="ml-2 size-4" />
            </LinkButton>
          </div>
          <div className="grid gap-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-section p-6 dark:bg-card"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-electric/15 text-electric">
                    <p.icon className="size-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-navy dark:text-white">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
