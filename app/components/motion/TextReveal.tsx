"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";

/**
 * Masked, staggered word/line reveal for headings.
 * Splits on spaces; each word rises out of a clipped box.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  as: Tag = "h1",
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    );
  }

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.12em", verticalAlign: "top" }}
          aria-hidden="true"
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
