import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "biqqs3bh",
  api_key: process.env.CLOUDINARY_API_KEY || "142449611662388",
  api_secret: process.env.CLOUDINARY_API_SECRET || "_3XVtz-xiI-jbUi5_qux1JqN_p0",
  secure: true,
});

interface FileItem {
  localPath: string;
  relPath: string; // e.g. products/gulab-attar/1.png
  folder: string;  // e.g. IndianAttars/public/products/gulab-attar
  publicId: string; // e.g. 1
  resourceType: "image" | "video" | "raw";
}

function getLocalFiles(dir: string, baseDir = dir): FileItem[] {
  let results: FileItem[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "assets.txt") continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results = results.concat(getLocalFiles(fullPath, baseDir));
    } else {
      const relPath = path.relative(baseDir, fullPath);
      const ext = path.extname(entry.name).toLowerCase();
      const parsed = path.parse(relPath);
      const folderPath = `IndianAttars/public/${parsed.dir}`.replace(/\/+$/, "");

      let resourceType: "image" | "video" | "raw" = "image";
      if (ext === ".mp4" || ext === ".webm" || ext === ".mov") {
        resourceType = "video";
      } else if (ext === ".pdf" || ext === ".webmanifest" || ext === ".txt" || ext === ".json") {
        resourceType = "raw";
      }

      results.push({
        localPath: fullPath,
        relPath,
        folder: folderPath,
        publicId: parsed.name,
        resourceType,
      });
    }
  }

  return results;
}

async function uploadFile(item: FileItem): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const res = await cloudinary.uploader.upload(item.localPath, {
      folder: item.folder,
      public_id: item.publicId,
      resource_type: item.resourceType,
      overwrite: true,
      unique_filename: false,
      use_filename: true,
    });
    return { success: true, url: res.secure_url };
  } catch (err: any) {
    return { success: false, error: err?.message || String(err) };
  }
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
  const publicDir = path.join(process.cwd(), "public");
  const files = getLocalFiles(publicDir);

  console.log(`🚀 Found ${files.length} local files in public/ to sync to Cloudinary...`);
  console.log(`Target root: IndianAttars/public/`);

  let completed = 0;
  const startTime = Date.now();

  const results = await runPool(files, 15, async (file) => {
    const res = await uploadFile(file);
    completed++;
    if (completed % 25 === 0 || completed === files.length) {
      const pct = Math.round((completed / files.length) * 100);
      console.log(`⏳ Progress: ${completed}/${files.length} (${pct}%)`);
    }
    return { file, res };
  });

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  const successful = results.filter((r) => r.res.success);
  const failed = results.filter((r) => !r.res.success);

  console.log(`\n========================================`);
  console.log(`✅ Upload complete in ${duration}s!`);
  console.log(`✨ Successfully uploaded: ${successful.length} files`);
  console.log(`❌ Failed: ${failed.length} files`);
  console.log(`========================================\n`);

  if (failed.length > 0) {
    console.log("Failed items:");
    for (const f of failed) {
      console.log(` - ${f.file.relPath}: ${f.res.error}`);
    }
  }
}

main().catch(console.error);
