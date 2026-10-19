import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statik eksport: `npm run build` → out/ papkasi (Caddy, Netlify yoki istalgan statik hosting).
  output: "export",
  // Har sahifa — papka/index.html (out/narxlar/index.html): Netlify, Caddy, VS Code Live Server va boshqalarda
  // qo'shimcha sozlamasiz ochiladi; /narxlar manzili /narxlar/ ga yo'naltiriladi.
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
