/**
 * Motion / accessibility helpers.
 * Prefer CSS for simple transitions; Motion for React-driven micro-interactions;
 * GSAP + ScrollTrigger only for complex timeline / pinned / scrubbed sequences.
 */

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Use with GSAP matchMedia:
 * mm.add("(prefers-reduced-motion: reduce)", () => { ... static layout ... })
 */
export const REDUCED_MOTION_MQ = "(prefers-reduced-motion: reduce)";
export const NO_REDUCED_MOTION_MQ = "(prefers-reduced-motion: no-preference)";
