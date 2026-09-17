import type { ProductCategory } from "@/types/product";

export interface Certification {
  name: string;
  short: string;
  description: string;
  pdf?: string;
  certNo?: string;
  validUntil?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: "ISO 9001:2015",
    short: "ISO 9001",
    description:
      "International quality-management standard for consistent, documented, tested production.",
    pdf: "/certificates/iso-9001-certificate.pdf",
    certNo: "QM/UP-3547-0825",
    validUntil: "22.08.2028",
  },
  {
    name: "ISO 14001:2015",
    short: "ISO 14001",
    description:
      "Environmental Management System — certified eco-compliant distillation and sustainable resource management.",
    pdf: "/certificates/iso-14001-certificate.pdf",
    certNo: "EM/UP-3548-0825",
    validUntil: "22.08.2028",
  },
  {
    name: "ISO 45001:2018",
    short: "ISO 45001",
    description:
      "Occupational Health & Safety Management System — ensuring workplace safety and responsible operational standards.",
    pdf: "/certificates/iso-45001-certificate.pdf",
    certNo: "OS/UP-3549-0825",
    validUntil: "22.08.2028",
  },
  {
    name: "HACCP Certified",
    short: "HACCP",
    description:
      "Hazard Analysis & Critical Control Points — food-safety controls across our entire process.",
    pdf: "/certificates/haccp-certificate.pdf",
    certNo: "HU-100226/0926",
    validUntil: "02.09.2029",
  },
  {
    name: "Kosher Certified",
    short: "Kosher",
    description:
      "Independently audited to meet kosher production and handling standards.",
    pdf: "/certificates/kosher-certificate.pdf",
    certNo: "KU-100228/0926",
    validUntil: "02.09.2029",
  },
  {
    name: "100% Halal Certified",
    short: "Halal",
    description: "Certified halal — permissible and ethically produced.",
    pdf: "/certificates/halal-certificate.pdf",
    certNo: "HU-100225/0926",
    validUntil: "02.09.2029",
  },
  {
    name: "GMP Certified",
    short: "GMP",
    description:
      "Good Manufacturing Practice — controlled, hygienic, repeatable manufacturing.",
    pdf: "/certificates/gmp-certificate.pdf",
    certNo: "GU-100227/0926",
    validUntil: "02.09.2029",
  },
  {
    name: "Organic Certified",
    short: "Organic",
    description:
      "Independently assessed organic compliance for natural essential oils, attars, and extracts.",
    pdf: "/certificates/organic-certificate.pdf",
    certNo: "OU-100229/0926",
    validUntil: "02.09.2029",
  },
  {
    name: "GST Registered",
    short: "GSTIN",
    description:
      "Government of India Goods and Services Tax registered enterprise (Shivaay Naturals & Essentials).",
    pdf: "/certificates/gst-registration-certificate.pdf",
    certNo: "09AJPK7407Q1ZO",
    validUntil: "Active / Regular",
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
