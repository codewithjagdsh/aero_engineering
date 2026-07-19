"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import {
  projects,
  type ProjectCategory,
} from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const filters: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Industrial", value: "industrial" },
  { label: "Commercial", value: "commercial" },
  { label: "Hospitality", value: "hospitality" },
];

/** Client-side filterable project grid. */
export function ProjectsClient() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const list = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((project) => (
          <article
            key={project.id}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="rounded-full capitalize">
                  {project.category}
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  {project.liftType}
                </Badge>
              </div>
              <h2 className="mt-3 font-heading text-xl font-bold text-navy dark:text-white">
                {project.title}
              </h2>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5" />
                {project.location} · {project.industry}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {project.summary}
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
