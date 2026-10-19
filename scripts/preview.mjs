// out/ papkasini lokal ko'rish uchun bog'liqliksiz statik server: `npm run build`, keyin `npm run preview`.
// Port: PORT muhit o'zgaruvchisi (standart 4173). Matnli fayllar brotli/gzip bilan siqiladi — hostingdagidek.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = path.resolve("out");
const port = Number(process.env.PORT) || 4173;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

if (!fs.existsSync(root)) {
  console.error("out/ papkasi topilmadi. Avval: npm run build");
  process.exit(1);
}

// Siqilgan nusxalar xotirada saqlanadi (fayl o'zgarsa — qayta siqiladi). Brotli 5-daraja: tez va yetarlicha ixcham.
const cache = new Map();
function compressed(file, data, encoding) {
  const key = `${encoding}:${file}:${fs.statSync(file).mtimeMs}`;
  if (!cache.has(key)) {
    const body =
      encoding === "br"
        ? zlib.brotliCompressSync(data, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } })
        : zlib.gzipSync(data, { level: 6 });
    cache.set(key, body);
  }
  return cache.get(key);
}

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0] ?? "/");
  const file = path.join(root, decoded);
  if (file !== root && !file.startsWith(root + path.sep)) return null; // papkadan tashqariga chiqishni taqiqlash
  const isDir = fs.existsSync(file) && fs.statSync(file).isDirectory();
  if (isDir && fs.existsSync(path.join(file, "index.html"))) return path.join(file, "index.html");
  if (!path.extname(file) && fs.existsSync(`${file}.html`)) return `${file}.html`;
  return file;
}

http
  .createServer((req, res) => {
    // Hostinglardagidek: /narxlar → /narxlar/ (sahifalar papka/index.html ko'rinishida)
    const [pathname, query] = (req.url ?? "/").split("?");
    const target = path.join(root, decodeURIComponent(pathname ?? "/"));
    if (pathname && !pathname.endsWith("/") && !path.extname(pathname) && fs.existsSync(path.join(target, "index.html"))) {
      res.writeHead(308, { location: `${pathname}/${query ? `?${query}` : ""}` }).end();
      return;
    }
    const file = resolveFile(req.url ?? "/");
    if (!file) {
      res.writeHead(403).end();
      return;
    }
    fs.readFile(file, (error, data) => {
      if (error) {
        const notFound = path.join(root, "404.html");
        res.writeHead(404, { "content-type": types[".html"] });
        res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : "404");
        return;
      }
      const type = types[path.extname(file)] ?? "application/octet-stream";
      const headers = { "content-type": type, "cache-control": "no-cache", vary: "accept-encoding" };
      const accepts = String(req.headers["accept-encoding"] ?? "");
      const compressible = /^(text\/|application\/(json|xml)|image\/svg)/.test(type);
      const encoding = !compressible ? null : accepts.includes("br") ? "br" : accepts.includes("gzip") ? "gzip" : null;
      if (encoding) {
        res.writeHead(200, { ...headers, "content-encoding": encoding });
        res.end(compressed(file, data, encoding));
      } else {
        res.writeHead(200, headers);
        res.end(data);
      }
    });
  })
  .listen(port, () => {
    console.log(`DeutschUz sayti: http://localhost:${port}`);
  });
