import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CERTIFICATIONS } from "@/lib/constants";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Certifications — Documented Quality",
  description:
    "HACCP, Kosher, ISO 9001:2015, Halal, GMP and Non-Toxic certified. COA, MSDS and allergen sheets available for every product.",
};

const faqs = [
  {
    q: "What is a COA?",
    a: "A Certificate of Analysis documents the test results for a specific batch — including key constituents, physical properties and purity checks.",
  },
  {
    q: "Do you provide batch-specific COA?",
    a: `Yes. Each batch is tested and documented. Email ${SITE.email} with your batch or order number for the exact COA.`,
  },
  {
    q: "How often are products tested?",
    a: "Every production batch is tested before dispatch. We also conduct periodic third-party verification.",
  },
];

export default function CertificationsPage() {
  return (
    <div>
      <section className="border-b border-line bg-gradient-to-br from-surface to-bg">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Certifications" }]}
          />
          <h1 className="mt-5 max-w-3xl font-display text-hero italic leading-[0.95] text-ink">
            Our Commitment to Quality is Documented.
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            We don’t just claim purity — we prove it, batch after batch, with
            globally recognised certifications and transparent documentation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-section sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((c) => (
            <div
              key={c.short}
              className="rounded-lg border border-line bg-bg p-6 shadow-card"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/25 text-primary">
                <ShieldCheck size={24} />
              </span>
              <h3 className="mt-4 font-display text-xl text-ink">{c.name}</h3>
              <p className="mt-2 text-sm text-muted">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface/60">
        <div className="mx-auto max-w-3xl px-4 py-section sm:px-6">
          <SectionHeading
            align="center"
            eyebrow="FAQ"
            title="Documentation & Quality"
          />
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-lg border border-line bg-bg p-5"
              >
                <h3 className="font-display text-lg text-ink">{f.q}</h3>
                <p className="mt-1 text-sm text-muted">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted">
            Need documentation for a specific product or batch? Email{" "}
            <a href={`mailto:${SITE.email}`} className="text-primary underline">
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
