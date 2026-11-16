// Yangilik maqolalarining ijtimoiy tarmoq rasmlari (1200×630): src/content/news.ts dagi `ogImage` bor har bir maqola uchun
// scripts/brand/news-og.html shablonini Chrome bilan suratga oladi → public/og/news-<slug>.png.
//
//   node scripts/news-og.mjs                 # hammasi
//   node scripts/news-og.mjs <slug>…         # faqat shular
//   CHROME="C:\...\msedge.exe" node scripts/news-og.mjs   # boshqa Chromium brauzer
//
// Node 22.18+ / 24: news.ts to'g'ridan-to'g'ri o'qiladi (TypeScript turlari olib tashlanadi), «@/…» — src/ ga.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      return nextResolve(pathToFileURL(path.join(root, "src", `${specifier.slice(2)}.ts`)).href, context);
    }
    return nextResolve(specifier, context);
  },
});

const { news, newsCategories } = await import(pathToFileURL(path.join(root, "src/content/news.ts")).href);
const { uzDate } = await import(pathToFileURL(path.join(root, "src/lib/news.ts")).href);
const { groupDigits } = await import(pathToFileURL(path.join(root, "src/lib/format.ts")).href);

const chrome =
  process.env.CHROME ??
  ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "/usr/bin/google-chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"].find(
    (candidate) => fs.existsSync(candidate),
  );
if (!chrome) {
  console.error("Chrome topilmadi: CHROME muhit o'zgaruvchisida brauzer manzilini bering.");
  process.exit(1);
}

const only = new Set(process.argv.slice(2));
const template = pathToFileURL(path.join(root, "scripts/brand/news-og.html")).href;
const NBSP = /\u00a0/g;

for (const article of news) {
  if (!article.ogImage || (only.size > 0 && !only.has(article.slug))) continue;
  const params = new URLSearchParams({
    title: article.title.replace(NBSP, " "),
    cat: newsCategories[article.category],
    date: uzDate(article.date),
  });
  const cover = article.cover;
  if (cover.kind === "units") {
    params.set("kind", "units");
    params.set("total", String(cover.total));
    params.set("filled", String(cover.filled));
    params.set("big", groupDigits(cover.filled * cover.unitValue));
    params.set("small", `/ ${groupDigits(cover.total * cover.unitValue)}`);
    params.set("legend", `1 katak — ${groupDigits(cover.unitValue)} ${cover.unitLabel}`);
  } else {
    params.set("kind", "path");
    params.set("steps", String(cover.steps));
    params.set("step", cover.stepLabel);
    params.set("goal", cover.goal);
    params.set("note", cover.label.replace(NBSP, " "));
  }

  const out = path.join(root, "public", article.ogImage);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  execFileSync(chrome, [
    "--headless=new",
    "--allow-file-access-from-files",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=1200,630",
    "--virtual-time-budget=4000",
    `--screenshot=${out}`,
    `${template}?${params}`,
  ], { stdio: "ignore" });
  console.log(`${article.slug} → public${article.ogImage}`);
}
