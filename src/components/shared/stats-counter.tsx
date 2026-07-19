"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Stat } from "@/lib/data/stats";

type StatsCounterProps = {
  stat: Stat;
};

/** Animated numeric counter for the stats band. */
export function StatsCounter({ stat }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    if (reduced) {
      // Defer to next frame to satisfy lint rules around sync setState-in-effect
      const id = requestAnimationFrame(() => setValue(stat.value));
      return () => cancelAnimationFrame(id);
    }

    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * stat.value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, stat.value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-4xl font-bold tracking-tight text-navy dark:text-white md:text-5xl">
        {value}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-muted-foreground md:text-base">
        {stat.label}
      </p>
    </div>
  );
}
