"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/data/products";
import { hoverLift } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  className?: string;
};

/** Premium product card used on home preview and products listing. */
export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <motion.article
      {...hoverLift}
      className={cn(
        "group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg",
        className
      )}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-section">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className="absolute left-4 top-4 rounded-full bg-navy/90 text-white capitalize">
            {product.category.replace("-", " ")}
          </Badge>
        </div>
        <div className="p-6">
          <h3 className="font-heading text-xl font-bold text-navy dark:text-white">
            {product.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {product.tagline}
          </p>
          <span className="mt-4 inline-flex items-center text-sm font-semibold text-electric">
            View details
            <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
