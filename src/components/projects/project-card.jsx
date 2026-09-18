import Image from "next/image";
import { Globe } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BrandIcon, brandIcons, brandHex } from "@/components/icons/brand-icons";

function IconLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="grid size-7 place-items-center rounded-full text-faint transition-colors hover:bg-bg-subtle hover:text-text"
    >
      {children}
    </a>
  );
}

/** Brand marks, muted at rest, picking up their own colour on hover. */
export function TechRow({ tech, trailing }) {
  return (
    <ul className="mt-auto flex items-center gap-2.5 pt-1" role="list">
      {tech.map((key) => (
        <li
          key={key}
          title={brandIcons[key]?.title}
          style={{
            "--brand": brandHex(key, false),
            "--brand-dark": brandHex(key, true),
          }}
          className="text-faint transition-colors duration-300 hover:text-[var(--brand)] dark:hover:text-[var(--brand-dark)]"
        >
          <BrandIcon name={key} className="size-4" />
          <span className="sr-only">{brandIcons[key]?.title}</span>
        </li>
      ))}
      {trailing ? (
        <li className="ml-auto font-mono text-[0.625rem] tracking-widest text-faint">
          {trailing}
        </li>
      ) : null}
    </ul>
  );
}

/** A shipped project with a screenshot and links. Used on / and /projects. */
export function ProjectCard({ project }) {
  return (
    <SpotlightCard className="flex h-full flex-col overflow-hidden">
      <div className="overflow-hidden border-b border-line bg-bg-subtle">
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          width={1280}
          height={720}
          sizes="(max-width: 640px) 100vw, 360px"
          className="h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/spot:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate text-[0.95rem] font-semibold tracking-[-0.01em]">
            {project.name}
          </h3>
          <div className="flex shrink-0 items-center">
            {project.source ? (
              <IconLink
                href={project.source}
                label={`${project.name} source on GitHub`}
              >
                <BrandIcon name="github" className="size-4" />
              </IconLink>
            ) : null}
            <IconLink href={project.live} label={`Visit ${project.name}`}>
              <Globe size={16} />
            </IconLink>
          </div>
        </div>

        <p className="text-pretty text-[0.8125rem] leading-relaxed text-muted">
          {project.description}
        </p>

        <TechRow tech={project.tech} trailing={project.year} />
      </div>
    </SpotlightCard>
  );
}

/**
 * Client work. No screenshot and no link — these live behind client logins, so
 * the card leans on the description instead of pretending there's something to
 * click.
 */
export function ClientWorkCard({ item }) {
  return (
    <SpotlightCard className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="truncate text-[0.95rem] font-semibold tracking-[-0.01em]">
          {item.name}
        </h3>
        {item.current ? (
          <span className="section-label shrink-0">Current</span>
        ) : null}
      </div>

      <p className="mt-0.5 text-[0.75rem] text-faint">{item.domain}</p>

      <p className="mt-2.5 text-pretty text-[0.8125rem] leading-relaxed text-muted">
        {item.description}
      </p>

      <TechRow tech={item.tech} trailing={item.year} />
    </SpotlightCard>
  );
}
