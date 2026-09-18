import { projects, site } from "@/lib/data";
import { PageTitle } from "@/components/ui/page-title";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/projects/project-card";

export const metadata = {
  title: "Projects",
  description: `Projects built by ${site.name} — a component library and an exam-prep platform, among others.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects — ${site.name}`,
    description: "Things I build outside client work.",
    url: `${site.url}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 pt-10 pb-20 sm:px-8">
      <PageTitle title="Projects." />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.name} delay={index * 0.08} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}
