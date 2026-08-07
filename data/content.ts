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
  readTime?: string;
  author?: string;
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "How to Identify Pure Essential Oils: 5 Tests You Can Do at Home",
    excerpt:
      "From the paper test to refractive index basics — simple checks to separate pure oils from adulterated ones.",
    category: "Guides",
    date: "June 12, 2024",
    readTime: "5 min read",
    author: "Master Distiller S. K. Tandon",
    slug: "identify-pure-essential-oils",
    content: [
      "In the world of natural aromatics, purity is everything. Adulterated essential oils diluted with synthetic dipropylene glycol (DPG), mineral oil, or paraffin not only lose their therapeutic efficacy but can also cause skin sensitization.",
      "1. The Blotting Paper Test: Drop a single droplet of essential oil onto clean white filter paper. Pure unadulterated essential oils (like Lavender or Tea Tree) evaporate completely within 24 to 48 hours without leaving a greasy oil ring.",
      "2. The Water Solubility Check: Pure essential oils do not dissolve in water. When added to water, a pure oil droplet should float on top as a coherent bead without clouding the water artificially.",
      "3. The Fragrance Layer Test: Authentic botanical oils evolve over time on test strips. You should smell distinct top notes, heart floral notes, and deep dry-down base notes over several hours.",
      "4. Density & Viscosity Examination: High-altitude Indian Sandalwood Oil (Santalum album) is naturally viscous and heavy, whereas distilled Citrus oils are light and volatile.",
      "5. Technical GC-MS Analysis: For commercial formulators, request a Gas Chromatography-Mass Spectrometry (GC-MS) report. Pure oils exhibit characteristic peak distributions for key aromatic markers like Santalol, Rose Oxide, or Linalool."
    ],
  },
  {
    title: "The Ancient Art of Attar-Making: Copper Deg Distillation Explained",
    excerpt:
      "Inside Kannauj's centuries-old deg-bhapka method and why it still produces the world's finest attars.",
    category: "Heritage",
    date: "June 5, 2024",
    readTime: "7 min read",
    author: "Kannauj Heritage Guild",
    slug: "art-of-attar-making",
    content: [
      "Kannauj, situated on the banks of the sacred Ganges in Uttar Pradesh, is celebrated as the Perfume Capital of India. For over 400 years, master artisans (Bhapkiwalas) have practiced traditional Deg-Bhapka hydro-distillation without modern electrical machinery.",
      "The Deg (Copper Still): Freshly hand-picked flower petals — such as Damask Rose (Gulab) or Jasminum sambac (Motiya) — are placed inside massive copper cauldrons called Degs, sealed with clay and cotton strips (Sarposh).",
      "The Bhapka (Receiver Vessel): A long bamboo pipe (Chonga) connects the Deg to a copper receiver vessel submerged in a cooling water tank (Hauz). The receiver contains a base of pure Indian Sandalwood oil or liquid paraffin.",
      "Gentle Wood Firing: Wood fires are lit under the Deg. Steam carries volatile aromatic vapors through the bamboo pipe into the receiver, where the delicate flower oil absorbs directly into the sandalwood base.",
      "Aging in Cuppa Leather Bottles: After distillation, the attar is aged in traditional calfskin leather bottles (Cuppa) which allow residual moisture to evaporate while concentrating the rich, velvety fragrance."
    ],
  },
  {
    title: "Understanding Ruh vs. Absolute: What's the Difference?",
    excerpt:
      "Base-free ruh, solvent-extracted absolutes, and steam-distilled oils — a clear guide for perfumers.",
    category: "Education",
    date: "May 28, 2024",
    readTime: "6 min read",
    author: "Research Perfumer A. Khan",
    slug: "ruh-vs-absolute",
    content: [
      "When sourcing premium Indian botanical extracts, understanding the distinction between a Ruh, an Absolute, and an Essential Oil is essential for accurate formulation.",
      "What is a Ruh? 'Ruh' translates to 'Soul' in Arabic. A Ruh is a 100% pure, unblended hydro-distilled extract without any base oil carrier (such as Sandalwood or DPG). Examples include Ruh Gulab (Rose Otto) and Ruh Khus (Wild Vetiver).",
      "What is an Absolute? Delicate flowers like Jasmine Grandiflorum or Tuberose (Rajnigandha) cannot withstand steam heat without destroying their delicate aroma. Absolutes are extracted using food-grade solvent extraction, yielding a concentrated, highly true-to-flower wax concrete that is subsequently washed with ethanol.",
      "Choosing the Right Extract: For fine perfumery, skin care, and ritual use, Ruhs offer unmatched therapeutic purity. For complex candle formulations or fine alcohol perfumes, Absolutes provide intense projection and floral fidelity."
    ],
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
