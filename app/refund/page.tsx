import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Truck, ShieldAlert, RefreshCw, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Refund Policy | indianattars",
  description: "Comprehensive shipping timelines, returns, COA batch quality verification, and replacement policies for pure Indian attars and essential oils.",
};

export default function RefundPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shipping & Refund Policy" }]} />
      <h1 className="mt-6 font-display text-h1 text-ink">Shipping &amp; Refund Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: August 2026 · Direct dispatch ex-Kannauj &amp; Kanpur, UP</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink/90">
        {/* Shipping Overview */}
        <section className="rounded-2xl border border-line bg-surface/40 p-6 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Truck size={20} />
            </span>
            <h2 className="font-display text-2xl text-ink">1. Domestic &amp; Global Shipping</h2>
          </div>
          <div className="mt-4 space-y-3 text-muted">
            <p>
              At <strong>indianattars</strong>, all orders are freshly hand-packed and dispatched directly from our Kannauj distillation distillery and Kanpur logistics hub.
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li><strong>Domestic Shipping (Pan-India):</strong> Standard delivery takes <strong>2 to 5 business days</strong> via express courier partners (BlueDart, Delhivery, DTDC). Free shipping applies on retail orders over ₹999.</li>
              <li><strong>Bulk &amp; Wholesale Shipments:</strong> Orders involving 5kg+ aluminum containers or drums are shipped via insured freight or express cargo with complete MSDS and COA batch documents attached.</li>
              <li><strong>International Export:</strong> Overseas orders take <strong>5 to 10 business days</strong> depending on customs clearance. Buyers are responsible for local import duties and clearance fees.</li>
            </ul>
          </div>
        </section>

        {/* Returns & Replacement Policy */}
        <section className="rounded-2xl border border-line bg-surface/40 p-6 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <RefreshCw size={20} />
            </span>
            <h2 className="font-display text-2xl text-ink">2. Returns &amp; Replacements</h2>
          </div>
          <div className="mt-4 space-y-3 text-muted">
            <p>
              Due to the pure botanical nature and hygiene sensitivity of authentic attars, essential oils, and absolutes:
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li><strong>7-Day Unopened Returns:</strong> Unopened, sealed bottles in original tamper-evident packaging can be returned within <strong>7 days of delivery</strong> for a full product refund (minus return freight costs).</li>
              <li><strong>Damaged or Defective Items:</strong> If your shipment arrives damaged, leaking, or with broken seals, notify us within <strong>48 hours of receipt</strong> with unboxing photos or video. We will immediately ship a free replacement.</li>
              <li><strong>COA Quality Mismatch:</strong> If a batch fails your independent GC-MS or refractive index verification against our certified Certificate of Analysis (COA), we provide 100% replacement or full refund upon technical inspection.</li>
            </ul>
          </div>
        </section>

        {/* Non-Returnable Items */}
        <section className="rounded-2xl border border-line bg-surface/40 p-6 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <ShieldAlert size={20} />
            </span>
            <h2 className="font-display text-2xl text-ink">3. Non-Returnable Products</h2>
          </div>
          <div className="mt-4 space-y-2 text-muted">
            <p>The following items are non-returnable once unsealed or opened:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Bottles with broken tamper-evident seals or removed safety caps.</li>
              <li>Custom-formulated attar blends or bespoke private-label orders.</li>
              <li>Sample vials (3ml / 6ml) provided for scent evaluation.</li>
            </ul>
          </div>
        </section>

        {/* Process */}
        <section className="rounded-2xl border border-line bg-surface/40 p-6 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <CheckCircle2 size={20} />
            </span>
            <h2 className="font-display text-2xl text-ink">4. How to Request a Return / Refund</h2>
          </div>
          <div className="mt-4 space-y-3 text-muted">
            <p>To initiate a return or replacement request:</p>
            <ol className="list-decimal space-y-1.5 pl-5">
              <li>Contact our support team via email at <strong className="text-ink">info@indianattars.com</strong> or WhatsApp at <strong className="text-ink">+91 79053 37598</strong>.</li>
              <li>Provide your <strong>Order Reference ID</strong>, payment receipt, and clear photos of the sealed or damaged parcel.</li>
              <li>Upon approval, refunds are processed within <strong>3 to 5 business days</strong> back to your original Razorpay payment method.</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}
