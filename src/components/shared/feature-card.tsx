import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

/** Icon + title + description card for why-choose and pillars. */
export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <article
      className={cn(
        "group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg md:p-8",
        className
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-xl bg-electric/10 text-electric transition-colors group-hover:bg-electric group-hover:text-white">
        <Icon className="size-6" aria-hidden />
      </div>
      <h3 className="mt-5 font-heading text-lg font-bold text-navy dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
        {description}
      </p>
    </article>
  );
}
