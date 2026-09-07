import { cn } from "@/lib/cn";
import { workflowStages } from "@/data/workflow-stages";

type WorkflowProgressProps = {
  activeIndex: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
};

export function WorkflowProgress({
  activeIndex,
  orientation = "horizontal",
  className,
}: WorkflowProgressProps) {
  const isVertical = orientation === "vertical";

  return (
    <ol
      className={cn(
        "flex",
        isVertical ? "flex-col gap-3" : "items-center gap-2",
        className,
      )}
      aria-label="Workflow progress"
    >
      {workflowStages.map((stage, index) => {
        const active = index === activeIndex;
        const complete = index < activeIndex;
        return (
          <li key={stage.id} className="flex items-center gap-2">
            <span
              data-progress-index={index}
              className={cn(
                "font-status text-[10px] transition-colors duration-300",
                active || complete ? "text-signal" : "text-text-secondary/50",
              )}
            >
              {stage.index}
            </span>
            {!isVertical && index < workflowStages.length - 1 && (
              <span
                className={cn(
                  "h-px w-4 transition-colors duration-300",
                  complete ? "bg-signal/70" : "bg-border",
                )}
                aria-hidden
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
