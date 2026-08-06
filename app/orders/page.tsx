"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import { Package, ShoppingBag, ExternalLink, Calendar, ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";
import { Button, buttonClasses } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { formatINR } from "@/lib/utils";
import { waLink } from "@/lib/site";
import { OrderRecord } from "@/lib/orders-db";

export default function OrdersPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch orders.");
      }
      setOrders(data.orders || []);
    } catch (err: any) {
      setError(err.message || "Could not load order history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchOrders();
    } else if (isLoaded && !isSignedIn) {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center text-muted">
        <div className="flex flex-col items-center justify-center gap-3">
          <RefreshCw size={28} className="animate-spin text-primary" />
          <p>Loading your order history…</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My Orders" }]} />
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-line bg-surface/50 p-10 text-center shadow-card">
          <Package size={48} className="text-primary" />
          <h1 className="mt-4 font-display text-h2 text-ink">Sign in to view your orders</h1>
          <p className="mt-2 max-w-md text-sm text-muted">
            Track your past purchases, view receipts, and request batch COA documents by signing into your account.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="mt-6"
            onClick={() => openSignIn({ fallbackRedirectUrl: "/orders" })}
          >
            Sign In to Account
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "My Orders" }]} />

      <div className="mt-6 flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-h1 text-ink">My Orders</h1>
          <p className="mt-1 text-sm text-muted">
            Logged in as <span className="font-mono text-primary">{user.primaryEmailAddress?.emailAddress}</span>
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchOrders} className="gap-2 self-start sm:self-auto">
          <RefreshCw size={14} /> Refresh Orders
        </Button>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-primary/30 bg-primary-soft/30 p-4 text-sm text-primary">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line p-12 text-center">
          <ShoppingBag size={48} className="text-muted" />
          <h2 className="mt-4 font-display text-xl text-ink">No orders found yet</h2>
          <p className="mt-1 max-w-md text-sm text-muted">
            You haven’t placed any orders with this account yet. Pure Indian attars, essential oils, and absolutes are waiting!
          </p>
          <Link
            href="/products"
            className={buttonClasses({ variant: "primary", size: "md", className: "mt-6 gap-2" })}
          >
            Explore Catalog <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {orders.map((ord) => {
            const formattedDate = new Date(ord.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={ord.orderId}
                className="overflow-hidden rounded-xl border border-line bg-bg shadow-card transition-shadow hover:shadow-card-hover"
              >
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface/40 p-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-ink">{ord.orderId}</span>
                      <span className="rounded-pill border border-gold/40 bg-gold/10 px-2.5 py-0.5 font-label text-[0.6rem] uppercase tracking-[0.14em] text-primary">
                        {ord.status || "Paid & Processing"}
                      </span>
                    </div>
                    <p className="flex items-center gap-1 text-xs text-muted">
                      <Calendar size={13} className="text-primary" /> {formattedDate}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-display text-xl text-primary">{formatINR(ord.amount)}</p>
                    <p className="font-mono text-[0.7rem] text-muted">Payment: {ord.paymentId}</p>
                  </div>
                </div>

                {/* Purchased items list */}
                {ord.items && ord.items.length > 0 && (
                  <div className="divide-y divide-line px-5 py-3">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2.5">
                        <div>
                          <p className="text-sm font-medium text-ink">{item.name}</p>
                          <p className="text-xs text-muted">
                            {item.categoryLabel} · {item.qty} × {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-ink">
                          {formatINR(item.unitPrice * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Order Footer & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface/20 px-5 py-3 text-xs">
                  <div className="flex items-center gap-1.5 text-muted">
                    <ShieldCheck size={14} className="text-primary" />
                    <span>Pure Botanical Quality Guaranteed</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={waLink(`Hi indianattars! I have an inquiry about my order: ${ord.orderId}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClasses({ variant: "outline", size: "sm", className: "gap-1 text-xs" })}
                    >
                      <WhatsAppIcon /> Help on WhatsApp
                    </a>
                    <Link
                      href={`/order-success?orderId=${encodeURIComponent(ord.orderId)}&paymentId=${encodeURIComponent(ord.paymentId)}`}
                      className={buttonClasses({ variant: "primary", size: "sm", className: "gap-1 text-xs" })}
                    >
                      View Receipt <ExternalLink size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
