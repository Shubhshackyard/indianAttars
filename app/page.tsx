import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { USPSection } from "@/components/home/USPSection";
import { CertificationBadges } from "@/components/home/CertificationBadges";
import { SpecHighlight } from "@/components/home/SpecHighlight";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { PricingTable } from "@/components/home/PricingTable";
import { ProductSpotlight } from "@/components/home/ProductSpotlight";
import { BulkCTABanner } from "@/components/home/BulkCTABanner";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { BlogSection } from "@/components/home/BlogSection";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import { getMostLovedProducts, getProductsBySlugs } from "@/lib/products";

export default function HomePage() {
  const featured = getMostLovedProducts();
  const spotlight = getProductsBySlugs([
    "oudh-attar",
    "indian-sandalwood-oil",
    "ruh-gulab",
  ]);

  return (
    <>
      <OrganizationSchema />
      <HeroSection />
      <TrustBar />
      <CategoryCarousel />
      <FeaturedProducts products={featured} />
      <USPSection />
      <CertificationBadges />
      <SpecHighlight />
      <MarqueeStrip />
      <PricingTable />
      <ProductSpotlight products={spotlight} />
      <BulkCTABanner />
      <TestimonialsCarousel />
      <BlogSection />
    </>
  );
}
