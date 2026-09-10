import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { PricingSlab, Product, ProductCategory } from "@/types/product";

export interface CartItem {
  productSlug: string;
  name: string;
  nameHindi?: string;
  category: ProductCategory;
  categoryLabel: string;
  qty: string; // slab label e.g. "1kg"
  grams: number;
  unitPrice: number; // price for one unit of this slab
  quantity: number; // number of units
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  hasHydrated: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productSlug: string, qty: string) => void;
  updateQuantity: (productSlug: string, qty: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setHasHydrated: (v: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      hasHydrated: false,
      addItem: (item, quantity = 1) =>
        set((state) => {
          const idx = state.items.findIndex(
            (i) => i.productSlug === item.productSlug && i.qty === item.qty,
          );
          if (idx >= 0) {
            const items = [...state.items];
            items[idx] = {
              ...items[idx],
              quantity: items[idx].quantity + quantity,
            };
            return { items };
          }
          return { items: [...state.items, { ...item, quantity }] };
        }),
      removeItem: (productSlug, qty) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productSlug === productSlug && i.qty === qty),
          ),
        })),
      updateQuantity: (productSlug, qty, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productSlug === productSlug && i.qty === qty
              ? { ...i, quantity: Math.max(1, quantity) }
              : i,
          ),
        })),
      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: "indianattars-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export const selectCartCount = (s: CartState): number =>
  s.items.reduce((n, i) => n + i.quantity, 0);

export const selectCartSubtotal = (s: CartState): number =>
  s.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

export function toCartItem(
  product: Product,
  slab: PricingSlab,
): Omit<CartItem, "quantity"> {
  return {
    productSlug: product.slug,
    name: product.name,
    nameHindi: product.nameHindi,
    category: product.category,
    categoryLabel: product.categoryLabel,
    qty: slab.qty,
    grams: slab.grams,
    unitPrice: slab.price,
  };
}
