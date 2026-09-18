"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { nav, routes, site } from "@/lib/data";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { MobileMenu } from "@/components/sections/mobile-menu";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  // The section anchors only exist on the landing page. Everywhere else they
  // have to become "/#work" so they route home first, and the scroll-spy has
  // nothing to watch.
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

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
  }, [isHome]);

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
        <Link
          href={isHome ? "#top" : "/"}
          aria-label={isHome ? `${site.name} — back to top` : `${site.name} — home`}
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
        </Link>

        {/* Small screens get the menu below instead of a cramped scroller. */}

        
        <nav className="hidden min-w-0 flex-1 items-center justify-end gap-1 sm:flex">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="shrink-0 rounded-full px-2 py-1.5 text-xs text-muted transition-colors hover:text-text sm:px-3 sm:text-[0.8125rem]"
            >
              <span className="link-underline">{route.label}</span>
            </Link>
          ))}
          {nav.map((item) => {
            const id = item.href.slice(1);
            const isActive = isHome && active === id;
            return (
              // Deliberately a plain <a>, not <Link>. In-page it scrolls
              // natively; off the landing page it does a full navigation and
              // the browser honours the hash. Routing this through <Link>
              // left you at the top of the page, because Next's scroll-to-top
              // runs after the router commits the new URL.

              
              <a
                key={item.href}
                href={isHome ? item.href : `/${item.href}`}
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
                {/* Inner span so the underline tracks the text, not the pill's
                    padding box — same treatment as the contact links. */}
                <span className="link-underline">{item.label}</span>
              </a>
            );
          })}

          {/* Real routes, not anchors — kept outside the scroll-spy list above
              so they never take the active pill. */}
          
        </nav>

        {/* Pushes the controls right once the link row is hidden. */}
        <div className="flex flex-1 items-center justify-end gap-1 sm:flex-none">
          <ThemeToggle className="shrink-0" />
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-bg-subtle hover:text-text sm:hidden"
          >
            <Menu size={17} />
          </button>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        isHome={isHome}
        active={active}
      />
    </header>
  );
}
