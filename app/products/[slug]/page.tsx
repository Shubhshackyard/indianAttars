import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getProductSlugs,
  getRelatedProducts,
  getCategoryMeta,
} from "@/lib/products";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductActions } from "@/components/product/ProductActions";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { FrequentlyBoughtTogether } from "@/components/product/FrequentlyBoughtTogether";
import { ProductSchema } from "@/components/seo/ProductSchema";
import { CATEGORY_HREF } from "@/lib/constants";
import { formatINR } from "@/lib/utils";

export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getProductBySlug(params.slug);
  if (!p) return { title: "Product not found" };
  const prices = p.slabs.map((s) => s.price);
  const desc = `Buy pure ${p.name}${
    p.spec.botanicalName ? ` (${p.spec.botanicalName})` : ""
  } online from India. ISO 9001:2015, GMP & Halal certified. Available from ${formatINR(
    Math.min(...prices),
  )}. COA & MSDS available.`;
  return {
    title: `${p.name} — ${p.categoryLabel}`,
    description: desc,
    openGraph: { title: `${p.name} | indianattars.com`, description: desc },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const fbt = [product, ...related.slice(0, 2)];
  const catMeta = getCategoryMeta(product.category);

  const chips = [
    product.spec.casNumber && `CAS: ${product.spec.casNumber}`,
    product.spec.femaNumber && `FEMA: ${product.spec.femaNumber}`,
    product.spec.specificGravity && `SG: ${product.spec.specificGravity}`,
  ].filter(Boolean) as string[];

  return (
    <>
      <ProductSchema product={product} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            {
              label: catMeta?.label ?? "Products",
              href: CATEGORY_HREF[product.category],
            },
            { label: product.name },
          ]}
        />

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <ProductGallery product={product} />

          <div>
            <span className="font-label text-[0.62rem] uppercase tracking-[0.16em] text-primary">
              {product.categoryLabel}
              {product.spec.countryOfOrigin
                ? ` · ${product.spec.countryOfOrigin}`
                : ""}
              {product.spec.extractionMethod
                ? ` · ${product.spec.extractionMethod}`
                : ""}
            </span>
            <h1 className="mt-1.5 font-display text-h1 leading-none text-ink">
              {product.name}
            </h1>
            {(product.spec.botanicalName || product.nameHindi) && (
              <p className="mt-1 text-muted">
                {product.spec.botanicalName}
                {product.nameHindi && (
                  <span className="font-hindi"> · {product.nameHindi}</span>
                )}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <StarRating rating={product.rating} count={product.reviewCount} />
              <span
                className={`flex items-center gap-1 text-xs ${
                  product.stock === "limited" ? "text-warning" : "text-success"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    product.stock === "limited" ? "bg-warning" : "bg-success"
                  }`}
                />
                {product.stock === "limited" ? "Limited Stock" : "In Stock"}
              </span>
            </div>

            {chips.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {chips.map((c) => (
                  <Badge key={c} variant="surface">
                    {c}
                  </Badge>
                ))}
              </div>
            )}

            <p className="mt-4 leading-relaxed text-muted">
              {product.shortDescription}
            </p>

            {product.category === "ruh-absolutes" && (
              <p className="mt-2 text-sm text-primary">
                Minimum order: 50gm · Maximum: 1kg.
              </p>
            )}

            <hr className="my-6 border-line" />

            <ProductActions product={product} />
          </div>
        </div>

        <div className="mt-12">
          <ProductTabs product={product} />
        </div>
      </div>

      <FrequentlyBoughtTogether products={fbt} />
      <RelatedProducts product={product} />
    </>
  );
}
