import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
  WhatsAppIcon,
} from "@/components/ui/SocialIcons";
import { CATEGORIES } from "@/lib/products";
import { CATEGORY_HREF, CERTIFICATIONS } from "@/lib/constants";
import { SITE, waLink } from "@/lib/site";
import { NewsletterForm } from "./NewsletterForm";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Certifications", href: "/certifications" },
  { label: "Bulk Inquiry", href: "/bulk-inquiry" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface text-muted">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand */}
        <div className="lg:col-span-1">
          <span className="font-display text-3xl italic text-ink">
            indian<span className="text-gold">attars</span>
          </span>
          <p className="mt-3 text-sm text-muted">
            Pure, certified Indian essential oils, attars, ruh & absolutes —
            distilled at source, documented at every step.
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {CERTIFICATIONS.slice(0, 5).map((c) => (
              <span
                key={c.short}
                className="rounded-pill border border-line px-2 py-0.5 font-label text-[0.55rem] uppercase tracking-[0.1em] text-muted"
              >
                {c.short}
              </span>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            <a
              href={SITE.social.instagram}
              aria-label="Instagram"
              className="rounded-pill border border-line p-2 text-muted transition-colors hover:border-primary hover:text-primary"
            >
              <InstagramIcon />
            </a>
            <a
              href={SITE.social.linkedin}
              aria-label="LinkedIn"
              className="rounded-pill border border-line p-2 text-muted transition-colors hover:border-primary hover:text-primary"
            >
              <LinkedInIcon />
            </a>
            <a
              href={waLink("Hi! I'd like to know more about indianattars.")}
              aria-label="WhatsApp"
              className="rounded-pill border border-line p-2 text-muted transition-colors hover:border-primary hover:text-primary"
            >
              <WhatsAppIcon />
            </a>
            <a
              href={SITE.social.youtube}
              aria-label="YouTube"
              className="rounded-pill border border-line p-2 text-muted transition-colors hover:border-primary hover:text-primary"
            >
              <YouTubeIcon />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-label text-[0.65rem] uppercase tracking-[0.16em] text-ink">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-label text-[0.65rem] uppercase tracking-[0.16em] text-ink">
            Categories
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={CATEGORY_HREF[c.slug]}
                  className="text-muted hover:text-ink"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-label text-[0.65rem] uppercase tracking-[0.16em] text-ink">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-muted" />
              {SITE.address}
            </li>
            <li className="flex gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-muted" />
              {SITE.phone}
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-muted" />
              <a href={`mailto:${SITE.email}`} className="hover:text-ink">
                {SITE.email}
              </a>
            </li>
            <li className="flex gap-2">
              <Clock size={16} className="mt-0.5 shrink-0 text-muted" />
              {SITE.hours}
            </li>
          </ul>
          <a
            href={waLink("Hi! I'd like a quote from indianattars.")}
            className="mt-4 inline-flex items-center gap-2 rounded-pill bg-[#25D366] px-4 py-2 text-sm font-medium text-white hover:brightness-105"
          >
            <WhatsAppIcon /> WhatsApp Us
          </a>
        </div>

        {/* Newsletter */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="font-label text-[0.65rem] uppercase tracking-[0.16em] text-ink">
            Pricing Updates
          </h3>
          <p className="mt-4 text-sm text-muted">
            Get pricing updates & new product alerts.
          </p>
          <div className="mt-3">
            <NewsletterForm />
          </div>
          <p className="mt-2 text-xs text-muted/80">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.domain} · All Rights Reserved · GST No:{" "}
            {SITE.gst}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-ink">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms of Service
            </Link>
            <Link href="/refund" className="hover:text-ink">
              Refund Policy
            </Link>
            <span className="text-muted">Made in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
