"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Global motion config; honor the user's reduced-motion preference. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
