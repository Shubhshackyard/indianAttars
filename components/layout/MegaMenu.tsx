"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, getProductsByCategory } from "@/lib/products";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { CATEGORY_HREF } from "@/lib/constants";

export function MegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className="absolute left-0 right-0 top-full border-b border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#111827] shadow-lift"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((cat) => {
          const top = getProductsByCategory(cat.slug).slice(0, 5);
          return (
            <div key={cat.slug}>
              <Link
                href={CATEGORY_HREF[cat.slug]}
                onClick={onNavigate}
                className="group flex items-center gap-2"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#F3F4F6] text-[#1F2937] dark:bg-[#1F2937] dark:text-[#F9FAFB]">
                  <CategoryIcon icon={cat.icon} size={18} />
                </span>
                <span className="font-label text-[0.7rem] uppercase tracking-[0.12em] text-[#1F2937] group-hover:text-primary dark:text-[#F9FAFB] dark:group-hover:text-[#57c08c]">
                  {cat.label}
                </span>
              </Link>
              <ul className="mt-3 space-y-1.5">
                {top.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={onNavigate}
                      className="text-sm font-medium text-[#374151] hover:text-[#000000] dark:text-[#E5E7EB] dark:hover:text-white transition-colors"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="border-t border-[#E5E7EB] dark:border-[#1F2937] bg-[#F9FAFB] dark:bg-[#161E2E]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <span className="text-sm text-[#6B7280] dark:text-[#D1D5DB]">
            Browse all 69 products across 5 categories
          </span>
          <Link
            href="/products"
            onClick={onNavigate}
            className="inline-flex items-center gap-1.5 font-label text-[0.7rem] uppercase tracking-[0.12em] font-semibold text-primary dark:text-[#57c08c] hover:underline"
          >
            View All Products <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
