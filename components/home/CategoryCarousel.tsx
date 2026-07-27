"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES, getCategoryCount } from "@/lib/products";
import { CATEGORY_HREF } from "@/lib/constants";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CategoryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6">
      <SectionHeading
        eyebrow="Shop by Category"
        title="Pure oils for every purpose"
        action={
          <div className="flex gap-2">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Previous"
              className="rounded-pill border border-line p-2 text-ink transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              aria-label="Next"
              className="rounded-pill border border-line p-2 text-ink transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        }
      />

      <div className="mt-8 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={CATEGORY_HREF[cat.slug]}
              className="group relative flex min-w-[260px] max-w-[280px] flex-[0_0_78%] flex-col overflow-hidden rounded-lg border border-line bg-elevated transition-all hover:-translate-y-1 hover:border-line-strong hover:shadow-lift sm:flex-[0_0_42%] lg:flex-[0_0_22%]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={`/category/thumbnails/${cat.slug}.png`}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 640px) 78vw, 280px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
                <span className="absolute left-3 top-3 flex h-11 w-11 items-center justify-center rounded-lg bg-white/85 text-primary backdrop-blur">
                  <CategoryIcon icon={cat.icon} size={22} strokeWidth={1.5} />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-2xl leading-tight text-ink">
                  {cat.label}
                </h3>
                <p className="mt-1 text-sm text-muted">{cat.tagline}</p>
                <span className="mt-4 text-xs text-muted">
                  {getCategoryCount(cat.slug)} products
                </span>
                <span className="mt-3 inline-flex items-center gap-1 font-label text-[0.65rem] uppercase tracking-[0.12em] text-primary">
                  Explore <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
