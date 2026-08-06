"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Printer, ArrowRight, Package, Calendar, ShieldCheck, Mail } from "lucide-react";
import { Button, buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { formatINR } from "@/lib/utils";
import { waLink, SITE } from "@/lib/site";

interface SavedOrderItem {
  productSlug: string;
  name: string;
  categoryLabel: string;
  qty: string;
  unitPrice: number;
  quantity: number;
}

interface SavedOrder {
  items: SavedOrderItem[];
  total: number;
  date: string;
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const paymentId = searchParams.get("paymentId") || "PAY-" + Math.floor(100000 + Math.random() * 900000);

  const [order, setOrder] = useState<SavedOrder | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("last_order");
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Could not parse stored order details:", e);
    }
  }, []);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const formattedDate = order?.date
    ? new Date(order.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Order Confirmation" }]} />

      {/* Celebration Header */}
      <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-line bg-surface/50 p-8 text-center shadow-card print:border-none print:shadow-none">
        <span className="flex h-20 w-20 items-center justify-center rounded-pill bg-primary-soft text-primary shadow-sm">
          <CheckCircle2 size={48} className="animate-bounce" />
        </span>
        <span className="mt-4 rounded-pill border border-gold/40 bg-gold/10 px-3 py-1 font-label text-[0.65rem] uppercase tracking-[0.18em] text-primary">
          Payment Verified &amp; Confirmed
        </span>
        <h1 className="mt-3 font-display text-h1 text-ink">Thank you for your order!</h1>
        <p className="mt-2 max-w-md text-sm text-muted">
          Your payment has been successfully processed. An official receipt has been dispatched to your email address.
        </p>

        {/* Action Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 print:hidden">
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
            <Printer size={15} /> Print Receipt
          </Button>
          <a
            href={waLink(`Hi indianattars! I have a question about my order: ${orderId}`)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "whatsapp", size: "sm", className: "gap-2" })}
          >
            <WhatsAppIcon /> Support via WhatsApp
          </a>
          <Link
            href="/products"
            className={buttonClasses({ variant: "primary", size: "sm", className: "gap-2" })}
          >
            Continue Shopping <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Order & Transaction Details Card */}
      <div className="mt-8 overflow-hidden rounded-xl border border-line bg-bg shadow-card print:border-none print:shadow-none">
        <div className="border-b border-line bg-surface/60 p-5 sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl text-ink">Order Summary &amp; Receipt</h2>
            <p className="text-xs text-muted">Direct dispatch ex-Kannauj &amp; Kanpur, Uttar Pradesh</p>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted sm:mt-0">
            <Calendar size={14} className="text-primary" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-surface/30 p-4">
            <p className="font-label text-[0.6rem] uppercase tracking-[0.14em] text-muted">Order Reference ID</p>
            <p className="mt-1 font-mono text-sm font-semibold text-ink">{orderId}</p>
          </div>
          <div className="rounded-lg border border-line bg-surface/30 p-4">
            <p className="font-label text-[0.6rem] uppercase tracking-[0.14em] text-muted">Razorpay Payment ID</p>
            <p className="mt-1 font-mono text-sm font-semibold text-primary">{paymentId}</p>
          </div>
        </div>

        {/* Purchased Items List */}
        {order && order.items && order.items.length > 0 && (
          <div className="border-t border-line px-6 py-4">
            <h3 className="mb-3 font-display text-lg text-ink">Purchased Items</h3>
            <div className="divide-y divide-line">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-ink">{item.name}</p>
                    <p className="text-xs text-muted">
                      {item.categoryLabel} · {item.qty} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-ink">{formatINR(item.unitPrice * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <span className="font-display text-lg text-ink">Total Amount Paid</span>
              <span className="font-display text-2xl text-primary">{formatINR(order.total)}</span>
            </div>
          </div>
        )}

        {/* Fulfillment & Support Info */}
        <div className="border-t border-line bg-surface/40 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                <Package size={17} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-ink">Hand-Packed Packaging</p>
                <p className="mt-0.5 text-xs text-muted">
                  Packed in amber glass bottles with tamper-evident seals to preserve pure botanical aromatic profiles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                <ShieldCheck size={17} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase text-ink">Certified Documentation</p>
                <p className="mt-0.5 text-xs text-muted">
                  Batch Certificate of Analysis (COA) &amp; MSDS available upon request at{" "}
                  <a href={`mailto:${SITE.email}`} className="text-primary underline">
                    {SITE.email}
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted">Loading your receipt…</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
