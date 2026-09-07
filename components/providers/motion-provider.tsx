"use client";

import { MotionConfig } from "motion/react";

/**
 * Honours prefers-reduced-motion for Motion animations site-wide.
 * GSAP timelines should still check reduced motion via lib/motion helpers.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
