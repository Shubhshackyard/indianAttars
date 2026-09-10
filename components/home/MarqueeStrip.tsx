import { Marquee } from "@/components/ui/Marquee";
import { MARQUEE_WORDS } from "@/lib/constants";

export function MarqueeStrip({ slow = false }: { slow?: boolean }) {
  return (
    <div className="border-y border-line bg-surface py-4">
      <Marquee
        items={MARQUEE_WORDS}
        slow={slow}
        separator="·"
        itemClassName="font-display text-xl italic text-primary"
      />
    </div>
  );
}
