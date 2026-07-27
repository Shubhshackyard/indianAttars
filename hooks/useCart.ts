"use client";

import {
  useCartStore,
  selectCartCount,
  selectCartSubtotal,
} from "@/lib/cart";

export function useCartCount(): number {
  return useCartStore(selectCartCount);
}

export function useCartSubtotal(): number {
  return useCartStore(selectCartSubtotal);
}

export function useCartHydrated(): boolean {
  return useCartStore((s) => s.hasHydrated);
}
