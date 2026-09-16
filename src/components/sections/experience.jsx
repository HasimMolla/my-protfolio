import { experience } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

export function Experience() {
  return (
    <Section
      id="work"
      label="Experience"
      lead="Where I have been shipping, and what came out of it."
    >
      <ol className="relative space-y-10" role="list">
        {experience.map((job, index) => (
          <Reveal
            key={job.company}
            as="li"
            delay={index * 0.08}
            className="group relative pl-6"
          >
            {/* Timeline rail and node. The rail joins one role to the next, so
                the final entry doesn't draw one. */}
            <span
              aria-hidden="true"
              className="absolute top-2 left-0 h-[calc(100%+1rem)] w-px bg-line group-last:hidden"
            />
            <span
              aria-hidden="true"
              className="absolute top-1.5 left-0 size-[7px] -translate-x-[3px] rounded-full bg-text ring-4 ring-bg"
            />

            <p className="section-label">{job.period}</p>

            <h3 className="mt-2 text-base font-semibold tracking-[-0.01em]">
              {job.role}
            </h3>
            <p className="mt-0.5 text-sm text-muted">
              {job.company} · {job.type}
            </p>

            <p className="mt-3 text-pretty text-[0.9rem] leading-relaxed text-muted">
              {job.summary}
            </p>

            <ul className="mt-3 space-y-2" role="list">
              {job.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="relative pl-4 text-pretty text-[0.9rem] leading-relaxed text-muted before:absolute before:top-[0.6em] before:left-0 before:size-1 before:rounded-full before:bg-faint"
                >
                  {highlight}
                </li>
              ))}
            </ul>

            <ul className="mt-4 flex flex-wrap gap-1.5" role="list">
              {job.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md bg-bg-subtle px-2 py-1 font-mono text-[0.6875rem] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
