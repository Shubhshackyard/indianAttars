"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X, ArrowRight } from "lucide-react";
import { useCartStore, selectCartSubtotal } from "@/lib/cart";
import { ProductImage } from "./ProductImage";
import { buttonClasses } from "./Button";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotal = useCartStore(selectCartSubtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[110]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-[var(--color-overlay)] backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-bg shadow-lift"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink">
                <ShoppingBag size={18} className="text-primary" /> Your Cart
              </h2>
              <button onClick={close} aria-label="Close cart" className="p-1.5">
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-pill bg-surface text-primary">
                  <ShoppingBag size={28} />
                </div>
                <p className="text-muted">Your cart is empty.</p>
                <Link
                  href="/products"
                  onClick={close}
                  className={buttonClasses({ variant: "primary", size: "md" })}
                >
                  Start Exploring <ArrowRight size={15} />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                  {items.map((item) => (
                    <div
                      key={`${item.productSlug}-${item.qty}`}
                      className="flex gap-3 rounded-lg border border-line bg-surface/40 p-3"
                    >
                      <Link
                        href={`/products/${item.productSlug}`}
                        onClick={close}
                        className="h-16 w-16 shrink-0 overflow-hidden rounded-md"
                      >
                        <ProductImage
                          name={item.name}
                          category={item.category}
                          showName={false}
                          iconSize={40}
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${item.productSlug}`}
                            onClick={close}
                            className="truncate font-display text-lg leading-tight text-ink hover:text-primary"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.productSlug, item.qty)}
                            aria-label="Remove item"
                            className="shrink-0 text-muted hover:text-primary"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-muted">
                          {item.categoryLabel} · {item.qty}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded-pill border border-line">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productSlug,
                                  item.qty,
                                  item.quantity - 1,
                                )
                              }
                              aria-label="Decrease quantity"
                              className="px-2 py-1 text-muted hover:text-ink"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-6 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.productSlug,
                                  item.qty,
                                  item.quantity + 1,
                                )
                              }
                              aria-label="Increase quantity"
                              className="px-2 py-1 text-muted hover:text-ink"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-medium text-ink">
                            {formatINR(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-line px-5 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-display text-2xl text-ink">
                      {formatINR(subtotal)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    + GST as applicable · Prices ex-Kanpur
                  </p>
                  <Link
                    href="/cart"
                    onClick={close}
                    className={buttonClasses({
                      variant: "primary",
                      size: "lg",
                      fullWidth: true,
                      className: "mt-4",
                    })}
                  >
                    Proceed to Checkout <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/bulk-inquiry"
                    onClick={close}
                    className="mt-2 block text-center text-sm text-primary hover:underline"
                  >
                    Request a bulk quote instead →
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
