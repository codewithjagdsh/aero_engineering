import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/lib/data/industries";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection, StaggerChildren, FadeItem } from "@/components/shared/animated-section";
import { LinkButton } from "@/components/shared/link-button";

/** Icon grid of industries we serve. */
export function IndustriesPreview() {
  return (
    <AnimatedSection className="section-padding bg-section dark:bg-background">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Industries"
          title="Solutions across critical sectors"
          description="Wherever materials, meals, or medical supplies need to move between floors—Aero Engineering builds for the job."
        />
        <StaggerChildren className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <FadeItem key={industry.slug}>
              <Link
                href="/industries"
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-navy text-electric transition-colors group-hover:bg-electric group-hover:text-white dark:bg-electric/20">
                  <industry.icon className="size-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-navy dark:text-white">
                  {industry.name}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {industry.description}
                </p>
              </Link>
            </FadeItem>
          ))}
        </StaggerChildren>
        <div className="mt-10 text-center">
          <LinkButton href="/industries" variant="outline" className="rounded-full">
            Explore industries
            <ArrowRight className="ml-2 size-4" />
          </LinkButton>
        </div>
      </div>
    </AnimatedSection>
  );
}
