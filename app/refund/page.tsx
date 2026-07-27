import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Refund Policy" }]} />
      <h1 className="mb-6 mt-5 font-display text-h1 text-ink">Refund Policy</h1>
      <div className="space-y-4 leading-relaxed text-muted">
        <p>
          This is placeholder content. Due to the nature of pure aromatic
          products, opened bottles are non-returnable. Unopened products may be
          eligible for return within 7 days of delivery.
        </p>
        <p>
          If a product arrives damaged or does not match its COA, contact us
          within 48 hours with photos and your order number for a replacement or
          refund.
        </p>
        <p>
          This document should be replaced with a legally-reviewed policy before
          launch.
        </p>
      </div>
    </div>
  );
}
