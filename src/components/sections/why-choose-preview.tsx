import { whyChooseItems } from "@/lib/data/why-choose";
import { FeatureCard } from "@/components/shared/feature-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection, StaggerChildren, FadeItem } from "@/components/shared/animated-section";
import { LinkButton } from "@/components/shared/link-button";
import { ArrowRight } from "lucide-react";

/** Home highlights from Why Choose Us. */
export function WhyChoosePreview() {
  const items = whyChooseItems.slice(0, 4);

  return (
    <AnimatedSection className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built for trust on every project"
          description="Certified manufacturing, custom engineering, and installation support designed around industrial realities."
        />
        <StaggerChildren className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <FadeItem key={item.title}>
              <FeatureCard
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </FadeItem>
          ))}
        </StaggerChildren>
        <div className="mt-10 text-center">
          <LinkButton href="/why-choose-us" className="rounded-full bg-navy text-white dark:bg-electric dark:text-navy">
            See all advantages
            <ArrowRight className="ml-2 size-4" />
          </LinkButton>
        </div>
      </div>
    </AnimatedSection>
  );
}
