import type { MetadataRoute } from "next";
import { getProductSlugs, CATEGORIES } from "@/lib/products";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/products",
    "/about",
    "/certifications",
    "/bulk-inquiry",
    "/contact",
    "/cart",
    "/compare",
  ].map((r) => ({
    url: `${base}${r}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.7,
  }));

  const categories = CATEGORIES.map((c) => ({
    url: `${base}/category/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const products = getProductSlugs().map((slug) => ({
    url: `${base}/products/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...categories, ...products];
}
