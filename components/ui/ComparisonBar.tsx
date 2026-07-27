"use client";

import Link from "next/link";
import { X, GitCompare } from "lucide-react";
import { useUIStore } from "@/lib/ui";
import { getProductBySlug } from "@/lib/products";
import { ProductImage } from "./ProductImage";
import { buttonClasses } from "./Button";
import type { Product } from "@/types/product";

export function ComparisonBar() {
  const compare = useUIStore((s) => s.compare);
  const remove = useUIStore((s) => s.removeCompare);
  const clear = useUIStore((s) => s.clearCompare);

  if (compare.length === 0) return null;
  const products = compare
    .map(getProductBySlug)
    .filter((p): p is Product => Boolean(p));

  return (
    <div className="fixed bottom-16 left-1/2 z-40 w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 rounded-lg border border-line bg-bg/95 p-3 shadow-lift backdrop-blur lg:bottom-4">
      <div className="flex items-center gap-3">
        <span className="hidden shrink-0 font-label text-[0.6rem] uppercase tracking-[0.12em] text-muted sm:block">
          Compare
        </span>
        <div className="flex flex-1 gap-2 overflow-x-auto">
          {products.map((p) => (
            <div
              key={p.slug}
              className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md"
              title={p.name}
            >
              <ProductImage
                name=""
                category={p.category}
                showName={false}
                iconSize={22}
              />
              <button
                onClick={() => remove(p.slug)}
                aria-label={`Remove ${p.name}`}
                className="absolute right-0 top-0 bg-ink/70 p-0.5 text-white"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
        <Link
          href="/compare"
          className={buttonClasses({ variant: "primary", size: "sm" })}
        >
          <GitCompare size={14} /> Compare ({products.length})
        </Link>
        <button
          onClick={clear}
          className="shrink-0 text-xs text-muted hover:text-primary"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
