"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { SlabPriceSelector } from "./SlabPriceSelector";
import { ProductImage } from "@/components/ui/ProductImage";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCartStore, toCartItem } from "@/lib/cart";
import { toast } from "@/lib/toast";
import type { PricingSlab, Product } from "@/types/product";

export function QuickViewModal({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const defaultSlab =
    product.slabs.find((s) => s.grams === 1000) ?? product.slabs[0];
  const [slab, setSlab] = useState<PricingSlab>(defaultSlab);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const add = () => {
    addItem(toCartItem(product, slab));
    toast.success(`${product.name} (${slab.qty}) added to cart`);
    onClose();
    openCart();
  };

  return (
    <Modal open={open} onClose={onClose} title="Quick View" className="max-w-3xl">
      <div className="grid gap-6 p-5 sm:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <ProductImage
            name={product.name}
            category={product.category}
            categoryLabel={product.categoryLabel}
            src={product.imageUrl}
            sizes="(max-width: 640px) 90vw, 400px"
          />
          {product.coaAvailable && (
            <Badge variant="success" className="absolute left-3 top-3">
              COA Available
            </Badge>
          )}
        </div>
        <div>
          <span className="font-label text-[0.6rem] uppercase tracking-[0.16em] text-primary">
            {product.categoryLabel}
          </span>
          <h3 className="mt-1 font-display text-3xl leading-tight text-ink">
            {product.name}
          </h3>
          {product.nameHindi && (
            <p className="font-hindi text-sm text-muted">{product.nameHindi}</p>
          )}
          <div className="mt-2">
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>
          <p className="mt-3 text-sm text-muted">{product.shortDescription}</p>
          <div className="mt-4">
            <SlabPriceSelector
              product={product}
              value={slab}
              onChange={setSlab}
            />
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <Button variant="primary" size="lg" fullWidth onClick={add}>
              Add to Cart
            </Button>
            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1 text-sm text-primary hover:underline"
            >
              View Full Details <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
