"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, PenLine, RotateCcw, Trash2, Type } from "lucide-react";
import { site } from "@/lib/data";
import {
  NAME_MAX,
  VIEWBOX,
  cleanName,
  getServerSignatures,
  getSignatures,
  isBlank,
  removeSignature,
  saveSignature,
  subscribeSignatures,
} from "@/lib/signatures";
import { SignaturePad, strokesToPathData } from "@/components/wall/signature-pad";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Breadcrumb } from "@/components/ui/page-title";
import { Reveal } from "@/components/ui/reveal";
import { useHydrated } from "@/lib/hooks";
import { cn } from "@/lib/utils";

function SignatureCard({ entry, onRemove }) {
  const reduced = useReducedMotion();
  // Bumping this remounts the path, which restarts the draw-on animation.
  const [replay, setReplay] = useState(0);
  const isDrawn = entry.kind !== "typed";

  return (
    <li>
      <SpotlightCard className="group/card relative h-full" radius={260}>
        <figure className="flex h-full flex-col p-3">
          <div className="grid flex-1 place-items-center">
            {isDrawn ? (
              <svg
                viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                className="h-24 w-full text-text"
                aria-hidden="true"
              >
                <motion.path
                  key={replay}
                  d={entry.path}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={entry.weight ?? 3.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  // A genuine stroke draw-on — the whole point of storing these
                  // as paths rather than images.
                  initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 1.1, ease: [0.33, 0.9, 0.35, 1] }}
                />
              </svg>
            ) : (
              <p className="px-2 py-4 text-center font-serif text-2xl text-text italic">
                {entry.text}
              </p>
            )}
          </div>

          <figcaption className="mt-2 flex items-baseline justify-between gap-2 border-t border-line pt-2">
            <span className="truncate text-[0.8125rem] text-muted">
              {entry.name || "Anonymous"}
            </span>
            <time
              dateTime={entry.createdAt}
              className="shrink-0 font-mono text-[0.625rem] tracking-wide text-faint"
              suppressHydrationWarning
            >
              {new Date(entry.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}
            </time>
          </figcaption>
        </figure>

        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover/card:opacity-100">
          {isDrawn && !reduced ? (
            <button
              type="button"
              onClick={() => setReplay((n) => n + 1)}
              aria-label={`Replay signature by ${entry.name || "Anonymous"}`}
              title="Replay"
              className="grid size-6 place-items-center rounded-full bg-bg-subtle text-faint transition-colors hover:text-text"
            >
              <RotateCcw size={12} />
            </button>
          ) : null}
          {onRemove ? (
            <button
              type="button"
              onClick={() => onRemove(entry.id)}
              aria-label={`Remove signature by ${entry.name || "Anonymous"}`}
              title="Remove"
              className="grid size-6 place-items-center rounded-full bg-bg-subtle text-faint transition-colors hover:text-text"
            >
              <Trash2 size={12} />
            </button>
          ) : null}
        </div>
      </SpotlightCard>
    </li>
  );
}

