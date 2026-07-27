import { cn } from "@/lib/utils";

function Shimmer() {
  return (
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-line bg-surface",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-line/40">
        <Shimmer />
      </div>
      <div className="space-y-3 p-4">
        <div className="relative h-3 w-1/3 overflow-hidden rounded bg-line/50">
          <Shimmer />
        </div>
        <div className="relative h-4 w-2/3 overflow-hidden rounded bg-line/50">
          <Shimmer />
        </div>
        <div className="relative h-4 w-1/2 overflow-hidden rounded bg-line/40">
          <Shimmer />
        </div>
        <div className="relative h-9 w-full overflow-hidden rounded-pill bg-line/40">
          <Shimmer />
        </div>
      </div>
    </div>
  );
}
