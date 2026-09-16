"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useMediaQuery } from "@/lib/hooks";

/**
 * A single soft light that trails the pointer across the whole page. Skipped
 * entirely on touch/coarse pointers and when reduced motion is requested.
 */
export function CursorGlow() {
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const enabled = finePointer && !reduced;

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const springX = useSpring(x, { stiffness: 120, damping: 24, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 120, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;

    function handleMove(event) {
      x.set(event.clientX);
      y.set(event.clientY);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ left: springX, top: springY }}
      className="pointer-events-none fixed z-0 hidden size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
    >
      <div
        className="size-full rounded-full opacity-70"
        style={{
          background: "radial-gradient(circle, var(--glow) 0%, transparent 62%)",
        }}
      />
    </motion.div>
  );
}
