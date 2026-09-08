/**
 * Public pricing — single source of truth.
 * DKK is the list currency; USD is the English display conversion (~0.155).
 */

import type { Locale } from "@/lib/i18n/types";

export type PricingTierId = "content-autopilot" | "autopilot-pro";

export type PricingTier = {
  id: PricingTierId;
  name: string;
  setupDkk: number | null;
  monthlyDkk: number | null;
  setupUsd: number | null;
  monthlyUsd: number | null;
  description: string | null;
  inclusions: string[];
  /** Subtle visual emphasis — no marketing badge copy */
  highlighted?: boolean;
};

export const pricingIntro = {
  headlineLine1: "Simple pricing.",
  headlineLine2: "Built around your content.",
} as const;

export const pricingTiers: PricingTier[] = [
  {
    id: "content-autopilot",
    name: "Content Autopilot",
    setupDkk: 4995,
    monthlyDkk: 995,
    setupUsd: 775,
    monthlyUsd: 155,
    description: null,
    inclusions: [
      "Content workflow",
      "Human approval",
      "Up to 3 channels",
    ],
    highlighted: true,
  },
  {
    id: "autopilot-pro",
    name: "Autopilot Pro",
    setupDkk: 7995,
    monthlyDkk: 1995,
    setupUsd: 1240,
    monthlyUsd: 310,
    description: null,
    inclusions: [
      "More channels & sources",
      "Advanced workflows",
      "Priority support",
    ],
  },
];

/** Plain integer string — no grouping commas. */
export function formatUsd(amount: number): string {
  return String(Math.round(amount));
}

/** Danish display: 4995,- (no "kr", no thousand separator). English: $775 */
export function formatMoney(
  amountDkk: number | null,
  amountUsd: number | null,
  locale: Locale,
): string {
  if (locale === "da") {
    if (amountDkk === null) return "—";
    return `${Math.round(amountDkk)},-`;
  }
  if (amountUsd === null) return "—";
  return `$${formatUsd(amountUsd)}`;
}
