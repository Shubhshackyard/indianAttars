"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, Search, ShoppingBag } from "lucide-react";
import { MegaMenu } from "./MegaMenu";
import { Marquee } from "@/components/ui/Marquee";
import { buttonClasses } from "@/components/ui/Button";
import { NAV_LINKS, PROMO_ITEMS } from "@/lib/constants";
import { useUIStore } from "@/lib/ui";
import { useCartStore } from "@/lib/cart";
import { useCartCount, useCartHydrated } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";


function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="indianattars home">
      <Image
        src="/assets/logo.png"
        alt=""
        width={38}
        height={38}
        className="object-contain"
        priority
      />
      <span className="font-display text-2xl italic leading-none text-ink">
        indian<span className="text-gold">attars</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openSearch = useUIStore((s) => s.openSearch);
  const openMobileNav = useUIStore((s) => s.openMobileNav);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const count = useCartCount();
  const hydrated = useCartHydrated();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enterShop = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setShopOpen(true);
  };
  const leaveShop = () => {
    closeTimer.current = setTimeout(() => setShopOpen(false), 120);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Promo ticker — soft sage, subtle attention guide */}
      <div className="h-9 border-b border-line bg-primary-soft text-primary">
        <Marquee
          items={PROMO_ITEMS}
          separator="🌿"
          className="flex h-9 items-center"
          itemClassName="font-label text-[0.62rem] uppercase tracking-[0.18em]"
        />
      </div>

      {/* Main nav */}
      <div
        className={cn(
          "border-b transition-colors duration-200 bg-white dark:bg-[#111827]",
          scrolled
            ? "border-[#E5E7EB] dark:border-[#1F2937] shadow-card"
            : "border-transparent",
        )}
      >
        <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={openMobileNav}
              className="rounded-md p-2 text-[#1F2937] hover:bg-[#F3F4F6] dark:text-[#F9FAFB] dark:hover:bg-[#1F2937] lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <Logo />
          </div>

          {/* Center nav */}
          <ul className="hidden items-center gap-7 lg:flex">
            <li
              className="relative"
              onMouseEnter={enterShop}
              onMouseLeave={leaveShop}
            >
              <Link
                href="/products"
                className="flex items-center gap-1 py-6 font-label text-[0.7rem] uppercase tracking-[0.14em] text-[#1F2937] transition-colors hover:text-[#000000] dark:text-[#F9FAFB] dark:hover:text-white"
              >
                Shop
                <ChevronDown
                  size={14}
                  className={cn("text-[#1F2937] dark:text-[#F9FAFB] transition-transform", shopOpen && "rotate-180")}
                />
              </Link>
            </li>
            {NAV_LINKS.filter((l) => l.label !== "Shop").map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-label text-[0.7rem] uppercase tracking-[0.14em] text-[#1F2937] transition-colors hover:text-[#000000] dark:text-[#F9FAFB] dark:hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={openSearch}
              className="rounded-md p-2 text-[#1F2937] hover:bg-[#F3F4F6] dark:text-[#F9FAFB] dark:hover:bg-[#1F2937]"
              aria-label="Search products"
            >
              <Search size={19} />
            </button>
            <button
              onClick={toggleCart}
              className="relative rounded-md p-2 text-[#1F2937] hover:bg-[#F3F4F6] dark:text-[#F9FAFB] dark:hover:bg-[#1F2937]"
              aria-label="Open cart"
            >
              <ShoppingBag size={19} />
              {hydrated && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-pill bg-primary px-1 text-[0.6rem] font-semibold text-primary-fg">
                  {count}
                </span>
              )}
            </button>
            <Link
              href="/bulk-inquiry"
              className={cn(
                buttonClasses({ variant: "outline", size: "sm" }),
                "ml-1 hidden sm:inline-flex border-[#1F2937] text-[#1F2937] hover:bg-[#1F2937] hover:text-white dark:border-[#F9FAFB] dark:text-[#F9FAFB] dark:hover:bg-[#F9FAFB] dark:hover:text-[#111827]",
              )}
            >
              Get a Quote
            </Link>

            <div className="ml-2 flex items-center gap-2">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="rounded-md border border-[#1F2937] px-3 py-1.5 font-label text-[0.68rem] uppercase tracking-[0.1em] text-[#1F2937] hover:bg-[#1F2937] hover:text-white dark:border-[#F9FAFB] dark:text-[#F9FAFB] dark:hover:bg-[#F9FAFB] dark:hover:text-[#111827] transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="hidden sm:inline-flex rounded-md bg-primary px-3 py-1.5 font-label text-[0.68rem] uppercase tracking-[0.1em] text-primary-fg hover:brightness-110 transition-all">
                    Sign Up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <Link
                  href="/orders"
                  className="hidden sm:inline-flex rounded-md border border-[#1F2937] px-2.5 py-1.5 font-label text-[0.68rem] uppercase tracking-[0.1em] text-[#1F2937] hover:bg-[#1F2937] hover:text-white dark:border-[#F9FAFB] dark:text-[#F9FAFB] dark:hover:bg-[#F9FAFB] dark:hover:text-[#111827] transition-colors"
                >
                  My Orders
                </Link>
                <UserButton userProfileMode="navigation" userProfileUrl="/user-profile" />
              </Show>
            </div>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {shopOpen && (
          <div onMouseEnter={enterShop} onMouseLeave={leaveShop}>
            <MegaMenu onNavigate={() => setShopOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
