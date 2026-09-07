import { cn } from "@/lib/cn";
import type { WorkflowNodeData } from "@/data/hero-workflow";

type WorkflowNodeProps = {
  node: WorkflowNodeData;
  compact?: boolean;
};

export function WorkflowNode({ node, compact = false }: WorkflowNodeProps) {
  const isSignalStatus = Boolean(node.signal);

  return (
    <article
      className={cn(
        "group w-full border border-border/80 bg-surface/80 transition-colors duration-200 hover:border-border hover:bg-elevated/50",
        compact ? "rounded-[4px] px-3 py-2.5" : "rounded-[6px] px-3.5 py-3",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="font-status text-[10px] text-text-secondary">
            {node.index}
          </p>
          <h3
            className={cn(
              "font-mono text-[12px] tracking-wide text-text-primary",
              compact && "truncate",
            )}
          >
            {node.label}
          </h3>
        </div>
        <p
          className={cn(
            "font-status shrink-0 text-[10px]",
            isSignalStatus ? "text-signal" : "text-text-secondary",
          )}
        >
          {isSignalStatus && node.status === "processing" ? (
            <span className="inline-flex items-center gap-1.5">
              <span
                className="size-1.5 rounded-full bg-signal"
                aria-hidden
              />
              {node.statusLabel}
            </span>
          ) : (
            node.statusLabel
          )}
        </p>
      </div>
    </article>
  );
}
