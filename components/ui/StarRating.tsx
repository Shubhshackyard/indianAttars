import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  count,
  size = 14,
  showValue = true,
  className,
}: {
  rating: number;
  count?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  const stars = Array.from({ length: 5 });
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div
        className="relative inline-flex"
        role="img"
        aria-label={`Rated ${rating} out of 5`}
      >
        <div className="flex text-line">
          {stars.map((_, i) => (
            <Star key={i} size={size} strokeWidth={1.5} />
          ))}
        </div>
        <div
          className="absolute inset-0 flex overflow-hidden text-gold"
          style={{ width: `${pct}%` }}
        >
          {stars.map((_, i) => (
            <Star key={i} size={size} strokeWidth={1.5} fill="currentColor" />
          ))}
        </div>
      </div>
      {showValue && (
        <span className="text-xs font-medium text-muted">
          {rating.toFixed(1)}
          {typeof count === "number" && (
            <span className="text-muted/70"> ({count})</span>
          )}
        </span>
      )}
    </div>
  );
}
