"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "@/lib/toast";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your name"),
  company: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone / WhatsApp number"),
  location: z.string().min(2, "City / Country is required"),
  interests: z.array(z.string()).optional(),
  products: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const CATS = [
  "Essential Oils",
  "Indian Attars",
  "Ruh & Absolutes",
  "Fragrances",
  "Hydrosols",
];
const QTYS = ["1kg", "5kg", "10kg", "25kg", "50kg+", "Custom"];

const inputCls =
  "mt-1 w-full rounded-md border border-line bg-bg px-3 py-2.5 text-sm text-ink focus:border-primary focus:outline-none focus:ring-1 focus:ring-gold";

export function BulkInquiryForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/bulk-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || "Failed to submit inquiry.");
      }
      toast.success("Inquiry received! Check your inbox for confirmation.");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit inquiry. Please try again.");
    }
  };

  if (isSubmitSuccessful) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-line bg-surface/40 p-10 text-center">
        <CheckCircle2 size={44} className="text-primary" />
        <h3 className="mt-4 font-display text-2xl text-ink">Thank you!</h3>
        <p className="mt-2 text-muted">
          Your inquiry has been received. Our team will review it and respond
          within 24 hours with a custom quote.
        </p>
        <Button
          variant="secondary"
          size="md"
          className="mt-5"
          onClick={() => reset()}
        >
          Submit another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-lg border border-line bg-bg p-6 shadow-card"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-ink">Full Name *</label>
          <input className={inputCls} {...register("fullName")} />
          {errors.fullName && (
            <p className="mt-1 text-xs text-primary">{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Company Name</label>
          <input className={inputCls} {...register("company")} />
        </div>
        <div>
          <label className="text-sm font-medium text-ink">Email *</label>
          <input type="email" className={inputCls} {...register("email")} />
          {errors.email && (
            <p className="mt-1 text-xs text-primary">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-ink">
            Phone (WhatsApp preferred) *
          </label>
          <input className={inputCls} {...register("phone")} />
          {errors.phone && (
            <p className="mt-1 text-xs text-primary">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-ink">City / Country *</label>
        <input className={inputCls} {...register("location")} />
        {errors.location && (
          <p className="mt-1 text-xs text-primary">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-ink">
          Product Interest
        </label>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
          {CATS.map((c) => (
            <label
              key={c}
              className="flex items-center gap-2 text-sm text-muted"
            >
              <input
                type="checkbox"
                value={c}
                className="accent-gold"
                {...register("interests")}
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-ink">
          Specific Product(s) Needed
        </label>
        <textarea
          rows={3}
          className={inputCls}
          placeholder="e.g. Lavender Oil, Oudh Attar, Ruh Gulab…"
          {...register("products")}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-ink">
          Approximate Quantity Required
        </label>
        <select className={inputCls} {...register("quantity")}>
          <option value="">Select quantity…</option>
          {QTYS.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-ink">
          Additional Message
        </label>
        <textarea rows={3} className={inputCls} {...register("message")} />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting…" : "Submit Inquiry →"}
      </Button>
    </form>
  );
}
