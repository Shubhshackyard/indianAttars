import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Layers } from "lucide-react";
import { waLink } from "@/lib/site";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export function BulkCTABanner() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-ink text-white">
      <Image
        src="https://res.cloudinary.com/biqqs3bh/image/upload/v1791560511/emerald-silk.png"
        alt="Emerald Silk Distillation"
        fill
        sizes="100vw"
        className="object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/75 to-ink/95" />
      <div className="relative mx-auto max-w-4xl px-4 py-section text-center sm:px-6">
        <h2 className="mt-3 font-display text-h1 italic text-white">
          We Supply at Scale.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
          From 5kg trial batches to 200kg+ commercial drums — direct from our
          Kannauj distillation unit with full GC-MS testing, batch traceability,
          and export documentation.
        </p>

        {/* Capabilities Grid */}
        <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:border-accent/40">
            <div className="flex items-center gap-2.5 font-medium text-accent">
              <Layers size={18} />
              <span className="font-label text-xs uppercase tracking-wider">
                Private Label Capabilities
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-white/80">
              Open to private labels with industry-lowest MOQs, tailored custom
              blends, formulation support, and turnkey packaging solutions.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:border-accent/40">
            <div className="flex items-center gap-2.5 font-medium text-accent">
              <Globe size={18} />
              <span className="font-label text-xs uppercase tracking-wider">
                Global Export Footprint
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-white/80">
              Active export supply across Middle East, Europe Region, USA,
              Russia, Indonesia, Sri Lanka, and rapidly growing worldwide.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/bulk-inquiry"
            className={buttonClasses({ variant: "primary", size: "lg" })}
          >
            Request a Bulk Quote <ArrowRight size={16} />
          </Link>
          <a
            href={waLink(
              "Hi, I'd like to discuss bulk supply / private label order...",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "whatsapp", size: "lg" })}
          >
            <WhatsAppIcon /> WhatsApp Commercial Desk
          </a>
        </div>
      </div>
    </section>
  );
}

