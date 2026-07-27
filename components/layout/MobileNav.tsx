"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Search,
  ShoppingBag,
  Store,
  X,
  MessageSquareText,
  ArrowRight,
} from "lucide-react";
import { NAV_LINKS, CATEGORY_HREF } from "@/lib/constants";
import { CATEGORIES } from "@/lib/products";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { useUIStore } from "@/lib/ui";
import { useCartStore } from "@/lib/cart";
import { useCartCount, useCartHydrated } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const open = useUIStore((s) => s.mobileNavOpen);
  const close = useUIStore((s) => s.closeMobileNav);
  const openSearch = useUIStore((s) => s.openSearch);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const count = useCartCount();
  const hydrated = useCartHydrated();
  const pathname = usePathname();

  const tabs = [
    { label: "Home", href: "/", icon: Home },
    { label: "Shop", href: "/products", icon: Store },
    { label: "Inquire", href: "/bulk-inquiry", icon: MessageSquareText },
  ];

  return (
    <>
      {/* Slide-in menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-[var(--color-overlay)]"
              onClick={close}
              aria-hidden
            />
            <motion.div
              className="absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-bg shadow-lift"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <span className="font-display text-2xl italic text-ink">
                  indian<span className="text-gold">attars</span>
                </span>
                <button onClick={close} aria-label="Close menu" className="p-1.5">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 px-3 py-4">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={close}
                    className="rounded-md px-3 py-2.5 font-label text-xs uppercase tracking-[0.12em] text-ink hover:bg-surface"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              <div className="px-5 py-2">
                <span className="font-label text-[0.6rem] uppercase tracking-[0.16em] text-muted">
                  Categories
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1 px-3 pb-6">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    href={CATEGORY_HREF[c.slug]}
                    onClick={close}
                    className="flex items-center gap-3 rounded-md px-3 py-2.5 hover:bg-surface"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-surface text-primary">
                      <CategoryIcon icon={c.icon} size={16} />
                    </span>
                    <span className="flex-1 text-sm text-ink">{c.label}</span>
                    <ArrowRight size={15} className="text-muted" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E5E7EB] dark:border-[#1F2937] bg-white dark:bg-[#111827] lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5">
          {tabs.slice(0, 2).map((t) => {
            const active = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2.5 text-[0.6rem]",
                  active ? "text-primary" : "text-muted",
                )}
              >
                <t.icon size={20} />
                {t.label}
              </Link>
            );
          })}
          <button
            onClick={openSearch}
            className="flex flex-col items-center gap-0.5 py-2.5 text-[0.6rem] text-muted"
          >
            <Search size={20} />
            Search
          </button>
          <button
            onClick={toggleCart}
            className="relative flex flex-col items-center gap-0.5 py-2.5 text-[0.6rem] text-muted"
          >
            <span className="relative">
              <ShoppingBag size={20} />
              {hydrated && count > 0 && (
                <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-pill bg-primary px-1 text-[0.55rem] font-semibold text-primary-fg">
                  {count}
                </span>
              )}
            </span>
            Cart
          </button>
          <Link
            href="/bulk-inquiry"
            className={cn(
              "flex flex-col items-center gap-0.5 py-2.5 text-[0.6rem]",
              pathname === "/bulk-inquiry" ? "text-primary" : "text-muted",
            )}
          >
            <MessageSquareText size={20} />
            Inquire
          </Link>
        </div>
      </div>
    </>
  );
}
