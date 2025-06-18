/**
 * optimize-images.ts
 *
 * Recursively optimises every supported image anywhere under `content/posts`
 * and emits a WebP version
 *
 * Output path: `public/blog/<slug>/<relative-path>`
 *
 * Features
 * --------
 * • Skips files that are already up-to-date (mtime + size match)
 * • Parallel processing with a bounded worker pool (`p-limit`)
 * • Single `OPTIMISE()` helper – tweak Sharp transforms once
 * • Non-zero exit code if any optimisation failed (good for CI)
 *
 * Usage
 * -----
 *  pnpm add -D sharp p-limit tsx
 *  pnpm tsx lib/scripts/optimize-images.ts
 */

import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import pLimit from "p-limit";

/* ────────────────────────────────────────────────── *
 * Configuration
 * ────────────────────────────────────────────────── */
const CWD = process.cwd();
const POSTS_DIR = path.join(CWD, "content/posts");
const PUBLIC_DIR = path.join(CWD, "public/blog");
const CONCURRENCY = 8; // number of parallel workers
const WEBP_QUALITY = 80; // WebP quality (1-100)
const SUPPORTED_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".avif",
  ".tiff",
]);

/** Apply all Sharp transforms here once. */
function OPTIMISE(s: sharp.Sharp): sharp.Sharp {
  return s
    .rotate() // auto-orient using EXIF
    .withMetadata() // keep EXIF; drop if undesired
    .resize({ width: 1600, withoutEnlargement: true });
}

/** Return true if `dst` exists and is newer+same-size as `src`. */
async function isUpToDate(src: string, dst: string): Promise<boolean> {
  try {
    const [srcStat, dstStat] = await Promise.all([fs.stat(src), fs.stat(dst)]);
    return srcStat.mtimeMs <= dstStat.mtimeMs && srcStat.size === dstStat.size;
  } catch {
    return false; // dst missing or inaccessible
  }
}

/** Optimise one image; returns counts delta. */
async function optimiseImage(absSrc: string, slug: string) {
  const relWithinSlug = path.relative(path.join(POSTS_DIR, slug), absSrc);
  const ext = path.extname(absSrc).toLowerCase();
  const baseNoExt = path.basename(relWithinSlug, ext);
  const dstDir = path.join(PUBLIC_DIR, slug, path.dirname(relWithinSlug));
  const dstWebp = path.join(dstDir, `${baseNoExt}.webp`);

  try {
    if (await isUpToDate(absSrc, dstWebp)) {
      console.log("skip   ", path.join(slug, relWithinSlug));
      return { skipped: 1 };
    }

    await fs.mkdir(dstDir, { recursive: true });

    // Optimized WebP output
    await OPTIMISE(sharp(absSrc))
      .webp({ quality: WEBP_QUALITY })
      .toFile(dstWebp);

    console.log("write  ", path.join(slug, relWithinSlug));
    return { optimised: 1 };
  } catch (err) {
    console.error("error  ", path.join(slug, relWithinSlug), err);
    return { errors: 1 };
  }
}

/** Async generator: walk directory recursively yielding supported image paths. */
async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (SUPPORTED_EXT.has(path.extname(entry.name).toLowerCase())) {
      yield full;
    }
  }
}

/* ────────────────────────────────────────────────── *
 * Main
 * ────────────────────────────────────────────────── */
(async () => {
  const counts = { optimised: 0, skipped: 0, errors: 0 };

  const slugDirs = (await fs.readdir(POSTS_DIR, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const limit = pLimit(CONCURRENCY);
  const jobs: Promise<void>[] = [];

  for (const slug of slugDirs) {
    for await (const img of walk(path.join(POSTS_DIR, slug))) {
      jobs.push(
        limit(async () => {
          const delta = await optimiseImage(img, slug);
          counts.optimised += delta.optimised ?? 0;
          counts.skipped += delta.skipped ?? 0;
          counts.errors += delta.errors ?? 0;
        }),
      );
    }
  }

  await Promise.all(jobs);

  console.log("\n— Image optimisation summary —");
  console.table(counts);

  if (counts.errors) process.exit(1);
})();
