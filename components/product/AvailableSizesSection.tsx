"use client";

import Image from "next/image";
import { useUIStore } from "@/lib/ui";
import { formatINRCompact, cn } from "@/lib/utils";
import type { Product } from "@/types/product";

export function AvailableSizesSection({ product }: { product: Product }) {
  const selectedQty = useUIStore(
    (s) => s.selectedSlabs[product.slug] || (product.slabs.find((s) => s.grams === 1000)?.qty ?? product.slabs[0]?.qty)
  );
  const setSelectedSlab = useUIStore((s) => s.setSelectedSlab);

  if (!product.slabs || product.slabs.length === 0) return null;

  const minSlab = product.slabs[0]?.qty ?? "50g";
  const maxSlab = product.slabs[product.slabs.length - 1]?.qty ?? "25kg";

  const handleSelect = (qty: string) => {
    setSelectedSlab(product.slug, qty);
    // Optionally smooth scroll up to the quantity selector on mobile
    const selectorEl = document.getElementById("product-quantity-selector");
    if (selectorEl && window.innerWidth < 768) {
      selectorEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="pt-2">
      <div className="mb-4">
        <span className="font-label text-[0.68rem] uppercase tracking-[0.16em] text-primary">
          Sample to Bulk
        </span>
        <h2 className="mt-1 font-display text-2xl text-ink sm:text-3xl">
          Available in {product.slabs.length} Sizes
        </h2>
        <p className="mt-1 text-sm text-muted">
          From {minSlab} sample bottles to {maxSlab} bulk drum — same purity, every size.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface/30 p-4 sm:p-6 lg:p-8">
        <div className="relative mx-auto flex w-full max-w-4xl items-center justify-center">
          <Image
            src="/graphics/available-sizes.png"
            alt={`Available sizes for ${product.name} from ${minSlab} to ${maxSlab}`}
            width={1024}
            height={434}
            className="h-auto w-full max-h-[360px] object-contain drop-shadow-sm transition-transform duration-300 hover:scale-[1.01]"
            priority
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 xs:grid-cols-4 sm:grid-cols-4 sm:gap-3 lg:grid-cols-8">
          {product.slabs.map((s) => {
            const active = s.qty.toLowerCase() === selectedQty?.toLowerCase();
            return (
              <button
                key={s.qty}
                onClick={() => handleSelect(s.qty)}
                aria-pressed={active}
                className={cn(
                  "group flex flex-col items-center justify-center rounded-lg border py-2.5 px-2 transition-all",
                  active
                    ? "border-2 border-primary bg-primary-soft shadow-sm"
                    : "border-line bg-bg hover:border-primary/40 hover:bg-surface"
                )}
              >
                <span
                  className={cn(
                    "font-label text-[0.62rem] uppercase tracking-wider transition-colors",
                    active ? "font-semibold text-primary" : "text-muted group-hover:text-ink"
                  )}
                >
                  {s.qty.toUpperCase()}
                </span>
                <span
                  className={cn(
                    "mt-1 text-sm font-semibold transition-colors",
                    active ? "text-primary" : "text-ink"
                  )}
                >
                  {formatINRCompact(s.price)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
