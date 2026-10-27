import type { Metadata } from "next";
import Link from "next/link";
import {
  Droplets,
  Sparkles,
  Flame,
  FlaskConical,
  Leaf,
  Flower2,
  Layers,
  Beaker,
  ShieldCheck,
  FileText,
  HeartHandshake,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Compass,
  History,
  Building2,
  Check,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CertificationBadges } from "@/components/home/CertificationBadges";
import { IndiaSourcingMap } from "@/components/about/IndiaSourcingMap";
import { waLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "About Us — Indian Attars | Shivaay Naturals & Essentials",
  description:
    "Indian Attars – The Essence of Nature, Rooted in Indian Heritage. The aromatic ingredients brand of Shivaay Naturals & Essentials, Kannauj. Heritage distillation since 1995.",
};

const productRange = [
  {
    title: "Essential Oils",
    icon: Droplets,
    description:
      "Aromatic oils sourced from botanical materials, including sandalwood, vetiver, lemongrass, patchouli, lavender and other valued aromatic botanicals.",
  },
  {
    title: "Indian Attars",
    icon: Sparkles,
    description:
      "Traditional Indian perfume oils inspired by flowers, herbs, woods, spices and other distinctive natural aromas.",
  },
  {
    title: "Spice Oils",
    icon: Flame,
    description:
      "Aromatic extracts of spices such as cardamom, clove, cinnamon, ginger and nutmeg for suitable flavour and fragrance applications.",
  },
  {
    title: "Ruh & Aromatic Extracts",
    icon: FlaskConical,
    description:
      "Speciality aromatic materials for discerning perfumers and fragrance creators.",
  },
  {
    title: "Raw Herbs & Botanicals",
    icon: Leaf,
    description:
      "Selected aromatic roots, herbs and other botanical materials.",
  },
  {
    title: "Hydrosols & Floral Waters",
    icon: Flower2,
    description:
      "Fragrant waters obtained during the distillation of aromatic plant materials.",
  },
  {
    title: "Fragrances & Aroma Compounds",
    icon: Layers,
    description:
      "Fragrance solutions for personal care, household products, incense and other applications.",
  },
  {
    title: "Flavours & Nature-Identical Aromatics",
    icon: Beaker,
    description:
      "Ingredients for suitable food, beverage, mouth-freshener and industrial flavour applications.",
  },
];

const sectorsServed = [
  "Perfumery, attars and fine fragrances",
  "Essential oil blending and aromatherapy products",
  "Cosmetics, skincare and personal care",
  "Flavours, confectionery and suitable food applications",
  "Mouth fresheners and supari flavouring",
  "Incense, agarbatti, dhoop and related fragrance products",
  "Soaps, detergents and household fragrances",
  "Pharmaceutical and other specialised industrial applications, subject to the relevant product specifications and requirements",
];

