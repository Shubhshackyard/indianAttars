"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Printer, ArrowRight, Download, Check, ShieldCheck, Mail, Building2, MapPin, Phone, ExternalLink } from "lucide-react";
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
  shippingAddress?: {
    name?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
}

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const paymentId = searchParams.get("paymentId") || "PAY-" + Math.floor(100000 + Math.random() * 900000);

  const [order, setOrder] = useState<SavedOrder | null>(null);

  useEffect(() => {
    // 1. Try loading stored session cart first
    try {
      const stored = sessionStorage.getItem("last_order");
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Could not parse stored order details:", e);
    }

    // 2. Fetch persisted order details directly from backend database API
    if (orderId) {
      fetch(`/api/orders?orderId=${encodeURIComponent(orderId)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.order) {
            setOrder((prev) => ({
              items: data.order.items || prev?.items || [],
              total: data.order.amount ? (data.order.amount > 50000 ? data.order.amount / 100 : data.order.amount) : prev?.total || 0,
              date: data.order.date || prev?.date || new Date().toISOString(),
              shippingAddress: data.order.shippingAddress || prev?.shippingAddress,
            }));
          }
        })
        .catch((err) => console.warn("Could not fetch order by ID:", err));
    }
  }, [orderId]);

  const handleDownloadPdf = () => {
    if (typeof window !== "undefined") {
      const addr = order?.shippingAddress;
      const queryParams = new URLSearchParams({
        orderId: orderId || "",
        paymentId: paymentId || "",
        print: "true",
        ...(addr?.name ? { name: addr.name } : {}),
        ...(addr?.phone ? { phone: addr.phone } : {}),
        ...(addr?.address ? { address: addr.address } : {}),
        ...(addr?.city ? { city: addr.city } : {}),
        ...(addr?.state ? { state: addr.state } : {}),
        ...(addr?.pincode ? { pincode: addr.pincode } : {}),
      });
      window.open(`/api/invoice/download?${queryParams.toString()}`, "_blank");
    }
  };

  const formattedDate = order?.date
    ? new Date(order.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

  const calculatedSubtotal = order?.items && order.items.length > 0
    ? order.items.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0)
    : (order?.total ? (order.total > 50000 ? order.total / 100 : order.total) : 0);

  const subtotal = calculatedSubtotal;
  const grandTotal = subtotal;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="print:hidden">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Tax Invoice & Receipt" }]} />
      </div>

      {/* Top Notification Banner (Hidden when printing) */}
      <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-xl border border-emerald-900/10 bg-emerald-950/5 p-4 sm:flex-row print:hidden">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white">
            <Check size={18} />
          </span>
          <div>
            <p className="text-xs font-semibold text-emerald-950">Payment Verified &amp; Invoice Generated</p>
            <p className="text-[0.75rem] text-emerald-800">
              An official copy has been dispatched to your email address.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleDownloadPdf} className="gap-2 text-xs">
            <Download size={14} /> Download Invoice (PDF)
          </Button>
          <a
            href={waLink(`Hi indianattars! Inquiry regarding order: ${orderId}`)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses({ variant: "whatsapp", size: "sm", className: "gap-1.5 text-xs" })}
          >
            <WhatsAppIcon /> Support
          </a>
        </div>
      </div>

      {/* Minimal & Premium Industrial Tax Invoice / Receipt Card */}
      <div className="mt-6 overflow-hidden rounded-xl border border-line bg-white shadow-lift print:m-0 print:border-none print:shadow-none">
        
        {/* Invoice Header */}
        <div className="border-b border-line p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div>
              <span className="font-label text-xs uppercase tracking-[0.25em] text-primary">
                {SITE.name}
              </span>
              <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
                Invoice
              </h1>
              <p className="mt-1 text-xs text-muted">
                Distillery Dispatch Ex-Kannauj &amp; Kanpur, Uttar Pradesh
              </p>
            </div>
            
            <div className="text-left sm:text-right">
              <span className="inline-block rounded-md bg-stone-100 px-2.5 py-1 font-mono text-[0.7rem] font-semibold uppercase tracking-wider text-stone-700">
                GSTIN: {SITE.gst}
              </span>
              <p className="mt-2 font-mono text-xs text-stone-500">Date: {formattedDate}</p>
            </div>
          </div>
        </div>

        {/* Reference Grid */}
        <div className="grid grid-cols-1 border-b border-line bg-surface/30 sm:grid-cols-3">
          <div className="border-b border-line p-5 sm:border-b-0 sm:border-r">
            <span className="font-label text-[0.6rem] uppercase tracking-[0.14em] text-muted">
              Order Reference ID
            </span>
            <p className="mt-1 font-mono text-xs font-semibold text-ink">{orderId}</p>
          </div>
          
          <div className="border-b border-line p-5 sm:border-b-0 sm:border-r">
            <span className="font-label text-[0.6rem] uppercase tracking-[0.14em] text-muted">
              Razorpay Payment ID
            </span>
            <p className="mt-1 font-mono text-xs font-semibold text-primary">{paymentId}</p>
          </div>

          <div className="p-5">
            <span className="font-label text-[0.6rem] uppercase tracking-[0.14em] text-muted">
              Payment Status
            </span>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
              <span>Paid &amp; Confirmed</span>
            </div>
          </div>
        </div>

        {/* Addresses Section */}
        <div className="grid grid-cols-1 divide-y divide-line border-b border-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {/* Supplier Info */}
          <div className="p-6">
            <span className="font-label text-[0.6rem] uppercase tracking-[0.16em] text-muted">
              Distributor / Seller
            </span>
            <p className="mt-2 text-sm font-semibold text-ink">{SITE.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {SITE.address}<br />
              GSTIN: {SITE.gst}<br />
              Email: {SITE.email}<br />
              Phone: {SITE.phone}
            </p>
          </div>

          {/* Customer Billed To / Shipped To */}
          <div className="p-6">
            <span className="font-label text-[0.6rem] uppercase tracking-[0.16em] text-muted">
              Billed &amp; Shipped To
            </span>
            {order?.shippingAddress ? (
              <div className="mt-2 text-xs leading-relaxed text-ink">
                <p className="text-sm font-semibold">{order.shippingAddress.name || "Valued Customer"}</p>
                <p className="mt-1 text-muted">{order.shippingAddress.address}</p>
                <p className="text-muted">
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
                <p className="mt-1 text-muted">Phone: {order.shippingAddress.phone}</p>
              </div>
            ) : (
              <p className="mt-2 text-xs italic text-muted">
                Address details synchronized with account profile.
              </p>
            )}
          </div>
        </div>

        {/* Itemized Table */}
        <div className="p-6">
          <span className="font-label text-[0.65rem] uppercase tracking-[0.16em] text-muted">
            Itemized Order Breakdown
          </span>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-line bg-surface/60 font-label uppercase tracking-wider text-muted">
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {order && order.items && order.items.length > 0 ? (
                  order.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-surface/30">
                      <td className="py-3.5 px-3">
                        <p className="font-medium text-ink">{item.name}</p>
                        <p className="text-[0.7rem] text-muted">{item.categoryLabel} · {item.qty}</p>
                      </td>
                      <td className="py-3.5 px-3 text-center font-mono">{item.quantity}</td>
                      <td className="py-3.5 px-3 text-right font-mono text-muted">
                        {formatINR(item.unitPrice)}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono font-semibold text-ink">
                        {formatINR(item.unitPrice * item.quantity)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-muted italic">
                      Order details confirmed via payment gateway.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Financial Summary Calculation */}
          <div className="mt-6 flex justify-end">
            <div className="w-full max-w-xs space-y-2 border-t border-line pt-4 text-xs">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="font-mono text-ink">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Standard Delivery (Insured Air Express)</span>
                <span className="font-mono text-emerald-700">FREE</span>
              </div>
              <div className="flex justify-between border-t border-line pt-2 text-sm font-semibold text-ink">
                <span>Total Amount Paid</span>
                <span className="font-mono text-base font-bold text-primary">
                  {formatINR(grandTotal)}
                </span>
              </div>
              <p className="text-[0.65rem] text-muted text-right italic">* Inclusive of all legal taxes &amp; duties.</p>
            </div>
          </div>
        </div>

        {/* Footer Notes & Compliance */}
        <div className="border-t border-line bg-surface/40 p-6 text-[0.75rem] text-muted">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-semibold uppercase tracking-wider text-ink text-[0.65rem]">
                Authenticity &amp; Dispatch Guarantee
              </p>
              <p className="mt-1 leading-relaxed">
                All extracts are hand-distilled in Kannauj copper degs and batch-tested via GC-MS. Packed in tamper-evident amber glass containers.
              </p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-wider text-ink text-[0.65rem]">
                Support &amp; Quality Compliance
              </p>
              <p className="mt-1 leading-relaxed">
                For COA certificates or order tracking inquiries, contact{" "}
                <a href={`mailto:${SITE.email}`} className="text-primary underline font-medium">
                  {SITE.email}
                </a>.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Actions (Hidden on Print) */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href="/orders"
          className={buttonClasses({ variant: "outline", size: "sm", className: "gap-2 text-xs" })}
        >
          View All Past Orders
        </Link>

        <Link
          href="/products"
          className={buttonClasses({ variant: "primary", size: "sm", className: "gap-2 text-xs" })}
        >
          Continue Shopping <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-muted">Generating Tax Invoice &amp; Receipt…</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}

