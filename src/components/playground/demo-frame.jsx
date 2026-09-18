"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { cn } from "@/lib/utils";

/**
 * The shell every playground entry sits in: a title, a live preview, whatever
 * controls the demo exposes, and the source behind a copy button.
 */
export function DemoFrame({ title, note, code, controls, children }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (insecure context, denied permission). The
      // source is visible either way, so there's nothing to recover from.
    }
  }

  return (
    <SpotlightCard className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3 border-b border-line p-4">
        <div className="min-w-0">
          <h3 className="text-[0.95rem] font-semibold tracking-[-0.01em]">
            {title}
          </h3>
          {note ? (
            <p className="mt-1 text-pretty text-[0.8125rem] leading-relaxed text-muted">
              {note}
            </p>
          ) : null}
        </div>
        {code ? (
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Source copied" : `Copy ${title} source`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs text-muted transition-colors hover:border-line-strong hover:bg-bg-subtle hover:text-text"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied" : "Copy"}
          </button>
        ) : null}
      </div>

      {/* Preview. Min height keeps the card from resizing as controls change. */}
      <div className="grid min-h-40 place-items-center bg-bg-subtle p-6">
        {children}
      </div>

      {controls ? (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line p-4">
          {controls}
        </div>
      ) : null}
    </SpotlightCard>
  );
}

/** Labelled range input, styled to match the rest of the site. */
export function Slider({ label, value, min, max, step = 1, onChange, format }) {
  const id = `slider-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="min-w-[8.5rem] flex-1">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="section-label">
          {label}
        </label>
        <span className="font-mono text-[0.625rem] text-faint tabular-nums">
          {format ? format(value) : value}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1.5 h-1 w-full cursor-pointer appearance-none rounded-full bg-line accent-[var(--text)]"
      />
    </div>
  );
}

/** Segmented control for picking one of a few named options. */
export function Choice({ label, value, options, onChange }) {
  return (
    <div>
      <p className="section-label">{label}</p>
      <div
        role="group"
        aria-label={label}
        className="mt-1.5 flex items-center rounded-full border border-line p-0.5"
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={value === option.value}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs transition-colors",
              value === option.value
                ? "bg-text text-bg"
                : "text-muted hover:text-text",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
