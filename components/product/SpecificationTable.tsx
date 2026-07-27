import { AlertTriangle } from "lucide-react";
import type { Product, ProductSpec } from "@/types/product";

const FIELD_ORDER: { key: keyof ProductSpec; label: string }[] = [
  { key: "botanicalName", label: "Botanical Name" },
  { key: "inspiredBy", label: "Inspired By" },
  { key: "casNumber", label: "CAS #" },
  { key: "femaNumber", label: "FEMA #" },
  { key: "countryOfOrigin", label: "Country of Origin" },
  { key: "partUsed", label: "Part Used" },
  { key: "extractionMethod", label: "Extraction Method" },
  { key: "form", label: "Form" },
  { key: "color", label: "Color" },
  { key: "aroma", label: "Aroma" },
  { key: "specificGravity", label: "Specific Gravity" },
  { key: "opticalRotation", label: "Optical Rotation" },
  { key: "refractiveIndex", label: "Refractive Index" },
  { key: "flashPoint", label: "Flash Point" },
  { key: "ph", label: "pH" },
  { key: "solubility", label: "Solubility" },
  { key: "shelfLife", label: "Shelf Life" },
  { key: "packaging", label: "Packaging" },
  { key: "majorConstituents", label: "Major Constituents" },
];

export function SpecificationTable({ product }: { product: Product }) {
  const spec = product.spec;
  const rows = FIELD_ORDER.filter(
    (f) => spec[f.key] !== undefined && spec[f.key] !== null,
  );

  return (
    <div>
      <dl className="overflow-hidden rounded-lg border border-line">
        {rows.map((f, i) => (
          <div
            key={f.key}
            className={`grid grid-cols-1 gap-1 px-4 py-3 text-sm sm:grid-cols-[200px_1fr] sm:gap-3 ${
              i % 2 === 0 ? "bg-surface/40" : "bg-white"
            }`}
          >
            <dt className="text-muted">{f.label}</dt>
            <dd className="text-ink">{String(spec[f.key])}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 flex items-start gap-2 rounded-md bg-warning-soft px-4 py-3 text-xs text-warning">
        <AlertTriangle size={15} className="mt-0.5 shrink-0" />
        For external use only. Patch test before use. Keep away from direct
        sunlight and out of reach of children. Specifications are representative
        and may vary slightly by batch — refer to the batch COA.
      </p>
    </div>
  );
}
