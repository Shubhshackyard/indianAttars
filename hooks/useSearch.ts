"use client";

import { useMemo, useState } from "react";
import { searchProducts } from "@/lib/products";
import type { Product, ProductCategory } from "@/types/product";

export function useSearch(limit = 24) {
  const [query, setQuery] = useState("");

  const results = useMemo<Product[]>(
    () => searchProducts(query).slice(0, limit),
    [query, limit],
  );

  const grouped = useMemo(() => {
    const map = new Map<ProductCategory, Product[]>();
    for (const p of results) {
      const arr = map.get(p.category) ?? [];
      arr.push(p);
      map.set(p.category, arr);
    }
    return map;
  }, [results]);

  return { query, setQuery, results, grouped };
}
