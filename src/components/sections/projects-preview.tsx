import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection, StaggerChildren, FadeItem } from "@/components/shared/animated-section";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/shared/link-button";

/** Future-ready project cards preview. */
export function ProjectsPreview() {
  const preview = projects.slice(0, 3);

  return (
    <AnimatedSection className="section-padding">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Projects"
          title="Installations that keep industry moving"
          description="A selection of representative projects across industrial, commercial, and hospitality environments."
        />
        <StaggerChildren className="mt-14 grid gap-6 md:grid-cols-3">
          {preview.map((project) => (
            <FadeItem key={project.id}>
              <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg">
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
                  <Badge variant="secondary" className="rounded-full capitalize">
                    {project.category}
                  </Badge>
                  <h3 className="mt-3 font-heading text-lg font-bold text-navy dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" />
                    {project.location}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {project.summary}
                  </p>
                </div>
              </article>
            </FadeItem>
          ))}
        </StaggerChildren>
        <div className="mt-10 text-center">
          <LinkButton href="/projects" variant="outline" className="rounded-full">
            View all projects
            <ArrowRight className="ml-2 size-4" />
          </LinkButton>
        </div>
      </div>
    </AnimatedSection>
  );
}
