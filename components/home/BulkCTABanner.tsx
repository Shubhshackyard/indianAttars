import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { waLink } from "@/lib/site";
import { buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export function BulkCTABanner() {
  return (
    <section className="relative overflow-hidden border-y border-line">
      <Image
        src="/homepage/cta/emerald-silk.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/70" />
      <div className="relative mx-auto max-w-3xl px-4 py-section text-center sm:px-6">
        <span className="font-label text-[0.65rem] uppercase tracking-[0.18em] text-accent">
          Are you a perfumer, D2C brand, or bulk buyer?
        </span>
        <h2 className="mt-3 font-display text-h1 italic text-white">
          We Supply at Scale.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          From 5kg to 200kg+ — direct from our distillation unit. MOQ, custom
          blends, and private labeling available.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/bulk-inquiry"
            className={buttonClasses({ variant: "primary", size: "lg" })}
          >
            Request a Bulk Quote <ArrowRight size={16} />
          </Link>
          <a
            href={waLink("Hi, I need a bulk quote for ...")}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "whatsapp", size: "lg" })}
          >
            <WhatsAppIcon /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
