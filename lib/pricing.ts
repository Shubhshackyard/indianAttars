import type {
  BaseProduct,
  PricingSlab,
  Product,
  ProductCategory,
} from "@/types/product";
import { slugify } from "@/lib/utils";

type SlabDef = { qty: string; grams: number; mult: number };

/**
 * Slab multipliers verified against indianattars.com_Pricing_Master_Chart.xlsx.
 * 1kg = baseline (x1.00). Each step below adds +2% per slab; each step above
 * subtracts 2% per slab. price = round(round(base*mult) * grams/1000).
 */
export const SLAB_SETS: Record<ProductCategory, SlabDef[]> = {
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

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  "essential-oils": "Essential Oil",
  attars: "Indian Attar",
  "ruh-absolutes": "Ruh & Absolute",
  fragrances: "Fragrance",
  hydrosols: "Hydrosol",
};

export function buildSlabs(
  baseRatePerKg: number,
  category: ProductCategory,
): PricingSlab[] {
  return SLAB_SETS[category].map((s) => {
    const perKgRate = Math.round(baseRatePerKg * s.mult);
    const price = Math.round(perKgRate * (s.grams / 1000));
    return { qty: s.qty, grams: s.grams, price, perKgRate };
  });
}

export function buildProduct(base: BaseProduct): Product {
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
