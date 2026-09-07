/**
 * Public pricing — single source of truth.
 * Amounts in USD (converted from DKK list prices at ~0.155).
 */

export type PricingTierId = "content-autopilot" | "autopilot-pro";

export type PricingTier = {
  id: PricingTierId;
  name: string;
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

export const pricingNotes = {
  thirdParty: "Third-party software costs are billed separately.",
} as const;

/** Plain integer string — no grouping commas. */
export function formatUsd(amount: number): string {
  return String(Math.round(amount));
}
