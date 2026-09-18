"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { nav, routes } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Full-screen menu for small screens.
 *
 * Five items in a 375px bar meant a horizontal scroller nobody would discover,
 * so below `sm` the links move in here behind a single control.
 */
export function MobileMenu({ open, onClose, isHome, active }) {
  const reduced = useReducedMotion();
  const closeRef = useRef(null);

  // Escape closes, and the page behind must not scroll while this is over it.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    // Move focus in, so the first Tab lands inside the menu rather than on
    // whatever was behind it.
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  const items = [
    ...nav.map((item) => ({
      ...item,
      href: isHome ? item.href : `/${item.href}`,
      // Anchors have to be plain <a> so the browser handles the hash.
      external: true,
      isActive: isHome && active === item.href.slice(1),
    })),
    ...routes.map((route) => ({ ...route, external: false, isActive: false })),
  ];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[60] bg-bg sm:hidden"
        >
          <div className="mx-auto flex h-full w-full max-w-3xl flex-col px-5">
            <div className="flex h-16 shrink-0 items-center justify-between">
              <p className="section-label">Menu</p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:bg-bg-subtle hover:text-text"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="mt-4" aria-label="Site">
              <ul role="list">
                {items.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: reduced ? 0 : 0.04 + index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-line"
                  >
                    {item.external ? (
                      <a
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center justify-between py-4 text-xl tracking-[-0.02em] transition-colors",
                          item.isActive ? "text-text" : "text-muted hover:text-text",
                        )}
                      >
                        {item.label}
                        {item.isActive ? (
                          <span
                            aria-hidden="true"
                            className="size-1.5 rounded-full bg-text"
                          />
                        ) : null}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block py-4 text-xl tracking-[-0.02em] text-muted transition-colors hover:text-text"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
