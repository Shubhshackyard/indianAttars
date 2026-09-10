import Link from "next/link";
import { resolveBlendsWith } from "@/lib/products";
import type { Product } from "@/types/product";

export function BlendsWithStrip({ product }: { product: Product }) {
  const blends = resolveBlendsWith(product);
  if (!blends.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {blends.map((b) =>
        b.slug ? (
          <Link
            key={b.name}
            href={`/products/${b.slug}`}
            className="rounded-pill border border-line bg-surface/50 px-3 py-1.5 text-sm text-ink transition-colors hover:border-primary hover:text-primary"
          >
            + {b.name}
          </Link>
        ) : (
          <span
            key={b.name}
            className="rounded-pill border border-line bg-surface/50 px-3 py-1.5 text-sm text-muted"
          >
            + {b.name}
          </span>
        ),
      )}
    </div>
  );
}
