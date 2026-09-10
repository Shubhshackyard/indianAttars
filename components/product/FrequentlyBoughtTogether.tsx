"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { ProductImage } from "@/components/ui/ProductImage";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCartStore, toCartItem } from "@/lib/cart";
import { toast } from "@/lib/toast";
import { formatINR } from "@/lib/utils";
import type { Product } from "@/types/product";

export function FrequentlyBoughtTogether({
  products,
}: {
  products: Product[];
}) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  if (products.length < 2) return null;

  const items = products.map((p) => ({
    p,
    slab: p.slabs.find((s) => s.grams === 1000) ?? p.slabs[0],
  }));
  const total = items.reduce((sum, { slab }) => sum + slab.price, 0);

  const addAll = () => {
    items.forEach(({ p, slab }) => addItem(toCartItem(p, slab)));
    toast.success("All items added to cart");
    openCart();
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-section sm:px-6">
      <SectionHeading title="Frequently Bought Together" />
      <div className="mt-6 flex flex-col items-center gap-6 rounded-lg border border-line bg-surface/40 p-6 lg:flex-row lg:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {items.map(({ p, slab }, i) => (
            <div key={p.slug} className="flex items-center gap-3">
              {i > 0 && <Plus size={18} className="text-muted" />}
              <Link
                href={`/products/${p.slug}`}
                className="flex w-28 flex-col items-center text-center"
              >
                <span className="h-20 w-20 overflow-hidden rounded-md">
                  <ProductImage
                    name=""
                    category={p.category}
                    showName={false}
                    iconSize={34}
                  />
                </span>
                <span className="mt-1.5 line-clamp-2 text-xs text-ink">
                  {p.name}
                </span>
                <span className="text-xs text-muted">
                  {formatINR(slab.price)}
                </span>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center lg:text-right">
          <div className="text-sm text-muted">
            Total ({items.length} items · 1kg each)
          </div>
          <div className="font-display text-3xl text-ink">
            {formatINR(total)}
          </div>
          <Button
            variant="primary"
            size="lg"
            className="mt-3"
            onClick={addAll}
          >
            Add All to Cart
          </Button>
        </div>
      </div>
    </section>
  );
}
