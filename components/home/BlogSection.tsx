import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BlogSection() {
  return (
    <section className="bg-surface/60">
      <div className="mx-auto max-w-7xl px-4 py-section sm:px-6">
        <SectionHeading
          eyebrow="Learn With Us"
          title="Stories, science & heritage"
        />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-xl border border-line bg-bg shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-surface to-primary-soft/40 p-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(30,92,68,0.10),transparent_60%)]" />
                <span className="relative z-10 inline-block rounded-pill bg-bg/90 px-2.5 py-1 font-label text-[0.55rem] uppercase tracking-[0.12em] text-primary shadow-sm">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl leading-tight text-ink transition-colors group-hover:text-primary">
                  <Link href={`/journal/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted line-clamp-3">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs text-muted">
                  <span>{post.date}</span>
                  <Link
                    href={`/journal/${post.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-primary group-hover:underline"
                  >
                    Read more <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
