import type { Metadata } from "next";
import { getAllProducts, TOTAL_PRODUCTS } from "@/lib/products";
import { ProductsExplorer } from "@/components/product/ProductsExplorer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse all 69 products — pure essential oils, Indian attars, ruh & absolutes, fragrances and hydrosols. Transparent slab pricing, COA & MSDS available.",
};

export default function ProductsPage() {
  const products = getAllProducts();
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
      <div className="mb-8 mt-4">
        <h1 className="font-display text-h1 text-ink">All Products</h1>
        <p className="mt-1 text-muted">
          {TOTAL_PRODUCTS} products · Essential Oils · Attars · Ruh &amp;
          Absolutes · Fragrances · Hydrosols
        </p>
      </div>
      <ProductsExplorer products={products} />
    </div>
  );
}
