import { baseProducts } from "@/data/products.base";
import { buildProduct } from "@/lib/pricing";
import { PRODUCT_IMAGES } from "@/data/product-images.generated";
import type { CategoryMeta, Product, ProductCategory } from "@/types/product";

/** All 69 products with computed slab pricing and generated imagery. */
export const products: Product[] = baseProducts.map(buildProduct).map((p) => {
  const imgs = PRODUCT_IMAGES[p.slug];
  return imgs ? { ...p, imageUrl: imgs.card, images: imgs.gallery } : p;
});

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "essential-oils",
    label: "Essential Oils",
    shortLabel: "Oils",
    tagline: "Pure, Steam-Distilled, Batch-Tested",
    description:
      "Single-origin essential oils, steam-distilled and batch-tested for purity. From everyday eucalyptus to rare Indian sandalwood.",
    icon: "leaf",
  },
  {
    slug: "attars",
    label: "Indian Attars",
    shortLabel: "Attars",
    tagline: "Traditional Copper Deg Distillation",
    description:
      "Heritage attars distilled the traditional deg-bhapka way in Kannauj — rose, oudh, saffron, mitti and more.",
    icon: "incense",
  },
  {
    slug: "ruh-absolutes",
    label: "Ruh & Absolutes",
    shortLabel: "Ruh",
    tagline: "Ultra-Rare, Artisanal Extracts",
    description:
      "Base-free ruh and absolutes — the purest, rarest, most concentrated expressions of Indian flowers and roots.",
    icon: "droplet",
  },
  {
    slug: "fragrances",
    label: "Fragrances",
    shortLabel: "Fragrances",
    tagline: "Inspired-By Designer Formulations",
    description:
      "Long-lasting, skin-friendly fragrance oils — our independent interpretations inspired by iconic designer scents.",
    icon: "bottle",
  },
  {
    slug: "hydrosols",
    label: "Hydrosols",
    shortLabel: "Hydrosols",
    tagline: "Pure Floral Waters",
    description:
      "100% pure aromatic waters — gulab jal, kewda jal and more — for skincare, culinary and devotional use.",
    icon: "wave",
  },
];

export function getCategoryMeta(slug: ProductCategory): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getCategoryCount(category: ProductCategory): number {
  return getProductsByCategory(category).length;
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  return slugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is Product => Boolean(p));
}

export function getFeaturedProducts(limit?: number): Product[] {
  const featured = products.filter((p) => p.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

/** Curated homepage "Most Loved" mix spanning categories. */
export function getMostLovedProducts(): Product[] {
  return getProductsBySlugs([
    "lavender-oil",
    "indian-sandalwood-oil",
    "oudh-attar",
    "gulab-attar",
    "frankincense-oil",
    "patchouli-oil",
    "chandan-attar",
    "ruh-gulab",
  ]);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      (p.nameHindi ?? "").includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      (p.spec.botanicalName ?? "").toLowerCase().includes(q)
    );
  });
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .sort((a, b) => b.rating - a.rating);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const fill = products
    .filter(
      (p) =>
        p.category !== product.category &&
        p.tags.some((t) => product.tags.includes(t)),
    )
    .slice(0, limit - sameCategory.length);
  return [...sameCategory, ...fill];
}

export interface BlendRef {
  name: string;
  slug?: string;
}

export function resolveBlendsWith(product: Product): BlendRef[] {
  const names = product.spec.blendsWith ?? [];
  return names.map((name) => {
    const match = products.find(
      (p) => p.name.toLowerCase() === name.toLowerCase(),
    );
    return { name, slug: match?.slug };
  });
}

export function getPriceBounds(): { min: number; max: number } {
  let min = Infinity;
  let max = -Infinity;
  for (const p of products) {
    for (const s of p.slabs) {
      if (s.price < min) min = s.price;
      if (s.price > max) max = s.price;
    }
  }
  return { min, max };
}

export function getProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export const TOTAL_PRODUCTS = products.length;
