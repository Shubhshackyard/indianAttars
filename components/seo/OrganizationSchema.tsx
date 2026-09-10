import { SITE } from "@/lib/site";
import { CERTIFICATIONS } from "@/lib/constants";

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "indianattars",
    url: SITE.url,
    email: SITE.email,
    description:
      "Manufacturer & direct supplier of pure Indian essential oils, attars, ruh & absolutes, fragrances and hydrosols. ISO 9001:2015, GMP, HACCP, Halal & Kosher certified.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kannauj & Kanpur",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Essential Oils",
      "Indian Attars",
      "Ruh & Absolutes",
      "Hydrosols",
    ],
    hasCredential: CERTIFICATIONS.map((c) => c.name),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
