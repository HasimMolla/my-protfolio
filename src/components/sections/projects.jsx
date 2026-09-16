import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BrandIcon } from "@/components/icons/brand-icons";

function ProjectLink({ link }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:bg-bg-subtle hover:text-text"
    >
      {link.kind === "source" ? (
        <BrandIcon name="github" className="size-3.5" />
      ) : (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-70" />
          <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
        </span>
      )}
      {link.label}
      <ArrowUpRight
        size={12}
        className="text-faint transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
      />
    </a>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      label="Projects"
      lead="Things I build outside client work, usually because I wanted them to exist."
    >
      <div className="space-y-6">
        {projects.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.08}>
            <SpotlightCard className="p-2.5">
              <div className="overflow-hidden rounded-xl border border-line bg-bg-subtle">
                <Image
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  width={1280}
                  height={720}
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/spot:scale-[1.02]"
                />
              </div>

              <div className="space-y-3.5 p-4 sm:p-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-[-0.01em]">
                    {project.name}
                  </h3>
                  <span className="font-mono text-[0.6875rem] tracking-widest text-faint uppercase">
                    {project.year} · {project.status}
                  </span>
                </div>

                <p className="text-pretty text-[0.9rem] leading-relaxed text-muted">
                  {project.description}
                </p>

                <ul className="flex flex-wrap gap-1.5" role="list">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md bg-bg-subtle px-2 py-1 font-mono text-[0.6875rem] text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.links.map((link) => (
                    <ProjectLink key={link.href} link={link} />
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
