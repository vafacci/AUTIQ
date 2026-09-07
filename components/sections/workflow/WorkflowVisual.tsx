"use client";

import { cn } from "@/lib/cn";
import {
  workflowPublishTargets,
  workflowStages,
} from "@/data/workflow-stages";

type WorkflowVisualProps = {
  className?: string;
  activeIndex?: number;
  /** Tighter type + spacing for phone pin layout */
  compact?: boolean;
};

/**
 * Horizontal system diagram — not a progress bar.
 * Nodes + stems + states; publish fans out to platforms.
 * Stages are interactive so users can jump after (or during) the scroll story.
 */
export function WorkflowVisual({
  className,
  activeIndex = 0,
  compact = false,
}: WorkflowVisualProps) {
  return (
    <div
      className={cn("workflow-visual relative w-full", className)}
      data-active-stage={activeIndex}
      data-compact={compact ? "true" : undefined}
      role="group"
      aria-label="AUTIQ workflow from finished content to published posts"
    >
      <ol className="relative flex items-start">
        {workflowStages.map((stage, index) => {
          const isLast = index === workflowStages.length - 1;
          const isPublish = stage.id === "publish";
          const isSchedule = stage.id === "schedule";

          return (
            <li
              key={stage.id}
              className={cn(
                "relative flex min-w-0",
                isLast ? (compact ? "flex-[1.35]" : "flex-[1.15]") : "flex-1",
              )}
            >
              <div
                role="button"
                tabIndex={0}
                data-stage-card={index}
                className={cn(
                  "relative z-[1] flex w-full min-w-0 cursor-pointer flex-col items-start rounded-[4px] text-left transition-opacity",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "hover:opacity-100",
                )}
                aria-label={`Show step ${stage.index}: ${stage.title}`}
              >
                <p
                  data-node-label
                  className={cn(
                    "font-status text-text-secondary uppercase",
                    compact
                      ? "text-[8px] tracking-[0.1em]"
                      : "text-[10px] tracking-[0.14em]",
                  )}
                >
                  {stage.nodeLabel}
                </p>

                <div
                  className={cn(
                    "relative flex w-full items-center",
                    compact ? "mt-2" : "mt-3",
                  )}
                >
                  <span
                    data-signal-dot={index}
                    className={cn(
                      "relative z-[1] shrink-0 rounded-full border border-border bg-background",
                      compact ? "size-[9px]" : "size-[11px]",
                    )}
                    aria-hidden
                  />

                  {!isLast && (
                    <div
                      className={cn(
                        "relative h-px flex-1 bg-border/60",
                        compact ? "ml-1.5" : "ml-2",
                      )}
                      aria-hidden
                    >
                      <div
                        data-connector-fill={index}
                        className="absolute inset-y-0 left-0 w-0 bg-signal"
                      />
                      <span className="absolute top-1/2 right-0 size-1 -translate-y-1/2 translate-x-1/2 rotate-45 border-t border-r border-border/80" />
                    </div>
                  )}
                </div>

                <div
                  className={cn(
                    "mt-0 flex flex-col items-start",
                    compact ? "pl-[4px]" : "pl-[5px]",
                  )}
                >
                  <span
                    className={cn(
                      "w-px bg-border/50",
                      isPublish
                        ? compact
                          ? "h-4"
                          : "h-6"
                        : compact
                          ? "h-3.5"
                          : "h-5",
                    )}
                    aria-hidden
                    data-stem={index}
                  />

                  {isPublish ? (
                    <ul
                      className={cn(
                        "relative mt-0 font-status text-text-secondary uppercase",
                        compact
                          ? "text-[8px] tracking-[0.08em]"
                          : "text-[10px] tracking-[0.1em]",
                      )}
                    >
                      {workflowPublishTargets.map((target, tIndex) => {
                        const isFinal =
                          tIndex === workflowPublishTargets.length - 1;
                        return (
                          <li
                            key={target.id}
                            data-publish-target={tIndex}
                            className={cn(
                              "relative flex items-center opacity-35",
                              compact ? "h-5" : "h-6",
                              tIndex > 0 && (compact ? "mt-0" : "mt-0.5"),
                            )}
                          >
                            {!isFinal && (
                              <span
                                className={cn(
                                  "absolute top-1/2 left-0 w-px bg-border/50",
                                  compact
                                    ? "h-[calc(100%+0.05rem)]"
                                    : "h-[calc(100%+0.125rem)]",
                                )}
                                aria-hidden
                              />
                            )}
                            <span
                              className={cn(
                                "absolute top-1/2 left-0 h-px -translate-y-1/2 bg-border/50",
                                compact ? "w-3" : "w-4",
                              )}
                              aria-hidden
                            />
                            <span
                              className={cn(
                                compact
                                  ? "w-[4.75rem] pl-4"
                                  : "w-[6.5rem] pl-[1.35rem]",
                              )}
                            >
                              {target.label}
                            </span>
                            <span
                              data-publish-dot={tIndex}
                              className="size-1.5 shrink-0 rounded-full bg-border"
                              aria-hidden
                            />
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p
                      className={cn(
                        "mt-1 font-status text-text-secondary uppercase",
                        compact
                          ? "text-[8px] tracking-[0.08em]"
                          : "text-[10px] tracking-[0.1em]",
                      )}
                      data-status
                      data-pending="—"
                      data-active={stage.activeStatus}
                      data-complete={
                        isSchedule ? "14:30" : stage.completeStatus
                      }
                    >
                      —
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
