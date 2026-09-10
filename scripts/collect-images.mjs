// IndianAttars — image collector
// Copies a deterministically-selected subset of the generated PNGs into public/
// and emits data/product-images.generated.ts (slug -> { card, gallery[] }).
//
// The source images are a flat folder of ComfyUI outputs. Every prompt in
// generate_prompts.mjs produced 4 consecutive variations, numbered in generator
// order. Products form one global sequence (product_core_NNNNN), 40 per product
// (10 shots x 4 variations):  index = productIdx*40 + shotIdx*4 + variation.
// Section groups map to their own filename prefix (see SECTIONS below).
//
// Run:  node scripts/collect-images.mjs  ["<source dir>"]

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const PRODUCTS_JSON = path.join(ROOT, "data", "products.json");
const GENERATED_TS = path.join(ROOT, "data", "product-images.generated.ts");

const SRC =
  process.argv[2] ||
  process.env.IA_SRC ||
  "C:\\Users\\sonswast\\Downloads\\indianattars\\indianattars";

const pad5 = (n) => String(n).padStart(5, "0");

// Ordered 10-shot list (matches shotDefs order in generate_prompts.mjs).
const SHOTS = [
  "front_white",
  "hero_45_cinematic",
  "macro_detail",
  "marble_light",
  "wood_heritage",
  "with_ingredients",
  "dark_moody",
  "lifestyle_vanity",
  "gift_packaging",
  "flat_lay",
];
const CARD_SHOT = "hero_45_cinematic";
// Gallery display order (front_white excluded — systematically soft in this render).
const GALLERY_ORDER = [
  "hero_45_cinematic",
  "with_ingredients",
  "marble_light",
  "wood_heritage",
  "dark_moody",
  "macro_detail",
  "lifestyle_vanity",
  "gift_packaging",
  "flat_lay",
];

// Best-of-4 overrides. Key = dest path without extension, value = variation 1-4.
// Populate after visual QA to replace soft/low-quality default (variation 1) picks.
const OVERRIDES = {
  // Category carousel thumbnails: variation 1 renders soft; variation 2 is sharp.
  "category/thumbnails/essential-oils": 2,
  "category/thumbnails/attars": 2,
  "category/thumbnails/ruh-absolutes": 2,
  "category/thumbnails/hydrosols": 2,
  "category/thumbnails/fragrances": 2,
};

// Curated section/category groups: prefix -> ordered prompt names (variation 1).
const SECTIONS = [
  { prefix: "hp-hero", dir: "homepage/hero", names: ["flacon-plinth", "silk-bottles", "splash-suspended", "artisan-still", "regal-flatlay", "modern-podium"] },
  { prefix: "hp-hero-mobile", dir: "homepage/hero-mobile", names: ["01", "02", "03"] },
  { prefix: "hp-lifestyle", dir: "homepage/lifestyle", names: ["vanity", "gifting", "shelf"] },
  { prefix: "hp-usp", dir: "homepage/usp", names: ["distillation", "sourcing", "lab-coa"] },
  { prefix: "homepage_cta", dir: "homepage/cta", names: ["amber-smoke", "emerald-silk", "dark-marble"] },
  { prefix: "hp-newsletter", dir: "homepage/newsletter", names: ["petals", "gold-bokeh"] },
  { prefix: "hp-fest", dir: "homepage/festival", names: ["diwali", "wedding", "eid", "holi", "rakhi", "winter"] },
  { prefix: "category_banner", dir: "category/banners", names: ["essential-oils", "attars", "ruh-absolutes", "hydrosols", "fragrances"] },
  { prefix: "category_banner_mobile", dir: "category/banners-mobile", names: ["essential-oils", "attars", "ruh-absolutes", "hydrosols", "fragrances"] },
  { prefix: "category_thumbnail", dir: "category/thumbnails", names: ["essential-oils", "attars", "ruh-absolutes", "hydrosols", "fragrances"] },
  { prefix: "collections", dir: "collections", names: ["oud", "rose", "sandal", "royal", "premium", "limited-edition", "gift", "wedding", "festival", "summer", "winter", "luxury-essentials"] },
  { prefix: "ingredients", dir: "ingredients", names: ["rose-petals", "jasmine", "sandalwood-logs", "oud-wood", "amber-resin", "vetiver-roots", "saffron-threads", "musk-concept", "marigold", "kewda-flower", "khus-roots", "mitti-clay", "kesar-bowl", "mint", "lavender", "citrus", "frankincense", "henna", "spices", "mixed-botanical", "oil-droplets", "rosewater"] },
  { prefix: "lifestyle-scene", dir: "lifestyle/scenes", names: ["dressing-table", "royal-interior", "palace-aesthetic", "perfume-ritual", "gift-unboxing", "wedding-gifting", "festive-gifting", "luxury-shelf", "minimal-interior", "premium-bathroom", "morning-ritual", "self-care", "cultural-luxury"] },
  { prefix: "lifestyle-models", dir: "lifestyle/models", names: ["female-elegant-saree", "male-groom-sherwani", "couple-gifting", "festive-family", "bride-attar-ritual", "businessman-cologne", "woman-vanity-mature", "wrist-application"] },
  { prefix: "graphics", dir: "graphics", names: ["about-hero", "about-heritage", "contact-hero", "faq-banner", "blog-art-of-attar", "blog-oud-guide", "blog-layering", "footer-bg", "divider-botanical", "divider-mist", "testimonials-bg", "loading-screen", "empty-cart", "empty-search", "empty-wishlist", "error-404", "certifications-hero", "bulk-inquiry-hero", "compare-hero", "newsletter-graphic"] },
];

