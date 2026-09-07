import {
  heroPublishTargets,
  heroWorkflowNodes,
} from "@/data/hero-workflow";
import { WorkflowConnector } from "./WorkflowConnector";
import { WorkflowNode } from "./WorkflowNode";

export function HeroWorkflow() {
  return (
    <div
      className="relative w-full"
      role="img"
      aria-label="Content Autopilot workflow: video to content prep, review, approval, Buffer handoff, then publish to Instagram, TikTok, and YouTube"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #F4F5F6 1px, transparent 1px), linear-gradient(to bottom, #F4F5F6 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)",
        }}
        aria-hidden
      />

      <div className="relative rounded-[8px] border border-border/60 bg-background/40 p-3 sm:p-4 lg:p-5">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-border/50 pb-3">
          <p className="font-status text-[10px] text-text-secondary">
            PIPELINE / LIVE
          </p>
          <p className="font-status inline-flex items-center gap-1.5 text-[10px] text-signal">
            <span className="size-1.5 rounded-full bg-signal" aria-hidden />
            PROCESSING
          </p>
        </div>

        {/* Desktop / tablet */}
        <div className="hidden sm:block">
          <ol className="mx-auto flex max-w-[22rem] flex-col lg:max-w-[24rem]">
            {heroWorkflowNodes.map((node, index) => {
              const isLast = index === heroWorkflowNodes.length - 1;
              // Active energy between CONTENT_PREP and READY_FOR_REVIEW
              const connectorActive = node.id === "prep";

              return (
                <li key={node.id} className="flex flex-col">
                  <WorkflowNode node={node} />
                  {!isLast && <WorkflowConnector active={connectorActive} />}
                </li>
              );
            })}
          </ol>

          <div className="mx-auto mt-0 flex max-w-[22rem] flex-col items-center lg:max-w-[24rem]">
            <div
              className="relative mt-1 h-5 w-full max-w-[17rem]"
              aria-hidden
            >
              <div className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-border" />
              <div className="absolute top-2 left-[8%] right-[8%] h-px bg-border" />
              <div className="absolute top-2 left-[8%] h-3 w-px bg-border" />
              <div className="absolute top-2 left-1/2 h-3 w-px -translate-x-1/2 bg-border" />
              <div className="absolute top-2 right-[8%] h-3 w-px bg-border" />
            </div>

            <ul className="grid w-full grid-cols-3 gap-2">
              {heroPublishTargets.map((target) => (
                <li key={target.id}>
                  <div className="rounded-[4px] border border-border/70 bg-elevated/40 px-2 py-2.5 text-center transition-colors duration-200 hover:border-border hover:bg-elevated/70">
                    <p className="font-status text-[10px] text-text-secondary">
                      {target.label}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-3 font-status text-[10px] text-text-secondary">
              PUBLISH
            </p>
          </div>
        </div>

        {/* Mobile: simplified linear stack */}
        <ol className="flex flex-col sm:hidden">
          {heroWorkflowNodes.map((node, index) => (
            <li key={node.id} className="flex flex-col">
              <WorkflowNode node={node} compact />
              {index < heroWorkflowNodes.length - 1 && (
                <WorkflowConnector active={node.id === "prep"} />
              )}
            </li>
          ))}
          <li className="mt-1">
            <div className="rounded-[4px] border border-border/70 bg-elevated/40 px-3 py-2.5">
              <p className="font-status text-[10px] text-text-secondary">
                PUBLISH
              </p>
              <p className="mt-1.5 font-mono text-[11px] tracking-wide text-text-primary">
                INSTAGRAM · TIKTOK · YOUTUBE
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
