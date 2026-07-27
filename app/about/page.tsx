import type { Metadata } from "next";
import { Sprout, FlaskConical, ClipboardCheck, Package, MapPin } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CertificationBadges } from "@/components/home/CertificationBadges";

export const metadata: Metadata = {
  title: "About Us — Rooted in India",
  description:
    "indianattars is rooted in the centuries-old distillation heritage of Kannauj. We source directly, distill at small scale, and document every batch.",
};

const process = [
  {
    icon: Sprout,
    title: "Sourcing",
    text: "Direct from growers across India's finest aromatic regions.",
  },
  {
    icon: FlaskConical,
    title: "Distillation",
    text: "Steam distillation & traditional deg-bhapka, small batches.",
  },
  {
    icon: ClipboardCheck,
    title: "Testing",
    text: "Every batch tested; COA, MSDS & allergen sheets prepared.",
  },
  {
    icon: Package,
    title: "Packaging",
    text: "Inert, light-protective packaging for retail & bulk.",
  },
];

const regions = [
  { name: "Kannauj, UP", note: "Attars & ruh — the perfume capital of India" },
  { name: "South India", note: "Sandalwood & spice oils" },
  { name: "Himalayas", note: "Spikenard, sugandh kokila & mantri" },
  { name: "Rajasthan", note: "Vetiver (khus) roots" },
  { name: "Odisha", note: "Kewda (screw pine) flowers" },
];

const team = [
  { name: "A. Khan", role: "Master Distiller" },
  { name: "R. Verma", role: "Quality & Documentation" },
  { name: "S. Iyer", role: "Exports & B2B" },
  { name: "M. Singh", role: "Sourcing" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-line bg-gradient-to-br from-surface to-bg">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <h1 className="mt-5 max-w-3xl font-display text-hero italic leading-[0.95] text-ink">
            Rooted in India. Refined for the World.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-section sm:px-6">
        <SectionHeading eyebrow="Our Story" title="A heritage distilled" />
        <div className="mt-6 space-y-4 leading-relaxed text-muted">
          <p>
            indianattars was born from a simple conviction: that the world’s
            finest aromatics deserve to be sold with the same honesty with which
            they are made. For generations, the bylanes of Kannauj have carried
            the scent of rose, oudh, and the first monsoon rain captured in
            mitti attar.
          </p>
          <p>
            We work directly with growers and distillers across India — from the
            sandalwood primarys of the south to the vetiver fields of Rajasthan
            and the kewda blooms of Odisha. By cutting out middlemen, we keep
            quality high and pricing transparent.
          </p>
          <p>
            Every product we ship is batch-tested and accompanied by full
            documentation. Whether you order 50 grams or 200 kilos, you receive
            the same purity, the same paperwork, and the same care.
          </p>
        </div>
      </section>

      <section className="bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-section sm:px-6">
          <SectionHeading
            eyebrow="Our Sourcing"
            title="Where our aromatics come from"
          />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary to-[#16271a]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.08),transparent_60%)]" />
              <MapPin size={72} className="text-white/80" strokeWidth={1} />
              <span className="absolute bottom-4 font-label text-[0.62rem] uppercase tracking-[0.16em] text-white/70">
                Sourcing across India
              </span>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {regions.map((r) => (
                <li
                  key={r.name}
                  className="flex items-start gap-3 rounded-lg border border-line bg-bg p-4"
                >
                  <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-ink">{r.name}</p>
                    <p className="text-sm text-muted">{r.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-section sm:px-6">
        <SectionHeading
          eyebrow="Our Process"
          title="From flower & root to bottle"
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <div
              key={p.title}
              className="relative rounded-lg border border-line bg-bg p-6"
            >
              <span className="font-display text-4xl text-primary/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p.icon size={26} className="mt-2 text-primary" />
              <h3 className="mt-3 font-display text-xl text-ink">{p.title}</h3>
              <p className="mt-1 text-sm text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-section sm:px-6">
          <SectionHeading eyebrow="Our Team" title="The people behind the craft" />
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft font-display text-2xl text-primary">
                  {m.name.charAt(0)}
                </div>
                <p className="mt-3 font-medium text-ink">{m.name}</p>
                <p className="text-sm text-muted">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CertificationBadges />
    </div>
  );
}
