import type { BaseProduct } from "@/types/product";

/**
 * Independent fragrance formulations inspired by popular designer scents.
 * These are our own interpretations and are NOT affiliated with, endorsed by,
 * or connected to the original brands or trademark owners.
 */

type FragranceSeed = {
  name: string;
  inspiredBy: string;
  family: string;
  notes: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
};

const FRAGRANCE_SEEDS: FragranceSeed[] = [
  {
    name: "One Million",
    inspiredBy: "Paco Rabanne 1 Million",
    family: "Spicy Amber / Leather",
    notes: "blood mandarin, cinnamon, rose, spicy leather, amber",
    rating: 4.6,
    reviewCount: 38,
    featured: true,
  },
  {
    name: "Emperio Armani",
    inspiredBy: "Giorgio Armani Emporio",
    family: "Fresh Aromatic",
    notes: "citrus, lavender, cedar, light musk",
    rating: 4.4,
    reviewCount: 21,
  },
  {
    name: "Armani Code Men",
    inspiredBy: "Giorgio Armani Code",
    family: "Oriental Spicy",
    notes: "bergamot, anise, tonka bean, tobacco, leather",
    rating: 4.5,
    reviewCount: 26,
  },
  {
    name: "Ombre Leather",
    inspiredBy: "Tom Ford Ombré Leather",
    family: "Leather Floral",
    notes: "leather, cardamom, jasmine, amber, moss",
    rating: 4.6,
    reviewCount: 19,
  },
  {
    name: "Most Wanted (By Azaro)",
    inspiredBy: "Azzaro The Most Wanted",
    family: "Amber Spicy",
    notes: "toffee, cardamom, amberwood, vanilla",
    rating: 4.5,
    reviewCount: 17,
  },
  {
    name: "Tamdao (By Dyptique)",
    inspiredBy: "Diptyque Tam Dao",
    family: "Woody Sandalwood",
    notes: "sandalwood, cedar, cypress, soft spice",
    rating: 4.7,
    reviewCount: 22,
  },
  {
    name: "Icon (By Dunhill)",
    inspiredBy: "Dunhill Icon",
    family: "Woody Aromatic",
    notes: "neroli, lavender, black pepper, leather, oakmoss",
    rating: 4.4,
    reviewCount: 14,
  },
  {
    name: "Creed Aventus",
    inspiredBy: "Creed Aventus",
    family: "Fruity Chypre",
    notes: "pineapple, blackcurrant, birch, oakmoss, musk",
    rating: 4.8,
    reviewCount: 57,
    featured: true,
  },
  {
    name: "Burberry London",
    inspiredBy: "Burberry London for Men",
    family: "Spicy Oriental",
    notes: "bergamot, cinnamon, leather, tobacco, oakmoss",
    rating: 4.4,
    reviewCount: 12,
  },
  {
    name: "Hugo Boss",
    inspiredBy: "Hugo Boss Bottled",
    family: "Woody Spicy",
    notes: "apple, cinnamon, sandalwood, vetiver",
    rating: 4.5,
    reviewCount: 24,
  },
  {
    name: "Good Girl (By Carolina Herrera)",
    inspiredBy: "Carolina Herrera Good Girl",
    family: "Oriental Floral",
    notes: "jasmine, tuberose, tonka, cocoa, coffee",
    rating: 4.6,
    reviewCount: 29,
  },
  {
    name: "Bombshell (By Victoria's Secret)",
    inspiredBy: "Victoria's Secret Bombshell",
    family: "Fruity Floral",
    notes: "passion fruit, peony, vanilla orchid, musk",
    rating: 4.5,
    reviewCount: 31,
  },
  {
    name: "Gucci Flora",
    inspiredBy: "Gucci Flora",
    family: "Floral",
    notes: "citrus, peony, rose, sandalwood",
    rating: 4.4,
    reviewCount: 15,
  },
  {
    name: "Gucci Oud",
    inspiredBy: "Gucci Intense Oud",
    family: "Woody Oud",
    notes: "oud, saffron, rose, amber, leather",
    rating: 4.7,
    reviewCount: 20,
  },
  {
    name: "Cool Water (Men/Women)",
    inspiredBy: "Davidoff Cool Water",
    family: "Aquatic Fresh",
    notes: "sea notes, mint, lavender, sandalwood, musk",
    rating: 4.5,
    reviewCount: 27,
  },
  {
    name: "CR-7",
    inspiredBy: "Cristiano Ronaldo CR7",
    family: "Aromatic Fougère",
    notes: "lavender, apple, star anise, amber, cedar",
    rating: 4.3,
    reviewCount: 11,
  },
  {
    name: "Chanel No. 5",
    inspiredBy: "Chanel No. 5",
    family: "Aldehydic Floral",
    notes: "aldehydes, ylang-ylang, rose, jasmine, sandalwood",
    rating: 4.6,
    reviewCount: 23,
  },
];

export const fragrances: BaseProduct[] = FRAGRANCE_SEEDS.map((f) => ({
  name: f.name,
  category: "fragrances",
  baseRatePerKg: 10000,
  shortDescription: `Inspired by ${f.inspiredBy} — a ${f.family.toLowerCase()} formulation.`,
  description:
    `${f.name} is our independent interpretation inspired by ${f.inspiredBy}, built as a ${f.family.toLowerCase()} composition around ${f.notes}. ` +
    `Long-lasting, skin-friendly and supplied as a concentrated fragrance oil. This is an original formulation and is not affiliated with, endorsed by, or connected to the referenced brand or its trademark owner.`,
  spec: {
    inspiredBy: f.inspiredBy,
    countryOfOrigin: "India",
    aroma: f.family,
    color: "Colorless to Pale Yellow",
    form: "Concentrated Fragrance Oil",
    shelfLife: "3 Years",
    packaging: "Amber Glass / HDPE",
    extractionMethod: "Blended Formulation",
    solubility: "Soluble in Alcohol & Carrier Oils",
    majorConstituents: f.notes,
  },
  tags: ["fragrance", "inspired-by", ...f.family.toLowerCase().split(" / ").map((s) => s.split(" ")[0])],
  featured: f.featured,
  rating: f.rating,
  reviewCount: f.reviewCount,
}));
