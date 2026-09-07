import { cn } from "@/lib/cn";

type WorkflowConnectorProps = {
  active?: boolean;
  className?: string;
};

/** Thin vertical connector — orange only when marking active energy. */
export function WorkflowConnector({
  active = false,
  className,
}: WorkflowConnectorProps) {
  return (
    <div
      className={cn("flex h-4 w-full items-center justify-center", className)}
      aria-hidden
    >
      <div
        className={cn(
          "h-full w-px",
          active ? "bg-signal" : "bg-border",
        )}
      />
    </div>
  );
}
