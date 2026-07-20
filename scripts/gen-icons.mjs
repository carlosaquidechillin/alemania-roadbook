// Genera los PNG del icono (192 y 512) a partir de public/icons/icon.svg
// Requiere sharp:  npm i -D sharp   &&   node scripts/gen-icons.mjs
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "public/icons/icon.svg"));

for (const size of [192, 512]) {
  await sharp(svg, { density: 300 })
    .resize(size, size)
    .png()
    .toFile(join(root, `public/icons/icon-${size}.png`));
  console.log(`✓ icon-${size}.png`);
}
