"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { galleryItems, type GalleryCategory } from "@/lib/data/gallery";
import { cn } from "@/lib/utils";

const filters: { label: string; value: GalleryCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Installations", value: "installations" },
  { label: "On-site Work", value: "on-site" },
];

type GalleryGridProps = {
  limit?: number;
  showFilters?: boolean;
};

/** Responsive gallery grid with lightbox navigation. */
export function GalleryGrid({ limit, showFilters = true }: GalleryGridProps) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = useMemo(() => {
    const filtered =
      filter === "all"
        ? galleryItems
        : galleryItems.filter((i) => i.category === filter);
    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  }, [filter, limit]);

  const active = openIndex !== null ? items[openIndex] : null;

  return (
    <div>
      {showFilters && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                filter === f.value
                  ? "bg-navy text-white dark:bg-electric dark:text-navy"
                  : "bg-section text-muted-foreground hover:text-foreground dark:bg-muted"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-border bg-section focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={768}
              height={1365}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute bottom-4 left-4 text-sm font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      <Dialog
        open={openIndex !== null}
        onOpenChange={(open) => !open && setOpenIndex(null)}
      >
        <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">
            {active?.title ?? "Gallery image"}
          </DialogTitle>
          {active && (
            <div className="relative overflow-hidden rounded-2xl bg-navy">
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex items-center justify-between gap-4 p-4 text-white">
                <p className="font-medium">{active.title}</p>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full"
                    onClick={() =>
                      setOpenIndex(
                        (openIndex! - 1 + items.length) % items.length
                      )
                    }
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full"
                    onClick={() =>
                      setOpenIndex((openIndex! + 1) % items.length)
                    }
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
