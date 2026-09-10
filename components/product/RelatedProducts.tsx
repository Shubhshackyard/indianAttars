import { getRelatedProducts } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Product } from "@/types/product";

export function RelatedProducts({ product }: { product: Product }) {
  const related = getRelatedProducts(product, 4);
  if (!related.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6">
      <SectionHeading title="You Might Also Love" />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
