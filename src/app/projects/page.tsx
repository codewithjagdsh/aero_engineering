import type { Metadata } from "next";
import { ProjectsClient } from "@/components/sections/projects-client";
import { PageHero } from "@/components/shared/page-hero";
import { CTABanner } from "@/components/shared/cta-banner";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Representative Aero Engineering installations across industrial, commercial, and hospitality facilities.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Installations across industry and hospitality"
        description="Representative project cards—ready to be replaced with your live case studies and site photography."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects" },
        ]}
      />

      <section className="section-padding">
        <div className="container-narrow">
          <ProjectsClient />
        </div>
      </section>

      <CTABanner
        title="Have a project brief ready?"
        description="Send shaft drawings or site photos—we’ll respond with a practical lift recommendation."
      />
    </>
  );
}
