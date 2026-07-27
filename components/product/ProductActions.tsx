"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingBag,
  FileText,
  GitCompare,
  ShieldCheck,
  Truck,
  Lock,
  Leaf,
} from "lucide-react";
import { SlabPriceSelector } from "./SlabPriceSelector";
import { Button, buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { useCartStore, toCartItem } from "@/lib/cart";
import { useUIStore } from "@/lib/ui";
import { toast } from "@/lib/toast";
import { waLink } from "@/lib/site";
import { formatINR, cn } from "@/lib/utils";
import type { PricingSlab, Product } from "@/types/product";

export function ProductActions({ product }: { product: Product }) {
  const defaultSlab =
    product.slabs.find((s) => s.grams === 1000) ?? product.slabs[0];
  const [slab, setSlab] = useState<PricingSlab>(defaultSlab);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toggleCompare = useUIStore((s) => s.toggleCompare);
  const inCompare = useUIStore((s) => s.compare.includes(product.slug));

  const add = () => {
    addItem(toCartItem(product, slab));
    toast.success(`${product.name} (${slab.qty}) added to cart`);
    openCart();
  };

  const compare = () => {
    const ok = toggleCompare(product.slug);
    if (!ok) toast.error("You can compare up to 3 products at a time");
  };

  const wa = waLink(
    `Hi! I'd like to order ${product.name} (${slab.qty}) — ${formatINR(
      slab.price,
    )}. Is it available?`,
  );

  return (
    <div>
      <SlabPriceSelector product={product} value={slab} onChange={setSlab} />

      <div className="mt-5 flex flex-col gap-2">
        <Button variant="primary" size="lg" fullWidth onClick={add}>
          <ShoppingBag size={16} /> Add to Cart
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/bulk-inquiry"
            className={buttonClasses({ variant: "secondary", size: "md" })}
          >
            <FileText size={15} /> Request Quote
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "whatsapp", size: "md" })}
          >
            <WhatsAppIcon /> WhatsApp
          </a>
        </div>
        <button
          onClick={compare}
          className={cn(
            "inline-flex items-center justify-center gap-1.5 text-sm transition-colors",
            inCompare ? "text-primary" : "text-muted hover:text-ink",
          )}
        >
          <GitCompare size={15} />
          {inCompare ? "Added to Compare" : "Add to Compare"}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 rounded-lg border border-line bg-surface/40 p-4 text-xs text-muted sm:grid-cols-4">
        <span className="flex items-center gap-1.5">
          <Leaf size={14} className="text-primary" /> Pure &amp; Unadulterated
        </span>
        <span className="flex items-center gap-1.5">
          <Truck size={14} className="text-primary" /> Ships in 2–4 Days
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-primary" /> COA Available
        </span>
        <span className="flex items-center gap-1.5">
          <Lock size={14} className="text-primary" /> Secure Checkout
        </span>
      </div>
    </div>
  );
}
