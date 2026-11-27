/**
 * Losslessly recompress source PNGs in place with sharp.
 * Next.js `next/image` still serves responsive AVIF/WebP at request time;
 * this just shrinks the originals we ship and speeds up optimization.
 *
 * Run: npm run optimize:images
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIRS = [
  "app/project/project-image",
  "public",
];
const PNG_RE = /\.png$/i;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let before = 0;
let after = 0;
let count = 0;

for (const dir of DIRS) {
  try {
    for await (const file of walk(dir)) {
      if (!PNG_RE.test(file)) continue;
      const orig = await readFile(file);
      before += orig.length;
      const optimized = await sharp(orig).png({ compressionLevel: 9, effort: 10 }).toBuffer();
      // only keep it if it actually got smaller
      const out = optimized.length < orig.length ? optimized : orig;
      if (out !== orig) await writeFile(file, out);
      after += out.length;
      count++;
      const pct = ((1 - out.length / orig.length) * 100).toFixed(0);
      console.log(`${String(pct).padStart(3)}%  ${orig.length} -> ${out.length}  ${file}`);
    }
  } catch (err) {
    console.error(`skipped ${dir}:`, err.message);
  }
}

const saved = before ? ((1 - after / before) * 100).toFixed(1) : "0";
console.log(`\n${count} PNGs processed, ${saved}% smaller overall (${before} -> ${after} bytes).`);
