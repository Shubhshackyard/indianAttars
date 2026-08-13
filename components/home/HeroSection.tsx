"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";

import {
  INDEPENDENCE_DAY_THEME,
  checkIsIndependenceDaySeason,
} from "@/lib/independence-day";
import { IndependenceDayHero } from "./IndependenceDayHero";

const headlineLines = ["The Art of", "Pure Indian", "Fragrance."];

export function HeroSection() {
  const reduce = useReducedMotion();
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showIndependenceHero, setShowIndependenceHero] = useState(INDEPENDENCE_DAY_THEME);

  useEffect(() => {
    if (checkIsIndependenceDaySeason()) {
      setShowIndependenceHero(true);
    }
  }, []);

  if (showIndependenceHero) {
    return <IndependenceDayHero />;
  }

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_12%_18%,rgba(31,92,69,0.06),transparent_55%),radial-gradient(circle_at_88%_12%,rgba(163,123,46,0.05),transparent_55%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:min-h-[80vh] lg:grid-cols-[3fr_2fr] lg:py-0">
        {/* Left */}
        <div className="order-2 lg:order-1">
          <span className="block font-label text-[0.7rem] uppercase tracking-[0.22em] text-primary motion-safe:animate-fade-up">
            Proudly Made in India
          </span>
          <h1 className="mt-4 font-display text-hero font-medium italic leading-[0.92] text-ink">
            {headlineLines.map((l, i) => (
              <span
                key={i}
                className="block motion-safe:animate-fade-up"
                style={{ animationDelay: `${120 + i * 90}ms` }}
              >
                {l}
              </span>
            ))}
          </h1>
          <p
            className="mt-6 max-w-lg text-muted motion-safe:animate-fade-up"
            style={{ animationDelay: "420ms" }}
          >
            28 Essential Oils · 14 Attars · 5 Ruh &amp; Absolutes.
            <br />
            Steam-distilled, steam-pressed, ethically sourced.
            <br />
            ISO 9001:2015 · GMP · HACCP · Halal Certified.
          </p>
          <div
            className="mt-8 flex flex-wrap gap-3 motion-safe:animate-fade-up"
            style={{ animationDelay: "500ms" }}
          >
            <Link
              href="/products"
              className={buttonClasses({ variant: "primary", size: "lg" })}
            >
              Explore Collection <ArrowRight size={16} />
            </Link>
            <Link
              href="/bulk-inquiry"
              className={buttonClasses({ variant: "secondary", size: "lg" })}
            >
              Request Bulk Quote
            </Link>
          </div>
          <p
            className="mt-5 font-label text-[0.62rem] uppercase tracking-[0.12em] text-primary motion-safe:animate-fade-up"
            style={{ animationDelay: "580ms" }}
          >
            ✓ COA Available&nbsp;&nbsp;✓ MSDS &amp; Allergen Sheets&nbsp;&nbsp;✓
            Batch Tested
          </p>
        </div>

        {/* Right */}
        <div
          className="relative order-1 motion-safe:animate-fade-up lg:order-2"
          style={{ animationDelay: "220ms" }}
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-lg shadow-lift">
            {/* Fallback Image displayed until video is downloaded */}
            <img
              src="/assets/frame-1.png"
              alt="Luxury Indian Fragrance"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                isVideoReady ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            />

            <video
              src="/assets/hero.mp4"
              poster="/assets/frame-1.png"
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setIsVideoReady(true)}
              onCanPlay={() => setIsVideoReady(true)}
              aria-label="Luxury Indian attar fragrance video"
              className={`h-full w-full object-cover transition-opacity duration-700 ${
                isVideoReady ? "opacity-100" : "opacity-0"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-ink/10" />

            <div className="absolute left-4 top-4 rounded-pill bg-white/90 px-3 py-1.5 font-label text-[0.6rem] uppercase tracking-[0.12em] text-ink shadow-card">
              ISO 9001:2015
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-pill bg-white/90 px-3 py-1.5 text-xs text-ink shadow-card">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              Since 2010
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 text-muted lg:block">
        <motion.div
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <ChevronDown size={22} />
        </motion.div>
      </div>
    </section>
  );
}
