"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed! Watch your inbox for pricing updates.");
    setEmail("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        aria-label="Email address"
        className="min-w-0 flex-1 rounded-pill border border-line bg-cream px-4 py-2 text-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 rounded-pill bg-primary px-4 py-2 font-label text-[0.65rem] uppercase tracking-[0.12em] text-primary-fg transition-colors hover:bg-primary-hover"
      >
        Subscribe
      </button>
    </form>
  );
}
