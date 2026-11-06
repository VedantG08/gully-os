import sharp from "sharp";
import { readFileSync, statSync } from "fs";

async function optimize() {
  console.log("Compressing assets to target WebP specs...");

  // 1. Background plate: 1920px max width, quality 75, target < 200KB
  const bgSrc = "V:/Gully os/gully-os/Reference Ui/Neon Rain and Vintage Marathi Cinema.png";
  await sharp(bgSrc)
    .resize(1920, null, { withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile("V:/Gully os/gully-os/src/assets/gully-bg.webp");

  const bgSize = statSync("V:/Gully os/gully-os/src/assets/gully-bg.webp").size / 1024;
  console.log(`gully-bg.webp: ${bgSize.toFixed(1)} KB (target < 200 KB)`);

  // 2. Portrait cutout: 900px width, quality 76, target < 150KB
  const portraitSrc = "V:/Gully os/gully-os/Reference Ui/Neon-Rimmed Sunglasses Portrait.png";
  await sharp(portraitSrc)
    .resize(900, null, { withoutEnlargement: true })
    .webp({ quality: 76, alphaQuality: 80, effort: 6 })
    .toFile("V:/Gully os/gully-os/src/assets/vedant-cutout.webp");

  const pSize = statSync("V:/Gully os/gully-os/src/assets/vedant-cutout.webp").size / 1024;
  console.log(`vedant-cutout.webp: ${pSize.toFixed(1)} KB (target < 150 KB)`);

  // 3. Kaka illustration: 400px width, quality 78
  const kakaSrc = "V:/Gully os/gully-os/Reference Ui/Chaiwala’s Warm Welcome.png";
  await sharp(kakaSrc)
    .resize(400, null, { withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile("V:/Gully os/gully-os/src/assets/kaka.webp");

  const kSize = statSync("V:/Gully os/gully-os/src/assets/kaka.webp").size / 1024;
  console.log(`kaka.webp: ${kSize.toFixed(1)} KB`);
}

optimize().catch(console.error);
