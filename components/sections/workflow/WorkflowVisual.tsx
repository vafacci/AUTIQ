"use client";

import { cn } from "@/lib/cn";
import {
  workflowPublishTargets,
  workflowStages,
  type WorkflowStage,
} from "@/data/workflow-stages";

type WorkflowVisualProps = {
  className?: string;
  activeIndex?: number;
  /** Tighter type + spacing for phone pin layout */
  compact?: boolean;
  /** Vertical stack for phone — horizontal on desktop */
  orientation?: "horizontal" | "vertical";
  /** Localized stage copy */
  stages?: WorkflowStage[];
};

/**
 * System diagram — horizontal on desktop, vertical (downward) on phone.
 * Stages are interactive so users can jump after (or during) the scroll story.
 */
export function WorkflowVisual({
  className,
  activeIndex = 0,
  compact = false,
  orientation = "horizontal",
  stages = workflowStages,
}: WorkflowVisualProps) {
  const vertical = orientation === "vertical";

  return (
    <div
      className={cn("workflow-visual relative w-full", className)}
      data-active-stage={activeIndex}
      data-compact={compact ? "true" : undefined}
      data-orientation={orientation}
      role="group"
      aria-label="AUTIQ workflow"
    >
      {vertical ? (
        <VerticalPipeline compact={compact} stages={stages} />
      ) : (
        <HorizontalPipeline compact={compact} stages={stages} />
      )}
    </div>
  );
}

function HorizontalPipeline({
  compact,
  stages,
}: {
  compact: boolean;
  stages: WorkflowStage[];
}) {
  return (
    <ol className="relative flex items-start">
      {stages.map((stage, index) => {
        const isLast = index === stages.length - 1;
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
                  <PublishBranch compact={compact} />
                ) : (
                  <StatusLabel
                    compact={compact}
                    active={stage.activeStatus}
                    complete={
                      isSchedule ? "14:30" : stage.completeStatus
                    }
                  />
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function VerticalPipeline({
  compact,
  stages,
}: {
  compact: boolean;
  stages: WorkflowStage[];
}) {
  return (
    <ol className="relative flex flex-col">
      {stages.map((stage, index) => {
        const isLast = index === stages.length - 1;
        const isPublish = stage.id === "publish";
        const isSchedule = stage.id === "schedule";

        return (
          <li key={stage.id} className="relative flex min-w-0 flex-col">
            <div
              role="button"
              tabIndex={0}
              data-stage-card={index}
              className={cn(
                "relative z-[1] flex w-full cursor-pointer items-center gap-3 rounded-[4px] text-left transition-opacity",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              aria-label={`Show step ${stage.index}: ${stage.title}`}
            >
              <span
                data-signal-dot={index}
                className="relative z-[1] size-2.5 shrink-0 rounded-full border border-border bg-background"
                aria-hidden
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
                  <p
                    data-node-label
                    className="font-status text-[11px] tracking-[0.12em] text-text-secondary uppercase"
                  >
                    {stage.nodeLabel}
                  </p>
                  {!isPublish ? (
                    <StatusLabel
                      compact
                      className="mt-0"
                      active={stage.activeStatus}
                      complete={
                        isSchedule ? "14:30" : stage.completeStatus
                      }
                    />
                  ) : null}
                </div>

                {isPublish ? (
                  <PublishBranch variant="inline" className="mt-1.5" />
                ) : null}
              </div>
            </div>

            <span data-stem={index} className="hidden" aria-hidden />

            {!isLast ? (
              <div
                className="relative ml-[4px] h-4 w-px bg-border/60"
                aria-hidden
              >
                <div
                  data-connector-fill={index}
                  className="absolute inset-x-0 top-0 h-0 w-full bg-signal"
                />
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

function StatusLabel({
  active,
  complete,
  compact,
  className,
}: {
  active: string;
  complete: string;
  compact: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-1 font-status text-text-secondary uppercase",
        compact
          ? "text-[8px] tracking-[0.08em]"
          : "text-[10px] tracking-[0.1em]",
        className,
      )}
      data-status
      data-pending="—"
      data-active={active}
      data-complete={complete}
    >
      —
    </p>
  );
}

function PublishBranch({
  compact = false,
  variant = "tree",
  className,
}: {
  compact?: boolean;
  /** inline = single row for phone; tree = desktop branch */
  variant?: "tree" | "inline";
  className?: string;
}) {
  if (variant === "inline") {
    return (
      <ul
        className={cn(
          "flex flex-wrap items-center gap-x-3 gap-y-1 font-status text-[9px] tracking-[0.08em] text-text-secondary uppercase",
          className,
        )}
      >
        {workflowPublishTargets.map((target, tIndex) => (
          <li
            key={target.id}
            data-publish-target={tIndex}
            className="flex items-center gap-1.5 opacity-35"
          >
            <span
              data-publish-dot={tIndex}
              className="size-1.5 shrink-0 rounded-full bg-border"
              aria-hidden
            />
            {target.label}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul
      className={cn(
        "relative mt-0 font-status text-text-secondary uppercase",
        compact
          ? "text-[10px] tracking-[0.08em]"
          : "text-[10px] tracking-[0.1em]",
        className,
      )}
    >
      {workflowPublishTargets.map((target, tIndex) => {
        const isFinal = tIndex === workflowPublishTargets.length - 1;
        return (
          <li
            key={target.id}
            data-publish-target={tIndex}
            className={cn(
              "relative flex items-center opacity-35",
              compact ? "h-5" : "h-6",
              tIndex > 0 && "mt-0.5",
            )}
          >
            {!isFinal && (
              <span
                className="absolute top-1/2 left-0 h-[calc(100%+0.125rem)] w-px bg-border/50"
                aria-hidden
              />
            )}
            <span
              className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-border/50"
              aria-hidden
            />
            <span className="w-[6.5rem] pl-[1.35rem]">{target.label}</span>
            <span
              data-publish-dot={tIndex}
              className="size-1.5 shrink-0 rounded-full bg-border"
              aria-hidden
            />
          </li>
        );
      })}
    </ul>
  );
}
