import { CTABanner } from "@/components/shared/cta-banner";

/** Large enquiry CTA at the bottom of the home page. */
export function ContactCTA() {
  return (
    <CTABanner
      title="Ready to specify your next lift?"
      description="Share your capacity, floors, and site details—we’ll recommend the right goods lift or dumbwaiter and send a clear quotation."
      primaryLabel="Get Free Quote"
      secondaryLabel="Talk to an engineer"
      secondaryHref="/contact"
    />
  );
}
