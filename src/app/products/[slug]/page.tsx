import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import {
  products,
  getProductBySlug,
} from "@/lib/data/products";
import { PageHero } from "@/components/shared/page-hero";
import { ProductJsonLd } from "@/components/shared/json-ld";
import { LinkButton } from "@/components/shared/link-button";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Aero Engineering`,
      description: product.tagline,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <ProductJsonLd
        name={product.name}
        description={product.description}
        image={product.image}
        slug={product.slug}
      />
      <PageHero
        eyebrow={product.category.replace("-", " ")}
        title={product.name}
        description={product.tagline}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />

      <section className="section-padding">
        <div className="container-narrow grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border shadow-soft">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
              />
            </div>

            <div className="mt-10">
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white md:text-3xl">
                Overview
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {product.description}
              </p>
            </div>

            <div className="mt-14">
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white md:text-3xl">
                Features
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {product.features.map((f) => (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                  >
                    <h3 className="font-heading font-bold text-navy dark:text-white">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {f.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white md:text-3xl">
                Specifications
              </h2>
              <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {product.specifications.map((spec, i) => (
                      <tr
                        key={spec.label}
                        className={
                          i % 2 === 0
                            ? "bg-section dark:bg-muted/40"
                            : "bg-card"
                        }
                      >
                        <th className="w-1/3 px-5 py-4 font-semibold text-navy dark:text-white">
                          {spec.label}
                        </th>
                        <td className="px-5 py-4 text-muted-foreground">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-14">
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white md:text-3xl">
                Applications
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {product.applications.map((app) => (
                  <Badge
                    key={app}
                    variant="secondary"
                    className="rounded-full px-4 py-1.5 text-sm"
                  >
                    {app}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-14">
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-white md:text-3xl">
                Advantages
              </h2>
              <ul className="mt-6 space-y-3">
                {product.advantages.map((adv) => (
                  <li key={adv} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-5 shrink-0 text-electric" />
                    <span className="text-muted-foreground">{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft-lg">
              <p className="text-sm font-semibold uppercase tracking-wider text-electric">
                Request Quote
              </p>
              <h3 className="mt-2 font-heading text-xl font-bold text-navy dark:text-white">
                {product.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Share your capacity, floors, and site location for a tailored
                quotation from our engineering team.
              </p>
              <LinkButton
                href={`/contact?requirement=${product.slug}`}
                className="mt-6 h-12 w-full rounded-full bg-navy text-white dark:bg-electric dark:text-navy"
              >
                Request Quote
                <ArrowRight className="ml-2 size-4" />
              </LinkButton>
              <LinkButton
                href="/products"
                variant="outline"
                className="mt-3 h-11 w-full rounded-full"
              >
                All products
              </LinkButton>
            </div>

            {/* Mobile sticky CTA bar */}
            <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-4 backdrop-blur lg:hidden">
              <LinkButton
                href={`/contact?requirement=${product.slug}`}
                className="h-12 w-full rounded-full bg-navy text-white dark:bg-electric dark:text-navy"
              >
                Request Quote
              </LinkButton>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
