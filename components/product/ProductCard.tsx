"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingBag, ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductImage } from "@/components/ui/ProductImage";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { QuickViewModal } from "./QuickViewModal";
import { useCartStore, toCartItem } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { toast } from "@/lib/toast";
import { priceRangeLabel, cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const [quickView, setQuickView] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toggleWish = useWishlist((s) => s.toggle);
  const wished = useWishlist((s) => s.slugs.includes(product.slug));

  const defaultSlab =
    product.slabs.find((s) => s.grams === 1000) ?? product.slabs[0];

  const add = () => {
    addItem(toCartItem(product, defaultSlab));
    toast.success(`${product.name} (${defaultSlab.qty}) added to cart`);
    openCart();
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-elevated transition-shadow hover:border-line-strong hover:shadow-lift"
      >
        <div className="relative aspect-square overflow-hidden">
          <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
            <ProductImage
              name={product.name}
              category={product.category}
              categoryLabel={product.categoryLabel}
              src={product.imageUrl}
            />
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="absolute inset-0"
            aria-label={product.name}
          />

          <div className="pointer-events-none absolute left-2 top-2 flex flex-col gap-1">
            {product.coaAvailable && <Badge variant="success">COA</Badge>}
            {product.rare && <Badge variant="rare">Rare</Badge>}
            {product.featured && !product.rare && (
              <Badge variant="gold">Bestseller</Badge>
            )}
          </div>

          <button
            onClick={() => {
              toggleWish(product.slug);
              toast.info(
                wished ? "Removed from wishlist" : "Added to wishlist",
              );
            }}
            aria-label="Toggle wishlist"
            className="absolute right-2 top-2 z-10 rounded-pill bg-white/85 p-1.5 backdrop-blur transition-colors hover:bg-white"
          >
            <Heart
              size={16}
              className={cn(wished ? "fill-primary text-primary" : "text-ink")}
            />
          </button>

          <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-ink/0 pb-4 opacity-0 transition-all duration-300 group-hover:bg-ink/15 group-hover:opacity-100">
            <button
              onClick={() => setQuickView(true)}
              className="pointer-events-auto inline-flex items-center gap-1.5 rounded-pill bg-white/95 px-4 py-2 font-label text-[0.62rem] uppercase tracking-[0.12em] text-ink shadow-card hover:bg-white"
            >
              <Eye size={14} /> Quick View
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <span className="font-label text-[0.56rem] uppercase tracking-[0.16em] text-muted">
            {product.categoryLabel}
          </span>
          <Link href={`/products/${product.slug}`}>
            <h3 className="mt-0.5 font-display text-xl leading-tight text-ink transition-colors hover:text-primary">
              {product.name}
            </h3>
          </Link>
          {product.nameHindi && (
            <span className="font-hindi text-xs text-muted">
              {product.nameHindi}
            </span>
          )}
          <div className="mt-1.5">
            <StarRating
              rating={product.rating}
              count={product.reviewCount}
              size={13}
            />
          </div>
          <p className="mt-2 text-sm font-medium text-ink">
            {priceRangeLabel(product.slabs)}
          </p>
          <div className="mt-auto pt-3">
            <Button variant="primary" size="sm" fullWidth onClick={add}>
              <ShoppingBag size={14} /> Add to Cart
            </Button>
            <Link
              href={`/products/${product.slug}`}
              className="mt-1.5 flex items-center justify-center gap-1 text-xs text-primary hover:underline"
            >
              Request Quote <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </motion.div>

      <QuickViewModal
        product={product}
        open={quickView}
        onClose={() => setQuickView(false)}
      />
    </>
  );
}
