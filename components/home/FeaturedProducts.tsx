import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/Button";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6">
      <SectionHeading
        eyebrow="Our Most Loved Oils"
        title="Trusted by perfumers, aromatherapists & D2C brands"
        action={
          <Link
            href="/products"
            className={buttonClasses({ variant: "outline", size: "sm" })}
          >
            View All <ArrowRight size={14} />
          </Link>
        }
      />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
