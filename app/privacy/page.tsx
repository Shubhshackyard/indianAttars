import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <h1 className="mb-6 mt-5 font-display text-h1 text-ink">Privacy Policy</h1>
      <div className="space-y-4 leading-relaxed text-muted">
        <p>
          This is placeholder content. We respect your privacy and collect only
          the information necessary to process inquiries and orders — such as
          your name, contact details and order preferences.
        </p>
        <p>
          We do not sell your personal data. Information is used solely to
          fulfil your requests, send pricing updates you opt into, and improve
          our service. Cookies are used to remember your cart and preferences.
        </p>
        <p>
          You may request access to or deletion of your data at any time by
          emailing us. This document should be replaced with a
          legally-reviewed policy before launch.
        </p>
      </div>
    </div>
  );
}
