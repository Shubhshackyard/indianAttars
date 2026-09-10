import type { Product } from "@/types/product";

export function ProductSchema({ product }: { product: Product }) {
  const prices = product.slabs.map((s) => s.price);
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    category: product.categoryLabel,
    brand: { "@type": "Brand", name: "indianattars" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: String(Math.min(...prices)),
      highPrice: String(Math.max(...prices)),
      priceCurrency: "INR",
      offerCount: product.slabs.length,
      availability:
        product.stock === "limited"
          ? "https://schema.org/LimitedAvailability"
          : "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(product.rating),
      reviewCount: String(product.reviewCount),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
