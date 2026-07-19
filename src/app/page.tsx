import { HeroSection } from "@/components/sections/hero-section";
import { StatsSection } from "@/components/sections/stats-section";
import { CustomersSection } from "@/components/sections/customers-section";
import { AboutPreview } from "@/components/sections/about-preview";
import { ProductsPreview } from "@/components/sections/products-preview";
import { WhyChoosePreview } from "@/components/sections/why-choose-preview";
import { IndustriesPreview } from "@/components/sections/industries-preview";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { ContactCTA } from "@/components/sections/contact-cta";

/** Home page — composes all primary marketing sections. */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CustomersSection />
      <AboutPreview />
      <ProductsPreview />
      <WhyChoosePreview />
      <IndustriesPreview />
      <ProcessTimeline />
      <ProjectsPreview />
      <GalleryPreview />
      <ContactCTA />
    </>
  );
}