export function SignatureWall() {
  const hydrated = useHydrated();
  const [strokes, setStrokes] = useState([]);
  const [name, setName] = useState("");
  const [mode, setMode] = useState("draw");
  const [typed, setTyped] = useState("");
  const [justSigned, setJustSigned] = useState(false);
  // The pad owns its own stroke state, so clearing ours doesn't reach it —
  // bumping this key remounts it empty after a signature is added.
  const [padKey, setPadKey] = useState(0);
  const [weight, setWeight] = useState(3.2);

  // The wall lives in localStorage, which is an external store — subscribing to
  // it beats loading it in an effect, and keeps other tabs in sync for free.
  const entries = useSyncExternalStore(
    subscribeSignatures,
    getSignatures,
    getServerSignatures,
  );

  useEffect(() => {
    if (!justSigned) return;
    const timer = setTimeout(() => setJustSigned(false), 2200);
    return () => clearTimeout(timer);
  }, [justSigned]);

  const canSubmit =
    mode === "draw" ? !isBlank(strokes) : cleanName(typed).length > 0;

  function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;

    const base = {
      id: crypto.randomUUID(),
      name: cleanName(name),
      createdAt: new Date().toISOString(),
    };

    const entry =
      mode === "draw"
        ? { ...base, kind: "drawn", path: strokesToPathData(strokes), weight }
        : { ...base, kind: "typed", text: cleanName(typed) };

    if (mode === "draw" && !entry.path) return;

    saveSignature(entry);
    setStrokes([]);
    setPadKey((n) => n + 1);
    setTyped("");
    setName("");
    setJustSigned(true);
  }

  function handleRemove(id) {
    removeSignature(id);
  }

  return (
    <>
      <main className="mx-auto w-full max-w-3xl px-5 pt-10 pb-20 sm:px-8">
        <Breadcrumb
          trail={[
            { label: "Playground", href: "/playground" },
            { label: "Signature wall" },
          ]}
          title="Sign the wall"
          lead="this whole site is built on one handwritten mark — here's the pen."
        />

        <Image
          src="/assets/signature.png"
          alt={`${site.name}'s signature`}
          width={1200}
          height={389}
          loading="eager"
          className="signature-ink mt-6 h-10 w-auto opacity-80"
        />

        <form onSubmit={handleSubmit} className="mt-9">
          <div className="flex items-center justify-between gap-3">
            <h2 className="section-label">Your turn</h2>
            {/* Drawing is pointer-only, so there has to be a way in for anyone
                on a keyboard or screen reader. */}
            <div
              role="group"
              aria-label="Signature input method"
              className="flex items-center rounded-full border border-line p-0.5"
            >
              {[
                ["draw", "Draw", PenLine],
                ["type", "Type", Type],
              ].map(([value, label, Icon]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMode(value)}
                  aria-pressed={mode === value}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-colors",
                    mode === value
                      ? "bg-text text-bg"
                      : "text-muted hover:text-text",
                  )}
                >
                  <Icon size={12} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3">
            {mode === "draw" ? (
              <SignaturePad
                key={padKey}
                onChange={setStrokes}
                onWeightChange={setWeight}
              />
            ) : (
              <div>
                <label htmlFor="typed" className="sr-only">
                  Type your signature
                </label>
                <input
                  id="typed"
                  value={typed}
                  onChange={(event) => setTyped(event.target.value)}
                  maxLength={NAME_MAX}
                  placeholder="Type your signature"
                  className="h-44 w-full rounded-xl border border-line bg-surface px-5 text-center font-serif text-3xl text-text italic placeholder:font-sans placeholder:text-base placeholder:not-italic placeholder:text-faint focus:outline-none"
                />
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <label htmlFor="name" className="sr-only">
              Your name
            </label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={NAME_MAX}
              placeholder="Your name (optional)"
              className="min-w-0 flex-1 rounded-full border border-line bg-surface px-4 py-2 text-[0.8125rem] text-text placeholder:text-faint focus:border-line-strong focus:outline-none"
            />
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-text px-4 py-2 text-[0.8125rem] font-medium text-bg transition-opacity hover:opacity-85 disabled:pointer-events-none disabled:opacity-40"
            >
              Add to wall
            </button>
          </div>

          <div aria-live="polite" className="mt-2 h-5">
            <AnimatePresence>
              {justSigned ? (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-1.5 text-xs text-muted"
                >
                  <Check size={13} />
                  Added — thanks for signing.
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </form>

        <section className="mt-12">
          {/* Same label + hairline rule every section on the site opens with. */}
          <Reveal>
            <div className="flex items-center gap-4">
              <h2 className="section-label shrink-0">
                The wall
                {hydrated && entries.length ? ` · ${entries.length}` : ""}
              </h2>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </div>
          </Reveal>

          {/* Empty until hydration, so the server and client agree. */}
          {!hydrated ? null : entries.length ? (
            <ul
              className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
              role="list"
            >
              <AnimatePresence initial={false}>
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <SignatureCard entry={entry} onRemove={handleRemove} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </ul>
          ) : (
            <p className="mt-6 rounded-xl border border-dashed border-line px-5 py-10 text-center text-sm text-muted">
              Nobody has signed yet. Be the first.
            </p>
          )}

          <p className="mt-6 text-pretty text-xs leading-relaxed text-faint">
            Signatures are stored in this browser only — they are yours, they
            never leave your device, and nobody else can see them. Clearing your
            site data clears the wall.
          </p>
        </section>
      </main>
    </>
  );
}
