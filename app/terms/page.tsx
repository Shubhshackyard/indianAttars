import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
      <h1 className="mb-6 mt-5 font-display text-h1 text-ink">Terms of Service</h1>
      <div className="space-y-4 leading-relaxed text-muted">
        <p>
          This is placeholder content. By using indianattars.com you agree to
          purchase products for lawful purposes. All prices are ex-Kanpur and
          exclusive of GST unless stated otherwise.
        </p>
        <p>
          Product specifications are representative and may vary slightly by
          batch; refer to the batch-specific COA. Fragrance formulations are
          independent interpretations and are not affiliated with the referenced
          designer brands.
        </p>
        <p>
          Orders are confirmed upon payment. This document should be replaced
          with legally-reviewed terms before launch.
        </p>
      </div>
    </div>
  );
}
