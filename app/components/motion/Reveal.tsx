"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  /** reveal once it has entered the viewport */
  once?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-reveal wrapper. Animates in when scrolled into view.
 * No-ops for users who prefer reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  x = 0,
  duration = 0.6,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : y, x: reduced ? 0 : x },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once, amount: 0.25, margin: "-60px" }}
      variants={variants}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
