import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, Calendar, Share2, Award, CheckCircle2 } from "lucide-react";
import { BLOG_POSTS } from "@/data/content";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { buttonClasses } from "@/components/ui/Button";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found | indianattars" };
  return {
    title: `${post.title} | indianattars`,
    description: post.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Journal", href: "/journal" },
          { label: post.category },
        ]}
      />

      <Link
        href="/journal"
        className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors"
      >
        <ArrowLeft size={14} /> Back to Fragrance Journal
      </Link>

      {/* Article Header */}
      <header className="mt-4 border-b border-line pb-8">
        <span className="inline-block rounded-pill bg-primary-soft px-3 py-1 font-label text-[0.65rem] uppercase tracking-[0.14em] text-primary">
          {post.category}
        </span>

        <h1 className="mt-3 font-display text-h1 text-ink leading-tight sm:text-4xl">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1.5 font-medium text-ink">
            <User size={14} className="text-primary" /> {post.author}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} /> {post.date}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {post.readTime}
          </span>
        </div>
      </header>

      {/* Excerpt Hero Banner */}
      <div className="my-8 rounded-2xl border border-gold/30 bg-gold/10 p-6 text-ink/90">
        <p className="font-display text-lg italic leading-relaxed text-ink">
          &ldquo;{post.excerpt}&rdquo;
        </p>
      </div>

      {/* Body Content */}
      <div className="prose prose-stone max-w-none space-y-6 text-base leading-relaxed text-ink/90">
        {post.content.map((paragraph, index) => (
          <p key={index} className="text-base text-ink/80">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Distiller Guarantee Box */}
      <div className="mt-12 rounded-2xl border border-line bg-surface/50 p-6 text-xs text-muted sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Award size={28} className="text-primary shrink-0" />
          <div>
            <p className="font-medium text-ink">Authentic Botanical Guarantee</p>
            <p>Direct from Kannauj copper stills · 100% GC-MS Verified Batches</p>
          </div>
        </div>
        <Link
          href="/products"
          className={buttonClasses({ variant: "primary", size: "sm", className: "mt-4 sm:mt-0 gap-1" })}
        >
          Explore Pure Attars →
        </Link>
      </div>
    </article>
  );
}
