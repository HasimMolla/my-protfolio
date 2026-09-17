"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/data";

/**
 * The signature, drawn on. A left-to-right clip wipe makes the mark appear as
 * if it's being written the first time the footer scrolls into view — the one
 * flourish on the page, using the only asset that's actually Hasim's own hand.
 *
 * Size and position it from the outside (`className`) — the image fills this
 * wrapper. A percentage width on the image itself has no determinate basis to
 * resolve against, which is what stopped it centring.
 */
export function SignatureReveal({ className = "" }) {
  const reduced = useReducedMotion();

  const mark = (
    <Image
      src="/assets/signature.png"
      alt={`${site.name}'s signature`}
      width={1200}
      height={389}
      // Third use of the one preloaded signature file — already in cache, so
      // eager costs no request and keeps every instance consistent.
      loading="eager"
      className="signature-ink h-auto w-full"
    />
  );

  if (reduced) {
    return <div className={className}>{mark}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 1.6, ease: [0.33, 0.9, 0.35, 1] }}
    >
      {mark}
    </motion.div>
  );
}
