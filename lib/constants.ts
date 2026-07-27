import type { ProductCategory } from "@/types/product";

export interface Certification {
  name: string;
  short: string;
  description: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: "HACCP Certified",
    short: "HACCP",
    description:
      "Hazard Analysis & Critical Control Points — food-safety controls across our entire process.",
  },
  {
    name: "Kosher Certified",
    short: "Kosher",
    description:
      "Independently audited to meet kosher production and handling standards.",
  },
  {
    name: "ISO 9001:2015",
    short: "ISO 9001",
    description:
      "International quality-management standard for consistent, documented, tested production.",
  },
  {
    name: "100% Halal Certified",
    short: "Halal",
    description: "Certified halal — permissible and ethically produced.",
  },
  {
    name: "GMP Certified",
    short: "GMP",
    description:
      "Good Manufacturing Practice — controlled, hygienic, repeatable manufacturing.",
  },
  {
    name: "Non Toxic",
    short: "Non Toxic",
    description:
      "Free from harmful adulterants; safe-handling guidance provided in every MSDS.",
  },
  {
    name: "Premium Quality — Made in India",
    short: "Made in India",
    description:
      "Proudly distilled in India to export-grade quality standards.",
  },
];

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Shop", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Certifications", href: "/certifications" },
  { label: "Bulk Inquiry", href: "/bulk-inquiry" },
  { label: "Contact", href: "/contact" },
];

export const CATEGORY_HREF: Record<ProductCategory, string> = {
  "essential-oils": "/category/essential-oils",
  attars: "/category/attars",
  "ruh-absolutes": "/category/ruh-absolutes",
  fragrances: "/category/fragrances",
  hydrosols: "/category/hydrosols",
};

export const PROMO_ITEMS = [
  "ISO 9001:2015 Certified",
  "GMP Certified",
  "HACCP & Halal Approved",
  "Kosher Certified",
  "Free Shipping on Bulk Orders",
  "Proudly Made in India",
  "COA / MSDS / Allergen Sheets Available",
  "28 Essential Oils · 14 Attars · 5 Ruh & Absolutes",
];

export const MARQUEE_WORDS = [
  "Pure",
  "Certified",
  "Traceable",
  "Steam-Distilled",
  "Indian Heritage",
  "ISO Certified",
  "GMP Compliant",
  "Halal Approved",
  "HACCP Certified",
  "Kosher Certified",
  "28 Essential Oils",
  "14 Indian Attars",
  "5 Rare Ruh & Absolutes",
];
