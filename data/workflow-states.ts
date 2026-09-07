/**
 * Canonical workflow states for Content Autopilot.
 * Used by UI labels and future signature flow animation.
 */

export type WorkflowStateId =
  | "uploaded"
  | "processing"
  | "awaiting_approval"
  | "scheduled"
  | "published"
  | "failed";

export type WorkflowState = {
  id: WorkflowStateId;
  index: string;
  label: string;
  signal?: "live" | "success" | "warning" | "neutral";
};

export const workflowStates: WorkflowState[] = [
  { id: "uploaded", index: "01", label: "UPLOADED", signal: "neutral" },
  { id: "processing", index: "02", label: "PROCESSING", signal: "live" },
  {
    id: "awaiting_approval",
    index: "03",
    label: "AWAITING_APPROVAL",
    signal: "neutral",
  },
  { id: "scheduled", index: "04", label: "SCHEDULED", signal: "neutral" },
  { id: "published", index: "05", label: "PUBLISHED", signal: "success" },
];

/** Conceptual pipeline for the future signature animation — not UI yet. */
export const workflowPipeline = [
  "CONTENT",
  "AI_PREP",
  "READY_FOR_REVIEW",
  "APPROVED",
  "SCHEDULE",
  "PUBLISH",
] as const;
