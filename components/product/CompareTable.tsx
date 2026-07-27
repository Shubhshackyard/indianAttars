"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useUIStore } from "@/lib/ui";
import { getProductBySlug } from "@/lib/products";
import { ProductImage } from "@/components/ui/ProductImage";
import { buttonClasses } from "@/components/ui/Button";
import { priceRangeLabel } from "@/lib/utils";
import type { Product } from "@/types/product";

const ROWS: { label: string; get: (p: Product) => string }[] = [
  { label: "Category", get: (p) => p.categoryLabel },
  { label: "Price Range", get: (p) => priceRangeLabel(p.slabs) },
  { label: "Rating", get: (p) => `${p.rating} (${p.reviewCount})` },
  { label: "Botanical Name", get: (p) => p.spec.botanicalName ?? "—" },
  { label: "CAS #", get: (p) => p.spec.casNumber ?? "—" },
  { label: "Origin", get: (p) => p.spec.countryOfOrigin ?? "—" },
  { label: "Aroma", get: (p) => p.spec.aroma ?? "—" },
  { label: "Extraction", get: (p) => p.spec.extractionMethod ?? "—" },
  { label: "Shelf Life", get: (p) => p.spec.shelfLife ?? "—" },
  { label: "Major Constituents", get: (p) => p.spec.majorConstituents ?? "—" },
];

export function CompareTable() {
  const compare = useUIStore((s) => s.compare);
  const remove = useUIStore((s) => s.removeCompare);
  const products = compare
    .map(getProductBySlug)
    .filter((p): p is Product => Boolean(p));

  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line py-20 text-center">
        <p className="text-muted">
          No products selected. Add up to 3 products to compare using the
          “Add to Compare” button on any product page.
        </p>
        <Link
          href="/products"
          className={buttonClasses({
            variant: "primary",
            size: "md",
            className: "mt-4",
          })}
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-surface px-4 py-3" />
            {products.map((p) => (
              <th
                key={p.slug}
                className="min-w-[180px] border-l border-line bg-surface p-4 align-top"
              >
                <div className="relative">
                  <button
                    onClick={() => remove(p.slug)}
                    aria-label={`Remove ${p.name}`}
                    className="absolute right-0 top-0 text-muted hover:text-primary"
                  >
                    <X size={16} />
                  </button>
                  <div className="mx-auto h-20 w-20 overflow-hidden rounded-md">
                    <ProductImage
                      name=""
                      category={p.category}
                      showName={false}
                      iconSize={36}
                    />
                  </div>
                  <Link
                    href={`/products/${p.slug}`}
                    className="mt-2 block text-center font-display text-base font-normal text-ink hover:text-primary"
                  >
                    {p.name}
                  </Link>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-surface/40"}>
              <th className="sticky left-0 z-10 whitespace-nowrap bg-inherit px-4 py-3 text-left font-label text-[0.6rem] uppercase tracking-wide text-muted">
                {row.label}
              </th>
              {products.map((p) => (
                <td
                  key={p.slug}
                  className="border-l border-line px-4 py-3 align-top text-ink"
                >
                  {row.get(p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
