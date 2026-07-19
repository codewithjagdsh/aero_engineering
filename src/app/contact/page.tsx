import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig, getFullAddress, getWhatsAppUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a free quotation from Aero Engineering for goods lifts and dumbwaiters. Call, email, or send your project requirements.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s engineer your next lift together"
        description="Share your requirement and our team will respond with clarifying questions and a clear quotation path."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="section-padding">
        <div className="container-narrow grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ContactForm />

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-navy p-8 text-white shadow-soft-lg">
              <h2 className="font-heading text-2xl font-bold">
                Direct contact
              </h2>
              <p className="mt-2 text-white/70">
                Prefer to talk? Reach our enquiry desk during business hours.
              </p>
              <ul className="mt-8 space-y-5 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-electric" />
                  <span>{getFullAddress()}</span>
                </li>
                <li>
                  <a
                    href={siteConfig.phoneHref}
                    className="flex items-center gap-3 transition-colors hover:text-electric"
                  >
                    <Phone className="size-5 shrink-0 text-electric" />
                    {siteConfig.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 transition-colors hover:text-electric"
                  >
                    <Mail className="size-5 shrink-0 text-electric" />
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Message on WhatsApp
              </a>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
              <div className="bg-section px-4 py-3 text-sm font-medium text-muted-foreground dark:bg-muted">
                Find us on the map
              </div>
              <iframe
                title="Aero Engineering location map"
                src={siteConfig.mapEmbedUrl}
                className="h-72 w-full border-0 grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
