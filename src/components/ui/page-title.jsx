import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Page title as a single line: the name in the sans, the description trailing
 * off it in serif italic — the same emphasis the intro copy uses, so the
 * sub-pages sound like the rest of the site rather than like headings.
 */
export function PageTitle({ title, lead }) {
  return (
    <header>
      <h1 className="text-[1.1rem] leading-snug tracking-[-0.02em] text-balance sm:text-[1.4rem]">
        <span className="font-semibold">{title}</span>
        {lead ? (
          <>
            <span className="text-muted">, </span>
            <span className="font-serif text-[1em] text-muted italic">
              {lead}
            </span>
          </>
        ) : null}
      </h1>
    </header>
  );
}

/**
 * Wayfinding for a page one level down: a round control back to the parent,
 * the trail in the same tracked-out mono as every section label, then the
 * title. The trail's last segment is the current page, so it isn't a link.
 */
export function Breadcrumb({ trail, title, lead }) {
  const parent = trail[trail.length - 2];

  return (
    <div className="flex items-start gap-3 sm:gap-4">
      {parent?.href ? (
        <Link
          href={parent.href}
          aria-label={`Back to ${parent.label}`}
          className="group mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:bg-bg-subtle hover:text-text "
        >
          <ArrowLeft
            size={15}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
        </Link>
      ) : null}

      <div className="min-w-0">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-1.5" role="list">
            {trail.map((crumb, index) => {
              const isLast = index === trail.length - 1;
              return (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {isLast || !crumb.href ? (
                    <span className="section-label text-muted">{crumb.label}</span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="section-label transition-colors hover:text-text"
                    >
                      {crumb.label}
                    </Link>
                  )}
                  {!isLast ? (
                    <span aria-hidden="true" className="section-label">
                      /
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="mt-1.5">
          <PageTitle title={title} lead={lead} />
        </div>
      </div>
    </div>
  );
}
