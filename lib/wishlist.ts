import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WishlistState {
  slugs: string[];
  hasHydrated: boolean;
  toggle: (slug: string) => void;
  setHasHydrated: (v: boolean) => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set) => ({
      slugs: [],
      hasHydrated: false,
      toggle: (slug) =>
        set((s) => ({
          slugs: s.slugs.includes(slug)
            ? s.slugs.filter((x) => x !== slug)
            : [...s.slugs, slug],
        })),
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: "indianattars-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ slugs: s.slugs }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);
