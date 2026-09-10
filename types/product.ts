export type ProductCategory =
  | "essential-oils"
  | "attars"
  | "ruh-absolutes"
  | "fragrances"
  | "hydrosols";

export interface PricingSlab {
  qty: string; // "50gm", "1kg"
  grams: number; // 50, 1000
  price: number; // ₹ INR, rounded
  perKgRate: number; // derived ₹/kg
}

export interface ProductSpec {
  botanicalName?: string;
  casNumber?: string;
  femaNumber?: string;
  countryOfOrigin?: string;
  specificGravity?: number;
  opticalRotation?: string;
  refractiveIndex?: number;
  flashPoint?: string;
  aroma?: string;
  color?: string;
  partUsed?: string;
  form?: string;
  shelfLife?: string;
  packaging?: string;
  extractionMethod?: string;
  solubility?: string;
  majorConstituents?: string;
  blendsWith?: string[];
  inspiredBy?: string; // fragrances
  ph?: string; // hydrosols
}

export interface BaseProduct {
  name: string;
  nameHindi?: string;
  category: ProductCategory;
  baseRatePerKg: number;
  shortDescription: string;
  description: string;
  spec: ProductSpec;
  tags: string[];
  featured?: boolean;
  rare?: boolean;
  stock?: "in" | "limited";
  rating: number;
  reviewCount: number;
  coaAvailable?: boolean;
  msdsAvailable?: boolean;
  allergenSheetAvailable?: boolean;
}

export interface Product extends BaseProduct {
  id: string;
  slug: string;
  categoryLabel: string;
  slabs: PricingSlab[];
  imageUrl?: string;
  images?: string[];
  coaAvailable: boolean;
  msdsAvailable: boolean;
  allergenSheetAvailable: boolean;
  stock: "in" | "limited";
  featured: boolean;
  rare: boolean;
}

export interface CategoryMeta {
  slug: ProductCategory;
  label: string;
  shortLabel: string;
  tagline: string;
  description: string;
  icon: "leaf" | "incense" | "droplet" | "bottle" | "wave";
}
