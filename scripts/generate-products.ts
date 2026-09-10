/**
 * Generates data/products.json (the 69-product deliverable) from the typed
 * base data. The Next.js app itself reads lib/products.ts directly, so this
 * script is only needed to (re)emit the static JSON snapshot.
 *
 * Run:  npx --yes tsx scripts/generate-products.ts
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { essentialOils } from "../data/products/essentialOils";
import { attars } from "../data/products/attars";
import { ruhAbsolutes } from "../data/products/ruhAbsolutes";
import { fragrances } from "../data/products/fragrances";
import { hydrosols } from "../data/products/hydrosols";
import type {
  BaseProduct,
  PricingSlab,
  Product,
  ProductCategory,
} from "../types/product";

type SlabDef = { qty: string; grams: number; mult: number };

const SLAB_SETS: Record<ProductCategory, SlabDef[]> = {
  "essential-oils": [
    { qty: "50gm", grams: 50, mult: 1.08 },
    { qty: "100gm", grams: 100, mult: 1.06 },
    { qty: "250gm", grams: 250, mult: 1.04 },
    { qty: "500gm", grams: 500, mult: 1.02 },
    { qty: "1kg", grams: 1000, mult: 1.0 },
    { qty: "5kg", grams: 5000, mult: 0.98 },
    { qty: "10kg", grams: 10000, mult: 0.96 },
    { qty: "25kg", grams: 25000, mult: 0.94 },
  ],
  attars: [
    { qty: "50gm", grams: 50, mult: 1.08 },
    { qty: "100gm", grams: 100, mult: 1.06 },
    { qty: "250gm", grams: 250, mult: 1.04 },
    { qty: "500gm", grams: 500, mult: 1.02 },
    { qty: "1kg", grams: 1000, mult: 1.0 },
    { qty: "5kg", grams: 5000, mult: 0.98 },
    { qty: "10kg", grams: 10000, mult: 0.96 },
    { qty: "25kg", grams: 25000, mult: 0.94 },
  ],
  "ruh-absolutes": [
    { qty: "50gm", grams: 50, mult: 1.08 },
    { qty: "100gm", grams: 100, mult: 1.06 },
    { qty: "250gm", grams: 250, mult: 1.04 },
    { qty: "500gm", grams: 500, mult: 1.02 },
    { qty: "1kg", grams: 1000, mult: 1.0 },
  ],
  fragrances: [
    { qty: "250gm", grams: 250, mult: 1.04 },
    { qty: "500gm", grams: 500, mult: 1.02 },
    { qty: "1kg", grams: 1000, mult: 1.0 },
    { qty: "5kg", grams: 5000, mult: 0.98 },
  ],
  hydrosols: [
    { qty: "1kg", grams: 1000, mult: 1.0 },
    { qty: "5kg", grams: 5000, mult: 0.98 },
    { qty: "25kg", grams: 25000, mult: 0.96 },
    { qty: "35kg", grams: 35000, mult: 0.94 },
    { qty: "200kg", grams: 200000, mult: 0.92 },
  ],
};

const CATEGORY_LABEL: Record<ProductCategory, string> = {
  "essential-oils": "Essential Oil",
  attars: "Indian Attar",
  "ruh-absolutes": "Ruh & Absolute",
  fragrances: "Fragrance",
  hydrosols: "Hydrosol",
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['’`.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildSlabs(
  baseRatePerKg: number,
  category: ProductCategory,
): PricingSlab[] {
  return SLAB_SETS[category].map((s) => {
    const perKgRate = Math.round(baseRatePerKg * s.mult);
    const price = Math.round(perKgRate * (s.grams / 1000));
    return { qty: s.qty, grams: s.grams, price, perKgRate };
  });
}

function buildProduct(base: BaseProduct): Product {
  const slug = slugify(base.name);
  return {
    ...base,
    id: slug,
    slug,
    categoryLabel: CATEGORY_LABEL[base.category],
    slabs: buildSlabs(base.baseRatePerKg, base.category),
    coaAvailable: base.coaAvailable ?? true,
    msdsAvailable: base.msdsAvailable ?? true,
    allergenSheetAvailable: base.allergenSheetAvailable ?? true,
    stock: base.stock ?? "in",
    featured: base.featured ?? false,
    rare: base.rare ?? false,
  };
}

const baseProducts: BaseProduct[] = [
  ...essentialOils,
  ...attars,
  ...ruhAbsolutes,
  ...fragrances,
  ...hydrosols,
];

const products = baseProducts.map(buildProduct);

const here = dirname(fileURLToPath(import.meta.url));
const outPath = join(here, "..", "data", "products.json");
writeFileSync(outPath, JSON.stringify(products, null, 2) + "\n", "utf8");

console.log(
  `Wrote ${products.length} products to data/products.json ` +
    `(EO:${essentialOils.length} Attar:${attars.length} Ruh:${ruhAbsolutes.length} Frag:${fragrances.length} Hydro:${hydrosols.length})`,
);
