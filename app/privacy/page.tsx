import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Lock, Eye, ShieldCheck, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | indianattars",
  description: "Learn how indianattars collects, protects, and handles customer data, Clerk user authentication profiles, and order privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <h1 className="mt-6 font-display text-h1 text-ink">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: August 2026 · indianattars.com</p>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-ink/90">
        <section className="rounded-2xl border border-line bg-surface/40 p-6 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Lock size={20} />
            </span>
            <h2 className="font-display text-2xl text-ink">1. Information We Collect</h2>
          </div>
          <div className="mt-4 space-y-3 text-muted">
            <p>
              We respect your privacy and are committed to safeguarding your personal data. We collect only the information necessary to fulfill your orders and deliver exceptional service:
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li><strong>Account &amp; Auth Data:</strong> Managed securely via Clerk Authentication (Email, Full Name, OAuth login credentials, Clerk User ID).</li>
              <li><strong>Shipping &amp; Contact Details:</strong> Recipient Name, Phone/WhatsApp number, Shipping Address, City, State, and Pincode collected during pre-checkout.</li>
              <li><strong>Transaction Data:</strong> Razorpay Payment IDs and order references. We do <em>not</em> store credit card, debit card, or banking credentials on our servers.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-surface/40 p-6 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Eye size={20} />
            </span>
            <h2 className="font-display text-2xl text-ink">2. How We Use Your Data</h2>
          </div>
          <div className="mt-4 space-y-3 text-muted">
            <p>Your data is used strictly for legitimate business operations:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Processing, packing, and delivering your ordered attars and essential oils.</li>
              <li>Sending transactional receipts, shipping notifications, and COA documentation via Resend.</li>
              <li>Providing customer support and order tracking on your <strong className="text-ink">My Orders</strong> dashboard.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-surface/40 p-6 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <ShieldCheck size={20} />
            </span>
            <h2 className="font-display text-2xl text-ink">3. Zero Data Selling Commitment</h2>
          </div>
          <p className="mt-4 text-muted">
            We <strong>never sell, rent, or trade</strong> your personal information or purchase history to third-party advertisers or data brokers under any circumstances.
          </p>
        </section>

        <section className="rounded-2xl border border-line bg-surface/40 p-6 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <UserCheck size={20} />
            </span>
            <h2 className="font-display text-2xl text-ink">4. Your Data Rights</h2>
          </div>
          <p className="mt-4 text-muted">
            You have the right to access, update, or request permanent deletion of your personal account data at any time by emailing us at <strong className="text-ink">info@indianattars.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
