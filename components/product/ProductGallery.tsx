"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { ProductImage } from "@/components/ui/ProductImage";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

export function ProductGallery({ product }: { product: Product }) {
  const images = product.images ?? [];
  const [active, setActive] = useState(0);
  const activeSrc = images[active];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-lg border border-line">
        <ProductImage
          name={product.name}
          category={product.category}
          categoryLabel={product.categoryLabel}
          src={activeSrc}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {product.coaAvailable && (
          <Badge variant="success" className="absolute left-3 top-3">
            COA Available
          </Badge>
        )}
        {product.rare && (
          <Badge variant="rare" className="absolute right-3 top-3">
            Rare
          </Badge>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`View ${i + 1}`}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md border-2 transition-colors",
                active === i ? "border-primary" : "border-line hover:border-primary/50",
              )}
            >
              <ProductImage
                name=""
                category={product.category}
                showName={false}
                src={src}
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
