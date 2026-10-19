// `npm run build` dan keyin avtomatik ishlaydi (package.json → postbuild).
//
// Next.js 16 statik eksporti Windows'da segment fayllarini noto'g'ri nomlaydi: yo'l `\` bilan yig'iladi va
// `__next.imkoniyatlar.__PAGE__.txt` o'rniga `__next.imkoniyatlar\__PAGE__.txt` (papka) yoziladi. Klient router esa nuqtali
// nomni so'raydi (next/dist/shared/lib/segment-cache/segment-value-encoding.js) — natijada har sahifada 404.
// Bu skript papkalarni nuqtali fayl nomlariga aylantiradi. Linux/macOS'da (masalan, Netlify) bunday papka bo'lmaydi.
import fs from "node:fs";
import path from "node:path";

const out = path.resolve("out");
if (!fs.existsSync(out)) process.exit(0);

let moved = 0;

function filesUnder(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? filesUnder(full) : [full];
  });
}

function flatten(segmentDir, parentDir, prefix) {
  for (const file of filesUnder(segmentDir)) {
    const parts = path.relative(segmentDir, file).split(path.sep);
    fs.renameSync(file, path.join(parentDir, `${prefix}.${parts.join(".")}`));
    moved += 1;
  }
  fs.rmSync(segmentDir, { recursive: true, force: true });
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "_next") continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) flatten(full, dir, entry.name);
    else walk(full);
  }
}

walk(out);
if (moved > 0) console.log(`fix-export-segments: ${moved} ta segment fayli tuzatildi`);
