"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { Product, ProductCategory } from "@/types/product";
import { CATEGORIES } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Button, buttonClasses } from "@/components/ui/Button";
import { formatINRCompact, cn } from "@/lib/utils";

const SLABS = ["50gm", "100gm", "250gm", "500gm", "1kg", "5kg", "10kg", "25kg", "35kg", "200kg"];
const CERTS = ["ISO 9001", "GMP", "Halal", "Kosher", "HACCP"];
const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "az", label: "A → Z" },
] as const;
const PAGE_SIZE = 12;

type Sort = (typeof SORTS)[number]["value"];

function minPrice(p: Product) {
  return Math.min(...p.slabs.map((s) => s.price));
}

export function ProductsExplorer({
  products,
  initialCategory,
}: {
  products: Product[];
  initialCategory?: ProductCategory;
}) {
  const bounds = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    for (const p of products)
      for (const s of p.slabs) {
        if (s.price < min) min = s.price;
        if (s.price > max) max = s.price;
      }
    return { min: Math.floor(min), max: Math.ceil(max) };
  }, [products]);

  const [cats, setCats] = useState<Set<ProductCategory>>(
    new Set(initialCategory ? [initialCategory] : []),
  );
  const [slabs, setSlabs] = useState<Set<string>>(new Set());
  const [certs, setCerts] = useState<Set<string>>(new Set());
  const [maxPrice, setMaxPrice] = useState(bounds.max);
  const [sort, setSort] = useState<Sort>("featured");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggle = <T,>(set: Set<T>, val: T): Set<T> => {
    const next = new Set(set);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    return next;
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (cats.size && !cats.has(p.category)) return false;
      if (minPrice(p) > maxPrice) return false;
      if (slabs.size && !p.slabs.some((s) => slabs.has(s.qty))) return false;
      return true;
    });
    list = [...list];
    if (sort === "price-asc") list.sort((a, b) => minPrice(a) - minPrice(b));
    else if (sort === "price-desc")
      list.sort((a, b) => minPrice(b) - minPrice(a));
    else if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
    else
      list.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating,
      );
    return list;
  }, [products, cats, slabs, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  const resetAll = () => {
    setCats(new Set());
    setSlabs(new Set());
    setCerts(new Set());
    setMaxPrice(bounds.max);
    setSort("featured");
    setPage(1);
  };

  const activeChips = [
    ...Array.from(cats).map((c) => ({
      label: CATEGORIES.find((x) => x.slug === c)?.label ?? c,
      clear: () => setCats(toggle(cats, c)),
    })),
    ...Array.from(slabs).map((s) => ({
      label: s,
      clear: () => setSlabs(toggle(slabs, s)),
    })),
    ...(maxPrice < bounds.max
      ? [
          {
            label: `≤ ${formatINRCompact(maxPrice)}`,
            clear: () => setMaxPrice(bounds.max),
          },
        ]
      : []),
  ];

  const Filters = () => (
    <div className="space-y-7">
      <div>
        <h3 className="font-label text-[0.65rem] uppercase tracking-[0.14em] text-ink">
          Category
        </h3>
        <div className="mt-3 space-y-2">
          {CATEGORIES.map((c) => (
            <label
              key={c.slug}
              className="flex cursor-pointer items-center gap-2 text-sm text-muted"
            >
              <input
                type="checkbox"
                checked={cats.has(c.slug)}
                onChange={() => {
                  setCats(toggle(cats, c.slug));
                  setPage(1);
                }}
                className="accent-gold"
              />
              {c.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-label text-[0.65rem] uppercase tracking-[0.14em] text-ink">
          Max Price
        </h3>
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(Number(e.target.value));
            setPage(1);
          }}
          className="mt-3 w-full accent-gold"
        />
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>{formatINRCompact(bounds.min)}</span>
          <span className="font-medium text-ink">
            ≤ {formatINRCompact(maxPrice)}
          </span>
        </div>
      </div>

      <div>
        <h3 className="font-label text-[0.65rem] uppercase tracking-[0.14em] text-ink">
          Quantity Slab
        </h3>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {SLABS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSlabs(toggle(slabs, s));
                setPage(1);
              }}
              className={cn(
                "rounded-pill border px-2.5 py-1 text-xs transition-colors",
                slabs.has(s)
                  ? "border-primary bg-primary-soft text-ink"
                  : "border-line text-muted hover:border-primary",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-label text-[0.65rem] uppercase tracking-[0.14em] text-ink">
          Certifications
        </h3>
        <div className="mt-3 space-y-2">
          {CERTS.map((c) => (
            <label
              key={c}
              className="flex cursor-pointer items-center gap-2 text-sm text-muted"
            >
              <input
                type="checkbox"
                checked={certs.has(c)}
                onChange={() => setCerts(toggle(certs, c))}
                className="accent-gold"
              />
              {c}
            </label>
          ))}
          <p className="text-xs text-muted/70">
            All our products are ISO, GMP, Halal, Kosher &amp; HACCP certified.
          </p>
        </div>
      </div>

      <button
        onClick={resetAll}
        className="text-sm text-primary hover:underline"
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <Filters />
      </aside>

      <div>
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className={cn(
                buttonClasses({ variant: "outline", size: "sm" }),
                "lg:hidden",
              )}
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
            <span className="text-sm text-muted">
              {filtered.length} product{filtered.length !== 1 && "s"}
            </span>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-pill border border-line bg-bg px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
            aria-label="Sort products"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Active chips */}
        {activeChips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeChips.map((chip, i) => (
              <button
                key={i}
                onClick={chip.clear}
                className="inline-flex items-center gap-1 rounded-pill bg-surface px-3 py-1 text-xs text-ink hover:bg-primary-soft"
              >
                {chip.label} <X size={12} />
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        {pageItems.length === 0 ? (
          <div className="mt-12 rounded-lg border border-dashed border-line py-16 text-center">
            <p className="text-muted">
              No products found for these filters. Try adjusting your selection.
            </p>
            <button
              onClick={resetAll}
              className={cn(
                buttonClasses({ variant: "primary", size: "sm" }),
                "mt-4",
              )}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setPage(i + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={cn(
                  "h-9 w-9 rounded-md text-sm transition-colors",
                  safePage === i + 1
                    ? "bg-primary text-primary-fg"
                    : "border border-line text-muted hover:border-primary",
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-[var(--color-overlay)]"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-lg bg-bg p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl">Filters</h2>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close">
                <X size={20} />
              </button>
            </div>
            <Filters />
            <Button
              variant="primary"
              size="lg"
              fullWidth
              className="mt-6"
              onClick={() => setDrawerOpen(false)}
            >
              Show {filtered.length} results
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
