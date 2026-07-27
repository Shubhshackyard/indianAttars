import type { Product } from "@/types/product";

export interface Review {
  name: string;
  city: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

const NAMES = [
  "Priya M.",
  "Rahul S.",
  "Aisha K.",
  "Vikram T.",
  "Neha G.",
  "Imran B.",
  "Sneha R.",
  "Arjun P.",
  "Fatima Z.",
  "Karan D.",
];

const CITIES = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Kolkata",
  "Chennai",
  "Pune",
  "Hyderabad",
  "Jaipur",
];

const SNIPPETS = [
  "Excellent quality and the aroma is true to description. Packaging was secure.",
  "Consistent batch quality — we use this in our production line regularly.",
  "The COA matched the delivered batch. Very professional supplier.",
  "Long-lasting and pure. Exactly what I needed for my perfumery work.",
  "Fast shipping and great communication. Will reorder.",
  "Premium grade. Noticeably better than what we sourced elsewhere.",
  "Beautifully distilled. The scent profile is rich and well-rounded.",
  "Great value at the bulk slab. Documentation provided without asking.",
];

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function getReviews(product: Product, max = 5): Review[] {
  const n = Math.min(max, Math.max(2, product.reviewCount));
  const seed = hash(product.slug);
  const reviews: Review[] = [];
  for (let i = 0; i < n; i++) {
    const k = hash(product.slug + ":" + i);
    const rating = i === 0 ? Math.round(product.rating) : 4 + (k % 2);
    const day = 1 + (k % 27);
    const month = 1 + ((seed + i) % 12);
    reviews.push({
      name: NAMES[(k >> 3) % NAMES.length],
      city: CITIES[(k >> 7) % CITIES.length],
      rating: Math.min(5, rating),
      date: `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/2024`,
      text: SNIPPETS[(k >> 5) % SNIPPETS.length],
      verified: k % 5 !== 0,
    });
  }
  return reviews;
}

export function ratingBreakdown(
  product: Product,
): { star: number; pct: number }[] {
  const r = product.rating;
  // Skew distribution toward the average rating.
  const base = [5, 4, 3, 2, 1].map((star) => {
    const dist = Math.max(0, 1 - Math.abs(star - r) / 2.2);
    return { star, weight: dist * dist };
  });
  const total = base.reduce((sum, b) => sum + b.weight, 0) || 1;
  return base.map((b) => ({
    star: b.star,
    pct: Math.round((b.weight / total) * 100),
  }));
}
