import { clsx, type ClassValue } from "clsx";

/** Shared cubic-bezier easing (typed as a tuple for framer-motion). */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Merge class names. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** Format a number as full INR with Indian digit grouping, e.g. ₹1,00,000. */
export function formatINR(value: number): string {
  return "₹" + Math.round(value).toLocaleString("en-IN");
}

/** Compact INR for tight spaces: ₹63.7K, ₹1.25L, ₹2.23Cr. */
export function formatINRCompact(value: number): string {
  const n = Math.round(value);
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
}

/** kebab-case slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['’`.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Min–max price range string from slabs. */
export function priceRangeLabel(slabs: { price: number }[]): string {
  if (!slabs.length) return "";
  const prices = slabs.map((s) => s.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? formatINR(min) : `${formatINR(min)} – ${formatINR(max)}`;
}

/** Round to nearest rupee. */
export function inr(value: number): number {
  return Math.round(value);
}