let copied = 0;
let missing = 0;
let bytes = 0;
const missingList = [];

function copy(srcName, destRel) {
  const srcPath = path.join(SRC, srcName);
  const destPath = path.join(PUBLIC, destRel);
  if (!fs.existsSync(srcPath)) {
    missing++;
    if (missingList.length < 20) missingList.push(`${srcName} -> ${destRel}`);
    return false;
  }
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
  bytes += fs.statSync(destPath).size;
  copied++;
  return true;
}

// ---- Products (global product_core sequence) ----
if (!fs.existsSync(PRODUCTS_JSON)) {
  console.error(`Missing ${PRODUCTS_JSON}`);
  process.exit(1);
}
if (!fs.existsSync(SRC)) {
  console.error(`Source image dir not found: ${SRC}`);
  process.exit(1);
}

const products = JSON.parse(fs.readFileSync(PRODUCTS_JSON, "utf8"));
const PRODUCT_IMAGES = {};

products.forEach((p, pi) => {
  const slug = p.slug || p.id;
  const done = {};
  SHOTS.forEach((shot, si) => {
    const key = `products/${slug}/${shot}`;
    const variation = OVERRIDES[key] ?? 1;
    const idx = pi * 40 + si * 4 + variation;
    const srcName = `product_core_${pad5(idx)}_.png`;
    const destRel = `${key}.png`;
    if (copy(srcName, destRel)) done[shot] = `/${destRel}`;
  });
  const gallery = GALLERY_ORDER.map((s) => done[s]).filter(Boolean);
  PRODUCT_IMAGES[slug] = {
    card: done[CARD_SHOT] ?? gallery[0],
    gallery,
  };
});

// ---- Section / category / graphics ----
for (const { prefix, dir, names } of SECTIONS) {
  names.forEach((name, k) => {
    const key = `${dir}/${name}`;
    const variation = OVERRIDES[key] ?? 1;
    const idx = k * 4 + variation;
    copy(`${prefix}_${pad5(idx)}_.png`, `${key}.png`);
  });
}

// ---- Emit generated TS map ----
const header =
  "// AUTO-GENERATED by scripts/collect-images.mjs — do not edit by hand.\n" +
  "export interface ProductImageSet {\n  card: string;\n  gallery: string[];\n}\n\n" +
  "export const PRODUCT_IMAGES: Record<string, ProductImageSet> = ";
fs.writeFileSync(GENERATED_TS, header + JSON.stringify(PRODUCT_IMAGES, null, 2) + ";\n", "utf8");

const mb = (bytes / (1024 * 1024)).toFixed(1);
console.log(`\nCopied ${copied} images (${mb} MB). Missing: ${missing}.`);
if (missingList.length) {
  console.log("First missing:");
  missingList.forEach((m) => console.log("  " + m));
}
console.log(`Wrote ${path.relative(ROOT, GENERATED_TS)} for ${Object.keys(PRODUCT_IMAGES).length} products.`);
