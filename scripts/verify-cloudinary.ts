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

async function getAllCloudinaryAssets() {
  const remoteAssets: { public_id: string; format: string; resource_type: string; url: string }[] = [];
  let nextCursor: string | undefined = undefined;

  do {
    const result: any = await cloudinary.search
      .expression("folder:IndianAttars/public/*")
      .max_results(500)
      .next_cursor(nextCursor)
      .execute();

    for (const res of result.resources) {
      remoteAssets.push({
        public_id: res.public_id,
        format: res.format,
        resource_type: res.resource_type,
        url: res.secure_url,
      });
    }
    nextCursor = result.next_cursor;
  } while (nextCursor);

  return remoteAssets;
}

function getLocalAssets(dir: string, baseDir = dir): string[] {
  let files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "assets.txt") continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getLocalAssets(fullPath, baseDir));
    } else {
      files.push(path.relative(baseDir, fullPath));
    }
  }
  return files;
}

async function main() {
  console.log("🔍 Querying Cloudinary Search API for IndianAttars/public/...");
  const remote = await getAllCloudinaryAssets();
  console.log(`☁️ Cloudinary has ${remote.length} assets under IndianAttars/public/`);

  const local = getLocalAssets(path.join(process.cwd(), "public"));
  console.log(`💻 Local filesystem has ${local.length} files in public/\n`);

  const remotePublicIds = new Set(remote.map((r) => r.public_id));

  const matched: string[] = [];
  const missing: string[] = [];

  for (const file of local) {
    const parsed = path.parse(file);
    const idNoExt = `IndianAttars/public/${parsed.dir ? parsed.dir + "/" : ""}${parsed.name}`;
    const idWithExt = `IndianAttars/public/${parsed.dir ? parsed.dir + "/" : ""}${parsed.base}`;

    if (remotePublicIds.has(idNoExt) || remotePublicIds.has(idWithExt)) {
      matched.push(file);
    } else {
      missing.push(file);
    }
  }

  console.log("=========================================");
  console.log(`✅ Matched 1:1 on Cloudinary: ${matched.length}/${local.length}`);
  console.log(`❌ Missing from Cloudinary: ${missing.length}`);
  console.log("=========================================\n");

  if (missing.length > 0) {
    console.log("Missing files:");
    missing.slice(0, 30).forEach((f) => console.log(` - ${f}`));
    if (missing.length > 30) {
      console.log(` ... and ${missing.length - 30} more`);
    }
  }
}

main().catch(console.error);
