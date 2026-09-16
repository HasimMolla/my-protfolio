"use client";

import Image from "next/image";
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
    const ids = nav.map((item) => item.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Whichever tracked section is nearest the top of the viewport wins.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
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
            className="signature-ink h-5 w-auto sm:h-7"
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
        </nav>

        <ThemeToggle className="shrink-0" />
      </div>
    </header>
  );
}
