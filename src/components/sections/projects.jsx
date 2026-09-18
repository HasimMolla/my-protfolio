import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clientWork, featuredProjects, projects } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/projects/project-card";

export function Projects() {
  const remaining = projects.length - featuredProjects.length + clientWork.length;

  return (
    <Section
      id="projects"
      label="Projects"
      lead="Things I build outside client work, usually because I wanted them to exist."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.08} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <Link
          href="/projects"
          className="group mt-5 inline-flex items-center gap-2 text-[0.8125rem] text-muted transition-colors hover:text-text"
        >
          <span className="link-underline">
            All projects
            {remaining > 0 ? ` · ${remaining} more` : ""}
          </span>
          <ArrowRight
            size={13}
            className="text-faint transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      </Reveal>
    </Section>
  );
}
