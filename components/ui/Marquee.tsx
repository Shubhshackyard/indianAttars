import { cn } from "@/lib/utils";

export function Marquee({
  items,
  separator = "•",
  slow = false,
  className,
  itemClassName,
}: {
  items: string[];
  separator?: string;
  slow?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  const group = (
    <div className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          <span className={cn("whitespace-nowrap", itemClassName)}>{it}</span>
          <span className="mx-4 opacity-50" aria-hidden>
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("marquee-paused overflow-hidden", className)} aria-hidden>
      <div className={cn("marquee-track", slow && "marquee-track--slow")}>
        {group}
        {group}
      </div>
    </div>
  );
}
