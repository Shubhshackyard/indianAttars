import type { Metadata } from "next";
import { ShieldCheck, FileText, ExternalLink, Download } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CERTIFICATIONS } from "@/lib/constants";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Certifications — Documented Quality",
  description:
    "ISO 9001:2015, ISO 14001:2015, ISO 45001:2018, HACCP, Kosher, Organic, Halal, GMP, and GST certified. COA, MSDS and allergen sheets available for every product.",
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
  {
    q: "Are the official certificate documents verified?",
    a: "Yes. All our certificates are issued by accredited international bodies (such as RCS CERT / PQC) and remain active with regular surveillance audits.",
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((c) => (
            <div
              key={c.short}
              className="flex flex-col justify-between rounded-xl border border-line bg-card p-6 shadow-card transition-all hover:shadow-card-hover"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/25 bg-primary/5 text-primary">
                    <ShieldCheck size={22} />
                  </span>
                  {c.pdf ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      <FileText size={12} />
                      Verified PDF
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-muted">
                      Quality Standard
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-xl text-ink">{c.name}</h3>
                <p className="mt-2 text-sm text-muted">{c.description}</p>

                {c.certNo && (
                  <div className="mt-4 rounded-lg bg-surface/70 p-3 text-xs text-muted">
                    <div className="flex justify-between">
                      <span className="text-faint">Certificate No:</span>
                      <span className="font-mono font-medium text-ink">
                        {c.certNo}
                      </span>
                    </div>
                    {c.validUntil && (
                      <div className="mt-1 flex justify-between">
                        <span className="text-faint">Valid Until:</span>
                        <span className="font-medium text-ink">
                          {c.validUntil}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {c.pdf ? (
                <div className="mt-6 flex items-center gap-2 border-t border-line/60 pt-4">
                  <a
                    href={c.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-primary/90"
                  >
                    <ExternalLink size={14} />
                    View Certificate
                  </a>
                  <a
                    href={c.pdf}
                    download
                    className="flex items-center justify-center rounded-lg border border-line bg-bg p-2 text-ink transition-colors hover:bg-surface hover:text-primary"
                    title={`Download ${c.name} PDF`}
                    aria-label={`Download ${c.name} PDF`}
                  >
                    <Download size={14} />
                  </a>
                </div>
              ) : (
                <div className="mt-6 border-t border-line/60 pt-4 text-xs text-faint">
                  Available upon batch inquiry &amp; order documentation
                </div>
              )}
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
