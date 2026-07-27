import Image from "next/image";
import { Droplets, BadgeCheck, FileText, Truck, type LucideIcon } from "lucide-react";
import { USPS, type USPIcon } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap: Record<USPIcon, LucideIcon> = {
  distill: Droplets,
  certified: BadgeCheck,
  docs: FileText,
  shipping: Truck,
};

export function USPSection() {
  return (
    <section className="bg-surface">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-section sm:px-6 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line shadow-card">
          <Image
            src="/homepage/usp/distillation.png"
            alt="Traditional copper deg distillation of attar"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="font-display text-3xl italic text-white">
              From flower & root to bottle
            </p>
            <p className="mt-2 max-w-xs text-sm text-white/80">
              Distilled in small batches, tested for purity, documented at
              every step.
            </p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Pure at Source. Certified at Every Step."
            subtitle="We control quality from sourcing to distillation to testing — so you receive consistent, traceable, export-grade aromatics every time."
          />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {USPS.map((u) => {
              const Icon = iconMap[u.icon];
              return (
                <div
                  key={u.title}
                  className="rounded-lg border-l-2 border-transparent bg-white p-5 shadow-card transition-all hover:border-primary hover:shadow-lift"
                >
                  <Icon className="text-primary" size={24} />
                  <h3 className="mt-3 font-display text-xl text-ink">
                    {u.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{u.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
