"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { BadgeCheck } from "lucide-react";
import { TESTIMONIALS } from "@/data/content";
import { StarRating } from "@/components/ui/StarRating";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true }, [
    Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6">
      <SectionHeading align="center" title="What Our Customers Say" />
      <div className="mt-8 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="flex min-w-0 flex-[0_0_90%] flex-col rounded-lg border border-line bg-white p-6 shadow-card sm:flex-[0_0_46%] lg:flex-[0_0_31%]"
            >
              <StarRating rating={t.rating} showValue={false} />
              <blockquote className="mt-3 flex-1 font-display text-lg italic leading-snug text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft font-display text-lg text-primary">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink">
                    {t.name} — {t.city}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-primary">
                    <BadgeCheck size={13} /> Verified Buyer · {t.product}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {snaps.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={cn(
              "h-2 rounded-pill transition-all",
              i === selected ? "w-6 bg-primary" : "w-2 bg-line",
            )}
          />
        ))}
      </div>
    </section>
  );
}
