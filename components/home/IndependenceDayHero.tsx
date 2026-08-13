"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { FlowerParticleCanvas } from "./FlowerParticleCanvas";

export function IndependenceDayHero() {
  const reduce = useReducedMotion();
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <section className="relative overflow-hidden border-b border-line min-h-[88vh] flex items-center bg-gradient-to-b from-[#0F2942]/10 via-[#EBF4F6] via-70% to-[#FAF7F2]">
      {/* Background Atmospheric Haze & Radial Light */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_20%_25%,rgba(255,153,51,0.08),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(19,136,8,0.08),transparent_50%),radial-gradient(circle_at_50%_75%,rgba(254,240,138,0.12),transparent_60%)]" />

      {/* Subtle Authentic 24-Spoke Ashoka Chakra Watermark Motif */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.035] dark:opacity-[0.05]"
        aria-hidden="true"
      >
        <svg
          width="520"
          height="520"
          viewBox="0 0 100 100"
          fill="none"
          stroke="#000080"
          strokeWidth="0.8"
          className="animate-[spin_240s_linear_infinite]"
        >
          {/* Outer Circles */}
          <circle cx="50" cy="50" r="46" strokeWidth="1.2" />
          <circle cx="50" cy="50" r="42" strokeWidth="0.8" />
          <circle cx="50" cy="50" r="10" strokeWidth="1.2" fill="#000080" fillOpacity="0.05" />
          <circle cx="50" cy="50" r="4" fill="#000080" />
          {/* 24 Spokes */}
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="40"
              x2="50"
              y2="8"
              strokeWidth="0.75"
              transform={`rotate(${i * 15} 50 50)`}
            />
          ))}
        </svg>
      </div>

      {/* Flower Particle Canvas (3 Aircraft + Saffron/White/Green Flower Trails) */}
      <FlowerParticleCanvas reducedMotion={!!reduce} />

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:min-h-[82vh] lg:grid-cols-[3fr_2fr] lg:py-8">
        {/* Left Copy Column */}
        <div className="order-2 lg:order-1">
          {/* User Requested Independence Greeting Badge */}
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-pill border border-[#FF9933]/30 bg-white/80 px-3.5 py-1.5 backdrop-blur-md shadow-sm"
          >
            <Sparkles size={14} className="text-[#FF9933] animate-pulse" />
            <span className="font-label text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#047857]">
              Wish you a very happy 80th independence year from Indian Attars
            </span>
          </motion.div>

          <motion.h1
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 font-display text-hero font-medium italic leading-[0.92] text-ink"
          >
            <span className="block text-ink">THE ESSENCE OF</span>
            <span className="block bg-gradient-to-r from-[#FF9933] via-[#1C1A17] to-[#138808] bg-clip-text text-transparent">
              INDIA.
            </span>
          </motion.h1>

          <motion.p
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-4 font-display text-xl italic text-primary"
          >
            Freedom in the air. Heritage in every drop.
          </motion.p>

          <motion.p
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-4 max-w-lg text-muted text-sm sm:text-base leading-relaxed"
          >
            28 Essential Oils &bull; 14 Attars &bull; 5 Ruh &amp; Absolutes.
            <br />
            Steam-distilled in Kannauj &amp; Kanpur from fresh flower harvests.
            <br />
            ISO 9001:2015 &bull; GMP &bull; HACCP &bull; Halal Certified.
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/products"
              className={buttonClasses({ variant: "primary", size: "lg" }) + " shadow-md"}
            >
              Explore Indian Attars <ArrowRight size={16} />
            </Link>
            <Link
              href="/bulk-inquiry"
              className={buttonClasses({ variant: "secondary", size: "lg" })}
            >
              Request Bulk Quote
            </Link>
          </motion.div>

          <motion.p
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-5 font-label text-[0.62rem] uppercase tracking-[0.12em] text-primary"
          >
            ✓ COA Available&nbsp;&nbsp;✓ MSDS &amp; Allergen Sheets&nbsp;&nbsp;✓ Batch Tested
          </motion.p>
        </div>

        {/* Right Column - Luxury Media Card */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative order-1 lg:order-2"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-lg shadow-lift border border-white/60 bg-white/40 backdrop-blur-sm">
            {/* Fallback Image */}
            <img
              src="/assets/frame-1.png"
              alt="Luxury Indian Attar & Essential Oils"
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
              aria-label="Luxury Indian attar distillation video"
              className={`h-full w-full object-cover transition-opacity duration-700 ${
                isVideoReady ? "opacity-100" : "opacity-0"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-ink/10" />

            <div className="absolute left-4 top-4 rounded-pill bg-white/90 px-3 py-1.5 font-label text-[0.6rem] uppercase tracking-[0.12em] text-ink shadow-card">
              ISO 9001:2015
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-pill bg-white/90 px-3 py-1.5 text-xs text-ink shadow-card">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#047857]" />
              Since 2010
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down Arrow Indicator */}
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