const coreValues = [
  {
    title: "Authenticity",
    icon: History,
    description:
      "Preserving genuine botanical origins, traditional deg-bhapka techniques, and the true character of Kannauj perfumery.",
  },
  {
    title: "Transparency",
    icon: FileText,
    description:
      "Providing complete documentation with COA, SDS/MSDS, allergen declarations, and uncompromising clarity in batch specifications.",
  },
  {
    title: "Long-term Relationships",
    icon: HeartHandshake,
    description:
      "Fostering lasting partnerships through responsive communication, domain knowledge, and dependable commercial supply.",
  },
  {
    title: "Respect for Nature",
    icon: Leaf,
    description:
      "Prioritizing responsible harvesting, ethical grower partnerships, and honoring the delicate botanical ecosystems that sustain our craft.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-br from-surface via-bg to-surface/80">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

          <div className="mt-8 max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-pill border border-primary/20 bg-primary-soft/60 px-3.5 py-1 text-xs font-medium tracking-wide text-primary">
              <Sparkles size={14} className="text-primary" />
              Bringing the finest aromas of nature to the world.
            </span>

            <h1 className="mt-5 font-display text-h1 font-normal tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Indian Attars – The Essence of Nature, Rooted in Indian Heritage
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
              Welcome to <strong className="font-semibold text-ink">Indian Attars</strong>, the aromatic ingredients brand of{" "}
              <strong className="font-semibold text-ink">Shivaay Naturals &amp; Essentials</strong>, based in Kannauj, Uttar Pradesh, India — a city renowned for its rich tradition of natural fragrance and attar making.
            </p>
          </div>

          {/* Quick Highlight Strips */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-line/70 pt-8 sm:grid-cols-4">
            <div className="rounded-lg border border-line/60 bg-bg/80 p-4 shadow-sm backdrop-blur">
              <span className="font-label text-[0.65rem] uppercase tracking-[0.16em] text-primary">
                Heritage Since
              </span>
              <p className="mt-1 font-display text-2xl font-semibold text-ink">1995</p>
              <p className="text-xs text-muted">Tracing back to Devika Distillers</p>
            </div>

            <div className="rounded-lg border border-line/60 bg-bg/80 p-4 shadow-sm backdrop-blur">
              <span className="font-label text-[0.65rem] uppercase tracking-[0.16em] text-primary">
                Distillation Capital
              </span>
              <p className="mt-1 font-display text-2xl font-semibold text-ink">Kannauj, UP</p>
              <p className="text-xs text-muted">India’s perfume heartland</p>
            </div>

            <div className="rounded-lg border border-line/60 bg-bg/80 p-4 shadow-sm backdrop-blur">
              <span className="font-label text-[0.65rem] uppercase tracking-[0.16em] text-primary">
                Supply Reach
              </span>
              <p className="mt-1 font-display text-2xl font-semibold text-ink">B2B &amp; Global</p>
              <p className="text-xs text-muted">Serving commercial industries</p>
            </div>

            <div className="rounded-lg border border-line/60 bg-bg/80 p-4 shadow-sm backdrop-blur">
              <span className="font-label text-[0.65rem] uppercase tracking-[0.16em] text-primary">
                Quality Assurance
              </span>
              <p className="mt-1 font-display text-2xl font-semibold text-ink">COA &amp; MSDS</p>
              <p className="text-xs text-muted">Tested &amp; documented batches</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="mx-auto max-w-7xl px-4 py-section sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Our Journey"
              title="A heritage of traditional distillation & evolving craft"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Our journey is rooted in a deep appreciation for nature, traditional distillation and the timeless art of fragrance creation. With our origins tracing back to 1995, when we began our journey as <span className="font-medium text-ink">Devika Distillers</span>, we have continued to build upon our experience in natural aromatic ingredients while embracing evolving industry needs and modern applications.
              </p>
              <p>
                At Indian Attars, we believe that every aroma tells a story - of its botanical origin, the craftsmanship behind its extraction and the heritage it carries. Our aim is to bring these stories to life through a diverse range of aromatic products that serve perfumers, fragrance manufacturers, flavour houses and businesses across multiple industries.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-line bg-gradient-to-br from-surface to-bg p-8 shadow-card">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Compass size={28} />
              </div>
              <blockquote className="mt-6 font-display text-xl italic leading-relaxed text-ink">
                &ldquo;Every aroma tells a story — of its botanical origin, the craftsmanship behind its extraction and the heritage it carries.&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-fg">
                  IA
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Indian Attars</p>
                  <p className="text-xs text-muted">Shivaay Naturals &amp; Essentials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Product Range */}
      <section className="border-y border-line bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-section sm:px-6">
          <SectionHeading
            align="center"
            eyebrow="Comprehensive Portfolio"
            title="Our Product Range"
            subtitle="We offer a comprehensive portfolio of aromatic ingredients, combining traditional Indian fragrance expertise with the versatility required by today's industries."
          />

          <div className="mt-4 text-center">
            <span className="font-label text-xs uppercase tracking-widest text-primary">
              Our range includes
            </span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productRange.map((product, idx) => {
              const Icon = product.icon;
              return (
                <div
                  key={product.title}
                  className="group relative flex flex-col justify-between rounded-xl border border-line bg-bg p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-fg">
                        <Icon size={22} />
                      </div>
                      <span className="font-display text-xs text-muted/60">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-lg font-medium text-ink">
                      {product.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {product.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-xl border border-line bg-bg p-6 text-center sm:p-8">
            <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
              From traditional perfumery to contemporary product development, our portfolio is designed to support a broad spectrum of aromatic requirements.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-pill bg-primary px-6 py-2.5 font-label text-xs uppercase tracking-[0.14em] text-primary-fg shadow-sm transition hover:bg-primary-hover"
              >
                Browse All Products <ArrowRight size={14} />
              </Link>
              <Link
                href="/bulk-inquiry"
                className="inline-flex items-center gap-2 rounded-pill border border-line-strong px-6 py-2.5 font-label text-xs uppercase tracking-[0.14em] text-ink transition hover:bg-surface"
              >
                Request Custom Formulation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Map Section */}
      <section className="bg-bg">
        <div className="mx-auto max-w-7xl px-4 py-section sm:px-6">
          <SectionHeading
            eyebrow="Our Sourcing"
            title="Where our aromatics come from"
            subtitle="Explore our direct cultivation partnerships across India's premier aromatic terroirs. Tap any state or pin to inspect the raw botanicals, harvest cycles, and distillation traditions."
          />
          <div className="mt-8">
            <IndiaSourcingMap />
          </div>
        </div>
      </section>

      {/* Commitment to Quality Section */}
      <section className="border-t border-line bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-section sm:px-6">
          <SectionHeading
            align="center"
            eyebrow="Purity, Consistency & Documentation"
            title="Our Commitment to Quality"
          />

          <div className="mx-auto mt-8 max-w-3xl space-y-5 text-center text-base leading-relaxed text-muted sm:text-lg">
            <p>
              Quality begins with understanding the source of every ingredient. We place importance on responsible sourcing, careful handling, appropriate extraction practices and quality checks throughout our supply process.
            </p>
            <p>
              We understand that our customers need more than an appealing aroma. They need consistency, product information and dependable supply. That is why we aim to support our customers with transparent product specifications and relevant technical documentation, including Certificates of Analysis (COA), Safety Data Sheets (SDS/MSDS) and allergen information, as applicable to the product.
            </p>
            <p>
              Our approach combines respect for traditional knowledge with a commitment to continual improvement, helping us serve the practical requirements of modern fragrance, flavour and personal-care industries.
            </p>
          </div>

          {/* Documentation Features */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-line bg-bg p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
                <FileText size={22} />
              </div>
              <h3 className="mt-4 font-display text-lg font-medium text-ink">
                Technical Documentation
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                Transparent COA, SDS/MSDS, and allergen disclosure available for complete formulation confidence.
              </p>
            </div>

            <div className="rounded-xl border border-line bg-bg p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
                <ShieldCheck size={22} />
              </div>
              <h3 className="mt-4 font-display text-lg font-medium text-ink">
                Batch Consistency
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                Strict quality controls throughout sourcing, handling, and extraction to ensure repeatable purity.
              </p>
            </div>

            <div className="rounded-xl border border-line bg-bg p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
                <Building2 size={22} />
              </div>
              <h3 className="mt-4 font-display text-lg font-medium text-ink">
                Industrial Dependability
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                Reliable bulk fulfillment tailored to fragrance houses, flavour developers, and cosmetics manufacturers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Badges Component */}
      <CertificationBadges />

      {/* Serving Industries Across the Globe */}
      <section className="border-t border-line bg-bg">
        <div className="mx-auto max-w-7xl px-4 py-section sm:px-6">
          <SectionHeading
            align="center"
            eyebrow="Commercial & Industrial Supply"
            title="Serving Industries Across the Globe"
            subtitle="Indian Attars – Shivaay Naturals & Essentials works with the varied needs of businesses seeking aromatic ingredients for commercial and industrial applications."
          />

          <div className="mx-auto mt-6 max-w-2xl text-center">
            <span className="font-label text-xs uppercase tracking-widest text-primary">
              Our products serve a range of sectors, including
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectorsServed.map((sector) => (
              <div
                key={sector}
                className="flex items-start gap-3 rounded-lg border border-line bg-surface/40 p-4 transition-colors hover:border-primary/40 hover:bg-surface"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Check size={14} className="stroke-[2.5]" />
                </div>
                <p className="text-sm font-medium leading-snug text-ink">{sector}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-line bg-surface/40 p-8 text-center sm:p-10">
            <div className="mx-auto max-w-3xl space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                We aim to build lasting business relationships through product knowledge, responsive communication and solutions tailored to our customers&apos; requirements.
              </p>
              <p>
                Whether you are a growing brand, a fragrance house, a manufacturer or a bulk buyer, we welcome opportunities to understand your needs and explore the right aromatic ingredients for your business.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/bulk-inquiry"
                className="inline-flex items-center gap-2 rounded-pill bg-primary px-6 py-3 font-label text-xs uppercase tracking-[0.14em] text-primary-fg shadow-sm transition hover:bg-primary-hover"
              >
                Submit Bulk Enquiry <ArrowRight size={14} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-pill border border-line-strong bg-bg px-6 py-3 font-label text-xs uppercase tracking-[0.14em] text-ink transition hover:bg-surface"
              >
                Speak with our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tradition with a Vision for the Future */}
      <section className="border-t border-line bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-section sm:px-6">
          <SectionHeading
            align="center"
            eyebrow="Looking Ahead"
            title="Tradition with a Vision for the Future"
          />

          <div className="mx-auto mt-8 max-w-3xl space-y-5 text-center text-base leading-relaxed text-muted sm:text-lg">
            <p>
              Our roots lie in India&apos;s aromatic heritage, while our vision looks towards a future of responsible sourcing, product development and wider market access.
            </p>
            <p>
              We recognise the importance of preserving traditional distillation knowledge while continually improving how aromatic ingredients are sourced, evaluated, presented and supplied. We aspire to make India&apos;s distinctive aromatic resources more accessible to businesses seeking character, versatility and reliable commercial partnerships.
            </p>
            <p>
              At Indian Attars, we value authenticity, transparency, long-term relationships and respect for nature. These principles guide our journey as we continue to connect India&apos;s fragrance traditions with evolving opportunities in the global aromatic ingredients industry.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-xl border border-line bg-bg p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-medium text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing Call to Action */}
      <section className="border-t border-line bg-gradient-to-br from-surface via-bg to-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-primary">
            Shivaay Naturals &amp; Essentials
          </span>
          <h2 className="mt-3 font-display text-h2 font-normal text-ink sm:text-4xl">
            Partner with Indian Attars
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Explore our collection or contact Shivaay Naturals &amp; Essentials to discuss your product requirements, bulk enquiries and business collaborations.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-pill bg-primary px-7 py-3.5 font-label text-xs uppercase tracking-[0.14em] text-primary-fg shadow-sm transition hover:bg-primary-hover"
            >
              Explore Collection <ArrowRight size={15} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-pill border border-line-strong bg-bg px-7 py-3.5 font-label text-xs uppercase tracking-[0.14em] text-ink transition hover:bg-surface"
            >
              Contact Us
            </Link>

            <Link
              href="/bulk-inquiry"
              className="inline-flex items-center gap-2 rounded-pill border border-line-strong bg-bg px-7 py-3.5 font-label text-xs uppercase tracking-[0.14em] text-ink transition hover:bg-surface"
            >
              Bulk Enquiries
            </Link>

            <a
              href={waLink("Hello Shivaay Naturals & Essentials, I would like to discuss aromatic ingredients requirements and business collaborations.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-pill bg-[#25D366] px-6 py-3.5 font-label text-xs uppercase tracking-[0.14em] text-white transition hover:brightness-105"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
