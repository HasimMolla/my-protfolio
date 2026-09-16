"use client";

import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useHydrated } from "@/lib/hooks";

export function ThemeToggle({ className = "" }) {
  const { resolvedTheme, setTheme } = useTheme();

  // The server has no idea which theme will resolve, so hold the icon back
  // until after hydration and reserve its space in the meantime.
  const mounted = useHydrated();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Switch theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-bg-subtle hover:text-text sm:size-9 ${className}`}
    >
      <AnimatePresence initial={false} mode="wait">
        {mounted ? (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 grid place-items-center"
          >
            {isDark ? <Moon size={16} /> : <Sun size={16} />}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </button>
  );
}
