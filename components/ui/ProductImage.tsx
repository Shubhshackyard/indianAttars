import Image from "next/image";
import { CategoryIcon } from "./CategoryIcon";
import type { CategoryMeta, ProductCategory } from "@/types/product";
import { cn } from "@/lib/utils";

// Muted, analogous per-category tints (calm placeholders until real photography).
const gradients: Record<ProductCategory, string> = {
  "essential-oils": "from-[#e6d8b8] via-[#c9a86f] to-[#8a6a3a]",
  attars: "from-[#dcc3a6] via-[#b08a63] to-[#6e4c30]",
  "ruh-absolutes": "from-[#cdd6bd] via-[#9aa87f] to-[#5f6f49]",
  fragrances: "from-[#d2c7b6] via-[#a8977f] to-[#6d5f4c]",
  hydrosols: "from-[#cfe0d8] via-[#a7c2b6] to-[#6f8f80]",
};

const iconForCategory: Record<ProductCategory, CategoryMeta["icon"]> = {
  "essential-oils": "leaf",
  attars: "incense",
  "ruh-absolutes": "droplet",
  fragrances: "bottle",
  hydrosols: "wave",
};

export function ProductImage({
  name,
  category,
  categoryLabel,
  className,
  showName = true,
  iconSize = 96,
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 50vw, 25vw",
}: {
  name: string;
  category: ProductCategory;
  categoryLabel?: string;
  className?: string;
  showName?: boolean;
  iconSize?: number;
  src?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (src) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden bg-surface", className)}>
        <Image
          src={src}
          alt={alt ?? name}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-gradient-to-br",
        gradients[category],
        className,
      )}
      aria-hidden={!showName}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_58%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/25 to-transparent" />
      <CategoryIcon
        icon={iconForCategory[category]}
        className="absolute -bottom-3 -right-3 text-white/15"
        size={iconSize}
        strokeWidth={1}
      />
      {showName && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
          {categoryLabel && (
            <span className="font-label text-[0.55rem] uppercase tracking-[0.22em] text-white/75">
              {categoryLabel}
            </span>
          )}
          <span className="mt-1.5 font-display text-2xl italic leading-tight text-white drop-shadow-sm">
            {name}
          </span>
        </div>
      )}
    </div>
  );
}
