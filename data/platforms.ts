/**
 * Social platforms AUTIQ publishes to — kept explicit for recognition.
 */

export const platformsIntro = {
  id: "platforms",
  eyebrow: "Publishes to",
  headline: "Built for the channels you already use.",
  support:
    "Content Autopilot moves finished content to your social platforms — with approval where you want it.",
} as const;

export const socialPlatforms = [
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
  { id: "linkedin", label: "LinkedIn" },
] as const;

/** Compact hero strip — highest recognition first */
export const heroPlatforms = [
  "Instagram",
  "TikTok",
  "YouTube",
] as const;

/** Hero platform icons */
export const heroPlatformOutputs = [
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
] as const;
