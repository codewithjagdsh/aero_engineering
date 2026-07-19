"use client";

import { processSteps } from "@/lib/data/process";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerChildren, FadeItem } from "@/components/shared/animated-section";

/** Animated six-step process timeline. */
export function ProcessTimeline() {
  return (
    <section className="section-padding bg-section dark:bg-background">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Our Process"
          title="From consultation to continuous support"
          description="A clear engineering pathway so your project moves from enquiry to commissioning with confidence."
        />

        <StaggerChildren className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent lg:block" />
          {processSteps.map((step) => (
            <FadeItem key={step.step}>
              <div className="relative rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
                <div className="flex size-12 items-center justify-center rounded-full bg-navy font-heading text-lg font-bold text-electric dark:bg-electric dark:text-navy">
                  {step.step}
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-navy dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {step.description}
                </p>
              </div>
            </FadeItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
