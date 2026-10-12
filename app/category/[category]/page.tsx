import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  getAllProducts,
  getCategoryMeta,
  getCategoryCount,
} from "@/lib/products";
import { ProductsExplorer } from "@/components/product/ProductsExplorer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types/product";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = getCategoryMeta(category as ProductCategory);
  if (!meta) return { title: "Category" };
  return { title: meta.label, description: meta.description };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const slug = category as ProductCategory;
  const meta = getCategoryMeta(slug);
  if (!meta) notFound();

  const products = getAllProducts();
  const count = getCategoryCount(slug);
  const heroProduct = products.find((p) => p.category === slug);
  const bannerImage = meta.bannerImage
    ? getCloudinaryUrl(meta.bannerImage)
    : heroProduct?.imageUrl;
  const isLight = meta.theme === "light";

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${meta.label} — indianattars`,
    description: meta.description,
    numberOfItems: count,
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="border-b border-line bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: meta.label },
            ]}
          />
        </div>
        <div
          className={cn(
            "relative mt-4 h-[240px] w-full overflow-hidden sm:h-[300px]",
            isLight ? "bg-surface" : "bg-primary",
          )}
        >
          {bannerImage && (
            <Image
              src={bannerImage}
              alt={meta.label}
              fill
              priority
              sizes="100vw"
              className="object-cover object-right sm:object-center"
            />
          )}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-r",
              isLight
                ? "from-white/95 via-white/80 to-white/20 sm:via-white/70 sm:to-transparent"
                : "from-ink/95 via-ink/80 to-ink/30 sm:via-ink/70 sm:to-transparent",
            )}
          />
          <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <span
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-lg text-primary shadow-card",
                  isLight
                    ? "bg-white/95 border border-line"
                    : "bg-white/90",
                )}
              >
                <CategoryIcon icon={meta.icon} size={30} strokeWidth={1.5} />
              </span>
              <div>
                <h1
                  className={cn(
                    "font-display text-h1 leading-none",
                    isLight ? "text-ink" : "text-white",
                  )}
                >
                  {meta.label}
                </h1>
                <p
                  className={cn(
                    "mt-1 font-label text-[0.65rem] uppercase tracking-[0.14em]",
                    isLight ? "text-primary font-semibold" : "text-accent",
                  )}
                >
                  {meta.tagline}
                </p>
              </div>
            </div>
            <p
              className={cn(
                "mt-4 max-w-2xl text-sm leading-relaxed",
                isLight ? "text-ink font-medium" : "text-white/85",
              )}
            >
              {meta.description}
            </p>
            <p
              className={cn(
                "mt-2 text-sm",
                isLight ? "text-muted font-medium" : "text-white/70",
              )}
            >
              {count} products
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <ProductsExplorer products={products} initialCategory={slug} />
      </div>
    </div>
  );
}
