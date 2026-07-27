import type { BaseProduct } from "@/types/product";
import { essentialOils } from "@/data/products/essentialOils";
import { attars } from "@/data/products/attars";
import { ruhAbsolutes } from "@/data/products/ruhAbsolutes";
import { fragrances } from "@/data/products/fragrances";
import { hydrosols } from "@/data/products/hydrosols";

/** All 69 products (base data) — source of truth, before slab computation. */
export const baseProducts: BaseProduct[] = [
  ...essentialOils,
  ...attars,
  ...ruhAbsolutes,
  ...fragrances,
  ...hydrosols,
];
