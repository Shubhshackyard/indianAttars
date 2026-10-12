"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import indiaMap from "@svg-maps/india";
import { SOURCING_REGIONS, SourcingRegion } from "@/data/sourcing-regions";
import {
  MapPin,
  Sparkles,
  FlaskConical,
  Calendar,
  Layers,
  ArrowRight,
  Compass,
  CheckCircle2,
} from "lucide-react";

export function IndiaSourcingMap() {
  const [activeRegionId, setActiveRegionId] = useState<string>("kannauj");
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);

  // Map state ID to SourcingRegion for fast lookup
  const stateIdToRegion = useMemo(() => {
    const map = new Map<string, SourcingRegion>();
    for (const region of SOURCING_REGIONS) {
      for (const st of region.stateIds) {
        map.set(st, region);
      }
    }
    return map;
  }, []);

  const activeRegion = useMemo(() => {
    return (
      SOURCING_REGIONS.find((r) => r.id === activeRegionId) ||
      SOURCING_REGIONS[0]
    );
  }, [activeRegionId]);

  const displayedRegion = useMemo(() => {
    if (hoveredRegionId) {
      const h = SOURCING_REGIONS.find((r) => r.id === hoveredRegionId);
      if (h) return h;
    }
    return activeRegion;
  }, [hoveredRegionId, activeRegion]);

  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-[#0c1810] via-[#0f2116] to-[#08120b] p-4 text-white shadow-card sm:p-7 lg:p-9">
      {/* Top Header & Region Switcher Bar */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 font-label text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-accent">
              <Compass size={13} className="text-accent animate-spin-slow" />
              Interactive Botanical Cartography
            </span>
            <span className="hidden text-xs text-white/50 sm:inline">•</span>
            <span className="hidden text-xs text-white/60 sm:inline">
              Tap any region or pin to explore raw botanicals
            </span>
          </div>
          <h3 className="mt-2 font-display text-2xl text-white sm:text-3xl">
            India Sourcing & Distillation Map
          </h3>
        </div>

        {/* Region Quick Select Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {SOURCING_REGIONS.map((r) => {
            const isSelected = r.id === activeRegionId;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRegionId(r.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-accent text-ink shadow-md shadow-accent/20 font-semibold"
                    : "border border-white/10 bg-white/5 text-white/75 hover:bg-white/15 hover:text-white"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isSelected ? "bg-ink" : "bg-accent"
                  }`}
                />
                {r.name.split(",")[0].replace(" (Bharatpur & Sawai Madhopur)", "").replace(" (Ganjam Coastal Belt)", "").replace(" (Western Ghats & Karnataka)", "")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Interactive Vector Map + Sourcing Inspector */}
      <div className="mt-7 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left Column: Interactive Vector SVG of India (7 Cols) */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#08120b] to-[#040905] p-3 sm:p-6 lg:col-span-7">
          {/* Subtle Radial Atmosphere & Background Glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_45%_40%,rgba(13,92,58,0.35),transparent_65%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_65%,rgba(212,175,55,0.1),transparent_60%)]" />

          {/* Compass / Heritage Seal Overlay */}
          <div className="pointer-events-none absolute right-4 top-4 hidden flex-col items-end opacity-40 sm:flex">
            <span className="font-display text-xs tracking-widest text-accent">N</span>
            <div className="h-6 w-px bg-accent/60" />
            <span className="text-[0.6rem] uppercase tracking-wider text-white/60">Kannauj Meridian</span>
          </div>

          <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-md">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[0.7rem] uppercase tracking-[0.12em] text-white/80">
              Active: {displayedRegion.name}
            </span>
          </div>

          {/* Vector SVG */}
          <div className="relative w-full max-w-[480px]">
            <svg
              viewBox={indiaMap.viewBox}
              className="h-auto w-full filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)] select-none"
              aria-label="Map of India highlighting aromatic sourcing regions"
            >
              <defs>
                {/* Active Highlight Gradient */}
                <linearGradient id="activeStateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E653F" />
                  <stop offset="100%" stopColor="#0F3821" />
                </linearGradient>

                {/* Sourcing Default State Gradient */}
                <linearGradient id="sourcingStateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#173F28" />
                  <stop offset="100%" stopColor="#0E2819" />
                </linearGradient>

                {/* State Glow Filter */}
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#D4AF37" floodOpacity="0.7" />
                </filter>
              </defs>

              {/* Base State Paths */}
              <g id="states">
                {indiaMap.locations.map((loc) => {
                  const region = stateIdToRegion.get(loc.id);
                  const isSourcing = Boolean(region);
                  const isActive = region?.id === activeRegionId;
                  const isHovered = region?.id === hoveredRegionId;

                  let fill = "#0c1811";
                  let stroke = "rgba(255,255,255,0.08)";
                  let strokeWidth = 0.8;
                  let filter = undefined;

                  if (isSourcing) {
                    if (isActive) {
                      fill = "url(#activeStateGrad)";
                      stroke = "#D4AF37";
                      strokeWidth = 2.4;
                      filter = "url(#goldGlow)";
                    } else if (isHovered) {
                      fill = "#245B3A";
                      stroke = "#D4AF37";
                      strokeWidth = 1.8;
                    } else {
                      fill = "url(#sourcingStateGrad)";
                      stroke = "rgba(212, 175, 55, 0.45)";
                      strokeWidth = 1.2;
                    }
                  }

                  return (
                    <path
                      key={loc.id}
                      id={loc.id}
                      name={loc.name}
                      d={loc.path}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={strokeWidth}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      filter={filter}
                      className={
                        isSourcing
                          ? "cursor-pointer transition-all duration-300 hover:brightness-125"
                          : "transition-colors duration-200"
                      }
                      onClick={() => {
                        if (region) {
                          setActiveRegionId(region.id);
                        }
                      }}
                      onMouseEnter={() => {
                        if (region) {
                          setHoveredRegionId(region.id);
                        }
                      }}
                      onMouseLeave={() => {
                        setHoveredRegionId(null);
                      }}
                    >
                      <title>{`${loc.name}${region ? ` — Sourcing: ${region.badge}` : ""}`}</title>
                    </path>
                  );
                })}
              </g>

              {/* Pin Markers with Pulse Rings */}
              <g id="pins">
                {SOURCING_REGIONS.map((region) => {
                  const isActive = region.id === activeRegionId;
                  const isHovered = region.id === hoveredRegionId;
                  const { x, y } = region.pin;

                  return (
                    <g
                      key={`pin-${region.id}`}
                      transform={`translate(${x}, ${y})`}
                      className="cursor-pointer transition-transform duration-300"
                      onClick={() => setActiveRegionId(region.id)}
                      onMouseEnter={() => setHoveredRegionId(region.id)}
                      onMouseLeave={() => setHoveredRegionId(null)}
                    >
                      {/* Active Pulse Animation Rings */}
                      {(isActive || isHovered) && (
                        <>
                          <circle
                            r="18"
                            className="fill-[#D4AF37]/20 animate-ping"
                          />
                          <circle
                            r="11"
                            className="fill-[#D4AF37]/35"
                          />
                        </>
                      )}

                      {/* Outer Pin Body */}
                      <circle
                        r={isActive ? 8 : isHovered ? 7 : 5.5}
                        fill={isActive ? "#D4AF37" : "#1A472E"}
                        stroke={isActive ? "#FFFFFF" : "#D4AF37"}
                        strokeWidth={isActive ? 2 : 1.4}
                        className="transition-all duration-200 hover:scale-125"
                      />

                      {/* Inner Pin Dot */}
                      <circle
                        r={isActive ? 3 : 2}
                        fill={isActive ? "#0C1810" : "#D4AF37"}
                      />

                      {/* Pinned Label Pill */}
                      {isActive && (
                        <g transform="translate(0, -18)">
                          <rect
                            x={-45}
                            y={-14}
                            width={90}
                            height={18}
                            rx={9}
                            fill="rgba(12, 24, 16, 0.92)"
                            stroke="#D4AF37"
                            strokeWidth={1}
                          />
                          <text
                            x={0}
                            y={-2}
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="8"
                            fontWeight="600"
                            letterSpacing="0.04em"
                            fontFamily="sans-serif"
                          >
                            {region.name.split(",")[0]}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Map Legend */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[0.7rem] text-white/60">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded border border-accent bg-[#1E653F]" />
              <span>Direct Sourcing Hub</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded border border-accent/40 bg-[#173F28]" />
              <span>Partner Growing Region</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span>Distillation Still Pin</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Region & Raw Botanicals Inspector (5 Cols) */}
        <div className="flex flex-col gap-5 lg:col-span-5">
          {/* Active Region Header Card */}
          <div className="rounded-xl border border-accent/30 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 backdrop-blur-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-block rounded-full bg-accent/20 px-2.5 py-0.5 font-label text-[0.65rem] font-semibold uppercase tracking-wider text-accent border border-accent/40">
                  {displayedRegion.badge}
                </span>
                <h4 className="mt-2 font-display text-2xl font-medium text-white">
                  {displayedRegion.name}
                </h4>
                <p className="mt-0.5 text-xs text-white/60 font-medium">
                  State / Territory: {displayedRegion.stateLabel}
                </p>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-accent shadow-inner">
                <MapPin size={22} />
              </div>
            </div>

            <p className="mt-3 font-serif text-sm italic leading-relaxed text-white/85">
              &ldquo;{displayedRegion.tagline}&rdquo;
            </p>

            <p className="mt-3 text-xs leading-relaxed text-white/70">
              {displayedRegion.description}
            </p>

            {/* Distillation Method & Harvest Meta */}
            <div className="mt-4 grid gap-2.5 border-t border-white/10 pt-4 text-xs">
              <div className="flex items-start gap-2">
                <FlaskConical size={14} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <span className="font-semibold text-white/90">Distillation Craft: </span>
                  <span className="text-white/70">{displayedRegion.distillationMethod}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar size={14} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <span className="font-semibold text-white/90">Harvest Calendar: </span>
                  <span className="text-white/70">{displayedRegion.harvestSeason}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Raw Materials / Botanicals Breakdown */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-accent" />
                <h5 className="font-display text-base text-white">
                  Raw Botanicals Harvested Here
                </h5>
              </div>
              <span className="font-label text-[0.65rem] uppercase tracking-wider text-accent">
                {displayedRegion.rawMaterials.length} Key Ingredients
              </span>
            </div>

            <div className="mt-3.5 space-y-3">
              {displayedRegion.rawMaterials.map((mat) => (
                <div
                  key={mat.name}
                  className="group rounded-lg border border-white/5 bg-white/[0.03] p-3 transition-colors hover:border-accent/40 hover:bg-white/[0.06]"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-medium text-sm text-white group-hover:text-accent transition-colors">
                      {mat.name}
                    </span>
                    <span className="font-mono text-[0.7rem] italic text-accent/80">
                      {mat.botanical}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[0.7rem] text-accent font-medium">
                    <CheckCircle2 size={11} className="text-accent" />
                    <span>Part Distilled: {mat.part}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                    {mat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Associated Catalog Distillations / Products */}
          {displayedRegion.products.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/75">
                <Sparkles size={13} className="text-accent" />
                <span>Distillations Sourced from this Terroir</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {displayedRegion.products.map((prod) => (
                  <Link
                    key={prod.slug}
                    href={`/products/${prod.slug}`}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-white transition-all hover:border-accent hover:bg-accent hover:text-ink font-medium"
                  >
                    <span>{prod.name}</span>
                    <ArrowRight
                      size={11}
                      className="text-accent group-hover:text-ink transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
