# indianattars.com

A production-ready, high-conversion e-commerce site for premium Indian oils &
attars — **69 products** across Essential Oils, Indian Attars, Ruh & Absolutes,
Fragrances, and Hydrosols, with interactive slab pricing, full documentation,
and trust-first design.

## Tech stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** with brand design tokens
- **Framer Motion** (marquees, carousels, reveals, micro-interactions)
- **Zustand** (cart, UI & wishlist state, `localStorage` persist)
- **React Hook Form + Zod** (bulk inquiry form)
- **Embla Carousel** (category / spotlight / testimonials)
- **Lucide React** icons · Google Fonts (Cormorant Garamond, Inter, Cinzel)

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — sensible fallbacks exist
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint
- `npm run gen:products` — regenerate `data/products.json` (requires `npx tsx`)

## Pricing model

All slab prices are computed deterministically from each product's base
₹/kg rate (verified against `indianattars.com_Pricing_Master_Chart.xlsx`):

`price = round(round(baseRate × slabMultiplier) × grams / 1000)`

1kg is the baseline (×1.00); each step below adds +2% per slab, each step above
subtracts 2%. See `lib/pricing.ts`. The app reads `lib/products.ts` (typed,
single source of truth); `data/products.json` is a generated static snapshot.

## Project structure

```
app/            App Router pages (home, products, PDP, category, cart, etc.)
components/     layout · home · product · forms · cart · ui · seo
data/           typed base product data + generated products.json
lib/            pricing, products, cart, wishlist, ui, reviews, site, utils
hooks/          useCart, useSearch, useIntersection
types/          product types
```

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | wa.me links (digits only) |
| `NEXT_PUBLIC_EMAIL` | contact email |
| `NEXT_PUBLIC_RAZORPAY_KEY` | placeholder; checkout is stubbed in Phase 1 |

## Notes

- Product images are generated gradient placeholders — drop in real assets via
  `components/ui/ProductImage.tsx` / `next/image` when available.
- Spec sheets are **representative**, not lab-verified; replace with batch COA
  data before publishing.
- Fragrances are independent "inspired-by" formulations, not affiliated with the
  referenced designer brands.

## Deploy

Vercel-ready: import the repo and deploy. Set the env vars above in the project
settings.
# indianAttars
# indianAttars
