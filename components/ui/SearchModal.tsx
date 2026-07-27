"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, CornerDownLeft } from "lucide-react";
import { useUIStore } from "@/lib/ui";
import { useSearch } from "@/hooks/useSearch";
import { ProductImage } from "./ProductImage";
import { priceRangeLabel } from "@/lib/utils";

export function SearchModal() {
  const open = useUIStore((s) => s.searchOpen);
  const close = useUIStore((s) => s.closeSearch);
  const { query, setQuery, results } = useSearch(18);
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      }
      if (e.key === "Enter" && results[active]) {
        close();
        router.push(`/products/${results[active].slug}`);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, results, active, close, router]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col items-center px-4 pt-[10vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-[var(--color-overlay)] backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.div
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-lg border border-line bg-bg shadow-lift"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            role="dialog"
            aria-label="Search products"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={20} className="text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Search 69 products — oils, attars, ruh, hydrosols…"
                className="h-14 flex-1 bg-transparent text-base text-ink placeholder:text-muted/60 focus:outline-none"
              />
              <button onClick={close} aria-label="Close search" className="p-1.5">
                <X size={18} className="text-muted" />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-2">
              {query && results.length === 0 && (
                <p className="px-4 py-10 text-center text-muted">
                  No products found for “{query}”. Try another term.
                </p>
              )}
              {!query && (
                <p className="px-4 py-10 text-center text-sm text-muted">
                  Start typing to search. Use ↑ ↓ to navigate, Enter to open.
                </p>
              )}
              {results.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  onClick={close}
                  onMouseEnter={() => setActive(i)}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 ${
                    i === active ? "bg-surface" : ""
                  }`}
                >
                  <span className="h-11 w-11 shrink-0 overflow-hidden rounded-md">
                    <ProductImage
                      name={p.name}
                      category={p.category}
                      showName={false}
                      iconSize={28}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-ink">
                      {p.name}
                    </span>
                    <span className="block text-xs text-muted">
                      {p.categoryLabel} · {priceRangeLabel(p.slabs)}
                    </span>
                  </span>
                  {i === active && (
                    <CornerDownLeft size={15} className="text-muted" />
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
