"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Card whose border and surface pick up a soft radial highlight that tracks the
 * pointer — the Aceternity "spotlight" idea, driven by CSS custom properties so
 * no React state changes on every mousemove.
 */
export function SpotlightCard({ children, className, radius = 380, as: Tag = "div" }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  function handleMove(event) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      style={{ "--spot-radius": `${radius}px` }}
      className={cn(
        "group/spot relative isolate overflow-hidden rounded-2xl border border-line bg-surface",
        "transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:border-line-strong hover:shadow-card",
        className,
      )}
    >
      {/* Pointer-tracking wash. Sits above the surface but below the content. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          background:
            "radial-gradient(var(--spot-radius) circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 65%)",
        }}
      />
      {children}
    </Tag>
  );
}
