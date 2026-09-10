import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "gold"
  | "success"
  | "copper"
  | "surface"
  | "outline"
  | "rare";

const variantMap: Record<BadgeVariant, string> = {
  gold: "bg-accent-soft text-accent-hover border border-accent/25",
  success: "bg-success-soft text-success border border-success/25",
  copper: "bg-accent-soft text-accent-hover border border-accent/25",
  surface: "bg-surface text-muted border border-line",
  outline: "border border-line text-muted",
  // Rare — solid gold chip (no gradient), ink text for AA contrast
  rare: "bg-accent text-ink border border-accent-hover/30",
};

export function Badge({
  children,
  variant = "surface",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-2.5 py-1 font-label text-[0.6rem] uppercase tracking-[0.12em] leading-none",
        variantMap[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
