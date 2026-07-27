"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import type { PricingSlab, Product } from "@/types/product";
import { formatINR, formatINRCompact, cn } from "@/lib/utils";

export function SlabPriceSelector({
  product,
  value,
  onChange,
  compact = false,
}: {
  product: Product;
  value: PricingSlab;
  onChange: (slab: PricingSlab) => void;
  compact?: boolean;
}) {
  const oneKg = product.slabs.find((s) => s.grams === 1000);
  const baseRate = oneKg?.perKgRate ?? product.baseRatePerKg;
  const savingsPerKg = baseRate - value.perKgRate;

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-label text-[0.65rem] uppercase tracking-[0.14em] text-muted">
          Select Quantity
        </span>
        {product.category === "ruh-absolutes" && (
          <span className="text-xs text-primary">Min 50gm · Max 1kg</span>
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {product.slabs.map((s) => {
          const active = s.qty === value.qty;
          return (
            <button
              key={s.qty}
              onClick={() => onChange(s)}
              aria-pressed={active}
              className={cn(
                "flex min-w-[74px] flex-col items-center rounded-md border px-3 py-2 transition-all",
                active
                  ? "border-primary bg-primary-soft"
                  : "border-line hover:border-primary/40 hover:bg-surface",
              )}
            >
              <span className="font-label text-[0.58rem] uppercase tracking-wide text-muted">
                {s.qty}
              </span>
              <span className="text-sm font-semibold text-ink">
                {formatINRCompact(s.price)}
              </span>
            </button>
          );
        })}
      </div>

      {!compact && (
        <div className="mt-4 rounded-lg border border-line bg-surface/50 p-4">
          <div className="flex items-end justify-between">
            <div>
              <span className="block text-xs text-muted">
                {value.qty} · {formatINR(value.perKgRate)}/kg
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={value.qty}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="block font-display text-3xl text-ink"
                >
                  {formatINR(value.price)}
                </motion.span>
              </AnimatePresence>
            </div>
            {savingsPerKg > 0 && (
              <span className="flex items-center gap-1 rounded-pill bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <Lightbulb size={13} /> Save {formatINR(savingsPerKg)}/kg
              </span>
            )}
          </div>
          <p className="mt-2 text-xs text-muted">+ GST as applicable</p>
          {value.grams >= 25000 && (
            <p className="mt-1 text-xs text-primary">
              For 25kg+ orders, request a custom quote for the best rate →
            </p>
          )}
        </div>
      )}
    </div>
  );
}
