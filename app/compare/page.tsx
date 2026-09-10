import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CompareTable } from "@/components/product/CompareTable";

export const metadata: Metadata = {
  title: "Compare Products",
  description: "Compare up to 3 products side by side — specs, pricing and ratings.",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Compare" }]}
      />
      <h1 className="mb-2 mt-5 font-display text-h1 text-ink">
        Compare Products
      </h1>
      <p className="mb-8 text-muted">
        Side-by-side specifications, pricing and ratings.
      </p>
      <CompareTable />
    </div>
  );
}
