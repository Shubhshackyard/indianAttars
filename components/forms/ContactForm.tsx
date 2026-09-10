"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "@/lib/toast";

const inputCls =
  "mt-1 w-full rounded-md border border-line bg-bg px-3 py-2.5 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-gold";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      toast.success("Message sent! Check your inbox for confirmation.");
      form.reset();
    } catch (err: any) {
      toast.error(err.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-lg border border-line bg-bg p-6 shadow-card"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-ink">Name *</label>
          <input required className={inputCls} name="name" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Email *</label>
          <input required type="email" className={inputCls} name="email" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-ink">Subject</label>
        <input className={inputCls} name="subject" />
      </div>
      <div>
        <label className="text-sm font-medium text-ink">Message *</label>
        <textarea required rows={5} className={inputCls} name="message" />
      </div>
      <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
