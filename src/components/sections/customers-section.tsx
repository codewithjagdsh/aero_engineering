import Image from "next/image";
import { Building2, MapPin, UtensilsCrossed } from "lucide-react";
import { customers, type CustomerSector } from "@/lib/data/customers";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";

const sectorOrder: CustomerSector[] = [
  "Restaurants and Bakeries",
  "Industrial Manufacturing",
];

const sectorIcons = {
  "Restaurants and Bakeries": UtensilsCrossed,
  "Industrial Manufacturing": Building2,
} satisfies Record<CustomerSector, typeof Building2>;

/**
 * Prominent trust section presenting supplied customer logos, locations,
 * sectors, and the work each business performs.
 */
export function CustomersSection() {
  return (
    <AnimatedSection className="section-padding bg-section dark:bg-background">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Our Customers"
          title="Trusted by leading restaurants, bakeries and industrial businesses"
          description="Aero lifting systems support commercial kitchens, bakeries and advanced manufacturing operations across Tamil Nadu."
        />

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 divide-x divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <TrustMetric value="70+" label="Customers" />
          <TrustMetric value="15" label="Featured Brands" />
          <TrustMetric value="2" label="Core Sectors" />
        </div>

        <div className="mt-16 space-y-14">
          {sectorOrder.map((sector) => {
            const Icon = sectorIcons[sector];
            const sectorCustomers = customers.filter(
              (customer) => customer.sector === sector
            );

            return (
              <div key={sector}>
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-electric/10 text-electric">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-navy dark:text-white">
                      {sector}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {sectorCustomers.length} selected customer
                      {sectorCustomers.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {sectorCustomers.map((customer) => (
                    <article
                      key={customer.name}
                      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
                    >
                      <div className="flex h-36 items-center justify-center bg-navy p-5">
                        <Image
                          src={customer.logo}
                          alt={`${customer.name} logo`}
                          width={220}
                          height={100}
                          sizes="220px"
                          className="h-auto max-h-24 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <h4 className="font-heading text-lg font-bold text-navy dark:text-white">
                          {customer.name}
                        </h4>
                        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-electric">
                          <MapPin className="size-3.5" aria-hidden />
                          {customer.location}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {customer.work}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          Customer names and marks are shown to identify organizations served
          by Aero Engineering. All trademarks remain the property of their
          respective owners.
        </p>
      </div>
    </AnimatedSection>
  );
}

function TrustMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-3 py-5 text-center sm:px-6">
      <p className="font-heading text-2xl font-bold text-navy dark:text-white sm:text-3xl">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</p>
    </div>
  );
}

