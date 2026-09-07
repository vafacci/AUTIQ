/**
 * How it works — Content Autopilot workflow stages.
 * Plain language. No technical underscores.
 */

export type WorkflowStageId =
  | "drop"
  | "prepare"
  | "control"
  | "schedule"
  | "publish";

export type WorkflowStage = {
  id: WorkflowStageId;
  index: string;
  title: string;
  microcopy: string;
  nodeLabel: string;
  activeStatus: string;
  completeStatus: string;
};

export const workflowIntro = {
  headlineLine1: "From finished content",
  headlineLine2: "to published post.",
  support: "We automate the repetitive work in between.",
} as const;

export const workflowStages: WorkflowStage[] = [
  {
    id: "drop",
    index: "01",
    title: "Drop it in",
    microcopy: "Add finished content to your normal workflow.",
    nodeLabel: "Video",
    activeStatus: "Received",
    completeStatus: "Ready",
  },
  {
    id: "prepare",
    index: "02",
    title: "We prepare it",
    microcopy: "The repetitive work happens automatically.",
    nodeLabel: "Prepare",
    activeStatus: "Processing",
    completeStatus: "Prepared",
  },
  {
    id: "control",
    index: "03",
    title: "You stay in control",
    microcopy: "Review only where human judgement matters.",
    nodeLabel: "Review",
    activeStatus: "Waiting",
    completeStatus: "Approved",
  },
  {
    id: "schedule",
    index: "04",
    title: "It moves on",
    microcopy: "Approved content moves forward automatically.",
    nodeLabel: "Schedule",
    activeStatus: "Routing",
    completeStatus: "Scheduled",
  },
  {
    id: "publish",
    index: "05",
    title: "Published",
    microcopy: "You create. The system handles the rest.",
    nodeLabel: "Publish",
    activeStatus: "Publishing",
    completeStatus: "Done",
  },
];

export const workflowPublishTargets = [
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
] as const;

export const CONTENT_ARTIFACT = "Video";
