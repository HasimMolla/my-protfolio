import { experience } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <Section
      id="work"
      label="Experience"
      lead="Where I have been shipping, and what came out of it."
    >
      <ol className="relative space-y-10" role="list">
        {/* One continuous rail behind every entry, rather than a segment per
            item — with a single role the per-item version drew nothing. */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-1 left-0 w-px bg-line"
        />

        {experience.map((job, index) => (
          <Reveal
            key={job.company}
            as="li"
            delay={index * 0.08}
            className="relative pl-6"
          >
            {/* The node sits on the rail; ring-bg punches a gap around it.
                Current vs past is carried by weight, not colour. */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-1.5 left-0 size-[9px] -translate-x-1/2 rounded-full ring-4 ring-bg",
                job.current ? "bg-green-600" : "bg-faint",
              )}
            />

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-base font-semibold tracking-[-0.01em]">
                {job.role}
                <span className="text-muted"> · {job.company}</span>
              </h3>
              <p className="section-label shrink-0">{job.period}</p>
            </div>

            <p className="mt-1 text-sm text-muted">{job.type}</p>

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
