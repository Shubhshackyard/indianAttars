import { getProductBySlug } from "@/lib/products";
import { ProductImage } from "@/components/ui/ProductImage";
import { DocumentDownloads } from "@/components/product/DocumentDownloads";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SpecHighlight() {
  const p = getProductBySlug("lavender-oil");
  if (!p) return null;

  const rows: [string, string | undefined][] = [
    ["Botanical Name", p.spec.botanicalName],
    ["CAS #", p.spec.casNumber],
    ["Country of Origin", p.spec.countryOfOrigin],
    ["Specific Gravity", p.spec.specificGravity?.toString()],
    ["Extraction Method", p.spec.extractionMethod],
    ["Shelf Life", p.spec.shelfLife],
    ["Major Constituents", p.spec.majorConstituents],
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-section sm:px-6">
      <SectionHeading
        align="center"
        eyebrow="Full Transparency"
        title="What's Inside Our Products"
        subtitle="Every product ships with full documentation. We believe in radical transparency."
      />
      <div className="mt-10 overflow-hidden rounded-lg border border-line bg-white shadow-card">
        <div className="grid gap-0 lg:grid-cols-[2fr_3fr]">
          <div className="relative aspect-square lg:aspect-auto">
            <ProductImage
              name={p.name}
              category={p.category}
              categoryLabel={p.categoryLabel}
            />
          </div>
          <div className="p-6 sm:p-8">
            <span className="font-label text-[0.6rem] uppercase tracking-[0.16em] text-primary">
              {p.categoryLabel} · Demo Spec Sheet
            </span>
            <h3 className="mt-1 font-display text-3xl text-ink">{p.name}</h3>
            <p className="font-hindi text-sm text-muted">
              {p.spec.botanicalName}
            </p>
            <dl className="mt-5 divide-y divide-line">
              {rows.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[140px_1fr] gap-3 py-2.5 text-sm"
                >
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-ink">{v ?? "—"}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <DocumentDownloads product={p} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
