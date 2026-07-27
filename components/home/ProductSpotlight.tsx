"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductImage } from "@/components/ui/ProductImage";
import { priceRangeLabel } from "@/lib/utils";

export function ProductSpotlight({ products }: { products: Product[] }) {
  const [emblaRef] = useEmblaCarousel({ align: "center", loop: true }, [
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  return (
    <section className="py-section">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5 px-4 sm:px-6">
          {products.map((p) => (
            <article
              key={p.slug}
              className="relative flex-[0_0_88%] overflow-hidden rounded-lg sm:flex-[0_0_62%] lg:flex-[0_0_44%]"
            >
              <div className="aspect-[16/10]">
                <ProductImage
                  name={p.name}
                  category={p.category}
                  showName={false}
                  src={p.imageUrl}
                  sizes="(max-width: 640px) 88vw, 44vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="font-label text-[0.62rem] uppercase tracking-[0.16em] text-white/80">
                  {p.categoryLabel}
                </span>
                <h3 className="mt-1 font-display text-4xl italic leading-none text-white">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  For Perfumers · Aromatherapy · Luxury Blends
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="text-white">{priceRangeLabel(p.slabs)}</span>
                  <Link
                    href={`/products/${p.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-pill bg-primary px-4 py-2 font-label text-[0.62rem] uppercase tracking-[0.12em] text-primary-fg hover:bg-primary-hover"
                  >
                    Shop Now <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
