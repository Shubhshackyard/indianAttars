"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Lock } from "lucide-react";
import { useCartStore, selectCartSubtotal } from "@/lib/cart";
import { useCartHydrated } from "@/hooks/useCart";
import { ProductImage } from "@/components/ui/ProductImage";
import { Button, buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { toast } from "@/lib/toast";
import { formatINR } from "@/lib/utils";
import { waLink } from "@/lib/site";
import { processRazorpayCheckout } from "@/lib/razorpay";
import { ShippingFormModal, ShippingDetails } from "./ShippingFormModal";

export function CartView() {
  const hydrated = useCartHydrated();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clear = useCartStore((s) => s.clear);
  const subtotal = useCartStore(selectCartSubtotal);

  const { isLoaded, isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();
  const [shippingModalOpen, setShippingModalOpen] = useState(false);

  if (!hydrated || !isLoaded) {
    return (
      <div className="py-20 text-center text-muted">Loading your cart…</div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-line py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-pill bg-surface text-primary">
          <ShoppingBag size={28} />
        </span>
        <p className="mt-4 text-muted">Your cart is empty.</p>
        <Link
          href="/products"
          className={buttonClasses({ variant: "primary", size: "md", className: "mt-4" })}
        >
          Start Exploring <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  const handleCheckoutClick = () => {
    // Redirect Logic: Intercept guest checkout attempts
    if (!isSignedIn || !user) {
      toast.info("Please sign in or create an account to proceed with checkout.");
      openSignIn({
        fallbackRedirectUrl: "/cart",
      });
      return;
    }

    // Open pre-checkout shipping details modal
    setShippingModalOpen(true);
  };

  const handleShippingSubmit = (shippingDetails: ShippingDetails) => {
    setShippingModalOpen(false);

    // Persist cart items and shipping info for order success receipt page
    try {
      sessionStorage.setItem(
        "last_order",
        JSON.stringify({
          items,
          total: subtotal,
          date: new Date().toISOString(),
          shippingAddress: shippingDetails,
        }),
      );
    } catch (e) {
      console.error("Could not persist order details into sessionStorage:", e);
    }

    // Process checkout with Clerk User Profile data and shipping details
    processRazorpayCheckout({
      amountInINR: subtotal,
      description: `Order (${items.length} item${items.length > 1 ? "s" : ""})`,
      items: items.map((i) => ({
        productSlug: i.productSlug,
        name: i.name,
        categoryLabel: i.categoryLabel,
        qty: i.qty,
        unitPrice: i.unitPrice,
        quantity: i.quantity,
      })),
      customer: {
        userId: user?.id,
        name: shippingDetails.name || user?.fullName || "Customer",
        email: user?.primaryEmailAddress?.emailAddress || "",
        contact: shippingDetails.phone,
      },
      onSuccess: () => {
        clear();
      },
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={`${item.productSlug}-${item.qty}`}
            className="flex gap-4 rounded-lg border border-line bg-bg p-4"
          >
            <Link
              href={`/products/${item.productSlug}`}
              className="h-20 w-20 shrink-0 overflow-hidden rounded-md"
            >
              <ProductImage
                name={item.name}
                category={item.category}
                showName={false}
                iconSize={44}
              />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link
                    href={`/products/${item.productSlug}`}
                    className="font-display text-lg leading-tight text-ink hover:text-primary"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-muted">
                    {item.categoryLabel} · {item.qty}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.productSlug, item.qty)}
                  aria-label="Remove"
                  className="text-muted hover:text-primary"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="flex items-center rounded-pill border border-line">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.productSlug,
                        item.qty,
                        item.quantity - 1,
                      )
                    }
                    aria-label="Decrease"
                    className="px-2.5 py-1.5 text-muted hover:text-ink"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="min-w-7 text-center text-sm">
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
                    aria-label="Increase"
                    className="px-2.5 py-1.5 text-muted hover:text-ink"
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
        <button
          onClick={clear}
          className="text-sm text-primary hover:underline"
        >
          Clear cart
        </button>
      </div>

      <aside className="h-fit rounded-lg border border-line bg-surface/40 p-6">
        <h2 className="font-display text-xl text-ink">Order Summary</h2>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-muted">Subtotal</span>
          <span className="font-display text-2xl text-ink">
            {formatINR(subtotal)}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted">
          + GST as applicable · Shipping calculated at confirmation · Prices
          ex-Kanpur
        </p>

        {isSignedIn ? (
          <div className="mt-4 rounded-md border border-line bg-surface/60 p-3 text-xs text-ink">
            <p className="font-medium text-primary">Signed in as:</p>
            <p className="truncate font-mono">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-2 rounded-md border border-line bg-primary-soft/40 p-3 text-xs text-muted">
            <Lock size={14} className="text-primary shrink-0" />
            <span>Sign in required to link order to your profile for tracking.</span>
          </div>
        )}

        <Button
          variant="primary"
          size="lg"
          fullWidth
          className="mt-5"
          onClick={handleCheckoutClick}
        >
          {isSignedIn ? "Proceed to Checkout" : "Sign In to Checkout"}
        </Button>
        <a
          href={waLink("Hi! I'd like to place this order from my cart.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-2 text-xs text-muted hover:text-ink"
        >
          Need assistance? Talk via WhatsApp
        </a>
        <Link
          href="/products"
          className="mt-3 block text-center text-sm text-primary hover:underline"
        >
          Continue shopping →
        </Link>
      </aside>

      <ShippingFormModal
        open={shippingModalOpen}
        onClose={() => setShippingModalOpen(false)}
        onSubmit={handleShippingSubmit}
      />
    </div>
  );
}
