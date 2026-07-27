"use client";

import { useState } from "react";
import { SpecificationTable } from "./SpecificationTable";
import { DocumentDownloads } from "./DocumentDownloads";
import { ReviewsSection } from "./ReviewsSection";
import { BlendsWithStrip } from "./BlendsWithStrip";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

const TABS = ["Overview", "Specifications", "Documents", "Reviews"] as const;
type Tab = (typeof TABS)[number];

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-line">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "whitespace-nowrap px-4 py-3 font-label text-[0.68rem] uppercase tracking-[0.12em] transition-colors",
              tab === t
                ? "border-b-2 border-primary text-ink"
                : "text-muted hover:text-ink",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="py-6">
        {tab === "Overview" && (
          <div className="space-y-6">
            <p className="max-w-2xl leading-relaxed text-muted">
              {product.description}
            </p>
            {product.spec.blendsWith?.length ? (
              <div>
                <h3 className="mb-3 font-label text-[0.7rem] uppercase tracking-[0.14em] text-primary">
                  Blends Well With
                </h3>
                <BlendsWithStrip product={product} />
              </div>
            ) : null}
          </div>
        )}

        {tab === "Specifications" && <SpecificationTable product={product} />}

        {tab === "Documents" && (
          <div className="space-y-4">
            <DocumentDownloads product={product} />
            <p className="text-sm text-muted">
              We maintain batch-specific documentation. If you need a
              batch-specific COA, email{" "}
              <a href={`mailto:${SITE.email}`} className="text-primary underline">
                {SITE.email}
              </a>
              .
            </p>
          </div>
        )}

        {tab === "Reviews" && <ReviewsSection product={product} />}
      </div>
    </div>
  );
}
