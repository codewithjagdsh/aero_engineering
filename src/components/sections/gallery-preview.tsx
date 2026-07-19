import { ArrowRight } from "lucide-react";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection } from "@/components/shared/animated-section";
import { LinkButton } from "@/components/shared/link-button";

/** Home gallery strip linking to full gallery page. */
export function GalleryPreview() {
  return (
    <AnimatedSection className="section-padding bg-section dark:bg-background">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Gallery"
          title="Manufacturing and installation in focus"
          description="A glimpse into our fabrication, installation, and on-site commissioning work."
        />
        <div className="mt-14">
          <GalleryGrid limit={6} showFilters={false} />
        </div>
        <div className="mt-10 text-center">
          <LinkButton href="/gallery" className="rounded-full bg-navy text-white dark:bg-electric dark:text-navy">
            Open gallery
            <ArrowRight className="ml-2 size-4" />
          </LinkButton>
        </div>
      </div>
    </AnimatedSection>
  );
}
