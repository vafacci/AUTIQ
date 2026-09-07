import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  onClick,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        variant === "primary" ? "btn-primary" : "btn-secondary",
        "inline-flex items-center justify-center rounded-[4px] px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200",
        variant === "primary" && "hover:bg-white",
        variant === "secondary" &&
          "hover:border-text-secondary/40 hover:bg-elevated/40",
        className,
      )}
    >
      {children}
    </a>
  );
}
