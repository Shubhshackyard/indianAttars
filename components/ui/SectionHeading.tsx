import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  action,
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className,
      )}
    >
      <div className={cn(align === "center" && "mx-auto max-w-2xl")}>
        {eyebrow && (
          <span className="font-label text-[0.65rem] uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </span>
        )}
        <h2
          className={cn(
            "mt-1.5 font-display text-h2 leading-tight",
            light ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p className={cn("mt-2", light ? "text-white/70" : "text-muted")}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
