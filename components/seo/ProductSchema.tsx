import type { Product } from "@/types/product";
import { SITE } from "@/lib/site";

export function ProductSchema({ product }: { product: Product }) {
  const prices = product.slabs?.map((s) => s.price) ?? [];
  const minPrice = prices.length > 0 ? Math.min(...prices) : product.baseRatePerKg;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : product.baseRatePerKg;
  const productUrl = `${SITE.url}/products/${product.slug}`;

  // Build image list (Google Product rich results REQUIRE image)
  const images: string[] = [];
  const defaultImage = `${SITE.url}/products/${product.slug}/flat_lay.png`;
  images.push(defaultImage);

  if (product.imageUrl) {
    const fullUrl = product.imageUrl.startsWith("http")
      ? product.imageUrl
      : `${SITE.url}${product.imageUrl.startsWith("/") ? "" : "/"}${product.imageUrl}`;
    if (!images.includes(fullUrl)) images.push(fullUrl);
  }

  if (product.images && product.images.length > 0) {
    product.images.forEach((img) => {
      const fullUrl = img.startsWith("http")
        ? img
        : `${SITE.url}${img.startsWith("/") ? "" : "/"}${img}`;
      if (!images.includes(fullUrl)) images.push(fullUrl);
    });
  }

  const availability =
    product.stock === "limited"
      ? "https://schema.org/LimitedAvailability"
      : "https://schema.org/InStock";

  const offers =
    product.slabs && product.slabs.length === 1
      ? {
          "@type": "Offer",
          priceCurrency: "INR",
          price: minPrice,
          availability,
          itemCondition: "https://schema.org/NewCondition",
          url: productUrl,
          priceValidUntil: "2026-12-31",
          seller: {
            "@type": "Organization",
            name: "indianattars",
          },
        }
      : {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: minPrice,
          highPrice: maxPrice,
          offerCount: product.slabs?.length ?? 1,
          availability,
          itemCondition: "https://schema.org/NewCondition",
          url: productUrl,
          priceValidUntil: "2026-12-31",
          seller: {
            "@type": "Organization",
            name: "indianattars",
          },
        };

  const hasRating =
    typeof product.rating === "number" &&
    product.rating > 0 &&
    typeof product.reviewCount === "number" &&
    product.reviewCount > 0;

  const aggregateRating = hasRating
    ? {
        "@type": "AggregateRating",
        ratingValue: Number(product.rating.toFixed(1)),
        bestRating: "5",
        worstRating: "1",
        ratingCount: product.reviewCount,
        reviewCount: product.reviewCount,
      }
    : undefined;

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.shortDescription,
    category: product.categoryLabel,
    image: images,
    sku: product.id || product.slug,
    mpn: product.id || product.slug,
    brand: {
      "@type": "Brand",
      name: "indianattars",
    },
    offers,
    ...(aggregateRating ? { aggregateRating } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

