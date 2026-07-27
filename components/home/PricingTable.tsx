"use client";

import { useState } from "react";
import Link from "next/link";
import { getProductsByCategory } from "@/lib/products";
import { formatINR, cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProductCategory } from "@/types/product";

const tabs: { label: string; cat: ProductCategory }[] = [
  { label: "Essential Oils", cat: "essential-oils" },
  { label: "Attars", cat: "attars" },
  { label: "Hydrosols", cat: "hydrosols" },
];

export function PricingTable() {
  const [active, setActive] = useState<ProductCategory>("essential-oils");
  const products = getProductsByCategory(active);
  const slabLabels = products[0]?.slabs.map((s) => s.qty) ?? [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6">
      <SectionHeading
        eyebrow="No Hidden Pricing. No Middlemen."
        title="Transparent Slab Pricing"
        subtitle="We manufacture, we sell direct. The more you order, the better your rate."
      />

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.cat}
            onClick={() => setActive(t.cat)}
            className={cn(
              "rounded-pill px-4 py-2 font-label text-[0.65rem] uppercase tracking-[0.12em] transition-colors",
              active === t.cat
                ? "bg-primary text-primary-fg"
                : "border border-line text-muted hover:border-primary",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-lg border border-line">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-surface">
              <th className="sticky left-0 z-10 bg-surface px-4 py-3 text-left font-label text-[0.62rem] uppercase tracking-wide text-muted">
                Product
              </th>
              {slabLabels.map((l) => (
                <th
                  key={l}
                  className="whitespace-nowrap px-4 py-3 text-right font-label text-[0.62rem] uppercase tracking-wide text-muted"
                >
                  {l}
                </th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.slug}
                className="border-t border-line transition-colors hover:bg-primary-soft"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 max-w-[180px] truncate bg-bg px-4 py-3 text-left font-display text-base font-normal text-ink"
                >
                  {p.name}
                </th>
                {p.slabs.map((s) => (
                  <td
                    key={s.qty}
                    className="whitespace-nowrap px-4 py-3 text-right text-ink"
                  >
                    {formatINR(s.price)}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/products/${p.slug}`}
                    className="whitespace-nowrap font-label text-[0.6rem] uppercase tracking-wide text-primary hover:text-primary"
                  >
                    Order →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-muted">
        Pricing Logic: Base Rate ±2% per slab. Lower qty → +2% each step. Higher
        qty → −2% each step. Prices ex-Kanpur, GST applicable.
      </p>
    </section>
  );
}
