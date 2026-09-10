import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { SITE, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with indianattars — phone, email, WhatsApp and address. Mon–Sat, 10am–6pm IST.",
};

export default function ContactPage() {
  const details = [
    { icon: MapPin, label: "Address", value: SITE.address },
    { icon: Phone, label: "Phone", value: SITE.phone },
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Clock, label: "Hours", value: SITE.hours },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <h1 className="mt-5 font-display text-h1 text-ink">Get in Touch</h1>
      <p className="mt-1 text-muted">
        Questions, samples, or bulk supply — we’re happy to help.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[2fr_3fr]">
        <div className="space-y-4">
          {details.map((d) => (
            <div
              key={d.label}
              className="flex items-start gap-3 rounded-lg border border-line bg-surface/40 p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                <d.icon size={17} />
              </span>
              <div>
                <p className="font-label text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                  {d.label}
                </p>
                {d.href ? (
                  <a href={d.href} className="text-ink hover:text-primary">
                    {d.value}
                  </a>
                ) : (
                  <p className="text-ink">{d.value}</p>
                )}
              </div>
            </div>
          ))}
          <a
            href={waLink("Hi! I have a question about indianattars.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-pill bg-[#25D366] px-5 py-3 font-medium text-white hover:brightness-105"
          >
            <WhatsAppIcon /> Message us on WhatsApp
          </a>
          <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-surface to-primary-soft text-muted">
            <span className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-primary" /> Kannauj &amp; Kanpur,
              Uttar Pradesh
            </span>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
