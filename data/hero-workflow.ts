export type WorkflowNodeStatus =
  | "ready"
  | "processing"
  | "complete"
  | "approved"
  | "idle"
  | "awaiting";

export type WorkflowNodeData = {
  id: string;
  index: string;
  label: string;
  status: WorkflowNodeStatus;
  statusLabel: string;
  /** Active system signal — orange accent, used sparingly */
  signal?: boolean;
};

export type PublishTarget = {
  id: string;
  label: string;
};

/** Static hero pipeline — composition only; animation comes later. */
export const heroWorkflowNodes: WorkflowNodeData[] = [
  {
    id: "video",
    index: "01",
    label: "VIDEO_014.mp4",
    status: "ready",
    statusLabel: "READY",
  },
  {
    id: "prep",
    index: "02",
    label: "CONTENT_PREP",
    status: "processing",
    statusLabel: "PROCESSING",
    signal: true,
  },
  {
    id: "review",
    index: "03",
    label: "READY_FOR_REVIEW",
    status: "awaiting",
    statusLabel: "AWAITING",
  },
  {
    id: "approved",
    index: "04",
    label: "APPROVED",
    status: "approved",
    statusLabel: "APPROVED",
    signal: true,
  },
  {
    id: "buffer",
    index: "05",
    label: "BUFFER",
    status: "idle",
    statusLabel: "HANDOFF",
  },
];

export const heroPublishTargets: PublishTarget[] = [
  { id: "instagram", label: "INSTAGRAM" },
  { id: "tiktok", label: "TIKTOK" },
  { id: "youtube", label: "YOUTUBE" },
];
