import { cn } from "@/lib/cn";

type WorkflowNodeProps = {
  index: string;
  label: string;
  status: string;
  /** pending | active | complete */
  state?: "pending" | "active" | "complete";
  children?: React.ReactNode;
  className?: string;
  "data-node"?: string;
};

export function WorkflowNode({
  index,
  label,
  status,
  state = "pending",
  children,
  className,
  "data-node": dataNode,
}: WorkflowNodeProps) {
  return (
    <article
      data-node={dataNode}
      data-state={state}
      className={cn(
        "workflow-node w-full rounded-[5px] border px-3.5 py-3 transition-[border-color,background-color,opacity] duration-300",
        state === "pending" &&
          "border-border/50 bg-surface/40 opacity-45",
        state === "active" &&
          "border-border bg-elevated/80 opacity-100",
        state === "complete" &&
          "border-border/70 bg-surface/60 opacity-80",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="font-status text-[10px] text-text-secondary">
            {index}
          </p>
          <h3 className="truncate font-mono text-[12px] tracking-wide text-text-primary">
            {label}
          </h3>
        </div>
        <p
          className={cn(
            "font-status shrink-0 text-[10px]",
            state === "active" ? "text-signal" : "text-text-secondary",
          )}
        >
          {state === "active" && status.includes("PROCESSING") ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-signal" aria-hidden />
              {status}
            </span>
          ) : (
            status
          )}
        </p>
      </div>
      {children}
    </article>
  );
}
