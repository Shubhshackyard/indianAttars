"use client";

import { getReviews, ratingBreakdown } from "@/lib/reviews";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { toast } from "@/lib/toast";
import type { Product } from "@/types/product";

export function ReviewsSection({ product }: { product: Product }) {
  const reviews = getReviews(product);
  const breakdown = ratingBreakdown(product);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <div>
        <div className="rounded-lg border border-line bg-surface/40 p-5 text-center">
          <div className="font-display text-5xl text-ink">
            {product.rating.toFixed(1)}
          </div>
          <div className="mt-1 flex justify-center">
            <StarRating rating={product.rating} showValue={false} />
          </div>
          <div className="mt-1 text-xs text-muted">
            {product.reviewCount} reviews
          </div>
        </div>
        <div className="mt-4 space-y-1.5">
          {breakdown.map((b) => (
            <div key={b.star} className="flex items-center gap-2 text-xs">
              <span className="w-7 text-muted">{b.star}★</span>
              <div className="h-2 flex-1 overflow-hidden rounded-pill bg-line">
                <div
                  className="h-full bg-gold"
                  style={{ width: `${b.pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-muted">{b.pct}%</span>
            </div>
          ))}
        </div>
        <Button
          variant="secondary"
          size="md"
          fullWidth
          className="mt-4"
          onClick={() => toast.info("Review form coming soon — thank you!")}
        >
          Write a Review
        </Button>
      </div>

      <div className="space-y-4">
        {reviews.map((r, i) => (
          <div key={i} className="rounded-lg border border-line p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-soft font-display text-primary">
                  {r.name.charAt(0)}
                </span>
                <div>
                  <div className="text-sm font-medium text-ink">{r.name}</div>
                  <div className="text-xs text-muted">
                    {r.city}
                    {r.verified && (
                      <span className="ml-1 text-primary">· Verified Buyer</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted">{r.date}</div>
            </div>
            <div className="mt-2">
              <StarRating rating={r.rating} showValue={false} size={13} />
            </div>
            <p className="mt-2 text-sm text-muted">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
