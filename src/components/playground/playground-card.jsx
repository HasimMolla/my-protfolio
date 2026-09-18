"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

/**
 * An entry on the playground index. The whole card is the link — the arrow is
 * an affordance, not a second target.
 */
export function PlaygroundCard({ href, title, description, meta, children }) {
  return (
    <SpotlightCard className="h-full">
      <Link href={href} className="flex h-full flex-col">
        {/* Preview. Fixed height so the cards line up whatever's inside. */}
        <div className="grid h-40 place-items-center overflow-hidden border-b border-line bg-bg-subtle">
          {children}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-[0.95rem] font-semibold tracking-[-0.01em]">
              {title}
            </h3>
            <ArrowUpRight
              size={15}
              className="shrink-0 text-faint transition-transform duration-300 group-hover/spot:-translate-y-0.5 group-hover/spot:translate-x-0.5"
            />
          </div>

          <p className="mt-2 text-pretty text-[0.8125rem] leading-relaxed text-muted">
            {description}
          </p>

          {meta ? <p className="section-label mt-3">{meta}</p> : null}
        </div>
      </Link>
    </SpotlightCard>
  );
}

/** Preview for the signature wall: a mark that draws itself, on a loop. */
export function SignaturePreview() {
  const reduced = useReducedMotion();
  const d =
    "M 40 120 C 70 60, 110 60, 130 100 C 150 140, 120 160, 105 140 C 90 120, 130 70, 175 70 C 215 70, 230 110, 260 110";

  return (
    <svg viewBox="0 0 300 180" className="h-28 w-full text-text" aria-hidden="true">
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={
          reduced
            ? undefined
            : { duration: 1.8, ease: [0.33, 0.9, 0.35, 1], repeat: Infinity, repeatDelay: 1.4 }
        }
      />
    </svg>
  );
}

/** Preview for components: miniature versions of what's on the page. */
export function ComponentsPreview() {
  const reduced = useReducedMotion();
  // One shared cycle so the three rows read as a set rather than three
  // unrelated loops. repeatType "reverse" means each returns the way it came.
  const loop = (extra = {}) =>
    reduced
      ? undefined
      : {
          duration: 1.6,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
          ease: [0.22, 1, 0.36, 1],
          ...extra,
        };

  return (
    <div className="flex w-full max-w-[13rem] flex-col items-center gap-3">
      {/* Button — a press that never quite lands. */}
      <motion.span
        animate={reduced ? undefined : { scale: [1, 0.94] }}
        transition={loop()}
        className="inline-flex items-center gap-1.5 rounded-full bg-text px-3 py-1.5 text-[0.6875rem] font-medium text-bg"
      >
        Get started
      </motion.span>

      {/* Toggle — knob slides, track fills behind it. */}
      <div className="flex w-full items-center justify-between gap-3">
        <span className="text-[0.625rem] text-muted">Toggle</span>
        <motion.span
          animate={reduced ? undefined : { backgroundColor: ["var(--border)", "var(--text)"] }}
          transition={loop()}
          className="relative flex h-4 w-7 shrink-0 items-center rounded-full px-0.5"
        >
          <motion.span
            animate={reduced ? undefined : { x: [0, 12] }}
            transition={loop()}
            className="size-3 rounded-full bg-surface shadow-sm"
          />
        </motion.span>
      </div>

      {/* Slider — the handle walks the track. */}
      <div className="flex w-full items-center gap-2">
        <span className="text-[0.625rem] text-muted">Range</span>
        <span className="relative flex h-1 flex-1 items-center rounded-full bg-line">
          <motion.span
            animate={reduced ? undefined : { left: ["0%", "100%"] }}
            transition={loop({ duration: 2 })}
            className="absolute size-2.5 -translate-x-1/2 rounded-full bg-text"
          />
        </span>
      </div>
    </div>
  );
}
