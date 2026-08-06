import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { SearchModal } from "@/components/ui/SearchModal";
import { Toaster } from "@/components/ui/Toast";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { RouteProgress } from "@/components/ui/RouteProgress";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { ComparisonBar } from "@/components/ui/ComparisonBar";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const label = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-label",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://indianattars.com"),
  title: {
    default: "indianattars — Premium Indian Oils, Attars & Absolutes",
    template: "%s | indianattars.com",
  },
  description:
    "Buy pure Indian essential oils, attars, ruh & absolutes, fragrances and hydrosols. ISO 9001:2015, GMP, HACCP, Halal & Kosher certified. Slab pricing from 50gm to 25kg. COA & MSDS available.",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicon/site.webmanifest",
  keywords: [
    "essential oils India",
    "indian attars",
    "ruh and absolutes",
    "hydrosols",
    "bulk essential oils",
    "steam distilled oils",
  ],
  openGraph: {
    type: "website",
    siteName: "indianattars.com",
    title: "indianattars — Premium Indian Oils, Attars & Absolutes",
    description:
      "Pure, certified Indian essential oils, attars, ruh & absolutes, fragrances and hydrosols. Transparent slab pricing, COA & MSDS on every product.",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#faf8f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${label.variable}`}
    >
      <body className="min-h-screen bg-bg pb-14 font-body text-ink antialiased lg:pb-0">
        <ClerkProvider>
          <RouteProgress />
          <Header />
          <MobileNav />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchModal />
          <Toaster />
          <WhatsAppFloat />
          <ScrollToTop />
          <ComparisonBar />
          <CookieConsent />
        </ClerkProvider>
      </body>
    </html>
  );
}