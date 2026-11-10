/**
 * Maakt screenshots van de drie conceptdemo's voor de portfolio-sectie en de 3D-hero.
 *
 * Gebruik (met `npm run dev` actief in een ander venster):
 *   npm run capture
 *
 * Optioneel een andere URL-template:
 *   CAPTURE_URL="http://localhost:3000/concepten/{slug}" npm run capture
 */
import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "concepts");
const template = process.env.CAPTURE_URL ?? "http://localhost:3000/concepten/{slug}";
const slugs = ["schilder", "hovenier", "garage"];

await fs.mkdir(outDir, { recursive: true });
const browser = await chromium.launch();

async function shoot(slug, { width, height, dpr, fullPage, maxHeight, name, outWidth }) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: dpr });
  const page = await ctx.newPage();
  await page.goto(template.replace("{slug}", slug), { waitUntil: "networkidle" });
  await page.addStyleTag({ content: "[data-concept-banner]{display:none!important} *{scroll-behavior:auto!important}" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  let png = await page.screenshot({ fullPage });
  if (fullPage && maxHeight) {
    const meta = await sharp(png).metadata();
    png = await sharp(png).extract({ left: 0, top: 0, width: meta.width, height: Math.min(meta.height, maxHeight * dpr) }).toBuffer();
  }
  const file = path.join(outDir, `${slug}-${name}.webp`);
  await sharp(png).resize({ width: outWidth }).webp({ quality: 82, effort: 6 }).toFile(file);
  console.log("✓", path.relative(root, file));
  await ctx.close();
}

for (const slug of slugs) {
  // Bovenkant desktop: textuur voor de 3D-hero en de statische fallback
  await shoot(slug, { width: 1440, height: 900, dpr: 1, fullPage: false, name: "desktop", outWidth: 1440 });
  // Volledige pagina: scrollt in de portfolio-kaart bij hover
  await shoot(slug, { width: 1440, height: 900, dpr: 1, fullPage: true, maxHeight: 3600, name: "full", outWidth: 1200 });
  // Mobiel
  await shoot(slug, { width: 390, height: 844, dpr: 2, fullPage: false, name: "mobile", outWidth: 520 });
}

await browser.close();
