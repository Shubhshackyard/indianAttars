"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { ProductImage } from "@/components/ui/ProductImage";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

export function ProductGallery({ product }: { product: Product }) {
  const flatLayPath = `/products/${product.slug}/flat_lay.png`;
  const fetchedImages = product.images ?? [];

  // Exclude duplicate flat_lay.png from fetched array
  const otherImages = fetchedImages.filter(
    (img) => img !== flatLayPath && !img.endsWith("/flat_lay.png"),
  );

  // Hardcode flat_lay.png at index 0, followed by up to 3 database images (strictly 4 max)
  const images = [flatLayPath, ...otherImages].slice(0, 4);

  const [active, setActive] = useState(0);
  const activeSrc = images[active] ?? images[0];

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
        <div className="mt-3 grid grid-cols-4 gap-2">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md border-2 transition-colors",
                active === i
                  ? "border-primary"
                  : "border-line hover:border-primary/50",
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
