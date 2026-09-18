import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

/**
 * Shared bar for the standalone routes. They deliberately don't get the main
 * nav — its links are in-page anchors that mean nothing off the landing page —
 * so each sub-page gets a way back instead.
 */
export function PageHeader({ children }) {
  return (
    <div className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between gap-3 px-4 sm:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[0.8125rem] text-muted transition-colors hover:text-text"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Portfolio
        </Link>
        <div className="flex items-center gap-1.5">
          {children}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

/** Page title block, matching the hero's type scale. */
export function PageTitle({ title, lead }) {
  return (
    <header>
      <h1 className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[2.4rem]">
        {title}
      </h1>
      {lead ? (
        <p className="mt-3 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-muted">
          {lead}
        </p>
      ) : null}
    </header>
  );
}
