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
              className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-surface to-primary-soft">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(30,92,68,0.10),transparent_60%)]" />
                <span className="absolute left-3 top-3 rounded-pill bg-bg/90 px-2.5 py-1 font-label text-[0.55rem] uppercase tracking-[0.12em] text-primary">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl leading-tight text-ink transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted">
                  <span>{post.date}</span>
                  <span className="inline-flex items-center gap-1 text-primary">
                    Read more <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
