import { stats } from "@/lib/data/stats";
import { StatsCounter } from "@/components/shared/stats-counter";

/** Four key trust metrics below the hero. */
export function StatsSection() {
  return (
    <section className="relative z-10 -mt-10 md:-mt-14">
      <div className="container-narrow">
        <div className="grid grid-cols-2 gap-6 rounded-2xl border border-border bg-card p-8 shadow-soft-lg md:grid-cols-4 md:gap-8 md:p-10">
          {stats.map((stat) => (
            <StatsCounter key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
