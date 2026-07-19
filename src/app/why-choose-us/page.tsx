import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { whyChooseItems } from "@/lib/data/why-choose";
import { FeatureCard } from "@/components/shared/feature-card";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTABanner } from "@/components/shared/cta-banner";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description:
    "Certified manufacturing, custom engineering, high safety standards, installation support, and experienced engineers—why facilities choose Aero Engineering.",
};

const comparisons = [
  {
    aero: "Site-specific engineering drawings",
    typical: "One-size catalog sizing",
  },
  {
    aero: "Safety interlocks designed in from day one",
    typical: "Add-ons after commissioning issues",
  },
  {
    aero: "Clear communication on timelines",
    typical: "Vague delivery promises",
  },
  {
    aero: "Support after handover",
    typical: "Hand-off then silence",
  },
];

const certifications = [
  "Quality-checked fabrication",
  "Safety-first design",
  "Industrial duty components",
  "Documented commissioning",
];

export default function WhyChooseUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Choose Us"
        title="The partner industrial projects deserve"
        description="Premium manufacturing standards without the carnival marketing. Straight engineering, honest quotations, and lifts built to work."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Why Choose Us" },
        ]}
      />

      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading
            eyebrow="Advantages"
            title="Eight reasons facility leaders stay with Aero"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseItems.map((item) => (
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

      <section className="section-padding bg-section dark:bg-background">
        <div className="container-narrow">
          <SectionHeading
            eyebrow="Commitment"
            title="Standards we stand behind"
            description="Markers of process discipline rather than empty badge wallpaper."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((c) => (
              <div
                key={c}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <Check className="size-5 shrink-0 text-electric" />
                <span className="font-medium text-navy dark:text-white">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow max-w-4xl">
          <SectionHeading
            eyebrow="Comparison"
            title="Why Aero vs. typical suppliers"
            description="A practical look at how we approach industrial lift projects."
          />
          <div className="mt-12 overflow-hidden rounded-2xl border border-border">
            <div className="grid grid-cols-2 bg-navy text-sm font-semibold text-white">
              <div className="px-5 py-4">Aero Engineering</div>
              <div className="border-l border-white/10 px-5 py-4">
                Typical suppliers
              </div>
            </div>
            {comparisons.map((row) => (
              <div
                key={row.aero}
                className="grid grid-cols-2 border-t border-border text-sm"
              >
                <div className="flex items-start gap-2 bg-electric/5 px-5 py-4">
                  <Check className="mt-0.5 size-4 shrink-0 text-electric" />
                  <span>{row.aero}</span>
                </div>
                <div className="flex items-start gap-2 border-l border-border px-5 py-4 text-muted-foreground">
                  <X className="mt-0.5 size-4 shrink-0 text-destructive/70" />
                  <span>{row.typical}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Experience the Aero difference on your next lift"
        description="Request a quotation and speak directly with our engineering team."
      />
    </>
  );
}
