import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 text-xs text-muted"
    >
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={13} className="text-line" />}
          {it.href ? (
            <Link href={it.href} className="hover:text-primary">
              {it.label}
            </Link>
          ) : (
            <span className="text-ink">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
