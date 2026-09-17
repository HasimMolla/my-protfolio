"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { site, socials } from "@/lib/data";
import { BrandIcon } from "@/components/icons/brand-icons";

/**
 * The hero portrait. Clicking it flips the card over to a short hello with the
 * contact links on the back.
 *
 * Each face carries `inert` when it is turned away, so the hidden side can't be
 * clicked or tabbed into even though it stays in the DOM for the 3D flip.
 */
export function FlipPortrait() {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((v) => !v);

  return (
    <div className="[perspective:1200px]">
      <motion.div
        // The resting tilt lives here rather than in a class — motion writes the
        // whole transform, so a Tailwind `rotate-*` would be overwritten.
        style={{ rotate: -2.5 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        whileHover={{ scale: 1.02 }}
        className="group relative w-32 [transform-style:preserve-3d] sm:w-36"
      >
        {/* Front — the photo */}
        <div
          inert={flipped}
          className="rounded-xl border border-line bg-surface p-1.5 shadow-card [backface-visibility:hidden]"
        >
          <Image
            src="/assets/portrait.jpg"
            alt={`${site.name}, ${site.role}`}
            width={1100}
            height={1467}
            preload
            loading="eager"
            sizes="(max-width: 640px) 128px, 144px"
            className="h-auto w-full rounded-lg object-cover"
          />
          <button
            type="button"
            onClick={toggle}
            aria-label="Flip photo to see contact details"
            className="absolute inset-0 cursor-pointer rounded-xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-2.5 bottom-2.5 rounded-full bg-black/50 px-2 py-0.5 text-[0.625rem] font-medium tracking-wide text-white backdrop-blur-sm transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100"
          >
            say hello
          </span>
        </div>

        {/* Back — say hello */}
        <div
          inert={!flipped}
          className="absolute inset-0 flex flex-col rounded-xl border border-line bg-surface p-3 shadow-card [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-4"
        >
          <p className="font-serif text-lg leading-none italic sm:text-xl">
            Say hello
          </p>
          <p className="mt-2 text-[0.6875rem] leading-snug text-muted sm:text-xs">
            Open to roles, freelance, or just a conversation.
          </p>

          {/* The address itself is too long for a 144px card — it lives in the
              meta row and the contact section instead. */}
          <a
            href={`mailto:${site.email}`}
            className="group/mail mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-text px-2.5 py-1 text-[0.625rem] font-medium text-bg transition-opacity hover:opacity-85 sm:text-[0.6875rem]"
          >
            Email me
            <ArrowUpRight
              size={10}
              className="shrink-0 transition-transform duration-300 group-hover/mail:-translate-y-0.5 group-hover/mail:translate-x-0.5"
            />
          </a>

          {/* Four icons have to fit a 128px-wide card on mobile, so these run
              tighter than the pills elsewhere. */}
          <ul className="mt-auto flex items-center gap-1.5 pt-3" role="list">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid size-5 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-text"
                >
                  <BrandIcon name={social.brand} className="size-2.5" />
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toggle}
            aria-label="Flip back to photo"
            className="absolute top-2 right-2 grid size-6 place-items-center rounded-full text-faint transition-colors hover:bg-bg-subtle hover:text-text"
          >
            <RotateCcw size={11} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
