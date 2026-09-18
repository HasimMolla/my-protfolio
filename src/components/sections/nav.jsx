"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { nav, site } from "@/lib/data";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter(Boolean)
      // The nav lists Work before Stack, but Stack comes first on the page —
      // the tiebreak below needs true document order, not menu order.
      .sort((a, b) => a.offsetTop - b.offsetTop);
    if (!sections.length) return;

    const order = sections.map((section) => section.id);

    // A callback only carries the sections whose state *changed*, so what is
    // currently in the band has to be tracked across calls. Deriving the active
    // id from that set is what lets it clear to "" over the hero, instead of
    // leaving the last section lit.
    const inBand = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        setActive(order.find((id) => inBand.has(id)) ?? "");
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center gap-1 px-4 sm:gap-4 sm:px-8">
        <a
          href="#top"
          aria-label={`${site.name} — back to top`}
          className="shrink-0 transition-opacity hover:opacity-60"
        >
          <Image
            src="/assets/signature.png"
            alt={site.name}
            width={1200}
            height={389}
            // Always above the fold and the usual LCP element.
            preload
            loading="eager"
            className="signature-ink h-8 w-auto sm:h-10"
          />
        </a>

        {/* Links scroll rather than push the page wide on narrow screens. */}
        <nav className="flex min-w-0 flex-1 items-center justify-end gap-0.5 overflow-x-auto [scrollbar-width:none] sm:gap-1 [&::-webkit-scrollbar]:hidden">
          {nav.map((item) => {
            const id = item.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative shrink-0 rounded-full px-2 py-1.5 text-xs transition-colors sm:px-3 sm:text-[0.8125rem]",
                  isActive ? "text-text" : "text-muted hover:text-text",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-pill"
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full bg-bg-subtle"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                {item.label}
              </a>
            );
          })}

          {/* A real route rather than an anchor, so it sits outside the
              scroll-spy list and never takes the active pill. */}
          <Link
            href="/resume"
            className="ml-1 shrink-0 rounded-full border border-line px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:bg-bg-subtle hover:text-text sm:px-3 sm:text-[0.8125rem]"
          >
            Résumé
          </Link>
        </nav>

        <ThemeToggle className="shrink-0" />
      </div>
    </header>
  );
}
