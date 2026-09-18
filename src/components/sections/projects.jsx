import { featuredProjects } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/projects/project-card";

/**
 * The landing page's featured pair. The full list, including client work,
 * lives at /projects — reached from the nav rather than a link down here.
 */
export function Projects() {
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
    </Section>
  );
}
