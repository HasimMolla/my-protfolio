import { clientWork, projects, site } from "@/lib/data";
import { PageHeader, PageTitle } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ClientWorkCard, ProjectCard } from "@/components/projects/project-card";

export const metadata = {
  title: "Projects",
  description: `Everything ${site.name} has built — personal projects and client work across EdTech, PropTech, Healthcare and EV.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects — ${site.name}`,
    description: "Personal projects and client work, in one place.",
    url: `${site.url}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader />
      <main className="mx-auto w-full max-w-3xl px-5 pt-10 pb-20 sm:px-8">
        <PageTitle
          title="Everything I've built."
          lead="The landing page shows one. This is the rest — side projects I wanted to exist, and the client work that pays for them."
        />

        <Section label="Personal" lead="Built because I wanted them to exist.">
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.name} delay={index * 0.08} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          label="Client work"
          lead="Built at Martian Corporation. These ship behind client logins, so they're described rather than demoed."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {clientWork.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.06} className="h-full">
                <ClientWorkCard item={item} />
              </Reveal>
            ))}
          </div>
        </Section>
      </main>
    </>
  );
}
