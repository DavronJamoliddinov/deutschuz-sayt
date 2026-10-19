# DeutschUz — marketing sayti

DeutschUz mobil ilovasining (iOS + Android) taqdimot sayti: nemis tilini o'zbek tili orqali o'rgatuvchi ilovani tanishtiradi.
Ilova loyihasining o'zi alohida (Flutter, `CLAUDE.md` da tasvirlangan) — sayt unga faqat havola beradi.

**Texnologiya:** Next.js 16 (App Router, statik eksport) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lucide ikonkalari.
Natija — oddiy statik fayllar (`out/`): istalgan hostingda yoki ilova serveridagi Caddy'da ishlaydi.

## Ishga tushirish

Kerak: **Node.js 20.9+** (tavsiya — LTS: [nodejs.org](https://nodejs.org/)).

```powershell
npm install          # bir marta
npm run dev          # ishlab chiqish rejimi: http://localhost:3000 (o'zgarishda o'zi yangilanadi)
npm run build        # production → out/ papkasi (hostingga shu papka yuklanadi)
npm run preview      # out/ ni lokal ko'rish: http://localhost:4173
```

Tekshiruvlar:

```powershell
npm run lint         # ESLint (Next.js, React Hooks, jsx-a11y qoidalari)
npm run typecheck    # TypeScript
npm run check        # lint + typecheck + build — hammasi birga
```

Node o'rnatilmagan kompyuterda tayyor `out/` papkasini VS Code'ning **Live Server** kengaytmasi bilan ko'rish mumkin
(«Go Live» — `.vscode/settings.json` da ildiz `out/` qilib sozlangan).

## Sahifalar

Har bo'lim — o'z manzili bilan alohida sahifa:

| Manzil | Sahifa |
|---|---|
| `/` | Bosh sahifa: hero, raqamlar, yondashuv, so'z demosi, ilova ekranlari, imtihon, bo'limlarga havolalar |
| `/imkoniyatlar/` | Barcha imkoniyatlar va o'qish matni namunasi (so'z bosilsa — tarjimasi shu yerda chiqadi) |
| `/qanday-ishlaydi/` | Uch qadam: daraja, kunlik maqsad, takrorlash |
| `/darajalar/` | A1 → C1 yo'l xaritasi (tayyor bo'lmagan kontent «tayyorlanmoqda» deb belgilangan) |
| `/narxlar/` | Bepul va Premium, 4 reja, so'mda taxminiy summa |
| `/savollar/` | Ko'p so'raladigan savollar |
| `/yuklab-olish/` | Qurilma avtomatik aniqlanadi (iPhone / Android / kompyuter), boshqasini qo'lda tanlash mumkin |

- Har sahifa — alohida HTML fayl (`out/<sahifa>/index.html`, `trailingSlash: true`): to'g'ridan-to'g'ri manzil,
  yangilash (F5) va «Orqaga / Oldinga» istalgan statik hostingda ishlaydi. Sahifalar orasida o'tish — Next.js `Link`
  (sahifa qayta yuklanmaydi), menyuda joriy sahifa belgilanadi (`aria-current="page"`).
