import { products, CATEGORIES } from "../lib/products";
import { CERTIFICATIONS } from "../lib/constants";
import { getCloudinaryUrl } from "../lib/cloudinary";

interface TestResult {
  category: string;
  name: string;
  url: string;
  status: number;
  ok: boolean;
  error?: string;
}

import fs from "node:fs";
import path from "node:path";

async function testUrl(category: string, name: string, url: string): Promise<TestResult> {
  if (url.startsWith("/")) {
    const localPath = path.join(process.cwd(), "public", url);
    const exists = fs.existsSync(localPath);
    return {
      category,
      name,
      url,
      status: exists ? 200 : 404,
      ok: exists,
    };
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { method: "HEAD" });
      return {
        category,
        name,
        url,
        status: res.status,
        ok: res.ok,
      };
    } catch (err: any) {
      if (attempt < 3) {
        await new Promise((r) => setTimeout(r, 500 * attempt));
        continue;
      }
      return {
        category,
        name,
        url,
        status: 0,
        ok: false,
        error: err?.message || String(err),
      };
    }
  }
  return { category, name, url, status: 0, ok: false, error: "Retries exhausted" };
}

async function runPool<T, R>(items: T[], concurrency: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index++;
      results[current] = await fn(items[current]);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

async function main() {
  console.log("🧪 Starting Comprehensive Image & Asset Test across all routes & Cloudinary...\n");

  const tests: { category: string; name: string; url: string }[] = [];

  // 1. All Product Cards & Galleries (71 products)
  for (const p of products) {
    if (p.imageUrl) {
      tests.push({ category: "Product Card", name: `${p.name} (card)`, url: p.imageUrl });
    }
    const gallery = p.images || [];
    for (let i = 0; i < gallery.length; i++) {
      tests.push({
        category: "Product Gallery",
        name: `${p.name} (gallery ${i + 1})`,
        url: gallery[i],
      });
    }
  }

  // 2. All Certificates (9 PDFs)
  for (const cert of CERTIFICATIONS) {
    if (cert.pdf) {
      tests.push({ category: "Certificate", name: cert.name, url: cert.pdf });
    }
  }

  // 3. Category Banners
  for (const cat of CATEGORIES) {
    if (cat.bannerImage) {
      tests.push({
        category: "Category Banner",
        name: `${cat.label} Banner`,
        url: getCloudinaryUrl(cat.bannerImage),
      });
    }
  }

  // 4. Brand & UI Assets
  const brandAssets = [
    { name: "Logo", path: "/assets/logo.png" },
    { name: "Hero Poster", path: "/assets/frame-1.png" },
    { name: "Hero Video", path: "/assets/hero.mp4" },
    { name: "Available Sizes Chart", path: "/graphics/available-sizes.png" },
    { name: "Emerald Silk CTA", path: "/homepage/cta/emerald-silk.png" },
    { name: "Distillation USP", path: "/homepage/usp/distillation.png" },
    { name: "Favicon 32x32", path: "/favicon/favicon-32x32.png" },
    { name: "Apple Touch Icon", path: "/favicon/apple-touch-icon.png" },
  ];

  for (const asset of brandAssets) {
    tests.push({
      category: "Brand & UI",
      name: asset.name,
      url: getCloudinaryUrl(asset.path),
    });
  }

  console.log(`📋 Queued ${tests.length} unique asset endpoints to test.\n`);

  const results = await runPool(tests, 15, async (t) => {
    return testUrl(t.category, t.name, t.url);
  });

  const passed = results.filter((r) => r.ok);
  const failed = results.filter((r) => !r.ok);

  console.log("=========================================");
  console.log(`✅ Passed: ${passed.length} / ${results.length} (HTTP 200 OK)`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log("=========================================\n");

  if (failed.length > 0) {
    console.log("Failed URLs:");
    for (const f of failed) {
      console.log(`❌ [${f.category}] ${f.name}: HTTP ${f.status} -> ${f.url} (${f.error || ""})`);
    }
  } else {
    console.log("🎉 ALL product cards, galleries, certificates, and UI assets returned HTTP 200 OK!");
  }
}

main().catch(console.error);
