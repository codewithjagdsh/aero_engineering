import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/shared/link-button";
import { cn } from "@/lib/utils";

type CTABannerProps = {
  title: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
};

/** Full-width call-to-action band used on home and inner pages. */
export function CTABanner({
  title,
  description,
  primaryHref = "/contact",
  primaryLabel = "Get Free Quote",
  secondaryHref = "/products",
  secondaryLabel = "Explore Products",
  className,
}: CTABannerProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-navy section-padding",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,167,255,0.25),_transparent_55%)]" />
      <div className="container-narrow relative z-10 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl text-balance">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {description}
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <LinkButton
            href={primaryHref}
            size="lg"
            className="h-12 rounded-full bg-electric px-8 text-base font-semibold text-white hover:bg-electric/90"
          >
            {primaryLabel}
            <ArrowRight className="ml-2 size-4" />
          </LinkButton>
          {secondaryLabel && (
            <LinkButton
              href={secondaryHref}
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/30 bg-transparent px-8 text-base text-white hover:bg-white/10 hover:text-white"
            >
              {secondaryLabel}
            </LinkButton>
          )}
        </div>
      </div>
    </section>
  );
}
