"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/shared/link-button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** Full-viewport premium hero with dual CTAs and subtle parallax. */
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <Image
          src="/assets/hero/hero.svg"
          alt="Industrial elevator manufacturing environment"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40" />
      </motion.div>

      <div className="container-narrow relative z-10 pt-28 pb-20 md:pt-32">
        {/* CSS-driven entrance so hero content is visible even before JS hydrates */}
        <p className="hero-rise mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-electric">
          Aero Engineering · India
        </p>
        <h1 className="hero-rise hero-rise-1 max-w-4xl font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl text-balance">
          Precision Vertical Lifting Solutions Built for Industry.
        </h1>
        <p className="hero-rise hero-rise-2 mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-xl">
          Manufacturing reliable Goods Lifts and Dumbwaiters engineered for
          safety, durability, and performance.
        </p>
        <div className="hero-rise hero-rise-3 mt-10 flex flex-wrap gap-4">
          <LinkButton
            href="/contact"
            size="lg"
            className="h-12 rounded-full bg-electric px-8 text-base font-semibold text-white hover:bg-electric/90"
          >
            Get Free Quote
            <ArrowRight className="ml-2 size-4" />
          </LinkButton>
          <LinkButton
            href="/products"
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-white/30 bg-white/5 px-8 text-base text-white backdrop-blur hover:bg-white/10 hover:text-white"
          >
            Explore Products
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
