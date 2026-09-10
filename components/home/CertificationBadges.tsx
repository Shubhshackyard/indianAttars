import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CertificationBadges() {
  return (
    <section className="bg-surface/60">
      <div className="mx-auto max-w-7xl px-4 py-section sm:px-6">
        <SectionHeading
          align="center"
          eyebrow="Certified for Global Confidence"
          title="Our quality is verified, documented, and transparent."
        />
        <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-8">
          {CERTIFICATIONS.map((c) => (
            <div
              key={c.short}
              className="group relative flex flex-col items-center"
            >
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-primary/25 bg-bg text-center shadow-card transition-transform group-hover:scale-105">
                <ShieldCheck className="text-primary" size={22} />
                <span className="mt-1 px-1 font-label text-[0.5rem] uppercase leading-tight tracking-wide text-primary">
                  {c.short}
                </span>
              </div>
              <div className="pointer-events-none absolute bottom-full z-10 mb-2 w-52 -translate-y-1 rounded-md bg-ink px-3 py-2 text-center text-xs text-white opacity-0 shadow-lift transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <span className="font-medium">{c.name}</span> — {c.description}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted">
          COA, MSDS &amp; Allergen Sheets available for every product. Download
          on product pages.
        </p>
        <div className="mt-3 text-center">
          <Link
            href="/certifications"
            className="font-label text-[0.7rem] uppercase tracking-[0.12em] text-primary hover:text-primary"
          >
            View All Certifications →
          </Link>
        </div>
      </div>
    </section>
  );
}
