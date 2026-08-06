export const SITE = {
  name: "indianattars",
  domain: "indianattars.com",
  url: "https://indianattars.com",
  tagline: "The Art of Pure Indian Fragrance",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "info@indianattars.com",
  // Digits only, international format, for wa.me links.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "917905337598",
  phone: "+91 79053 37598",
  address: "Kannauj & Kanpur, Uttar Pradesh, India",
  hours: "Mon–Sat, 10am–6pm IST",
  gst: "09AGJPK7407Q1ZO",
  since: 2010,
  social: {
    instagram: "https://www.instagram.com/indianattars",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/",
  },
} as const;

export function waLink(message?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailto(subject?: string): string {
  return subject
    ? `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${SITE.email}`;
}
