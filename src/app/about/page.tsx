import type { Metadata } from "next";
import {
  Award,
  Lightbulb,
  Shield,
  Target,
  CheckCircle2,
  Cog,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { FeatureCard } from "@/components/shared/feature-card";
import { CTABanner } from "@/components/shared/cta-banner";
import { AnimatedSection } from "@/components/shared/animated-section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Aero Engineering — Indian manufacturers of precision goods lifts and dumbwaiters focused on safety, quality, and engineering excellence.",
};

const storyPillars = [
  {
    icon: Target,
    title: "Mission",
    description:
      "Design and manufacture vertical lifting systems that keep industrial and commercial operations productive, safe, and dependable.",
  },
  {
    icon: Lightbulb,
    title: "Vision",
    description:
      "Set the benchmark for precision material-handling goods lifts in India through engineering depth and customer partnership.",
  },
  {
    icon: Shield,
    title: "Values",
    description:
      "Integrity in quoting, safety in design, craftsmanship in fabrication, and accountability after handover.",
  },
];

const excellence = [
  {
    icon: CheckCircle2,
    title: "Quality",
    description:
      "Material selection, weld quality, and assembly checks are embedded into every manufacturing stage.",
  },
  {
    icon: Shield,
    title: "Safety",
    description:
      "Interlocks, safety and emergency provisions are non-negotiable design requirements.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We refine drive packages, car layouts, and controllers to match evolving facility workflows.",
  },
  {
    icon: Cog,
    title: "Engineering Excellence",
    description:
      "Shaft studies, load calculations, and site-specific detailing before metal is cut.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Precision engineering for vertical industry logistics"
        description="Aero Engineering manufactures goods lifts and dumbwaiters for Indian factories, hotels, restaurants, bakeries, warehouses, and commercial buildings—combining custom design with disciplined production."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      <AnimatedSection className="section-padding">
        <div className="container-narrow grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Built around the realities of industrial sites"
              description="Facility managers don’t need showroom glamour — they need lifts that clear pallets, protect operators, and survive dusty, multi-shift duty. That belief shaped Aero Engineering into a focused manufacturer of goods lifts, hydraulic goods lifts and specialty dumbwaiters."
            />
            <p className="mt-6 text-muted-foreground leading-relaxed">
              From early consultations through fabrication and commissioning, our
              engineers stay close to payload requirements, shaft constraints, and
              maintenance practicality. The result is equipment specified for your
              building—not a generic brochure fit.
            </p>
          </div>
          <div className="grid gap-4">
            {storyPillars.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-section p-6 dark:bg-card"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-electric/15 text-electric">
                    <item.icon className="size-5" />
                  </div>
                  <h2 className="font-heading text-xl font-bold text-navy dark:text-white">
                    {item.title}
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <section className="section-padding bg-section dark:bg-background">
        <div className="container-narrow">
          <SectionHeading
            eyebrow="What Drives Us"
            title="Quality, safety, innovation, and engineering excellence"
            description="Four pillars that guide every drawing, weld, and site trial."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {excellence.map((item) => (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection className="section-padding">
        <div className="container-narrow max-w-3xl text-center">
          <Award className="mx-auto size-12 text-electric" />
          <h2 className="mt-6 font-heading text-3xl font-bold text-navy dark:text-white md:text-4xl">
            Credibility through craftsmanship
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed md:text-lg">
            Our teams combine structural fabrication experience with lift-control
            know-how. Whether you manage a manufacturing plant, a busy bakery,
            or a high-traffic commercial kitchen, we translate operational
            requirements into clear specifications and durable equipment.
          </p>
        </div>
      </AnimatedSection>

      <CTABanner
        title="Partner with engineers who speak industry"
        description="Tell us about your shaft, payload, and timeline—we’ll respond with a practical recommendation."
      />
    </>
  );
}
