"use client";

import { Button } from "@/components/ui/Button";
import { toast } from "@/lib/toast";

const inputCls =
  "mt-1 w-full rounded-md border border-line bg-bg px-3 py-2.5 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-gold";

export function ContactForm() {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you shortly.");
    e.currentTarget.reset();
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-lg border border-line bg-bg p-6 shadow-card"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-ink">Name</label>
          <input required className={inputCls} name="name" />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Email</label>
          <input required type="email" className={inputCls} name="email" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-ink">Subject</label>
        <input className={inputCls} name="subject" />
      </div>
      <div>
        <label className="text-sm font-medium text-ink">Message</label>
        <textarea required rows={5} className={inputCls} name="message" />
      </div>
      <Button type="submit" variant="primary" size="lg" fullWidth>
        Send Message
      </Button>
    </form>
  );
}
