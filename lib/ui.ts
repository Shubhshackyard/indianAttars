import { create } from "zustand";

interface UIState {
  searchOpen: boolean;
  mobileNavOpen: boolean;
  compare: string[]; // product slugs, max 3
  openSearch: () => void;
  closeSearch: () => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleCompare: (slug: string) => boolean; // false if at limit
  removeCompare: (slug: string) => void;
  clearCompare: () => void;
}

export const MAX_COMPARE = 3;

export const useUIStore = create<UIState>((set, get) => ({
  searchOpen: false,
  mobileNavOpen: false,
  compare: [],
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  openMobileNav: () => set({ mobileNavOpen: true }),
  closeMobileNav: () => set({ mobileNavOpen: false }),
  toggleCompare: (slug) => {
    const { compare } = get();
    if (compare.includes(slug)) {
      set({ compare: compare.filter((s) => s !== slug) });
      return true;
    }
    if (compare.length >= MAX_COMPARE) return false;
    set({ compare: [...compare, slug] });
    return true;
  },
  removeCompare: (slug) =>
    set((s) => ({ compare: s.compare.filter((x) => x !== slug) })),
  clearCompare: () => set({ compare: [] }),
}));
