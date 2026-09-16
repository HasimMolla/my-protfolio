"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";

export function CopyEmail({ email, className = "" }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (insecure context, denied permission) — the
      // mailto link next to this button is the fallback, so just stay quiet.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email address copied" : `Copy ${email} to clipboard`}
      className={`group inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-[0.8125rem] text-muted transition-colors hover:border-line-strong hover:bg-bg-subtle hover:text-text ${className}`}
    >
      <span className="relative grid size-3.5 place-items-center">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={copied ? "check" : "copy"}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 grid place-items-center"
          >
            {copied ? (
              <Check size={14} className="text-emerald-500" />
            ) : (
              <Copy size={14} />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-hidden="true">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
