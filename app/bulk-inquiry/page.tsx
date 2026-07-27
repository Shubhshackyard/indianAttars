import type { Metadata } from "next";
import { FileCheck2, Quote, PackageCheck, CreditCard } from "lucide-react";
import { BulkInquiryForm } from "@/components/forms/BulkInquiryForm";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { CERTIFICATIONS } from "@/lib/constants";
import { SITE, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bulk Inquiry — Supply at Scale",
  description:
    "Request a bulk quote for essential oils, attars, ruh & absolutes and hydrosols. MOQ, custom blends, private labeling and export supply from India.",
};

const steps = [
  {
    icon: FileCheck2,
    title: "Submit inquiry",
    text: "Tell us what you need. We review within 24 hours.",
  },
  {
    icon: Quote,
    title: "Receive custom quote",
    text: "Get a tailored quote with COA & spec sheets included.",
  },
  {
    icon: PackageCheck,
    title: "Place order",
    text: "Ships with full documentation, pan-India and export.",
  },
];

export default function BulkInquiryPage() {
  return (
    <div>
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h1 className="max-w-2xl font-display text-h1 italic">
            Supply at Scale. Direct from Source.
          </h1>
          <p className="mt-3 max-w-xl text-white/75">
            Perfumers, D2C brands, exporters and manufacturers — we power your
            supply chain with pure, certified Indian aromatics.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[3fr_2fr]">
        <div>
          <h2 className="mb-4 font-display text-h3 text-ink">
            Tell us what you need
          </h2>
          <BulkInquiryForm />
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border border-line bg-surface/40 p-6">
            <h3 className="font-display text-xl text-ink">
              What Happens Next?
            </h3>
            <ol className="mt-4 space-y-4">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-primary-soft text-primary">
                    <s.icon size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {i + 1}. {s.title}
                    </p>
                    <p className="text-sm text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-lg border border-line p-6">
            <h3 className="flex items-center gap-2 font-display text-xl text-ink">
              <CreditCard size={18} className="text-primary" /> Payment Options
            </h3>
            <p className="mt-2 text-sm text-muted">
              Bank Transfer · UPI · Letter of Credit (LC) for exporters.
            </p>
          </div>

          <div className="rounded-lg border border-line p-6">
            <h3 className="font-display text-xl text-ink">Certified Quality</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {CERTIFICATIONS.map((c) => (
                <span
                  key={c.short}
                  className="rounded-pill border border-line px-2.5 py-1 font-label text-[0.55rem] uppercase tracking-[0.1em] text-muted"
                >
                  {c.short}
                </span>
              ))}
            </div>
          </div>

          <a
            href={waLink("Hi, I'd like a bulk quote for ...")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-pill bg-[#25D366] px-5 py-3 font-medium text-white hover:brightness-105"
          >
            <WhatsAppIcon /> Chat on WhatsApp — {SITE.phone}
          </a>
        </aside>
      </div>
    </div>
  );
}
