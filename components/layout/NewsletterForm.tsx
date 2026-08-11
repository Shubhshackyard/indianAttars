"use client";

import { useState } from "react";
import { toast } from "@/lib/toast";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Subscription failed.");
      }

      toast.success("Subscribed! A welcome email has been sent to your inbox.");
      setEmail("");
    } catch (err: any) {
      toast.error(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        aria-label="Email address"
        disabled={loading}
        className="min-w-0 flex-1 rounded-pill border border-line bg-cream px-4 py-2 text-sm text-ink placeholder:text-muted focus:border-primary focus:outline-none disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={loading}
        className="shrink-0 rounded-pill bg-primary px-4 py-2 font-label text-[0.65rem] uppercase tracking-[0.12em] text-primary-fg transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {loading ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}