- Navbar va footer hamma sahifa uchun bitta (`src/app/layout.tsx`); menyu ro'yxati — `src/content/navigation.ts`.
  Yangi sahifa: `src/app/<nom>/page.tsx` va `navLinks` ga bir qator (footer va `sitemap.xml` o'zi yangilanadi).
- Ichki sahifa sarlavhasi — `PageHeader` (sahifa yo'li, h1). Bo'lim komponentlari bosh sahifa bilan umumiy:
  `withHeader={false}` bo'lsa bo'limning o'z sarlavhasi chiqmaydi — matn sahifada ikki marta takrorlanmaydi.

### Sayt va ilova chegarasi

Saytda server ham, AI ham yo'q — u faqat ilovani tanishtiradi. AI bilan gapirish ilovaning o'zida: ilova AI proksiga
(`/v1/speak`) tanlangan vazifa ID'sini yuboradi, vazifa esa tanlangan darajaga (A1–B2) tegishli; AI yo'riqnomasi
serverda (`CLAUDE.md`, 12_sprechen). O'qish matnlari va ularning lug'ati ham ilovada (A1–B1 — 90 ta matn, B2 va C1
tayyorlanmoqda). Saytdagi o'qish namunasi — shu ishlashni ko'rsatuvchi bitta qisqa matn (`src/content/reading.ts`).

## Sozlamalar

Hali ma'lum bo'lmagan manzillar (domen, do'kon sahifalari, huquqiy sahifalar) atayin bo'sh qoldirilgan: bo'sh bo'lsa,
sayt mavjud bo'lmagan joyga havola bermaydi. Qiymatlar **build paytida** muhit o'zgaruvchilari bilan beriladi (yoki
`src/config/site.ts` da yoziladi):

| O'zgaruvchi | Nima o'zgaradi |
|---|---|
| `SITE_URL` | Canonical, Open Graph rasmi (`/og.png`), `sitemap.xml`. Masalan `https://deutschuz.uz` |
| `APP_STORE_URL`, `GOOGLE_PLAY_URL` | «Yuklab olish» sahifasida va har sahifa oxiridagi blokda «… sahifasi hali yoʻq» o'rniga do'kon tugmasi; menyudagi holat matni, FAQ javobi. Faqat `https://apps.apple.com/…` va `https://play.google.com/…` manzillari qabul qilinadi — boshqasi berilsa, build xato bilan to'xtaydi |
| `PRIVACY_URL`, `TERMS_URL` | Footer'da «Maxfiylik siyosati» va «Foydalanish shartlari» (ilova loyihasidagi `deploy/site/`: `/privacy`, `/terms`) |

```powershell
$env:SITE_URL = "https://deutschuz.uz"; $env:APP_STORE_URL = "https://apps.apple.com/..."; npm run build
```

Kompyuter (Windows / macOS) versiyasi yo'q — ilova faqat telefon uchun (`CLAUDE.md`, 1-bo'lim). Kompyuterdan kirgan
foydalanuvchiga shu aniq aytiladi va sahifa havolasi telefonda ochish uchun beriladi; soxta «yuklab olish» tugmasi yo'q.

Narxlar bo'limidagi so'mdagi taxminiy summa build paytida Markaziy bank kursi bo'yicha hisoblanadi (`cbu.uz` ochiq JSON);
tarmoq bo'lmasa — oxirgi qayd etilgan kurs (11 821, 30.09.2026). Kurs sanasi sahifada ko'rsatiladi.

## Matnlarni tahrirlash

Barcha matnlar va raqamlar kodga tegmasdan tahrirlanadi — `src/content/`:

| Fayl | Nima |
|---|---|
| `facts.ts` | Ilova kontentining raqamlari (65 000+ so'z, 78 dars, 277 mashq…) — manba `CLAUDE.md`. Raqam o'zgarsa, faqat shu yerda |
| `home.ts` | Hero, raqamlar paneli, «Yondashuv», «Qanday ishlaydi», bo'limlar havolalari, yakuniy chaqiriq, footer |
| `navigation.ts` | Sahifalar: menyu nomlari va tavsiflari, «Yuklab olish» sahifasi sarlavhasi |
| `download.ts` | Yuklab olish bloki: platformalar, «hali yoʻq» va kompyuter matnlari |
| `reading.ts` | O'qish namunasi: matn, gap tarjimalari, so'zlar lug'ati |
| `features.ts`, `demo.ts`, `levels.ts`, `showcase.ts`, `exam.ts`, `pricing.ts`, `faq.ts` | Tegishli bo'limlar |

- O'zbek imlosi: `oʻ`, `gʻ` — U+02BB (`ʻ`), tutuq belgisi — U+02BC (`ʼ`), qo'shtirnoq — `«…»`.
- Tire oldidagi bo'shliq avtomatik bo'linmas qilinadi (`src/lib/typography.ts`) — tire qator boshida qolmaydi.
- Saytda faqat tasdiqlangan ma'lumot: foydalanuvchilar soni, reyting, sharhlar yo'q. Tayyor bo'lmagan kontent
  «tayyorlanmoqda» deb belgilangan (B2/C1 o'qish matnlari).

## Tuzilma

```
src/
  app/            layout (navbar, footer, shriftlar, metadata), bosh sahifa, ichki sahifalar (imkoniyatlar/,
                  qanday-ishlaydi/, darajalar/, narxlar/, savollar/, yuklab-olish/), 404, robots.ts, sitemap.ts,
                  ikonkalar (icon.png, apple-icon.png), globals.css (dizayn tokenlari)
  assets/brand/   logotip belgisi (128 px) — next/image orqali
  config/site.ts  manzillar (yuqoridagi jadval) va do'kon havolasi tekshiruvi
  content/        barcha matnlar va raqamlar
  components/
    layout/       Navbar (joriy sahifa, mobil menyu), Footer
    sections/     Hero, FactsBand, Approach, Features, VocabularyDemo (+DemoWidget), HowItWorks, LearningPath
                  (+LevelTrack), ProductShowcase, ExamPrep, Pricing, FAQ (+Accordion), ReadingSpotlight (+ReadingDemo),
                  ExploreLinks, FinalCTA
    mockups/      ilova ekranlari (HTML/CSS bilan chizilgan, ilovaning dizayn tiliga mos), telefon ramkasi
    motion/       MotionProvider, scroll-reveal kuzatuvchisi, sahifa ichidagi (#) havolalar, sanash, parallaks
    ui/           tugma, logotip, bo'lim sarlavhasi, sahifa sarlavhasi (PageHeader), yuklab olish bloki (DownloadOptions)
  lib/            yordamchilar (format, kurs, metadata, tipografiya, media query)
assets/brand/     rasmiy logotipning asl fayli va 512 px belgisi (og.png shabloni uchun)
public/           og.png (ijtimoiy tarmoqlar uchun rasm), _headers, kirill shrift qismlari
scripts/          preview.mjs (lokal server), fix-export-segments.mjs (build'dan keyin), brand/og.html
```

## Dizayn tizimi

- **Ranglar** (`src/app/globals.css`, `@theme`): to'q ko'k `#101A35`, yarim tun ko'ki `#17264B`, iliq oq `#F8F8F5`,
  sariq `#FFD447`, korall `#F06455`. Ilova maketlari ilovaning o'z ranglarida (ko'k `#1E6BF0`, artikllar: der — ko'k,
  die — qizil, das — yashil). Matn ranglari WCAG AA (≥4.5:1) bo'yicha tekshirilgan.
- **Shriftlar** (loyihaning o'zida, SIL OFL): **Onest** — sarlavhalar, **Inter** — matn, **Instrument Serif** — nemischa
  so'zlar uchun. Tanlov sababi: ko'plab mashhur shriftlarda o'zbekcha `ʻ`/`ʼ` belgilari yo'q — Onest va Inter'da bor
  (tekshirilgan). Kirill qismi faqat kirill matn chiqqanda yuklanadi.
- **Animatsiya:** hero va sahifa sarlavhasi kirishi — sof CSS (JS'ni kutmaydi); bo'limlar ko'rinishga kirganda paydo
  bo'ladi; interaktiv qismlar — Motion. Tizimda «harakatni kamaytirish» yoqilgan bo'lsa, animatsiyalar o'chadi va kontent
  darhol ko'rinadi.

## Joylash (deploy)

`npm run build` → `out/` papkasini statik hostingga yuklang.

`npm run build` dan keyin `scripts/fix-export-segments.mjs` avtomatik ishlaydi (`postbuild`): Next.js 16 Windows'da
sahifalararo o'tish fayllarini (`__next.<sahifa>.__PAGE__.txt`) papka qilib yozadi, brauzer esa nuqtali nomni so'raydi —
skript nomlarni tuzatadi. Linux'da (masalan, Netlify) bunday papka bo'lmaydi va skript hech narsa qilmaydi.

- **Ilova serveri (Caddy)** — ilova loyihasidagi `deploy/site/` yonida:
  ```
  deutschuz.uz {
      root * /srv/site        # out/ tarkibi + privacy.html, terms.html
      encode zstd gzip
      try_files {path} {path}.html {path}/index.html
      file_server
      handle_errors {
          rewrite * /404.html
          file_server
      }
  }
  ```
  `/narxlar` ham, `/narxlar/` ham `narxlar/index.html` ni beradi. Keyin `PRIVACY_URL=/privacy`, `TERMS_URL=/terms`
  bilan qayta build qiling.
- **Netlify** (bepul tarif: oyiga 300 kredit; har production deploy — 15 kredit, trafik — 20 kredit/GB):
  - *Eng tezi, Git'siz:* [app.netlify.com](https://app.netlify.com/) ga kiring → [app.netlify.com/drop](https://app.netlify.com/drop)
    sahifasiga tayyor `out/` papkasini sudrab tashlang. Sayt bir necha soniyada `https://<nom>.netlify.app` manzilida ochiladi.
    Keyingi yangilanishlar: o'sha saytning **Deploys** bo'limiga yangi `out/` ni tashlash.
  - *GitHub orqali (avtomatik):* kodni GitHub'ga yuklang → Netlify: **Add new project → Import an existing project →
    GitHub** → repozitoriyni tanlang. Build sozlamalari `netlify.toml` dan avtomatik olinadi. Har push yangi deploy
    (15 kredit) — tez-tez push qilsangiz, kredit tez tugaydi.
  - Kesh va xavfsizlik sarlavhalari: `public/_headers`.
- **Vercel / GitHub Pages** — build buyrug'i `npm run build`, chiqish papkasi `out`.

## Brend rasmlari

Logotip — loyiha egasi bergan rasmiy rasm; asl nusxa o'zgartirilmagan holda `assets/brand/deutschuz-logo-original.png`
da saqlanadi. Veb uchun nusxalar shundan olingan: oq fon va soya chetlardan flood fill bilan olib tashlangan, oq fonga
aralashgan 2 px chekka kesilgan, proporsiya saqlangan holda kvadratga joylangan va bosqichma-bosqich kichraytirilgan.
Logotipning o'zi (rang, shakl, harflar) o'zgarmagan.

| Fayl | O'lcham | Qayerda |
|---|---|---|
| `src/assets/brand/logo-mark.png` | 128 px, shaffof | Navbar, mobil menyu, footer (`src/components/ui/Logo.tsx`) |
| `src/app/icon.png` | 64 px, shaffof | Brauzer ikonkasi (favicon) |
| `src/app/apple-icon.png` | 180 px, burchaklari to'q ko'k | iOS «Bosh ekranga qo'shish» |
| `assets/brand/deutschuz-logo-mark-512.png` | 512 px, shaffof | `public/og.png` shabloni |

Logotip almashsa — shu fayllarni xuddi shu nom va o'lchamda almashtiring va `og.png` ni qayta yarating
(`scripts/brand/og.html` shablonidan, Chrome bilan):

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --allow-file-access-from-files --hide-scrollbars `
  --force-device-scale-factor=1 --window-size=1200,630 --screenshot="$PWD\public\og.png" "file:///$PWD/scripts/brand/og.html"
```

## Sifat tekshiruvi (2026-10-19)

- ESLint, TypeScript, production build — xatosiz (`npm run check`).
- Brauzer testlari (Chrome, `npm run preview`):
  - navigatsiya — 22 ta: har sahifa o'z manzilida, to'g'ridan-to'g'ri ochish va yangilash (7 sahifa), «Orqaga / Oldinga»,
    menyuda joriy sahifa, mobil menyu, 404; sahifalar orasida o'tish client-side (sahifa qayta yuklanmaydi);
  - o'qish namunasi — 11 ta: so'z bosilsa tarjima (sahifa almashmaydi), shakl izohi, «Siz bosgan soʻzlar», klaviatura;
    1440 va 390 px;
  - yuklab olish — 12 ta: iPhone / Android / kompyuter avtomatik aniqlanadi, qo'lda tanlash (sichqoncha va strelkalar),
    do'kon sahifasi yo'qligi aniq aytiladi, soxta havola yo'q;
  - bosh sahifa interaksiyalari — 21 ta (kartochka, der/die/das testi, alifbo, ilova tablari, FAQ, mobil menyu);
  - 7 sahifa × 320–1440 px — gorizontal toshib ketish yo'q.
- axe-core (WCAG 2.2 A/AA): 7 sahifa × desktop va mobil — 0 ta buzilish.
- CLS (Layout Instability API; kompyuter 1366–2560 px, telefon 360–430 px, iPad): 0 — statik HTML va gidratsiyadan
  keyingi holat balandligi bir xil.
- Lighthouse 13 (lokal `npm run preview`, siqish yoqilgan; `/`, `/imkoniyatlar/`, `/narxlar/`, `/yuklab-olish/`) —
  desktop: Performance 99–100, Accessibility, Best Practices, SEO — 100. Mobil (sekin 4G + 4× CPU simulyatsiyasi):
  Performance 91–95, LCP 2.9–3.4 s, CLS 0; Accessibility, Best Practices, SEO — 100. Mobil LCP'ga asosan JavaScript
  (React, Next.js, Motion) ta'sir qiladi; ekrandan tashqaridagi bo'limlar `content-visibility: auto` bilan kechiktirib
  chiziladi.

## Litsenziyalar

Lug'at ma'lumotlari — Wiktionary (CC BY-SA), so'zlar talaffuzi — Wikimedia Commons mualliflari (footer'da ko'rsatilgan).
Shriftlar — SIL Open Font License (`src/app/fonts/*-OFL.txt`). Goethe-Zertifikat va telc — tegishli tashkilotlarning savdo
belgilari; DeutschUz ular bilan bog'liq emas.
