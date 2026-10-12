/**
 * Centralized Cloudinary URL Resolver and Optimizer for IndianAttars.
 * Converts local static paths to high-performance Cloudinary CDN URLs with
 * automatic format negotiation (WebP/AVIF), responsive quality compression, and CDN caching.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "biqqs3bh";
const CLOUDINARY_ROOT = "IndianAttars/public";

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: "auto" | "auto:best" | "auto:good" | "auto:eco" | "auto:low" | number;
  format?: "auto" | "webp" | "avif" | "png" | "jpg";
  crop?: "scale" | "fit" | "fill" | "thumb" | "limit";
}

/**
 * Transforms any relative public asset path (e.g. `/products/gulab-attar/1.png`
 * or `certificates/iso-9001-certificate.pdf` or `assets/hero.mp4`) into its
 * full Cloudinary CDN delivery URL.
 */
export function getCloudinaryUrl(
  pathOrUrl?: string | null,
  options: CloudinaryTransformOptions = {}
): string {
  if (!pathOrUrl) return "";
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  // Normalize path
  let cleanPath = pathOrUrl.startsWith("/") ? pathOrUrl.slice(1) : pathOrUrl;

  // Handle Video Assets (e.g. hero.mp4)
  if (cleanPath.endsWith(".mp4") || cleanPath.endsWith(".webm") || cleanPath.endsWith(".mov")) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${CLOUDINARY_ROOT}/${cleanPath}`;
  }

  // Handle Raw Files (e.g. PDF Certificates, webmanifest)
  if (cleanPath.endsWith(".pdf") || cleanPath.endsWith(".webmanifest") || cleanPath.endsWith(".json")) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/raw/upload/${CLOUDINARY_ROOT}/${cleanPath}`;
  }

  // Handle Images with automatic f_auto,q_auto optimization
  const transformations: string[] = [];

  const fmt = options.format || "auto";
  const q = options.quality || "auto";
  transformations.push(`f_${fmt}`);
  transformations.push(`q_${q}`);

  if (options.width) {
    transformations.push(`w_${options.width}`);
    transformations.push(`c_${options.crop || "limit"}`);
  } else {
    transformations.push("c_limit,w_1000");
  }

  if (options.height) transformations.push(`h_${options.height}`);

  const transformString = transformations.join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}/${CLOUDINARY_ROOT}/${cleanPath}`;
}

export default getCloudinaryUrl;
