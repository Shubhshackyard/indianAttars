export interface Testimonial {
  quote: string;
  name: string;
  city: string;
  product: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Incredible quality Oudh Attar. The longevity is exceptional and the COA matched exactly. Will order again.",
    name: "Priya M.",
    city: "Delhi",
    product: "Oudh Attar",
    rating: 5,
  },
  {
    quote:
      "We source Lavender and Tea Tree in bulk for our D2C skincare line. Consistent batches, on-time shipping.",
    name: "Rahul S.",
    city: "Bengaluru",
    product: "Lavender Oil",
    rating: 5,
  },
  {
    quote:
      "The Ruh Gulab is the real deal — a true Indian rose otto. Worth every rupee for our perfumery work.",
    name: "Aisha K.",
    city: "Mumbai",
    product: "Ruh Gulab",
    rating: 5,
  },
  {
    quote:
      "Mitti Attar took me straight back to childhood monsoons. Beautifully distilled and packaged.",
    name: "Vikram T.",
    city: "Jaipur",
    product: "Mitti Attar",
    rating: 5,
  },
  {
    quote:
      "Transparent slab pricing made bulk ordering simple. MSDS and allergen sheets were provided without asking.",
    name: "Neha G.",
    city: "Pune",
    product: "Patchouli Oil",
    rating: 4,
  },
  {
    quote:
      "Indian Sandalwood Oil with proper santalol levels — hard to find. The team answered every technical question.",
    name: "Imran B.",
    city: "Hyderabad",
    product: "Indian Sandalwood Oil",
    rating: 5,
  },
];

export interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  slug: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "How to Identify Pure Essential Oils: 5 Tests You Can Do at Home",
    excerpt:
      "From the paper test to refractive index basics — simple checks to separate pure oils from adulterated ones.",
    category: "Guides",
    date: "June 12, 2024",
    slug: "identify-pure-essential-oils",
  },
  {
    title: "The Ancient Art of Attar-Making: Copper Deg Distillation Explained",
    excerpt:
      "Inside Kannauj's centuries-old deg-bhapka method and why it still produces the world's finest attars.",
    category: "Heritage",
    date: "June 5, 2024",
    slug: "art-of-attar-making",
  },
  {
    title: "Understanding Ruh vs. Absolute: What's the Difference?",
    excerpt:
      "Base-free ruh, solvent-extracted absolutes, and steam-distilled oils — a clear guide for perfumers.",
    category: "Education",
    date: "May 28, 2024",
    slug: "ruh-vs-absolute",
  },
];

export type USPIcon = "distill" | "certified" | "docs" | "shipping";

export interface USP {
  icon: USPIcon;
  title: string;
  description: string;
}

export const USPS: USP[] = [
  {
    icon: "distill",
    title: "Steam Distilled",
    description: "Pure oils, no additives or carriers — distilled at source.",
  },
  {
    icon: "certified",
    title: "7 Global Certifications",
    description: "HACCP · GMP · Halal · Kosher · ISO 9001:2015 · Non-Toxic.",
  },
  {
    icon: "docs",
    title: "Full Documentation",
    description: "COA, MSDS & allergen sheets available for every product.",
  },
  {
    icon: "shipping",
    title: "Bulk & Retail",
    description: "From 50gm to 25kg+, shipped pan-India and for export.",
  },
];
