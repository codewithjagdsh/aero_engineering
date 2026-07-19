import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/lib/data/industries";
import { getProductBySlug } from "@/lib/data/products";
import { PageHero } from "@/components/shared/page-hero";
import { CTABanner } from "@/components/shared/cta-banner";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/shared/link-button";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Aero Engineering serves factories, industrial plants, hotels, restaurants, bakeries, warehouses, retail, and commercial buildings.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Vertical logistics for the sectors that keep India running"
        description="From plant floors to patient wards, we match lift type, capacity, and finish to the way your facility actually works."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries" },
        ]}
      />

      <section className="section-padding">
        <div className="container-narrow grid gap-6 md:grid-cols-2">
          {industries.map((industry) => (
            <article
              key={industry.slug}
              className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-soft transition-shadow hover:shadow-soft-lg"
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-navy text-electric dark:bg-electric/20">
                <industry.icon className="size-7" />
              </div>
              <h2 className="mt-5 font-heading text-2xl font-bold text-navy dark:text-white">
                {industry.name}
              </h2>
              <p className="mt-3 flex-1 text-muted-foreground leading-relaxed">
                {industry.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {industry.relevantProducts.map((slug) => {
                  const product = getProductBySlug(slug);
                  if (!product) return null;
                  return (
                    <Link key={slug} href={`/products/${slug}`}>
                      <Badge
                        variant="secondary"
                        className="rounded-full hover:bg-electric/15"
                      >
                        {product.shortName}
                      </Badge>
                    </Link>
                  );
                })}
              </div>
              <LinkButton href="/contact" variant="outline" className="mt-6 w-fit rounded-full">
                Discuss your site
                <ArrowRight className="ml-2 size-4" />
              </LinkButton>
            </article>
          ))}
        </div>
      </section>

      <CTABanner
        title="Not sure which lift fits your industry?"
        description="Describe your workflow—we’ll recommend between goods lifts and dumbwaiters with clear next steps."
      />
    </>
  );
}
