"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Reveals a line one character at a time. The animated glyphs are hidden from
 * assistive tech and the real string is exposed once via aria-label, so screen
 * readers and crawlers still see an ordinary heading.
 */
export function TextReveal({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.022,
  highlight,
  highlightClassName = "",
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return (
      <Tag className={className}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={word === highlight ? highlightClassName : undefined}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

  let charIndex = 0;

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          // inline-block on the word keeps wrapping sane while letters animate
          <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, i) => {
              const index = charIndex++;
              return (
                <motion.span
                  key={`${char}-${i}`}
                  className={`inline-block ${word === highlight ? highlightClassName : ""}`}
                  initial={{ opacity: 0, y: "0.4em", filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
                  transition={{
                    duration: 0.5,
                    delay: delay + index * stagger,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
            {wordIndex < words.length - 1 ? (
              <span className="inline-block">&nbsp;</span>
            ) : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}
