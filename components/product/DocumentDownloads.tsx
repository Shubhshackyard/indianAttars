"use client";

import { FileText, Download } from "lucide-react";
import { toast } from "@/lib/toast";
import { SITE } from "@/lib/site";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

export function DocumentDownloads({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const docs = [
    {
      label: "Certificate of Analysis",
      short: "COA",
      available: product.coaAvailable,
    },
    {
      label: "Material Safety Data Sheet",
      short: "MSDS",
      available: product.msdsAvailable,
    },
    {
      label: "Allergen Declaration",
      short: "Allergen",
      available: product.allergenSheetAvailable,
    },
  ];

  const onDownload = (short: string) => {
    toast.info(
      `${short} is batch-specific. Email ${SITE.email} for the latest ${short} sheet.`,
    );
  };

  return (
    <div className={cn("grid gap-3 sm:grid-cols-3", className)}>
      {docs.map((d) => (
        <button
          key={d.short}
          onClick={() => onDownload(d.short)}
          disabled={!d.available}
          className="flex items-center gap-3 rounded-lg border border-line bg-surface/50 p-3 text-left transition-colors hover:border-primary/50 hover:bg-surface disabled:opacity-50"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
            <FileText size={17} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-ink">
              {d.short}
            </span>
            <span className="block truncate text-xs text-muted">{d.label}</span>
          </span>
          <Download size={15} className="shrink-0 text-muted" />
        </button>
      ))}
    </div>
  );
}
