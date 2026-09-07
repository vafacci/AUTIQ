/**
 * Booking page — minimal copy.
 * Cal.com link from NEXT_PUBLIC_CAL_LINK (path or full URL).
 */

export const bookingIntro = {
  eyebrow: "Book a call",
  headline: "Let's see what we can automate.",
  support:
    "A short call to map your content workflow and where automation fits.",
} as const;

export const bookingDetails = [
  { id: "duration", label: "30 minutes" },
  { id: "format", label: "Video call" },
  { id: "commitment", label: "No commitment" },
] as const;

export const bookingSuccess = {
  eyebrow: "Call booked",
  headline: "We'll review your workflow before we speak.",
  support: "A confirmation email will contain the meeting details.",
} as const;

/** Accepts full Cal URL or `user/event` path. */
export function resolveCalLink(
  raw = process.env.NEXT_PUBLIC_CAL_LINK,
): string {
  const fallback = "dayan-vafai-qalcwc/autiq";
  const value = (raw ?? fallback).trim();
  if (!value) return fallback;

  try {
    if (value.startsWith("http://") || value.startsWith("https://")) {
      const url = new URL(value);
      return url.pathname.replace(/^\/+|\/+$/g, "");
    }
  } catch {
    /* use as path */
  }

  return value.replace(/^\/+|\/+$/g, "");
}
