import type { Metadata } from "next";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/products/product-card";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTABanner } from "@/components/shared/cta-banner";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Aero Engineering goods lifts, hydraulic and electric platforms, and specialty dumbwaiters for industrial and commercial facilities.",
};

export default function ProductsPage() {
  const goods = products.filter((p) => p.category === "goods-lift");
  const dumbwaiters = products.filter((p) => p.category === "dumbwaiter");

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Goods lifts and dumbwaiters engineered for duty"
        description="Browse our core range—then tell us your capacity, floors, and site constraints for a tailored quotation."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
      />

      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading
            align="left"
            eyebrow="Goods Lifts"
            title="Heavy-duty platforms for factories and warehouses"
            className="mb-10"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {goods.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-section dark:bg-background">
        <div className="container-narrow">
          <SectionHeading
            align="left"
            eyebrow="Dumbwaiters"
            title="Compact service lifts for hospitality and healthcare"
            className="mb-10"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dumbwaiters.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Need a custom material-handling elevator?"
        description="We engineer for unusual shafts, corrosive environments, and specialized payloads."
        primaryLabel="Request Quote"
      />
    </>
  );
}
