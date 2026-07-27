import {
  Leaf,
  Flame,
  Droplet,
  FlaskRound,
  Waves,
  type LucideProps,
} from "lucide-react";
import type { CategoryMeta } from "@/types/product";

const map = {
  leaf: Leaf,
  incense: Flame,
  droplet: Droplet,
  bottle: FlaskRound,
  wave: Waves,
} as const;

export function CategoryIcon({
  icon,
  ...props
}: { icon: CategoryMeta["icon"] } & LucideProps) {
  const Cmp = map[icon] ?? Leaf;
  return <Cmp {...props} />;
}
