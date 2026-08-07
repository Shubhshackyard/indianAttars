import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, User } from "lucide-react";
import { BLOG_POSTS } from "@/data/content";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Fragrance Journal & Heritage Articles | indianattars",
  description: "Explore essential oil purity guides, traditional Kannauj deg-bhapka distillation heritage, and perfumery education.",
};

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Fragrance Journal" }]} />

      <div className="mt-6 border-b border-line pb-6">
        <span className="font-label text-xs uppercase tracking-[0.18em] text-primary">
          Knowledge &amp; Heritage
        </span>
        <h1 className="mt-2 font-display text-h1 text-ink">The Fragrance Journal</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Articles on Kannauj hydro-distillation craftsmanship, botanical purity testing, and perfumery guidelines.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-bg shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-surface to-primary-soft/40 p-6">
              <span className="inline-block rounded-pill bg-bg/90 px-3 py-1 font-label text-[0.6rem] uppercase tracking-[0.14em] text-primary shadow-sm">
                {post.category}
              </span>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(30,92,68,0.12),transparent_60%)]" />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Clock size={13} /> {post.readTime}
                </span>
                <span>·</span>
                <span>{post.date}</span>
              </div>

              <h2 className="mt-3 font-display text-xl leading-tight text-ink transition-colors group-hover:text-primary">
                <Link href={`/journal/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="mt-3 flex-1 text-sm text-muted leading-relaxed">{post.excerpt}</p>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <User size={13} className="text-primary" /> {post.author}
                </span>
                <Link
                  href={`/journal/${post.slug}`}
                  className="inline-flex items-center gap-1 font-label text-xs font-semibold text-primary group-hover:underline"
                >
                  Read Article <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
