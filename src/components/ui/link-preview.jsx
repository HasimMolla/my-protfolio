"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useMediaQuery } from "@/lib/hooks";

/**
 * Inline link that floats a screenshot of its destination above the text while
 * the pointer is on it. The card drifts with the cursor along the x-axis.
 *
 * Falls back to a plain link on touch devices and under reduced motion.
 */
export function LinkPreview({
  href,
  image,
  children,
  width = 260,
  height = 146,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduced = useReducedMotion();
  const enabled = finePointer && !reduced;

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 15 });

  function handleMove(event) {
    const node = anchorRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    // Offset from the centre of the link, damped so the card only drifts.
    const offset = event.clientX - rect.left - rect.width / 2;
    x.set(offset / 2);
  }

  const link = (
    <a
      ref={anchorRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={enabled ? () => setOpen(true) : undefined}
      onMouseLeave={enabled ? () => setOpen(false) : undefined}
      onMouseMove={enabled ? handleMove : undefined}
      className={`link-prose text-text ${className}`}
    >
      {children}
    </a>
  );

  if (!enabled) return link;

  return (
    <span className="relative inline-block">
      {link}

      <AnimatePresence>
        {open ? (
          <motion.span
            // Purely decorative: the link itself already names the destination.
            aria-hidden="true"
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            style={{ x: springX }}
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 block -translate-x-1/2"
          >
            <span className="block rounded-xl border border-line-strong bg-surface p-1.5 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.35)]">
              <Image
                src={image}
                alt=""
                width={1280}
                height={720}
                sizes={`${width}px`}
                style={{ width, height }}
                // Preflight's `img { max-width: 100% }` would otherwise fight
                // the shrink-to-fit absolute parent and collapse the card.
                className="block max-w-none rounded-lg object-cover object-top"
              />
            </span>
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}
