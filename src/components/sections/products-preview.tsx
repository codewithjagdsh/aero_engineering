import { getFeaturedProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/products/product-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection, StaggerChildren, FadeItem } from "@/components/shared/animated-section";
import { LinkButton } from "@/components/shared/link-button";
import { ArrowRight } from "lucide-react";

/** Featured products grid on the home page. */
export function ProductsPreview() {
  const featured = getFeaturedProducts().slice(0, 3);

  return (
    <AnimatedSection className="section-padding bg-section dark:bg-background">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Products"
          title="Lifting systems for every industrial need"
          description="From heavy-duty goods lifts to specialty dumbwaiters—engineered for payload, safety, and site reality."
        />
        <StaggerChildren className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <FadeItem key={product.slug}>
              <ProductCard product={product} />
            </FadeItem>
          ))}
        </StaggerChildren>
        <div className="mt-10 text-center">
          <LinkButton href="/products" variant="outline" className="rounded-full">
            View all products
            <ArrowRight className="ml-2 size-4" />
          </LinkButton>
        </div>
      </div>
    </AnimatedSection>
  );
}
