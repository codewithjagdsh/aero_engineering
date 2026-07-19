import type { Metadata } from "next";
import { CustomersSection } from "@/components/sections/customers-section";
import { PageHero } from "@/components/shared/page-hero";
import { CTABanner } from "@/components/shared/cta-banner";

export const metadata: Metadata = {
  title: "Our Customers",
  description:
    "Meet selected restaurant, bakery, and industrial manufacturing customers served by Aero Engineering across Tamil Nadu.",
};

export default function CustomersPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Customers"
        title="Loyal partnerships across restaurants, bakeries and industry"
        description="From restaurant kitchens and bakeries to advanced manufacturing plants, our lifts support the everyday movement behind respected Tamil Nadu businesses."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Customers" },
        ]}
      />
      <CustomersSection />
      <CTABanner
        title="Join the businesses that trust Aero Engineering"
        description="Tell us what you need to move, your available space, and the floors involved. Our team will recommend a practical lifting solution."
      />
    </>
  );
}

