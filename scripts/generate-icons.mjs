import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = process.cwd();
const publicDir = path.join(root, "public");
const src = path.join(root, "ABYKiconfavicon.png");

async function ensurePublic() {
  await fs.mkdir(publicDir, { recursive: true });
}

async function buildPng(size, outPath, bg = "#ffffff") {
  const img = sharp(src)
    .flatten({ background: bg })
    .resize(size, size, { fit: "cover" });
  await img.png({ compressionLevel: 9 }).toFile(outPath);
  console.log(`✓ ${path.basename(outPath)} (${size}x${size})`);
}

async function main() {
  await ensurePublic();
  // Verify source exists
  try {
    await fs.access(src);
  } catch {
    console.error(`Source icon not found: ${src}`);
    process.exit(1);
  }

  // Favicon PNGs
  await buildPng(16, path.join(publicDir, "favicon-16x16.png"));
  await buildPng(32, path.join(publicDir, "favicon-32x32.png"));
  await buildPng(48, path.join(publicDir, "favicon-48x48.png"));

  // Light/Dark variant PNGs for theme-aware favicons
  await buildPng(32, path.join(publicDir, "favicon-light.png"), "#ffffff");
  await buildPng(32, path.join(publicDir, "favicon-dark.png"), "#111111");

  // Apple touch icon (iOS)
  await buildPng(180, path.join(publicDir, "apple-touch-icon.png"));

  // Android/Chrome icons
  await buildPng(192, path.join(publicDir, "android-chrome-192x192.png"));
  await buildPng(512, path.join(publicDir, "android-chrome-512x512.png"));

  // Optional additional sizes
  await buildPng(256, path.join(publicDir, "android-chrome-256x256.png"));
  await buildPng(384, path.join(publicDir, "android-chrome-384x384.png"));

  // ICO: combine 16, 32, 48
  const icoBuf = await pngToIco([
    path.join(publicDir, "favicon-16x16.png"),
    path.join(publicDir, "favicon-32x32.png"),
    path.join(publicDir, "favicon-48x48.png"),
  ]);
  await fs.writeFile(path.join(publicDir, "favicon.ico"), icoBuf);
  console.log("✓ favicon.ico (16,32,48)");

  console.log("Icons generated successfully");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
