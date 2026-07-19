import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { CTABanner } from "@/components/shared/cta-banner";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse Aero Engineering installations, manufacturing, and on-site commissioning photography.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Fabrication, installation, and commissioning"
        description="Replace these placeholders with your site photographs—layout and lightbox are ready."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery" },
        ]}
      />

      <section className="section-padding">
        <div className="container-narrow">
          <GalleryGrid />
        </div>
      </section>

      <CTABanner
        title="Want a site survey or photo review of your shaft?"
        description="Send project photos and we’ll advise on lift type and approximate scope."
      />
    </>
  );
}
