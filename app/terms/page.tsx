import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Shield, FileText, Scale, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | indianattars",
  description: "Terms and conditions for retail purchasing, bulk slab pricing, COA certificates, and commercial orders from indianattars.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]} />
      <h1 className="mt-6 font-display text-h1 text-ink">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted">Effective Date: August 2026 · indianattars.com</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink/90">
        <section className="rounded-2xl border border-line bg-surface/40 p-6 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <FileText size={20} />
            </span>
            <h2 className="font-display text-2xl text-ink">1. Acceptance of Terms</h2>
          </div>
          <p className="mt-4 text-muted">
            By accessing, browsing, or placing orders on <strong>indianattars.com</strong>, you agree to be bound by these Terms of Service. These terms apply to all visitors, registered users, and commercial buyers purchasing pure attars, essential oils, and absolutes.
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-surface/40 p-6 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Tag size={20} />
            </span>
            <h2 className="font-display text-2xl text-ink">2. Pricing, GST &amp; Ex-Kanpur Quotes</h2>
          </div>
          <div className="mt-4 space-y-3 text-muted">
            <p>
              All prices displayed on the store are in Indian Rupees (INR) ex-distillery Kannauj/Kanpur.
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li><strong>Bulk Slab Pricing:</strong> Discounted tier prices (e.g. 50g, 250g, 1kg, 5kg+) are automatically calculated at checkout or quoted via our wholesale inquiry desk.</li>
              <li><strong>Taxes &amp; Duties:</strong> All listed product prices are inclusive of GST (GST Included). Export buyers are responsible for any destination customs clearance fees.</li>
              <li><strong>Price Revisions:</strong> Due to natural harvest cycles of botanical crops (such as Damask Rose, Sandalwood, and Jasmine), wholesale prices are subject to seasonal updates.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-surface/40 p-6 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Shield size={20} />
            </span>
            <h2 className="font-display text-2xl text-ink">3. Batch Authenticity &amp; Technical Specifications</h2>
          </div>
          <div className="mt-4 space-y-3 text-muted">
            <p>
              Every batch produced at our distillery undergoes GC-MS testing. Batch-specific Certificates of Analysis (COA), Material Safety Data Sheets (MSDS), and allergen declarations are issued upon request.
            </p>
            <p className="text-xs text-muted italic">
              Disclaimer: References to designer fragrance profiles or notes are for aromatic comparison and educational purposes only. Our attars and essential oils are independent natural formulations distilled in Kannauj.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-surface/40 p-6 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Scale size={20} />
            </span>
            <h2 className="font-display text-2xl text-ink">4. Governing Law</h2>
          </div>
          <p className="mt-4 text-muted">
            These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with orders shall be subject to the exclusive jurisdiction of the courts in Kanpur / Uttar Pradesh, India.
          </p>
        </section>
      </div>
    </div>
  );
}
