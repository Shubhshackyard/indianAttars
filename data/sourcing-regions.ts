export interface RawMaterial {
  name: string;
  botanical: string;
  part: string;
  description: string;
}

export interface SourcingProduct {
  name: string;
  slug: string;
  category: string;
}

export interface SourcingRegion {
  id: string;
  name: string;
  stateLabel: string;
  stateIds: string[]; // State IDs in @svg-maps/india
  pin: { x: number; y: number };
  badge: string;
  tagline: string;
  distillationMethod: string;
  harvestSeason: string;
  description: string;
  rawMaterials: RawMaterial[];
  products: SourcingProduct[];
}

export const SOURCING_REGIONS: SourcingRegion[] = [
  {
    id: "kannauj",
    name: "Kannauj, Uttar Pradesh",
    stateLabel: "Uttar Pradesh",
    stateIds: ["up"],
    pin: { x: 250, y: 236 },
    badge: "Perfume Capital",
    tagline: "The historic heart of traditional Deg-Bhapka hydro-distillation",
    distillationMethod: "Traditional Deg-Bhapka (Copper Stills & Bamboo Chonga) & Hydro-distillation",
    harvestSeason: "Dawn Harvest • March–May (Roses & Jasmine), May–June (Mitti / Baked Earth)",
    description:
      "For centuries, Kannauj on the banks of the Ganges has preserved the world's oldest continuous perfume distillation heritage. Clay pots, wood fires, and cold-water cooling condense the elusive souls of flowers and parched earth into pure sandalwood oil.",
    rawMaterials: [
      {
        name: "Damask Rose",
        botanical: "Rosa damascena",
        part: "Fresh Handpicked Petals",
        description: "Harvested at dawn before petals lose moisture, yielding world-renowned honeyed floral richness.",
      },
      {
        name: "Baked Earth / Mitti",
        botanical: "Gangetic Alluvial Silt",
        part: "Sun-dried Baked Clay Discs",
        description: "Clean topsoil baked in kilns, hydro-distilled into sandalwood oil to capture the petrichor of the first monsoon rain.",
      },
      {
        name: "Motia & Bela",
        botanical: "Jasminum sambac",
        part: "Fresh Night-blooming Flowers",
        description: "Intensely fragrant white floral blooms processed immediately after dusk/dawn plucking.",
      },
      {
        name: "Marigold / Genda",
        botanical: "Tagetes erecta",
        part: "Bright Golden Floral Heads",
        description: "Distilled for Ruh Genda and artisanal celebratory blends with an herbaceous green-honey note.",
      },
      {
        name: "Shamama Botanicals",
        botanical: "40+ Herbs, Roots & Resins",
        part: "Complex Wild Botanical Blend",
        description: "Traditional spice-herb formulations slowly infused over weeks into pure sandalwood base.",
      },
    ],
    products: [
      { name: "Mitti Attar", slug: "mitti-attar", category: "attars" },
      { name: "Gulab Attar", slug: "gulab-attar", category: "attars" },
      { name: "Shamama Attar", slug: "shamama-attar", category: "attars" },
      { name: "Ruh Gulab", slug: "ruh-gulab", category: "ruh-absolutes" },
      { name: "Premium Rose Mist", slug: "premium-rose-mist", category: "mist" },
      { name: "Gulab Jal", slug: "gulab-jal", category: "hydrosols" },
    ],
  },
  {
    id: "rajasthan",
    name: "Rajasthan (Bharatpur & Sawai Madhopur)",
    stateLabel: "Rajasthan",
    stateIds: ["rj"],
    pin: { x: 138, y: 248 },
    badge: "Wild Vetiver Heartland",
    tagline: "Wild riverbed vetiver roots with unparalleled depth and natural emerald green hue",
    distillationMethod: "Traditional Deg-Bhapka in Copper Stills with Long Cold-Water Condensation",
    harvestSeason: "Peak Summer • April–June (Arid heat concentrates root essential oil density)",
    description:
      "The dry riverbanks and clayey marshes of eastern Rajasthan produce India’s most prized wild Khus (Vetiver). Dug up by hand in the scorching summer heat, the roots yield an intensely grounding, cooling, and smoky-earthy essence that serves as a legendary fixative.",
    rawMaterials: [
      {
        name: "Wild Vetiver Roots",
        botanical: "Chrysopogon zizanioides",
        part: "Mature Fibrous Roots & Rhizomes",
        description: "Dug from deep alluvial clays; thoroughly washed and distilled fresh to yield natural copper-tinted Ruh Khus.",
      },
    ],
    products: [
      { name: "Ruh Khus", slug: "ruh-khus", category: "ruh-absolutes" },
      { name: "Khus Attar", slug: "khus-attar", category: "attars" },
      { name: "Vetiver Essential Oil", slug: "vetiver-oil", category: "essential-oils" },
      { name: "Khus Jal", slug: "khus-jal", category: "hydrosols" },
    ],
  },
  {
    id: "himalayas",
    name: "Himalayas (Uttarakhand & Alpine Belt)",
    stateLabel: "Uttarakhand & Himachal",
    stateIds: ["ut", "hp"],
    pin: { x: 215, y: 156 },
    badge: "High-Altitude Terpenes",
    tagline: "Wildcrafted therapeutic roots, seeds, and berries from pristine mountain valleys",
    distillationMethod: "Low-Temperature Slow Steam Distillation in High-Altitude Facilities",
    harvestSeason: "Autumn • September–November (Post-monsoon mountain harvests)",
    description:
      "The pristine alpine foothills and cold slopes of Uttarakhand and Himachal Pradesh yield rare medicinal and therapeutic aromatics. Sourced sustainably from local forest communities, these botanicals carry high concentrations of grounding sesquiterpenes.",
    rawMaterials: [
      {
        name: "Spikenard / Jatamansi",
        botanical: "Nardostachys jatamansi",
        part: "Aromatic Alpine Rhizomes",
        description: "Sacred high-altitude root known for its profound calming, woodsy-earthy, and warm balsamic aroma.",
      },
      {
        name: "Sugandh Kokila",
        botanical: "Cinnamomum glaucescens",
        part: "Wild Dried Berries",
        description: "Sweet, spicy, and camphoraceous berry oil revered for natural perfumery accords and respiratory wellness.",
      },
      {
        name: "Sugandh Mantri",
        botanical: "Homalomena aromatica",
        part: "Crushed Rhizomes",
        description: "Richly aromatic rhizomes producing a spicy-warm, floral-woody note cherished by luxury niche perfumers.",
      },
      {
        name: "Kapoor Kachri",
        botanical: "Hedychium spicatum",
        part: "Spiked Ginger Lily Roots",
        description: "Subtly sweet, ginger-peppery, and medicinal root with ancient Ayurvedic lineage.",
      },
    ],
    products: [
      { name: "Spikenard Oil", slug: "spikenard-oil", category: "essential-oils" },
      { name: "Sugandh Kokila Oil", slug: "sugandh-kokila-oil", category: "essential-oils" },
      { name: "Sugandh Mantri Oil", slug: "sugandh-mantri-oil", category: "essential-oils" },
      { name: "Kapoor Kachri Oil", slug: "kapoor-kachri-oil", category: "essential-oils" },
    ],
  },
  {
    id: "odisha",
    name: "Odisha (Ganjam Coastal Belt)",
    stateLabel: "Odisha",
    stateIds: ["or"],
    pin: { x: 345, y: 410 },
    badge: "GI-Tagged Kewda Reserve",
    tagline: "The world's preeminent coastal haven for sweet, narcotic screw pine blooms",
    distillationMethod: "Immediate Dawn Hydro-distillation (within 3–4 hours of pluck)",
    harvestSeason: "Monsoon Dawns • July–October (Gathered at break of dawn before petals dry)",
    description:
      "The narrow coastal stretch of Ganjam district in southern Odisha is the exclusive global capital of fragrant Kewda (Screw Pine). The male flowers emit an intensely sweet, honeyed, fruity-floral perfume that can only be captured if distilled within hours of morning pluck.",
    rawMaterials: [
      {
        name: "Kewda / Screw Pine Blossoms",
        botanical: "Pandanus odoratissimus",
        part: "Fragrant Male Flower Inflorescences",
        description: "Intensely scented spiky pale yellow blossoms hand-cut in marshy groves and distilled immediately in local coastal stills.",
      },
    ],
    products: [
      { name: "Ruh Kewda", slug: "ruh-kewda", category: "ruh-absolutes" },
      { name: "Kewda Attar", slug: "kewda-attar", category: "attars" },
      { name: "Kewda Jal", slug: "kewda-jal", category: "hydrosols" },
    ],
  },
  {
    id: "south-india",
    name: "South India (Karnataka & Western Ghats)",
    stateLabel: "Karnataka, Kerala & Tamil Nadu",
    stateIds: ["ka", "kl", "tn"],
    pin: { x: 175, y: 535 },
    badge: "Sacred Woods & Spices",
    tagline: "Ancient Mysore sandalwood, Malabar cardamom, and lush tropical botanicals",
    distillationMethod: "Slow Low-Pressure Steam Distillation & Direct Base Absorption",
    harvestSeason: "Year-Round Regulated Distillation • Autumn Spice Harvests (August–November)",
    description:
      "The Deccan plateau and tropical Western Ghats are home to India’s most revered aromatic woods and spices. Pure Indian Sandalwood heartwood forms the essential base for all classical Indian attars, fixing top floral notes into lasting velvet warmth.",
    rawMaterials: [
      {
        name: "Indian Sandalwood",
        botanical: "Santalum album",
        part: "Mature Heartwood & Roots",
        description: "Revered creamy-sweet Mysore sandalwood heartwood, steam-distilled to provide the world's most luxurious natural fixative.",
      },
      {
        name: "Malabar Green Cardamom",
        botanical: "Elettaria cardamomum",
        part: "Sun-dried Seed Pods",
        description: "Aromatic mountain pods yielding sweet, eucalyptus-spicy, and invigorating terpene profiles.",
      },
      {
        name: "Lemongrass & Citronella",
        botanical: "Cymbopogon flexuosus",
        part: "Fresh Aromatic Grass",
        description: "Vibrant tropical grasses distilled fresh for uplifting, crisp citrus-herbaceous notes.",
      },
    ],
    products: [
      { name: "Indian Sandalwood Oil", slug: "indian-sandalwood-oil", category: "essential-oils" },
      { name: "Chandan Attar", slug: "chandan-attar", category: "attars" },
      { name: "Cardamom Oil", slug: "cardamom-oil", category: "essential-oils" },
      { name: "Lemongrass Oil", slug: "lemongrass-oil", category: "essential-oils" },
    ],
  },
  {
    id: "kashmir",
    name: "Kashmir Valley (Pampore Saffron Plateaus)",
    stateLabel: "Jammu & Kashmir",
    stateIds: ["jk"],
    pin: { x: 162, y: 80 },
    badge: "Royal Saffron Valley",
    tagline: "High-potency crocin saffron stigmas and cool-climate purple lavender blooms",
    distillationMethod: "Gentle Hydro-Infusion & Traditional Hydro-distillation",
    harvestSeason: "Autumn Bloom • October–November (Saffron dawn harvests)",
    description:
      "The karewa highlands of Pampore produce the world’s most potent deep crimson saffron threads, celebrated for rich color, warmth, and intoxicating honeyed-leather notes. Coupled with Kashmir’s alpine lavender, these florals bring regal nuance to traditional attar compounding.",
    rawMaterials: [
      {
        name: "Kashmir Mongra Saffron",
        botanical: "Crocus sativus",
        part: "Deep Crimson Stigmas",
        description: "Hand-plucked violet saffron crocus flowers, meticulously separated for pure crimson Mongra stigmas.",
      },
      {
        name: "Kashmir Alpine Lavender",
        botanical: "Lavandula angustifolia",
        part: "Fresh Flowering Spikes",
        description: "Grown in high-altitude dry temperate air, yielding sweet, floral, and deeply relaxing essential oil.",
      },
    ],
    products: [
      { name: "Kesar Attar", slug: "kesar-attar", category: "attars" },
      { name: "Kesar Water", slug: "kesar-water", category: "hydrosols" },
      { name: "Lavender Oil", slug: "lavender-oil", category: "essential-oils" },
    ],
  },
];
