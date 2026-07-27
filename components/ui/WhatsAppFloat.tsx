"use client";

import { waLink } from "@/lib/site";
import { WhatsAppIcon } from "./SocialIcons";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink(
        "Hi! I'm interested in ordering from indianattars.com. Can you help me?",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-20 right-4 z-40 lg:bottom-6 lg:right-6"
    >
      <span className="absolute inset-0 rounded-pill bg-[#25D366] animate-pulse-ring" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-pill bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105">
        <WhatsAppIcon width={26} height={26} />
      </span>
    </a>
  );
}
