# Nemischa–O'zbekcha lug'at va o'quv ilovasi (ishchi nomi: DeutschUz)

> Bu fayl Claude Code uchun loyiha yo'riqnomasi. Har bir yangi sessiyada shu faylni o'qib, "Roadmap" bo'limidagi keyingi bajarilmagan vazifadan davom et.

## 1. Loyiha maqsadi

Germaniyaga o'qish, Ausbildung yoki ishga tayyorlanayotgan o'zbek yoshlari uchun nemis tilini **o'zbek tili orqali** o'rgatadigan zamonaviy mobil ilova:
- ishonchli nemischa–o'zbekcha lug'at (offline ishlaydi);
- so'z yodlash (spaced repetition), o'yinlar;
- o'zbekcha grammatika tushuntirishlari;
- AI yordamchi (so'z/gapni tushuntirish, misol gaplar).

Asosiy auditoriya: Goethe/telc A1–B2 imtihonlariga tayyorlanuvchilar.

**Platforma va biznes modeli:** faqat mobil ilova (iOS + Android), App Store va Google Play orqali tarqatiladi. Daromad — **obuna (freemium)**: lug'at va A1 bepul, A2–B2 dan tanishuv qismi bepul, qolgani va premium funksiyalar obuna bilan (9-bo'lim). Veb-versiya yo'q.

## 2. MVP doirasi (A1–B2)

- So'z bazasi: A1 → A2 → B1 (Goethe ro'yxatlari) → B2 (chastota asosida, 02b). 2026-09: 5 344 so'z, 7 327 ma'no, har birida misol gap.
- Kengaytirilgan lug'at (13): yana 59 960 so'z — qisqa tarjima, misolsiz, faqat qidiruv uchun (bepul).
- Har bir so'z uchun: artikl, ko'plik, fe'l shakllari, ma'nolar, o'zbekcha tarjima, misol gap (DE + UZ), daraja, chastota o'rni.
- Grammatika: A1–C1, 78 dars (7-bo'lim; o'quv reja `grammar/CURRICULUM.md`).
- O'qish matnlari (Matnlar): A1–C1, har darajada 30 ta; bosilgan so'z tarjimasi, tushunish savollari (`20_texts.py`).
- Obuna: 1, 3, 6 oylik va yillik reja (bepul sinovsiz), faqat do'kon ichidagi to'lov (9-bo'lim).
- C1–C2 MVP'dan keyin.

## 3. Texnologiyalar

| Qism | Texnologiya |
|---|---|
| Ma'lumotlar pipeline'i | Python 3.11+, `requests`, `pandas`, `pydantic` |
| Lug'at bazasi | SQLite (ilovaga tayyor fayl sifatida qo'shiladi) |
| Mobil ilova | Flutter (Android + iOS), `drift` yoki `sqflite` |
| Obuna | App Store / Google Play avtomatik yangilanadigan obuna, RevenueCat (`purchases_flutter`) |
| AI proksi | FastAPI (API kalitini ilovada saqlamaslik uchun, premium holatini server tomonda tekshiradi) |
| AI model | Konfiguratsiya orqali tanlanadi (Claude / Gemini) — `.env` da |
| Talaffuz | Ilova ichidagi yozilgan audio (`audioplayers`): so'zlar — Wikimedia Commons ona tilidagi yozuvlari, gaplar — Piper "Thorsten"; AI javoblari — proksidagi o'sha Thorsten (`/v1/tts`); qurilma TTS faqat zaxira va faqat nemischa ovoz bo'lsa |

## 4. Papkalar tuzilishi

```
deutschuz/
├── CLAUDE.md
├── requirements.txt
├── pytest.ini
├── .env.example
├── docs/
│   └── sources.md    # manbalar va litsenziyalar
├── data_pipeline/
│   ├── config.py
│   ├── 01_fetch_sources.py
│   ├── 02_build_level_lists.py
│   ├── 02b_frequency.py        # chastota (frequency_rank) va B2 ro'yxati
│   ├── 03_extract_entries.py
│   ├── 04_translate_ai.py
│   ├── 05_review_export.py
│   ├── 06_review_import.py
│   ├── 07_build_sqlite.py
│   ├── 08_build_grammar.py     # grammar/*.md -> app/assets/grammar/grammar.json
│   ├── 09_build_audio.py       # talaffuz: app/assets/audio/{words,sentences}/*.m4a
│   ├── 10_topics.py            # mavzular: data/topics/word_topics.csv (agentlar tasniflaydi)
│   ├── 11_images.py            # so'z rasmlari: agentlar chizgan SVG -> app/assets/images/words/
│   ├── 12_sprechen.py          # sprechen/*.json -> app/assets/sprechen/sprechen.json
│   ├── 16_audio_pack.py        # offline talaffuz paketi (60 ming so'z) -> data/packs/dist/ (Premium, serverdan)
│   ├── 13_extended.py          # kengaytirilgan lug'at (~60 ming so'z, qisqa tarjima) -> data/extended/
│   ├── 14_forms.py             # barcha tuslanish/turlanish shakllari -> data/forms/forms.tsv (qidiruv)
│   ├── 17_videos.py            # video darslar: YouTube katalog + Gemini karaoke subtitr -> app/assets/videos/
│   ├── 18_app_icon.py          # ilova ikonkasi: docs/brand/app_icon_source.png -> iOS/Android/Windows, ilova belgisi
│   ├── 19_cyrillic.py          # kirill alifbosi: o'zlashmalar, so'z turlari, aralash matnlar (agentlar), arb, test nusxalari
│   ├── 20_texts.py             # o'qish matnlari: texts/<daraja>/*.json -> app/assets/texts/texts.json (so'zlar lug'atga ulanadi)
│   ├── uzcyrl.py               # o'zbek lotin <-> kirill o'girish qoidalari (1956 imlosi) + o'zlashmalar lug'ati
│   ├── cyrillic.py             # kirill qarorlari (data/cyrillic/) + kontent fayllari uchun o'girgichlar
│   ├── prompts/translate_entry.md  # tarjima qoidalari (API va agent rejimi uchun bitta)
│   ├── prompts/agent_task.md       # API'siz rejim: sub-agent yo'riqnomasi
│   ├── schemas.py        # bosqichlar orasidagi shartnoma (pydantic)
│   ├── review.py         # 05/06 umumiy: ustunlar, qator ID, barmoq izi
│   ├── textnorm.py       # o'zbekcha imlo + qidiruv kaliti (Dart'da nusxasi bor)
│   ├── sql/dictionary_schema.sql   # dictionary.db sxemasi — yagona manba
│   └── tests/
├── shared/
│   └── search_key_cases.json   # Python va Dart normallashtirishi uchun umumiy test misollari
├── data/
│   ├── raw/          # yuklab olingan manbalar (gitignore)
│   ├── levels/       # a1/a2/b1/b2.csv, supplement.csv, unmatched.csv, frequency.csv,
│   │                 # exclude.csv, b2_exclude.csv (sababi bilan), overrides.csv (Wiktionary xatolari)
│   ├── fixtures/     # dev_entries.jsonl — ilovani ishlab chiqish uchun sinov to'plami (ai_draft)
│   ├── ids/          # word_ids.csv — barqaror so'z ID'lari (git'da, o'chirilmaydi!)
│   ├── cyrillic/     # kirill qarorlari: types.tsv, marks.jsonl, marks_fix.jsonl, acronyms.tsv (git'da)
│   ├── interim/      # oraliq fayllar; entries/translated/skipped/reviewed.jsonl va agent/ git'da
│   ├── review/       # o'qituvchi tekshiruvi uchun Excel (05)
│   └── output/       # dictionary.db
├── grammar/          # grammatika darslari (Markdown, format: grammar/README.md)
├── sprechen/         # AI bilan gapirish mashqlari (JSON, format: sprechen/README.md)
├── texts/            # o'qish matnlari (JSON, format: texts/README.md, reja: texts/PLAN.md)
├── ai_proxy/         # FastAPI; admin/ — admin panel (/admin)
└── app/              # Flutter ilova (8.1-bo'lim)
```

## 5. Ma'lumotlar pipeline'i

**Muhim tamoyil:** inglizcha faqat *yordamchi kontekst*. Tarjima nemischa so'z + aniq ma'no + misol gap asosida qilinadi. So'zni inglizcha orqali ko'r-ko'rona "ko'prik" qilib tarjima qilish TAQIQLANADI (Bank → bench/bank, Schloss → castle/lock kabi xatolar sababli).

Ishga tushirish: `.venv\Scripts\python data_pipeline\<skript>.py`, testlar: `.venv\Scripts\python -m pytest`.

### 01_fetch_sources.py
- kaikki.org dagi til bo'yicha fayl (`kaikki.org-dictionary-German.jsonl`) **deprecated** ([wiktextract#1178](https://github.com/tatuylonen/wiktextract/issues/1178)). Shuning uchun English Wiktionary'ning to'liq eksporti `https://kaikki.org/dictionary/raw-wiktextract-data.jsonl.gz` (~2.9 GB, 2026-09 holatiga) yuklab olinadi va `lang_code == "de"` bo'yicha filtrlanadi → `data/raw/de-wiktextract.jsonl.gz`.
- Diqqat: `kaikki.org/downloads/de/de-extract.jsonl.gz` — bu **nemischa Wiktionary** (de.wiktionary.org) eksporti, boshqa manba. Hozircha ishlatilmaydi.
- Kesh: tayyor fayl bo'lsa qayta yuklanmaydi; uzilgan yuklash davom ettiriladi (HTTP Range). `--refresh` — manba yangilangan bo'lsa qayta yuklash.
- `--sample-mb N` — to'liq yuklamasdan boshidagi N MB dan namuna (`data/raw/de-wiktextract.sample.jsonl`), 03 ni ishlab chiqish uchun.
- Ulanish uzilsa avtomatik davom etadi (20 martagacha urinish).
- Goethe A1/A2/B1 so'z ro'yxatlari (PDF) `data/raw/goethe/` ga yuklanadi (`--source goethe`).

### 02_build_level_lists.py
- `data/levels/a1.csv`, `a2.csv`, `b1.csv` — ustunlar: `lemma, pos, gender, level, source`.
- Daraja manbasi: Goethe-Zertifikat A1/A2/B1 so'z ro'yxatlari **faqat ma'lumotnoma sifatida** (matnini nusxalamaymiz), qo'shimcha ravishda nemis chastota ro'yxatlari.
- PDF'lardan faqat alifbo bo'limining bosh so'zlari olinadi (x-koordinata bo'yicha; misol gaplar olinmaydi). Mavzuli guruhlar (sonlar, hafta kunlari, oylar...) — qo'lda tuzilgan `data/levels/supplement.csv`.
- Faqat Avstriya/Shveytsariyada ishlatiladigan so'zlar (`(A)`, `(CH)`) olinmaydi.
- `pos`: artikl bo'lsa `noun`, fe'l shakllari bo'lsa `verb`, qolganlari Wiktionary orqali; bir nechta bo'lsa `adv|prep` (03 alohida yozuv qiladi).
- Wiktionary bilan moslash: `jed-` → `jeder`, `fertig sein` → `fertig`, `bekannt geben` → `bekanntgeben`; prefikslar (`Sonder-`, `un-`) olinmaydi. Topilmagan iboralar, qo'shma so'zlar va grammatik shakllar (`möchten`, `besser`) → `data/levels/unmatched.csv` (qo'lda ko'rish, ro'yxatda qoladi).
- Takroriy so'zlar eng past darajada qoladi.
- Mintaqa belgisi PDF'da faqat juftlikning bir qismida bo'lsa (der Abwart / die Abwartin (CH)) avtomatik filtr o'tkazib yuboradi — bunday so'zlar `data/levels/exclude.csv` da sababi bilan (Abwart, Billett, Coiffeur, Fleischhauer, Pensionist, Müesli, Tram).
- Artikllar (der, ein) va tartib sonlar (erste…zehnte) `supplement.csv` orqali A1 da.

### 02b_frequency.py
- Manbalar (`docs/sources.md`): FrequencyWords / OpenSubtitles 2018 (CC BY-SA 4.0, og'zaki nutq) + wikipedia-word-frequency dewiki (MIT, yozma nutq). Birlashtirilgan chastota — ikkalasining "million so'zga" chastotasining geometrik o'rtachasi.
- Shakl → lemma Wiktionary orqali ("ging" → gehen). A1–B1 dagi so'zga tegishli shakl faqat o'sha so'zga hisoblanadi ("hier" → hier, Hier emas). Qisqartmalar, jadval bo'laklari ("s", "en") hisobga olinmaydi.
- `data/levels/frequency.csv` (lemma, pos, rank) → 07 da `words.frequency_rank`.
- `data/levels/b2.csv`: A1–B1 da yo'q eng ko'p ishlatiladigan 2 000 lemma. Filtrlar: so'z turkumi, 03 ma'no filtri, otlashgan fe'l/sifat (das Gehen, der Erste; istisno `KEEP_NOUNS`: das Wissen...), fe'l sifatdoshlari (erwähnt), `b2_exclude.csv` (ismlar, inglizcha so'zlar, ot ko'pligidan yasalgan soxta fe'llar, 04 rad etganlar — har biri sababi bilan).
- Goethe B2 uchun ochiq ro'yxat yo'q — B2 rasmiy CEFR ro'yxati emas, chastota asosidagi tanlov.

### 03_extract_entries.py
Wiktionary JSONL dan daraja ro'yxatidagi har bir lemma uchun (`schemas.ExtractedEntry`):
- `pos`, `gender`, `plural`, `genitive`, `ipa`; fe'llar: `praesens_3sg`, `praeteritum`, `partizip2`, `auxiliary`, `separable`, `reflexive`; sifatlar: `komparativ`, `superlativ`;
- `senses[]` (8 tagacha): inglizcha gloss, foydali teglar (reflexive, colloquial...), nemischa misollar (inglizcha tarjimasi bilan);
- natija: `data/interim/entries.jsonl` (5 560 yozuv: A1 918, A2 663, B1 1 906, B2 2 073; 2026-09); muammolar: `data/interim/extract_report.csv`.
- Wiktionary'ning o'zidagi aniqlangan xatolar `data/levels/overrides.csv` (key, field, value, reason) bilan tuzatiladi: Schlaf ko'pligi yo'q, das Bund (dasta), übergehen (hat übergangen)... Topilmagan kalit — xato.

Qoidalar (testlar: `tests/test_extract_entries.py`, haqiqiy Wiktionary namunasi `tests/fixtures/`):
- Bir lemma bir nechta turkumda (essen/Essen, ab prep/adj) — alohida yozuvlar. Omonimlar (die Bank) — alohida, `homonym` raqami jins va ko'plik bo'yicha barqaror (1 = Banken, 2 = Bänke).
- Artikl: Goethe'dagisi ustun; "die" + Wiktionary "faqat ko'plik" → `pl` (die Großeltern). `m/n` — der/das Laptop.
- Ma'no filtri: eskirgan, mintaqaviy (Germaniyasiz), qo'pol, jargon ma'nolar olinmaydi. **Barcha ma'nolarda umumiy teglar sarlavha izohidan keladi va e'tiborga olinmaydi** (Herz: "(very rare) Herzes" → har bir ma'noda "rare").
- Maxsus holatlar: muqobil imlo (Disko → Disco ma'nolari, zanjir 2 qadamgacha: dies → dieses → dieser), sifatdan yasalgan otlar (der/die Angestellte → Angestellter, ko'plik "Angestellten"), faqat grammatik shakl (möchten → mögen), ayol shakli gloss'iga asosiy so'z ma'nosi qo'shiladi (Kollegin → "… Kollege (colleague …)").
- `form_of` yasalishlar uchun ham ishlatiladi — faqat grammatik teglar bo'lsa shakl (`wiktionary.py` → `is_inflection`).

### 04_translate_ai.py
- Claude (`CLAUDE_MODEL`, standart `claude-opus-5`, `AI_EFFORT`), tizim prompti `prompts/translate_entry.md` (keshlanadi), javob JSON sxema bilan cheklangan (`output_config.format`) + pydantic tekshiruvi (kirill harfi, bo'sh ma'no va h.k.); yaroqsiz javob sababi bilan 2 marta qayta so'raladi.
- AI daraja uchun kerakli ma'nolarni tanlaydi (odatda 1–2, ko'pi 4), har biriga tarjima, sinonim, izoh va bitta misol; keraksiz yozuvni `relevant: false` bilan rad etadi → `skipped.jsonl` (o'qituvchi ko'radi).
- Buyruqlar: `estimate` (API'siz narx), `run --sample 30` (sinxron pilot), `report` (haqiqiy xarajat va prognoz), `batch-submit --confirm` (Message Batches, 50% arzon), `batch-collect`.
- Rezyume (tayyorlar qayta yuborilmaydi), xarajat logi `translate_costs.csv`, xatolar `translate_failures.jsonl`. Refusal: sinxron rejimda server-side fallback (`fallbacks: "default"`), batch'da — sinxron qayta urinish.
- Natija: `data/interim/translated.jsonl`, har bir ma'no `review_status: "ai_draft"`.
- **Tartib (CLAUDE.md, 13-bo'lim):** avval 30 so'zlik pilot → natijani qo'lda ko'rish (va effort solishtirish) → narxni tasdiqlash → batch.

**API'siz (agent) rejim — xarajatsiz, 2026-09 dagi to'liq tarjima shu bilan qilingan:**
- `agent-prepare --chunk 40` → `data/interim/agent/tasks/<daraja>_<nnn>.jsonl` (entry_prompt bilan bir xil yozuv).
- Claude Code sub-agentlari (`Agent` vositasi) `prompts/agent_task.md` + `translate_entry.md` bo'yicha `agent/answers/<nom>.jsonl` yozadi va `agent-check <nom>` bilan tekshiradi (hech narsa yozmaydi — parallel agentlar uchun xavfsiz). Bitta agentga 3 vazifa (120 so'z), bir vaqtda ~13 agent.
- `agent-ingest` — API javobi bilan bir xil validatsiya (pydantic, kirill, o'zbekcha tarjimada ä/ö/ü/ß yo'q, misol DE ≠ UZ) → translated/skipped.jsonl; yaroqsizlar `agent/rejected.jsonl`. Faqat hamma agent tugagach ishga tushiring (aks holda yarim tayyor fayl kiradi); kerak bo'lsa translated/skipped.jsonl ni o'chirib, noldan qayta yig'ing — javoblar git'da.
- Daraja ro'yxatidan chiqarilgan kalitlar (02/03 qayta ishlanganda) jim o'tkazib yuboriladi.

### 05_review_export.py / 06_review_import.py
- Umumiy qism: `review.py` (ustunlar, qator ID, barmoq izi). Testlar: `tests/test_review.py`.
- `05 --level A1` → `data/review/review_a1_<sana>.xlsx` (`--format csv` ham bor). Har qator — bitta ma'no: ID (`Bank|noun|2#1`), daraja, so'z, artikl, shakllar, ma'no (EN), AI izohi (kulrang, faqat o'qish) + tarjima, sinonimlar (`;`), izoh, misol DE/UZ, holat (ro'yxatdan tanlanadi), o'qituvchi izohi. Qo'shimcha varaqlar: "AI rad etgan" (skipped.jsonl) va "Yo'riqnoma". Standart: faqat `ai_draft` ma'nolar (`--status all`).
- Holatlar: `ai_draft` → `approved` / `fixed` / `rejected`. Ma'nolar o'chirilmaydi (rad etilgani `rejected`), shuning uchun ID barqaror.
- `06 <fayl>... [--dry-run]` → `data/interim/reviewed.jsonl` (asos: reviewed.jsonl, bo'lmasa translated.jsonl; 04 dan yangi kelganlar ai_draft bo'lib qo'shiladi). Matn o'zgargan + `approved` → `fixed`; tahrir qilingan, lekin `ai_draft` qolgan → saqlanadi, ogohlantirish. Apostroflar normallashadi, kirill rad etiladi.
- Xavfsizlik: yashirin `fp` ustuni — eksportdan keyin boshqa fayl orqali o'zgargan ma'noni eski fayl bosib ketmaydi (ziddiyat). Bitta xato bo'lsa hech narsa yozilmaydi; qayta import xavfsiz. `review_comment` ilovaga chiqmaydi.
- Ilovaga faqat `approved` va `fixed` chiqadi (07). Istisno — loyiha egasi qarori bilan `07 --with-ai-drafts`
  (release baza, tekshirilmagan AI tarjimalari ham; soni `meta.ai_draft_senses` da).
- `05 --noted-only` → `review_priority_all_<sana>.xlsx`: AI o'zi shubhalangan (`ai_note`) 205 so'z — o'qituvchi
  birinchi shuni ko'radi.
- Ilovadagi "Tarjimada xato" xabarlari (so'z sahifasi → bepul, identifikatorsiz) proksida saqlanadi:
  `python -m ai_proxy.reports [--csv f.csv] [--done ID...]` — o'qituvchi uchun manba.

### 07_build_sqlite.py
- Kirish: `data/interim/reviewed.jsonl` (`schemas.Entry`). Faqat `approved`/`fixed` ma'nolar.
- Ilova bazasi (tekshiruvgacha): `--dev --save-ids --input data/interim/translated.jsonl --out app/assets/db/dictionary.db` (`ai_draft` ham kiradi, `meta.build_kind = dev`, ilovada "DEV" belgisi; `--save-ids` — testerlarning SRS progressi keyingi yig'ishda saqlanishi uchun ID'lar qayd etiladi). **Dev baza do'konga chiqmaydi.**
- Ilova testlari uchun kichik baza: `--dev --input data/fixtures/dev_entries.jsonl --extended data/fixtures/extended_entries.jsonl --out app/test/fixtures/dictionary.db`.
- `--strict-cyrillic` — kirill qarori yo'q matn bo'lsa yig'ish to'xtaydi (ilova bazasi doim shu bilan yig'iladi).
- `frequency_rank` — `data/levels/frequency.csv` dan.

### 13_extended.py (kengaytirilgan lug'at, 5b)
- Maqsad: foydalanuvchi lug'atda istalgan so'zni topsin — A1–B2 dan tashqari ~60 000 so'z, **bepul**, darajasiz
  (`words.level IS NULL`). O'quv qismi (SRS, o'yinlar, mavzular) ularni ko'rmaydi (`instr(:levels, level)`).
- `candidates` — 02b chastota funksiyalari (Wikipedia'ning barcha 2.9 mln shakli) → `data/extended/candidates.csv`;
  `extract` — 03 ning ajratish mantiqi (artikl, ko'plik, shakllar, omonimlar), shovqin filtri (joy nomidan
  yasalganlar, son birikmalari, muqobil imlo) → `data/interim/extended/entries.jsonl` (60 000, chastota tartibida).
- Agentlar (API'siz): `prepare --chunk 300` → `tasks/<nnn>.jsonl` (`{k, de, pos, en[]}`), `prompts/extended_task.md`
  bo'yicha `answers/<nnn>.jsonl` (`{k, m: [{s, uz}]}` yoki `{k, skip}`; 1–3 ma'no, 60 belgigacha), `check <nnn>`
  (kirill, ä/ö/ü/ß, takror, nemischa so'zning o'zi — rad), `ingest` → `data/extended/translations.jsonl` (git'da).
- 07 uni qo'shadi: `review_status = ai_draft`, misolsiz, release bazaga ham kiradi; ilovada "Lugʻat" belgisi va
  "qisqa AI tarjimasi, tekshirilmagan" izohi. Qidiruvda (daraja filtri "Hammasi") A1–B2 so'zlaridan keyin.

### 14_forms.py (shakllar bo'yicha qidiruv)
- Wiktionary `forms` jadvalidan har bir lug'at so'zi uchun barcha shakllar (ging, gingen, stehe auf, schönsten,
  Häusern) -> `data/forms/forms.tsv` (git'da). Kichraytma, eskirgan, sheva, ko'p so'zli qurilmalar (bin gegangen)
  olinmaydi; ajraladigan fe'l: "stehe auf" va "stehe". Omonimlar 03 dagi raqam bo'yicha. 2026-09: ~350 ming shakl.
- 07 ularni `word_forms` ga qo'shadi (baza +5 MB). Ilova: shakl bilan topilgan so'z qatorida "«ging» shakli".
- Kengaytirilgan so'zlar darajasi ilovada taxminiy: chastota o'rni ≤ 25 000 — C1, qolgani C2 (`extendedLevelLabel`).
- Talaffuz: kengaytirilgan so'zlar ovozi ilovaga sig'maydi (~400 MB), shuning uchun proksi `/v1/pronounce`
  (bepul, faqat so'z/qisqa ibora, IP limiti, Piper "Thorsten", keshlanadi) -> ilova diskida keshlanadi.

### 15_sound_fx.py
- O'yin javob ovozlari `app/assets/audio/fx/{correct,wrong}.m4a` (loyihada sintez qilinadi). Ilova: `GameFeedback`
  (ovoz + vibratsiya), Sozlamalar → "Ovoz va vibratsiya" (yoqish/o'chirish, `user.db` sozlamalari).

### 09_build_audio.py
- **So'zlar:** Wiktionary `sounds` → Wikimedia Commons'dagi ona tilida so'zlashuvchi yozuvi (Germaniya talaffuzi ustun, `De-at-`/`De-ch-` faqat boshqasi bo'lmasa) → `assets/audio/words/<word_id>.m4a`. Har bir fayl muallifi/litsenziyasi Commons API'dan → `data/audio/word_audio.csv` va ilovadagi `assets/audio/ATTRIBUTION.txt` (Litsenziyalar ekrani). Qamrov ≈100%.
- **Gaplar:** lug'at, grammatika misollari va Gapirish iboralari (`opening_de`, `phrases`) → Piper TTS, `de_DE-thorsten-high` (dataset CC0; model `data/raw/tts/`, git'ga kirmaydi) → `assets/audio/sentences/<audio_key>.m4a`; `audio_key = sha1(matn.strip())[:16]` — Dart'da `core/speech/audio_keys.dart` (umumiy misollar `shared/audio_key_cases.json`).
- Format: jimlik qirqiladi, loudnorm, mono 22 kHz AAC 32 kbps. Kesh `data/raw/audio_cache/` — qayta ishga tushirish faqat yangilarini qiladi. Wikimedia'ga hurmat: 2 parallel, pauza, 429 da kutish.
- Ilova: `AudioSpeechService` — avval asset (AssetManifest bo'yicha), bo'lmasa proksi `/v1/tts` (Thorsten, premium; diskda keshlanadi — AI javoblari), oxirida qurilma TTS'i — **faqat nemischa ovoz o'rnatilgan bo'lsa** (aks holda jim: inglizcha ovoz nemischani noto'g'ri o'qiydi). So'z tugmasi `speakWord(id, …)`, gaplar `speak(matn)`.

### 10_topics.py
- 20 ta mavzu `data/topics/topics.json` da (kalit, o'zbekcha nom, inglizcha tavsif — tartib ilovadagi tartib). Har bir so'zga 1–2 mavzu; `grammar` — funksional so'zlar, `general` — mavzusiz umumiy so'zlar.
- API'siz: `prepare --chunk 400` → `data/interim/topics/tasks/`, sub-agentlar `answers/<nnn>.jsonl` yozadi, `check <nnn>`, `ingest` → `data/topics/word_topics.csv` (git'da; kalit `lemma|pos|homonym`).
- 07 uni `topics`/`word_topics` jadvallariga yozadi. Ilova: Bosh sahifa → Mavzular (to'r, daraja filtri, "Kartochkalarga qo'shish" — ochiq darajalardagi so'zlar SRS'ga).

### 11_images.py (so'z rasmlari)
- Gemini bepul tarifida rasm yaratish yo'q (limit 0), Pollinations shartlari noaniq — shuning uchun rasmlarni
  Claude Code sub-agentlari **SVG kod** sifatida chizadi: mualliflik huquqi loyihada, offline, ~1–4 KB, bitta uslub.
- `prepare --levels A1,A2 --chunk 30` → `data/interim/images/tasks/`; agentlar `prompts/image_task.md` (uslub,
  palitra, odamlar, qachon `skip`) bo'yicha `answers/<nnn>.jsonl` yozadi; `check <nnn>` (xavfsiz SVG to'plami: matn,
  rasm, skript yo'q), `preview <nnn>` (Edge headless → PNG varaq, agent ko'z bilan tekshiradi), `ingest` →
  `app/assets/images/words/<id>.svg` + `data/images/word_images.csv`. Mavhum so'zlar rasmsiz qoladi.

### 12_sprechen.py (AI bilan gapirish)
- `sprechen/<daraja>.json` (format va mualliflik qoidasi: `sprechen/README.md`) → `app/assets/sprechen/sprechen.json`.
  Goethe/telc og'zaki qismlari formatida (Teil 1–3) va hayotiy vaziyatlar. Vaziyatlar bo'limlarga bo'lingan
  (`CATEGORIES`: intro, health, work, study, office, home, shopping, travel, opinion, free) — yangilari
  `sprechen/situations/<bo'lim>.json` da (har vazifada `level`), eskilari mavzudan bo'limga tushadi (`TOPIC_CATEGORY`).
  Imtihon qismlari: `sprechen/exams/<daraja>-<imtihon>.json` va har bir Teil tavsifi `sprechen/exam_parts.json`
  (format, davomiylik, maslahat — ilovada Teil kartasi). 2026-09-26: 277 vazifa — imtihon 92 (har daraja × Goethe/telc
  × har Teil — 4 tadan variant), vaziyatlar 185 (10 bo'lim, 16–20 tadan), `draft`.
- AI funksiyalari (AI tushuntir, Gapirish) birinchi ishlatilishida 18+ tasdiq so'raydi (`ai_age_gate.dart`,
  `user.db` sozlamasi `ai_age_confirmed`); "Yo'q" — AI yopiq, qolgan ilova ochiq.
- Proksi `/v1/speak`: ilova faqat `task_id` + suhbat tarixini yuboradi, AI yo'riqnomasi (`scenario_en`) serverda
  (proksini ixtiyoriy chat sifatida ishlatib bo'lmaydi). Javob JSON sxema bilan: keyingi gap (DE+UZ), oxirgi javobga
  tuzatish, oxirida mezonlar bo'yicha baho. Premium serverda, alohida kunlik limit `AI_SPEAK_DAILY_LIMIT` (80 javob).
  Talaffuz mezon bo'la olmaydi (AI faqat matnni ko'radi) — validator rad etadi.
- Ilova (2026-09-26 qayta loyiha; 2026-10-01 dan Bosh sahifa → Gapirish): "Gapirish" — daraja, "Bugungi mashq" (birinchi bajarilmagan, keyin eng past
  natijali), "Imtihonga tayyorgarlik" (Goethe/telc kartalari) va "Hayotiy mavzular" (10 bo'lim, progress halqasi);
  bo'lim sahifasi `/speak-set/<kalit>` (statistika, daraja filtri, qism/daraja bo'yicha guruhlar, "Yangi"/ball).
  Suhbatda: suhbatdosh roli, "Yordam" (`/v1/speak/hint` — 3 ta javob varianti DE+UZ + mashq iboralari, bosilsa
  javob maydoniga), "Tarjimani doim ko'rsatish" (user.db). Eski tavsif:
  mashqlar ro'yxati (daraja, Goethe/telc qismlari, vaziyatlar mavzu belgilari bilan),
  tanishtiruv (maqsad, imtihon formati, kartochkalar, iboralar TTS bilan), suhbat (mikrofon — qurilmaning nutqni
  tanishi `speech_to_text`, yoki yozish; tuzatishlar, tarjima), natija (ball, mezonlar, iboralar) → `user.db` `speak_results` (v3).

### 16_audio_pack.py (offline talaffuz, Premium)
- Kengaytirilgan lug'atdagi ~60 ming so'z ovozi ilovaga sig'maydi → alohida paket, Sozlamalar → Offline talaffuz'dan bir marta yuklanadi.
- `build [--workers 3]` → `data/packs/audio_ext/<word_id>.m4a` (09 qoidalari: Commons ona tili yozuvi ≈86%, qolgani Thorsten artikl bilan; AAC 24 kbps) + `audio_ext_sources.csv`. Kesh bilan, qayta ishga tushirish xavfsiz.
- `pack` → `data/packs/dist/audio-ext-v<N>-NN.zip` (~25 MB, siqilmagan; birinchisida `ATTRIBUTION.txt`) + `manifest.json` (version, files, bytes, chunks[name, bytes, sha256, files]). Yangi paket — `PACK_VERSION` ni oshiring (ilova "yangilanish bor" deydi).
- Server: `GET /v1/packs/<nom>` — faqat Premium, HTTP Range (uzilsa davomidan); papka `PACKS_DIR` (serverga `data/packs/dist/` ni ko'chiring). `data/packs/` git'ga kirmaydi.
- Ilova (`features/offline/`): bo'laklab yuklash, `.part` + Range bilan davom, SHA-256 tekshiruvi, ZIP oqim bilan ochiladi, `state.json`; to'xtatish/davom/o'chirish; mualliflar Litsenziyalar ekraniga qo'shiladi. `speakWord`: asset → offline paket → server → qurilma TTS.

### 17_videos.py (video darslar)
- Katalog `data/videos/catalog.json` (git'da): 4 daraja × 30 video. **A1 (2026-10-02, loyiha egasi talabi): bitta
  serialning qismlari emas** — 10 kanaldan 30 ta mustaqil dars (Hallo Deutschschule, Super Deutsch, Andrea Thionville,
  Trainer Deutsch, Goethe-Institut, Munich Supercrew va b.), mavzular o'rganish tartibida (tanishuv → alifbo va sonlar →
  vaqt → … → hikoya → A1 imtihoni), hammasi nemischa nutq, 1080p (Goethe — 720p), jami 155 daq. **A2 (2026-10-04, shu
  talab bilan):** 12 kanaldan 30 ta dars (Hallo Deutschschule, Super Deutsch, Goethe-Institut, Munich Supercrew, Daily
  Deutsch, Andrea Thionville, Benjamin, Deutsch1 va b.), tartib: tanishuv → Perfekt → uy → ovqat/xarid → sog'liq →
  transport → bank/pochta → ish → ergash gaplar, Präteritum → bayramlar → hikoya → A2 imtihoni; 259 daq. **B1
  (2026-10-10, shu talab bilan):** 14 kanaldan 30 ta dars (Benjamin, Hallo Deutschschule, Learn German — 5 tadan;
  Goethe-Institut 3; Daily Deutsch, DeutschLera — 2; Super Deutsch, Deutsch verstehen, Deutsch1, Dein Sprachcoach, lingoni,
  Munich Supercrew, Deutsch mit Tina, Rheinisches Bildungsinstitut — 1), tartib B1 grammatikasi bo'yicha: Präteritum →
  hikoya → Plusquamperfekt → ish (Ausbildung, rezyume) → obwohl/trotzdem → uy → nisbiy gaplar → sog'liq → Konjunktiv II
  → bank, idora → Passiv/werden → reklamatsiya → um…zu/damit → predlogli fe'llar → fikr bildirish → atrof-muhit →
  Genitiv → Berufsschule → Futur I → lassen → ikki qismli bog'lovchilar → hikoya, qo'shiq → B1 og'zaki imtihoni
  (taqdimot, reja tuzish, telc simulyatsiyasi); 292 daq. DW va Easy German A1–B1 da yo'q (subtitr matni ruxsati — 12-bo'lim).
  **B2 (2026-10-11, shu talab bilan):** 18 kanaldan 30 ta dars (Hallo Deutschschule 5, Lingster Academy 4, Benjamin 3;
  Deutsch mit Rieke, Deutsch1, Dinge Erklärt – Kurzgesagt — 2; Dein Sprachcoach, DeutschLera, Rocking German Grammar,
  Deutsch mit Marija, fröhlich Deutsch, Well German, MrWissen2go/Terra X, lingoni, Munich Supercrew, Daily Deutsch, Praxis
  Spezialverlag DaF, Rheinisches Bildungsinstitut — 1), tartib B2 grammatikasi bo'yicha: B2 sharhi → Passiv (holat
  passivi, o'rinbosarlar) → maqollar hikoyasi → Konjunktiv I → als ob → modal fe'llar taxmin ma'nosida → Futur II →
  fan (immunitet) → Partizipialattribute → nominal uslub → ish majlisi → shart gaplari → to'siq → sabab predloglari →
  Nomen-Verb-Verbindungen → tarix → nisbiy gaplar → modal yuklamalar → TeKaMoLo → be- fe'llar → otlashgan sifatlar →
  fan → qo'shiq → hikoya → B2 imtihoni (telc forum, Goethe Hören, og'zaki imtihon, telc simulyatsiyasi); 334 daq.
  Easy German va DW katalogda endi yo'q. Har biri: `level, youtube_id, title,
  channel, duration_sec, theme, topic_uz`. Tuzish: `search "<so'rov>"` (yt-dlp, faqat metama'lumot), `vet ID…`
  (nomzod sifati: nutq tili — `de-orig` avtomatik subtitr, bo'lmasa audio tili; ≥1080p, Goethe 720p; ≤15 daq;
  joylashtirish; `vet --catalog B1` — katalogdagi daraja), `check` (4×30, takror yo'q, oEmbed — joylashtirishga ruxsat).
  `transcribe --level B1,B2` — faqat shu darajalar, ko'rsatilgan tartibda (avval B1 ning hammasi, keyin B2).
  Katalogdan chiqqan videoning keshi o'chiriladi (git'da tarix bor).
- Video **yuklab olinmaydi**: ilova YouTube'ning rasmiy iframe pleyerini ishlatadi (`youtube_player_iframe`).
  Subtitrni Gemini YouTube havolasini ko'rib yozadi: `transcribe` → `data/videos/cache/<id>.json` (git'da) → `build` →
  `app/assets/videos/videos.json` (gap: `s, e, de, uz`, so'zlar vaqti uzunlikka mutanosib).
- Bepul tarif: har modelga kuniga 20 so'rov; faqat to'liq flash modellar navbat bilan (lite — vaqtlar siljiydi).
  Uzun video 2 daqiqalik bo'laklarda (`CLIP_SECONDS`) — vaqtlar aniq. Sifat nazorati: gaplar juda uzun yoki vaqt
  siljigan bo'lsa natija saqlanmaydi (ertaga qayta). Har kuni: `data/videos/daily.cmd` (log `daily.log`).
- Ilova (`features/videos`): Bosh sahifa → Videolar — daraja, mavzu filtri, ko'rilganlar progressi (`user.db`),
  dars sahifasi: pleyer, karaoke subtitr (bosilgan so'z — lug'atdan tarjima, `videoWordLookupProvider`), tarjima,
  oldingi/keyingi gap, sekin (0.75x), gapma-gap, to'liq matn. Bepul: A1 dan 3 ta (`Entitlement.previewVideos`).
  Windows/Linux'da pleyer yo'q — "YouTube'da ochish" va matn.

### 18_app_icon.py (ilova ikonkasi va belgisi)
- Ilova nomi **DeutschUz**, ikonka — loyiha egasi bergan rasm (2026-10-03): to'q ko'k fon, oq "D" va sariq-qizil "U".
  Manba `docs/brand/app_icon_source.png` (shaffof fonda tayyor squircle, soyasi bilan); natija `docs/brand/app_icon_1024.png`.
- Do'konlar burchaksiz va shaffofsiz kvadrat talab qiladi: squircle chetidagi yorug' 3D qirra (~110 px) va shaffof
  burchaklar o'rniga fonning silliq davomi (pull-push; belgi hisobga kirmaydi, aks holda chetlar kulrang bo'ladi).
- Chiqadi: iOS `AppIcon.appiconset` (Contents.json dagi barcha o'lchamlar, alfasiz) va `LaunchImage` (ochilish ekrani,
  112 pt); Android `ic_launcher` (oddiy), adaptiv (`ic_launcher_foreground` — ikonka 72 dp maydonning 92% ida, doira
  niqobiga sig'adi; fon rangi `values/ic_launcher_background.xml`), `ic_launcher_monochrome` (Android 13 mavzuli ikonka:
  faqat D va U), `drawable-*/launch_logo` (Android 12 dan oldingi ochilish ekrani); Windows `app_icon.ico` (git'ga
  kirmaydi); ilova ichidagi belgi `app/assets/brand/app_icon.png` → `AppLogo` (kirish ekrani, Bosh sahifa sarlavhasi).
- Rasm almashsa: manbani almashtirib, skriptni qayta ishga tushiring.

### 19_cyrillic.py (kirill alifbosi, 2026-10-03)
- Loyiha egasi talabi: ilova tili **Oʻzbekcha (lotin) / Ўзбекча (кирилл)** (rus tili — keyin). Kirillda butun ilova
  o'zgaradi: interfeys, lug'at (tarjima, misol, izoh, mavzular), grammatika, Gapirish, videolar, AI javoblari.
  **Nemischa matn doim lotinda qoladi** (der Tisch, «ist gefahren», Akkusativда).
- O'girish — faqat qoidalar (`uzcyrl.py`, 1956 imlosi): ruscha o'zlashmalar ruscha imlo bilan (компьютер, сентябрь —
  `data_pipeline/data/uz_cyrillic_loanwords.tsv`, UzTransliterator ro'yxati + agentlar; qo'shimcha oldidan ь tushadi:
  сентябрда), е/э (so'z boshida va unlidan keyin э), йў (yoʻl), ts + i + unli va so'z boshida → ц (информация, цемент),
  qisqartmalar katta harfda (AQSh → АҚШ, FHDYo → ФҲДЁ), IPA [..] o'girilmaydi. Begona so'z + o'zbekcha qo'shimcha:
  o'zak lotinda, qo'shimcha kirillda (YouTubeʼда, WGда, Präteritumда).
- Qaysi so'z lotinda qolishi — qarorlar (`data/cyrillic/`, git'da; `cyrillic.py`):
  `types.tsv` — nemis lug'atida ham bor so'z turi (uz / de / ctx), `marks.jsonl` — aralash matn bo'yicha lotinda
  qoladigan bo'laklar (agentlar ⟦…⟧ bilan belgilaydi), `marks_fix.jsonl` — qo'lda tuzatishlar (audit; ustun),
  `acronyms.tsv` — qisqartmalar (registrga bog'liq): lat (USB, SPD, SIM) yoki cyr (ДНК, БМТ, АҚШ).
- Agentlar (API'siz): `collect` → `prepare loan|types|marks` → `answers/*.jsonl` (`prompts/cyrillic_*.md`) → `check` →
  `ingest`; `stats` — "agent ko'rishi kerak: 0" bo'lishi shart. 2026-10-03: 91 525 matn, o'zlashma 727, so'z turi 2 159,
  aralash matn 7 059 (+ 47 qo'lda), qisqartma 96. 2026-10-06: grammatika B1–C1 (+44 dars) — `marks_041…063`, jami
  12 516 matn qarori. `prepare` yangi vazifalarni eski javoblardan keyingi raqamdan boshlaydi (javoblar git'da);
  `ingest` matni keyin tahrirlangan eski javoblarni o'tkazib yuboradi (yangi matn yangi vazifada belgilanadi).
- Yig'ish: `19 ui` (arb → `app_uz_Cyrl.arb`, ICU saqlanadi; keyin `flutter gen-l10n`), 08/12 `--strict-cyrillic`,
  17 `build`, 07 `--strict-cyrillic` → `*_cyrl.json` va baza v4 `*_cyrl` ustunlari; `19 fixtures` — test nusxalari.
  Yangi kontent qo'shilsa: `collect` → `stats` → (kerak bo'lsa) agentlar → yig'ish. Video mavzulari (2026-10-11)
  katalogdan, subtitri hali yo'q bo'lsa ham, aralash matn sifatida yig'iladi ("obwohl va trotzdem", "Teil 2" — lotinda);
  test `test_every_video_topic_in_the_catalog_has_a_decision` yangi katalogni qarorsiz qoldirmaydi.
- Ochiq imlo qarorlari (o'qituvchi): oy nomlarida ь (сентябрь), nemis ismlari rus odatida (Пауль), o'zlashmalarda э (мэрия);
  `19 report` — o'qituvchi uchun tasodifiy namuna (CSV).
- Ilova: `profile/application/app_language.dart` (`AppLanguage`, `user.db` sozlamasi `ui.language`, `main()` oldindan
  o'qiydi), Sozlamalar → Ilova tili va kirish ekranidagi Lotin/Кирилл; lug'at `DriftDictionaryRepository.withCyrillic`,
  kontent `loadLocalizedAsset` (kirill nusxasi bo'lmasa — lotin); til almashsa eslatma qayta rejalashtiriladi.
  AI: so'rovlarda `script` (latn/cyrl) — proksi javobni shu alifboda yozdiradi (explain keshi alifbo bo'yicha alohida).

### ai_proxy/admin (admin panel, 2026-10-04)
- Loyiha egasi talabi: Dukon platformasidagi admin panel kabi (`C:/Users/user/dokon_app/web/admin.html` uslubi).
  `https://<domen>/admin` — FastAPI'ning o'zi beradi (statik `admin/static/`: index.html, admin.css, admin.js, Lucide
  ikonkalari `build_icons.py`), API `/admin/api/*`. Faqat o'zbekcha (lotin), yorug'/qorong'i, telefon va kompyuter.
- Kirish: login + parol (scrypt) + **majburiy 2FA** (TOTP, Google/Microsoft Authenticator; QR — `segno`). Birinchi admin
  faqat terminaldan: `python -m ai_proxy.admin create <login>` (Docker: `docker compose exec ai-proxy ...`); keyingilari
  panelda (vaqtinchalik parol, birinchi kirishda almashtiriladi). Rollar: `owner` — hammasi, `teacher` — Xabarlar va
  Kontent. 5 xato urinish — 15 daqiqa qulf; cookie HttpOnly + SameSite=Strict; CSRF sarlavhasi + Origin; CSP (inline
  skript/style yo'q — o'lchamlar JS orqali); amallar jurnali (`audit`, 1 yil); ixtiyoriy `ADMIN_ALLOWED_IPS`.
- Bo'limlar: Umumiy (kunlik statistika grafiklari va jadvali, RevenueCat v2 ko'rsatkichlari — `REVENUECAT_PROJECT_ID`,
  `REVENUECAT_V2_SECRET_KEY`), Foydalanuvchilar (7 kunlik AI foydalanuvchilari; ID bo'yicha: obuna, limitlar,
  **Premium berish/bekor qilish** — RevenueCat v1 promotional, limitni tiklash), Premium (qo'lda berilganlar, tushum,
  CSV), Xabarlar ("Tarjimada xato" + lug'atdagi hozirgi tarjima), Kontent, Xatolar, Sozlamalar (o'chirgichlar:
  AI / bepul talaffuz / xabarlar; limitlar — `runtime.py`, bazada, `.env` dan ustun), Tizim (holat, AI testi,
  kesh, jurnal).
- Ma'lumot (proxy.db): `stats` — kunlik sonlar identifikatorsiz (400 kun; xotirada yig'ilib 15 s da yoziladi),
  `errors` — "ai_proxy" logidagi WARNING+ (`errors.py`), `settings`, `admins`, `admin_sessions`, `audit`, `grants`.
- Ilova: Profil → Sozlamalar → **Foydalanuvchi ID** (bosilsa nusxa) — qo'llab-quvvatlash shu ID bilan ishlaydi.
- Testlar: `ai_proxy/tests/test_admin.py` (25); brauzerda ko'rish — Playwright + Edge (`channel="msedge"`).
- Grafiklar (dataviz qoidalari): ustun ≤24px, 4px yumaloq uch, segmentlar orasida 2px, 1px to'r, ≥2 seriyada legenda,
  hover/focus tooltip, "Jadval" ko'rinishi; ranglar — mos yozuvlar palitrasi 1–4 o'rinlari (yorug'/qorong'i alohida,
  validator bilan tekshirilgan).

### 20_texts.py (o'qish matnlari, 2026-10-07)
- Loyiha egasi talabi: Bosh sahifa → **Matnlar** — darajalarga bo'lingan o'qish matnlari (A1–C1, har darajada 30 ta);
  notanish so'z bosilsa tarjimasi pastda chiqadi va o'qish davom etadi; har darajada birinchi 5 tasi bepul.
- Manba `texts/<daraja>/<nn>-<slug>.json` (format `texts/README.md`; reja — mavzu, tur, daraja grammatikasi —
  `texts/PLAN.md`). Matnlar o'zimizniki: Claude Code sub-agentlari yozadi (`prompts/text_task.md`), darslik yoki
  Goethe/telc namunasidan ko'chirilmaydi; `status: draft` — o'qituvchi ko'rigigacha.
- Tekshiruv (pydantic, bitta xato — hech narsa yozilmaydi): daraja chegaralari (so'zlar soni, gap uzunligi, savollar
  soni, A2 dan kamida bitta variantli va bitta richtig/falsch), lug'atda yo'q so'zlar ≤ 3, darajadagi so'zlar ulushi
  (A1/A2 ≥ 85%), o'zbekcha imlo (kirill rad etiladi), `names` dagi har bir nom matnda bor.
- So'zlar yig'ishda lug'atga ulanadi (`Lexicon`: `dictionary.db` `word_forms` + umlautli aniq shakl `forms.tsv` +
  `word_ids.csv`): ajraladigan fe'l bo'lak boshidan juftlanadi ("Füllen Sie … aus" → ausfüllen), olmoshlar, zum/im,
  egalik va hurmat shakllari (Ihnen, Ihre, gap o'rtasidagi Ihr) jadvallar bilan; gap boshida bosh harf otni bildirmaydi —
  daraja ro'yxatidagi so'z ustun ("Wenn" → wenn, kengaytirilgan lug'atdagi "das Wenn" emas), keyin olmosh kelsa — fe'l
  ("Schreiben Sie"); kontekst qoidalari: "Ja, …" — «ha», gap ichidagi ja — yuklama; jeden Tag / Jeder bezahlt;
  "trinken Sie lieber" — gern; "zwei Jahre lang" — davomida; "Hier, bitte." — marhamat; "Herzlich willkommen!";
  qo'shimchasiz natürlich/wirklich/ganz — ravish; B1 (2026-10-11): sowohl … als auch — *als* «ham … ham», weder … noch
  — *noch* «na», beide + ot — «ikkala», sein siz selbstverständlich/persönlich/zusätzlich/unterschiedlich — ravish
  («albatta», «shaxsan»). Qolgan noaniqlik (einfach, sicher, gap boshidagi Ihr…) — gapdagi
  `hints` (`lemma|pos|n`). Natija: har gapda `w: [[boshi, oxiri, word_id|null]]` — ilova so'zni ID bo'yicha ochadi.
- Buyruqlar: `--only <fayl> --show` (agentlar: har so'z qaysi lug'at so'ziga ulangani), `--check` (hammasi + qamrov),
  `--strict-cyrillic` (ilova fayli doim shu bilan; `texts_cyrl.json` — faqat o'zbekcha maydonlar, `cyrillic.map_texts`;
  19 `collect` matnlarni ham oladi), testlar uchun `--strict-cyrillic --out app/test/fixtures/texts.json`.
  Lug'at qayta yig'ilsa (07) — 20 ham qayta ishga tushiriladi.
- Ilova (`features/texts`): ro'yxat (daraja segmenti, o'qilganlar progressi, qulf), o'qish sahifasi — so'z bosilsa
  `WordPeek` (videolar bilan umumiy, `wordLookupProvider`), "Siz bosgan soʻzlar" va kartochkalarga qo'shish, gap
  tarjimasi va tinglash, savollar va natija (`user.db` sozlamasi `texts.results` — eng yaxshi foiz).
  Bepul: har darajada birinchi 5 ta (`Entitlement.previewTexts`).

### 08_build_grammar.py
- `grammar/<daraja>/<nn>-<slug>.md` (format: `grammar/README.md`) → `app/assets/grammar/grammar.json`. Tekshiruv: frontmatter, bo'limlar tartibi, ≥5 misol, aynan 10 mashq, ≥2 tipik xato, o'zbekcha imlo (normallashtiriladi, kirill rad etiladi), HTML/havola yo'q. Bitta xato — hech narsa yozilmaydi.
- `--only <fayl>` — bitta darsni tekshirish (parallel yozayotgan agentlar uchun), `--check` — hammasini.
- Ilova testlari uchun: `--out app/test/fixtures/grammar.json`.
- `PRAGMA user_version = SCHEMA_VERSION` (drift migratsiya qilmasligi uchun) va yonida `dictionary.db.version` (sha256) — ilova bazani faqat o'zgarganda qayta ko'chiradi.
- So'z ID'lari `data/ids/word_ids.csv` da barqaror: kalit `lemma|pos|homonym` → ID. Foydalanuvchining SRS progressi shu ID'ga bog'langan — **ID hech qachon o'zgartirilmaydi va qayta ishlatilmaydi.**

## 6. Ma'lumotlar bazasi sxemasi

Yagona manba: `data_pipeline/sql/dictionary_schema.sql` (SCHEMA_VERSION = 4; `level` CHECK: A1, A2, B1, B2 yoki NULL — kengaytirilgan lug'at). Ilovadagi nusxa: `app/lib/src/features/dictionary/data/dictionary.drift` — ikkalasi aynan mos bo'lishi shart. Drift so'rovlarni build vaqtida tekshiradi, `dictionary_repository_test.dart` esa haqiqiy bazada ishlatib ko'radi.

- `meta` — schema_version, build_kind (release/dev), built_at, word_count, attribution.
- `words` — id, lemma, pos, gender (m/f/n/m/f/pl), plural, level, frequency_rank, forms_json (`{"verb": {...}, "adj": {...}, "genitive": ...}`), ipa, lemma_search.
- `senses` — word_id, sense_order, gloss_en, translation_uz, alt_uz, usage_note_uz, review_status (+ v4: `*_cyrl`
  kirill nusxalari — translation_uz_cyrl, alt_uz_cyrl, usage_note_uz_cyrl).
- `examples` — sense_id, de, uz, uz_cyrl (v4).
- `word_forms` — form_search → word_id (lemma va barcha shakllar: "fährt" → fahren). DE prefiks qidiruv.
- `search_uz` (FTS5) — rowid = words.id, terms = tarjimalarning qidiruv kaliti. UZ qidiruv.
- `topics` (topic_key, name_uz, name_uz_cyrl, sort_order) va `word_topics` (topic_key, word_id) — mavzuli to'plamlar (v2).

Qidiruv kaliti (`textnorm.search_key` = Dart `searchKey`): kichik harf, ä→a, ß→ss, apostrof variantlari olib tashlanadi, kirill → lotin. Shuning uchun "fahrt", "strasse", "kocha", "кўча" ham topiladi.

Premium qulflari bazada alohida ustun talab qilmaydi: ilova `words.level` bo'yicha qaror qiladi (9-bo'lim).

## 7. Grammatika mavzulari (A1–C1, 78 dars)

Har bir dars `grammar/<daraja>/<nn>-<mavzu>.md`: o'zbekcha tushuntirish, jadval, 5+ misol (DE+UZ; B2/C1 da 10–12), 10 ta mashq, tipik xatolar. Aniq format va qoidalar: `grammar/README.md`; tekshiruv va yig'ish: `08_build_grammar.py`. Ilovada: Grammatika tabi (daraja segmenti faqat darsi bor darajalar: A1 … C1; qoida, jadvallar, TTS bilan misollar, javob yozib tekshiriladigan mashqlar; `draft` darslar "Tekshirilmagan" belgisi bilan).

**O'quv reja — `grammar/CURRICULUM.md`** (2026-10-04, loyiha egasi talabi: "ishonchli kitoblardan" to'liq grammatika): har bir dars
qamrab olishi shart bo'lgan bandlar. Mavzular Profile deutsch, Goethe/telc B1–C1 imtihon talablari, BAMF Rahmencurriculum,
Dreyer–Schmitt, «Grammatik aktiv», «Aspekte neu», «Sicher!», Duden'ga tayanadi — **kitob matni, jadvali va mashqlari
nusxalanmaydi** (`docs/sources.md`). Darslarni Claude Code sub-agentlari yozadi (`prompts/grammar_lesson.md`), boshqa agent
mustaqil tekshiradi (`prompts/grammar_review.md`, hisobotlar `docs/content-review/grammar-*.md`). Ilovada `GrammarLevel`
(A1–C1) lug'at darajasidan (`Level`, A1–B2) alohida; C1 darsi faqat Premium.

- **A1 (14):** alifbo va talaffuz; shaxs olmoshlari; sein/haben; Präsens; artikl (der/die/das, ein/eine); Nominativ va Akkusativ; inkor (nicht/kein); so'roq gaplar (W-Fragen, Ja/Nein); so'z tartibi; modal fe'llar; ajraladigan fe'llar; egalik olmoshlari; buyruq mayli; vaqt va sana predloglari (am, um, im).
- **A2 (10):** Perfekt (haben/sein); Dativ; Dativ/Akkusativ predloglari; Wechselpräpositionen; qaytma fe'llar; sifat qo'shimchalari (asoslari); Komparativ va Superlativ; weil, dass, wenn ergash gaplari; Präteritum (sein, haben, modallar); zu + Infinitiv (asoslar).
- **B1 (20):** Präteritum (to'liq); Plusquamperfekt; Futur I; Passiv (Präsens, Präteritum); Konjunktiv II (würde, hätte, wäre, könnte); nisbiy gaplar; Genitiv; sifat qo'shimchalari (to'liq); bog'lovchilar (obwohl, damit, als/wenn, trotzdem, deshalb); ikki qismli bog'lovchilar; bilvosita savollar (ob, W-); vaqt ergash gaplari (während, seit, bis, sobald, solange); predlogli fe'llar va da-/wo-; um/ohne/statt … zu; n-deklinatsiya; lassen; Konjunktiv II o'tgan zamon; sabab-natija (da, denn, nämlich, sodass); noaniq olmoshlar; so'z yasalishi.
- **B2 (18):** Passiv barcha zamonlar va holat passivi; Passiv o'rinbosarlari; Konjunktiv I; als ob va bog'lovchisiz shart; modal fe'llarning taxmin ma'nosi; Futur II; Partizipialattribute; nominal uslub; shart va usul (falls, sofern, indem); qarama-qarshilik va to'siq; Genitiv predloglari; Funktionsverbgefüge; kengaytirilgan infinitiv; nisbiy gaplar (dessen, wer, was, wo-); modal yuklamalar; so'z tartibi (Mittelfeld, TeKaMoLo); prefiksli fe'llar; otlashgan sifatlar.
- **C1 (16):** nominal ↔ verbal uslub; sifatdosh oborotlari va appozitsiya; iqtibos (Konjunktiv I, laut, zufolge); Passivning nozik shakllari (bekommen-Passiv); taxmin va ehtimol; bog'lovchisiz shart, es sei denn; so … auch, mögen; Gerundiv; korrelatlar; Funktionsverbgefüge (aspekt); rasmiy predloglar (zwecks, mangels, kraft); modal yuklamalar (kengaytirilgan); Thema–Rhema va Nachfeld; so'z yasalishi (kengaytirilgan); matn bog'lanishi; zu … als dass, geschweige denn.

Grammatika matnlari AI yordamida qoralama qilinadi, lekin o'qituvchi tekshiruvidan o'tmaguncha `status: draft` bo'lib qoladi.

## 8. Ilova funksiyalari (MVP)

1. **Lug'at qidiruvi** — offline, DE→UZ va UZ→DE, artikl rang bilan (der = ko'k, die = qizil, das = yashil).
2. **So'z kartochkalari (SRS)** — FSRS yoki SM-2 algoritmi, kunlik limit, daraja bo'yicha to'plamlar.
   **Daraja bo'yicha yodlash (2026-10-01, loyiha egasi talabi):** Yodlash → A1–B2 kartasi → 20 so'zlik qismlar
   (o'yinlardagi qismlar bilan bir xil, osondan qiyinga — `learnPartsProvider`) → qism sahifasi (so'zlar ro'yxati): 1) kartochkalar
   ("Bildim" / "Yana ko'rsat"), 2) test (har so'zga savol, yo'nalish navbat bilan DE→UZ / UZ→DE; ≥80% — qism
   bajarildi, `learnPassPercent`). Testdan keyin qismdagi yangi so'zlar FSRS'ga qo'shiladi (to'g'ri — Good, xato — Again;
   `LearnRepository.introduceTested`), xatolar "Qiyin so'zlar"ga. Natijalar `game_parts` da `learn-study` / `learn-test`
   kalitlari bilan (o'yinlar statistikasiga kirmaydi). Bepul: A1 ning birinchi 5 qismi. Kunlik takrorlash (FSRS navbati)
   sahifa tepasida qoladi. Kod: `learn/{domain/learn_parts.dart, application/learn_parts_providers.dart,
   presentation/learn_level_screens.dart, presentation/learn_practice_screens.dart}`.
3. **der/die/das o'yini** — daraja → 20 so'zlik qismlar (**osondan qiyinga**, `orderByDifficulty`: baho = log(chastota
   o'rni) + 0,35 × uzunlik (z-baholar; 2026-10-02 da faqat-subtitr va faqat-chastota variantlari bilan solishtirilib
   tanlangan); o'rni yo'q so'z — shu uzunlikdagi so'zlar o'rtachasi; undovlar (danke, bitte, tschüss) — daraja boshidagi
   5% ga, sonlar (matnda raqam bilan yoziladi) — o'z tartibida 15–45% ga; bir so'zning boshqa turkumdagi takrori —
   daraja o'rtasidan keyin; bir qismda bir xil lemma yo'q; tarkib o'zgarsa eski natija izi bo'yicha ko'rsatilmaydi); har bir qism natijasi foizda (eng yaxshisi), o'ynalmagan — 0%; daraja foizi = qismlar o'rtachasi; seriya bonusi, xatolar SRS'ga.
4. **Tarjima o'yini** — xuddi shu qismlar tizimi (qismdagi har bir so'z — bitta savol), 4 variant (DE→UZ / UZ→DE), noto'g'ri variantlar butun darajadan va shu so'z turkumidan; hammasi bitta ekranga sig'adi. (Yozib javob berish — keyin.)
   Natijalar `user.db` → `game_parts` (v2 migratsiya); umumiy UI: `games/presentation/widgets/parts_hub.dart`, `part_result.dart`.
   Qism natijasida so'zlar izi (`signature`, v4) — lug'at yangilanib qism tarkibi o'zgarsa, eski foiz ko'rsatilmaydi.
   **Yana 3 o'yin (2026-10-01, shu qismlar tizimida):** "Yozib tarjima" (UZ → DE yoziladi, otlar artikl bilan;
   darajadagi bir xil tarjimali so'z ham qabul — `spelling_check.dart`), "So'z shakllari" (ot ko'pligi va fe'l
   Perfekt'i 4 variantdan; haben/sein ikkalasi bo'lgan fe'llar olinmaydi — `forms_quiz.dart`), "Tinglab tushunish"
   (gap eshittiriladi, 4 tarjimadan tanlanadi). Variantli o'yinlar umumiy `ChoiceGameController` / `ChoicePlayingView`.
   **"Qiyin soʻzlar":** o'yinlarda xato qilingan so'zlar (`word_mistakes`), mashqda to'g'ri javob hisobni kamaytiradi.
5. **Talaffuz** — TTS bilan tinglash.
6. **"AI tushuntir" tugmasi** — so'z yoki gapni o'zbekcha tushuntirish (proksi orqali, kunlik limit).
7. **Progress** — o'rganilgan so'zlar, streak, darajalar bo'yicha foiz; Kartochkalar sahifasida "Imtihonga tayyorlik"
   (so'z boyligi 40%, o'yinlar, grammatika, imtihon formatidagi gapirish — 20% dan; `learn/domain/readiness.dart`).
   Lug'atda sevimlilar (yulduzcha, bepul) va "Yaqinda ochilgan" (oxirgi 50 ta); grammatika darsi natijasi (foiz) ro'yxatda.
8. **Obuna** — paywall, xaridlarni tiklash, obunani boshqarish (9-bo'lim).
9. **Manbalar va litsenziyalar** ekrani (Wiktionary CC BY-SA atributsiyasi).
10. **O'qish matnlari** (Bosh sahifa → Matnlar) — darajalar bo'yicha, so'z bosilsa tarjima, savollar (5-bo'lim, `20_texts.py`).

### 8.1. Ilova arxitekturasi (`app/`)

- **Stek:** Flutter 3.47 / Dart 3.13, Riverpod 3 (holat), go_router 18 (5 tabli pastki panel, `StatefulShellRoute.indexedStack`), drift 2.35 + sqlite3 (lug'at va foydalanuvchi bazalari, FTS5), fsrs 2 (FSRS-6 takrorlash), purchases_flutter 10 (RevenueCat), url_launcher, flutter_tts, gen-l10n (interfeys matnlari `lib/l10n/app_uz.arb` da — kodda matn yozilmaydi).
- **Tuzilma:** `lib/src/core/` (design, router, speech, text) va `lib/src/features/<feature>/{domain,data,application,presentation}`. UI faqat `domain` modellarini ko'radi. Repozitoriy interfeysi: `DictionaryRepository`, amalga oshirishlar: `DriftDictionaryRepository` (ilova), `InMemoryDictionaryRepository` (testlar va rasmlar; ikkalasi bir xil natija berishi test bilan tekshiriladi).
- **Lug'at bazasi:** faqat o'qish uchun, `assets/db/` dan diskka ko'chiriladi (faqat `.version` o'zgarganda). Foydalanuvchi ma'lumotlari (SRS, progress) **alohida** bazada bo'ladi — lug'at yangilanganda progress yo'qolmaydi.
- **Navigatsiya (2026-10-01, loyiha egasi maketi — 15 ekran):** pastki panel 5 tab (`core/router/app_tab_shell.dart`):
  Bosh sahifa · Lug'at · Yodlash · Grammatika · Profil; har bir tabning o'z navigatori (holat saqlanadi).
  - Bosh sahifa (`features/home`): sarlavha (streak, profil avatari), qidiruv maydoni (→ `/dictionary?focus=1`;
    so'zlar soni taxminiy — «65 000+ soʻz ichidan qidiring», `approximateCount`, lug'at yangilansa ham matn barqaror),
    salomlashuv (ism bilan), "Kunlik maqsad" kartasi (bosilsa — sessiya), 8 bo'lim kartasi (yagona manba
    `homeSections`, qulf — `HomeLock.ai` → `aiAccessProvider`; 2 ustun, planshetda 4, tor ekranda katta shrift bilan 1),
    "Kun soʻzi", bepul foydalanuvchiga Premium qatori. Onboarding — `HomeScreen.initState` da.
  - Tab ichida push: O'yinlar, Mavzular, Gapirish, Videolar, Qiyin so'zlar (Bosh sahifa); Yutuqlar, Sevimlilar,
    Yuklab olinganlar (Profil). Pastki panel ustida (root navigator): sessiya, o'yinlar, AI yordamchi, Sozlamalar,
    onboarding, so'z sahifasi va boshqalar (`_fullscreen` / `_overTabs`).
  - Profil: ism (ixtiyoriy, `userNameProvider`), Premium kartasi, Mening yutuqlarim, Sevimlilar, Yuklab olinganlar,
    Sozlamalar (til, ko'rinish, eslatma, ovoz va vibratsiya, offline talaffuz, kesh, obuna, haqida), Qo'llab-quvvatlash (`SUPPORT_URL`).
  - Ko'rinish (2026-10-03): Avtomatik (telefon sozlamasi) / Yorug' / Qorong'i — `profile/application/appearance.dart`,
    `user.db` sozlamasi `ui.theme`; `main()` uni `runApp` dan oldin o'qiydi (boshqa rangda chaqnamaydi).
  - Ilova tili (2026-10-03): Oʻzbekcha (lotin) / Ўзбекча (кирилл) — `profile/application/app_language.dart`, `user.db`
    sozlamasi `ui.language`, interfeys `app_uz_Cyrl.arb` (`uz_Cyrl`), kontent va lug'at tilga qarab (19-bo'lim).
    Testlarda: `pumpAppAt(..., language: AppLanguage.uzCyrillic)`, `fixtureRepository(cyrillic: true)`.
  - AI yordamchi (`/assistant`, Premium): erkin savol-javob, faqat nemis tili mavzusida (proksi `/v1/assistant`,
    tizim prompti serverda, kunlik limit `AI_ASSISTANT_DAILY_LIMIT` = 40); suhbat faqat xotirada.
  - Barcha ichki sahifalar `AppPageScaffold` (`core/design/page_scaffold.dart`): orqaga chevroni, katta sarlavha
    skrollda ixcham bo'ladi (`largeTitle: false` — sahifaning o'z sarlavhasi bor), `trailing`, `bottomBar`.
- **Dizayn (2026-10-01, maket):** yorug' grouped fon, oq kartalar, ko'k brend rangi (`accent`: #1E6BF0, qorong'ida
  #4C8DFF); bo'limlar — pastel kartalar (`AppPalette.hue*`, fon `p.tint(hue)`); belgilar — CupertinoIcons (3D ikonkalar
  va gradient fon yo'q). Kirish ekrani — kod bilan chizilgan Brandenburg darvozasi va bayroq (`GateIllustration`).
  - Qattiq yuzalar: `AppCard` / `AppSurface` / `GroupedCard`. Shisha (`GlassSurface`) faqat Toast'da.
  - Qayta ishlatiladigan: `IconBadge`, `ListRow`, `FilterChips`, `CountBadge` (`core/design/list_items.dart`),
    `AppSegmented`, `PrimaryButton`, `CircleIconButton`, `NavBarIconButton`, `AppBackButton`, `Pill`.
  - Uzluksiz burchaklar (`RoundedSuperellipseBorder`), iOS tipografiya shkalasi (`AppTypography`) — ixcham variant (HIG dan ~10% kichik; loyiha egasi talabi).
  - Ranglar faqat `context.palette` orqali (yorug'/qorong'i rejim; istisno — Germaniya bayrog'i ranglari). Artikl
    ranglari: der ko'k, die qizil, das yashil, ko'plik to'q sariq.
  - Bosish maydoni kamida 44pt, `Semantics` belgilari, haptik javob, ikkala platformada iOS xatti-harakati.
  - Katta shrift (Dynamic Type): matnli qatorlar `Wrap`, `Flexible` yoki `FittedBox(scaleDown)` bilan, qat'iy balandlik
    o'rniga `minHeight` — hech qayerda overflow bo'lmasin (testlardagi keng test shrifti buni ushlaydi).
  - Xabarlar: qisqa tasdiq — `Toast.show` (root overlay, modal va to'liq ekranli sahifalar ustida ham ko'rinadi); foydalanuvchi o'qishi shart bo'lgan holat (xato, kutilayotgan to'lov) — `showMessageAlert`. Material `SnackBar` ishlatilmaydi (tab bar yoki modal ostida qoladi). Haptik chaqiruv kutilmaydi (`unawaited`).
  - Kunlik eslatma matni: "Bugungi kunlik maqsadingiz: N ta soʻz" / "{ism}, keling, nemis tilini birga oʻrganamiz! 💪"
    (ilova har ochilganda qayta rejalashtiriladi — maqsad va ism yangilanadi).
- **Buyruqlar** (`app/` ichida):
  - `dart run build_runner build` — drift kodi;
  - `flutter gen-l10n` — matnlar;
  - `flutter analyze`, `flutter test`;
  - `flutter test test/screenshots --update-goldens` — ekran rasmlari (`test/screenshots/goldens/`). Dizayn o'zgarsa, rasmlarni ko'rib tekshiring.
- **iOS yig'ish** Windows'da mumkin emas: Mac yoki bulutli CI (Codemagic / GitHub Actions macOS) kerak.

## 9. Obuna va monetizatsiya

**Model:** freemium + avtomatik yangilanadigan obuna. Reklama yo'q (ta'lim ilovasi).

Bepul/premium chegarasi (loyiha egasi qarori, 2026-09-26; kodda — `paywall/application/entitlement.dart`):

| Funksiya | Bepul | Premium |
|---|---|---|
| Lug'at (qidiruv, so'z sahifasi, talaffuz) | **Hammasi bepul** (65 ming so'z) | — |
| O'yinlar | Faqat A1 ning ~10% i — birinchi 5 qism (`previewParts`); A2–B2 qulf | Hammasi |
| SRS kartochkalar | A1 ning birinchi 100 so'zi (`previewWords`), kuniga 10 ta | Hammasi |
| Grammatika | A1 dan 2 ta dars (`previewLessons`) | A1–C1 (78 dars) |
| O'qish matnlari | Har darajada birinchi 5 ta (`previewTexts`) | Hammasi (30 tadan) |
| Mavzular | Birinchi 2 mavzu, faqat A1 so'zlari (`previewTopics`) | Hammasi |
| "AI tushuntir", Gapirish | Yo'q | Kunlik limit bilan |

Bepul sinov **yo'q** (loyiha egasi qarori: sinovdan keyin sotib olish kamayadi) — kodda `_offerTrial = false`,
do'konda boshlang'ich taklif sozlanmaydi.

**Rejalar va narxlar (loyiha egasi tasdiqlagan, 2026-09-25):**

| Reja | Mahsulot / RevenueCat paketi | Narx (USD, asos) | ≈ so'm | Oyiga | Tejash |
|---|---|---|---|---|---|
| 1 oy | `premium_monthly` / `$rc_monthly` | $4.99 | ≈ 59 000 | $4.99 (≈ 59 000) | — |
| 3 oy | `premium_3months` / `$rc_three_month` | $11.99 | ≈ 142 000 | $4.00 (≈ 47 000) | ~20% |
| 6 oy | `premium_6months` / `$rc_six_month` | $19.99 | ≈ 236 000 | $3.33 (≈ 39 400) | ~33% |
| 1 yil | `premium_yearly` / `$rc_annual` | $29.99 | ≈ 355 000 | $2.50 (≈ 29 500) | ~50% |

So'm — Markaziy bank kursi bo'yicha (2026-09-30: 1 USD = 11 821 so'm), minggacha yaxlitlangan. Do'konlar O'zbekistonda
**AQSh dollarida** hisoblaydi, shuning uchun so'm faqat taxminiy ma'lumot: paywall'da to'lanadigan narx (do'kon
valyutasi) eng yirik, ostida kichik "≈ 59 000 soʻm" (Guideline 3.1.2) va izoh "toʻlov dollarda, aniq summani bank
belgilaydi". Kurs ilovada kuniga bir marta `cbu.uz` ochiq JSON'idan olinadi va `user.db` da saqlanadi (offline —
oxirgi kurs, umuman bo'lmasa 11 821; `paywall/application/uzs_rate.dart`). Faqat valyutasi USD bo'lgan narxga so'm
qo'shiladi.

Paywall (maket, 14-ekran): rejalar qisqasidan uzunigacha (1 → 3 → 6 oy → 1 yil), 6 oy — "Eng mashhur" va standart
tanlov (`featuredPeriod`), tejash belgilari kartaning yuqori chetida. Narxlar do'kon konsolida qo'yiladi (boshqa
mamlakatlar uchun do'kon avtomatik hisoblaydi). Ilova narxni kodda saqlamaydi — do'kon qaytargan narx va tejash foizi
(oylik rejaga nisbatan, pastga yaxlitlanadi: 3 oy — 19%) ko'rsatiladi.

**Texnik yechim:**
- RevenueCat (`purchases_flutter`): ikkala do'kon uchun bitta API, chek validatsiyasi, `premium` entitlement, webhook'lar. (Muqobil: rasmiy `in_app_purchase` + o'z serverimizda chek tekshiruvi — ko'proq ish va xavf.)
- MVP'da login yo'q: RevenueCat anonim ID + "Xaridlarni tiklash" tugmasi. Qurilmalar orasida progress sinxronizatsiyasi — MVP'dan keyin.
- Lug'at bazasi to'liq offline; qulflar ilova darajasida, entitlement bo'yicha. Premium holati SDK keshida saqlanadi, offline ham ishlaydi.
- AI proksi premium holatini **server tomonda** RevenueCat REST API orqali tekshiradi; klientdagi "premium" belgisiga ishonilmaydi.

**Ilovadagi amalga oshirish (`app/lib/src/features/paywall/`):**
- `SubscriptionService` interfeysi → `RevenueCatSubscriptionService` (ilova) va `UnavailableSubscriptionService` (kalit yo'q). `main()` xizmatni yaratib `subscriptionServiceProvider` ga beradi; `EntitlementController` SDK hodisalarini kuzatadi.
- Kalitlar build paytida beriladi (faqat **public** SDK kalitlari): `app/config/dart_defines.example.json` ni `dart_defines.json` ga nusxalab to'ldiring (u git'ga kirmaydi), keyin
  `flutter build ipa --dart-define-from-file=config/dart_defines.json` /
  `flutter build appbundle --dart-define-from-file=config/dart_defines.json`.
  Kalitlar: `RC_APPLE_API_KEY`, `RC_GOOGLE_API_KEY`, `PRIVACY_URL`, `TERMS_URL` (berilmasa iOS'da Apple standart EULA, Android'da havola yo'q). Kalitsiz yig'ilsa, paywall "to'lov tizimi ulanmagan" deydi va hech narsa sotilmaydi.
  Sinov uchun `--dart-define=DEV_PREMIUM=true` — ilova Premium'dagidek ochiq boshlanadi (faqat debug yoki
  `DEV_TOOLS=true` yig'ishida ishlaydi; Sozlamalar → Dasturchi'dan o'chiriladi). Do'kon yig'ishiga qo'shilmaydi.
- RevenueCat dashboard: entitlement `premium`; joriy (current) offering'da `$rc_annual` → `premium_yearly`, `$rc_six_month` → `premium_6months`, `$rc_three_month` → `premium_3months`, `$rc_monthly` → `premium_monthly` paketlari. Paywall faqat shu to'rt paketni (bor bo'lganlarini) ko'rsatadi: qisqasidan uzunigacha, 6 oylik tanlangan.
- Bepul sinov faqat bepul boshlang'ich taklif bo'lsa ko'rsatiladi; iOS'da foydalanuvchi huquqi (`checkTrialOrIntroductoryPriceEligibility`) tekshiriladi — sinovdan foydalanganlarga "bepul" deb yozilmaydi.
- Natijalar: muvaffaqiyat → toast va oyna yopiladi; bekor qilish → jim; kutilmoqda (Ask to Buy, bank) → alert, xato hisoblanmaydi; tiklashda obuna topilmasa → qaysi akkauntni tekshirishni aytadigan alert.

**Do'kon talablari (nashrdan oldin tekshiruv ro'yxati):**
- Raqamli kontent faqat do'kon to'lovi orqali sotiladi (Apple App Review 3.1.1, Google Play Billing siyosati). Ilovada Click/Payme kabi tashqi to'lovga havola yoki ishora YO'Q.
- Paywall'da: narx, davr, avtomatik yangilanish sharti, sinov tugagach narx, Maxfiylik siyosati va Foydalanish shartlari (EULA) havolalari, "Xaridlarni tiklash". ✅ Kodda bor; to'lanadigan narx eng ko'zga tashlanadigan narx (Guideline 3.1.2), harakat tugmasi va shartlar pastda doim ko'rinadi. ⚠️ Maxfiylik siyosati havolasi faqat `PRIVACY_URL` berilganda chiqadi — nashr uchun majburiy.
- Sozlamalarda obunani boshqarish havolasi. ✅ Sozlamalar (sobiq Profil) → Obuna (do'kon sahifasi; RevenueCat `managementURL` yoki do'konning obunalar sahifasi) va "Xaridlarni tiklash".
- iOS: Xcode'da **In-App Purchase** capability (Mac kerak). Android: `BILLING` ruxsati Play Billing kutubxonasidan avtomatik qo'shiladi; `MainActivity` `launchMode="singleTop"` (bank ilovasida tasdiqlashda xarid uzilmasligi uchun `singleTask` ishlatilmaydi).
- Maxfiylik siyosati URL, Google Play "Data safety" va Apple "App Privacy" formalari.
- Google Play: yangi **shaxsiy** developer hisobida production'dan oldin yopiq test (12+ tester, 14 kun) talab qilinadi. Buni rejaga kirit yoki tashkilot hisobi (D-U-N-S raqami bilan) och.

**AI provayder (nashrdan oldin qaror kerak, 2026-09 da Gemini API shartlari tekshirildi):**
- Gemini **bepul tarifi ishlab chiqarishga yaramaydi**: (1) bepul tarifdagi so'rov/javoblar Google mahsulotlarini
  yaxshilashga ishlatiladi va odamlar o'qishi mumkin; (2) bepul tarifni EEA, Shveytsariya, UK foydalanuvchilariga
  berish taqiqlangan (bizning foydalanuvchilar Germaniyaga ketadi); (3) Gemini API 18 yoshdan kichiklar
  foydalanadigan ilovada ishlatilmasligi kerak.
- Variantlar: Gemini **pullik** tarif (billing yoqish; 1–3-bandlar hal bo'ladi, 3-band qoladi) yoki Claude API
  (`AI_PROXY_PROVIDER=claude`). Yosh bo'yicha: AI funksiyalarini 18+ tasdiq bilan ochish yoki ilovani 18+ deb belgilash.
- Maxfiylik siyosati (`deploy/site/privacy.html`) pullik tarif asosida yozilgan.

**Biznes tekshiruvlari:**
- Google Play: O'zbekiston merchant (pullik ilova/obuna) ro'yxatdan o'tishi uchun qo'llab-quvvatlanadi, to'lov valyutasi USD (2026-09 da tekshirildi).
- Apple: App Store O'zbekistonda mavjud. Paid Apps Agreement, bank va soliq ma'lumotlarini O'zbekistondan to'ldirish mumkinligini tekshirish kerak.
- Foydalanuvchi to'lovi: O'zbekistonda App Store va Google Play faqat bank kartasini qabul qiladi (Uzcard/Humo,
  operator balansi yo'q — 2026-10-02 da rasmiy sahifalarda tekshirildi).
- **Qaror (loyiha egasi, 2026-10-02):** nashrda faqat do'kon to'lovi (Visa/Mastercard). Payme/Click/Uzum — keyingi
  yangilanishda, **ilova tashqarisidagi sayt** orqali: Google tashqarida sotilgan obunadan ilovada foydalanishga
  ("consumption-only") va ilova tashqarisida boshqa narxni reklama qilishga ruxsat beradi, Apple — 3.1.3(b) (obuna
  ilova ichida ham sotilsa). Ilova ichida saytga/Payme'ga yo'naltirish **yo'q** (O'zbekiston Google user choice billing
  va Apple tashqi havola ruxsatlari ro'yxatida yo'q). Telegram bot ichida sotib bo'lmaydi — raqamli xizmat faqat Telegram
  Stars bilan. Reja: telefon bilan kirish → sayt (so'mda) → to'lov tizimi serverga xabar → RevenueCat promotional
  entitlement (1/3/6/12 oy). Telefon raqami — shaxsiy ma'lumot: qonunning 27-1-moddasi bo'yicha O'zbekistondagi serverda
  va davlat reyestrida saqlanadi. Egasi — YaTT.
- **Komissiya va soliq (2026-10-02):** Google — obunalar 15%, O'zbekistondagi YaTT uchun shu komissiyaga 12% QQS
  (sotuvning ~83% i qoladi); Apple — O'zbekiston sotuvidan avval 12% QQS ayriladi, keyin 15% (**Small Business Program**ga
  yozilish shart, aks holda birinchi yil 30%) → ~76%; RevenueCat — oyiga $2 500 tushumgacha bepul, keyin 1%.
  YaTT o'z soliqlari alohida (buxgalter).
- **Pul o'tkazish:** Google — har oy 15-sanadan, oldingi oy uchun, kamida $100 (kam bo'lsa keyingi oyga o'tadi), USD bank
  o'tkazmasi; Apple — fiskal oy tugagach 45 kun ichida, ro'yxatda yo'q davlatlar uchun kamida $40. YaTT nomiga **USD
  (valyuta) hisob raqami** + SWIFT rekvizitlari kerak; O'zbekiston banki App Store Connect'da qabul qilinishi u yerda
  tekshiriladi.

## 10. Sifat qoidalari

- **O'zbek imlosi:** lotin alifbosi, `oʻ` va `gʻ` uchun U+02BB (`ʻ`), tutuq belgisi uchun U+02BC (`ʼ`). Pipeline oxirida barcha variantlarni (`'`, `‘`, `` ` ``) shu standartga normallashtir.
- Otlar har doim artikl bilan ko'rsatiladi: `der Tisch, -e`.
- Fe'llar: `fahren, fährt, fuhr, ist gefahren`.
- Tarjima tabiiy va qisqa bo'lsin; kalka tarjimadan qoch.
- Misol gaplar so'z darajasidan qiyin bo'lmasin.
- Har bir AI yozuvida `review_status` majburiy.

## 11. Litsenziya

- Wiktionary ma'lumotlari: CC BY-SA. Ilovada va saytda manba ko'rsatiladi; Wiktionary'dan olingan ma'lumotlar bazasi shu litsenziya shartlariga rioya qiladi.
- **Pullik ilova va CC BY-SA:** tijoriy foydalanish ruxsat etilgan. Lekin ShareAlike sababli Wiktionary asosidagi lug'at ma'lumotlari va ularning moslashtirilgan versiyalari (ular asosida qilingan tarjimalar ham shunga kirishi mumkin) CC BY-SA ostida qoladi. Bu ma'lumotlarga eksklyuziv huquq da'vo qilib bo'lmaydi. Shuning uchun premium qiymat ilova tajribasida: SRS, o'yinlar, AI, o'zimizning grammatika darslari, o'qituvchi tekshiruvi sifati. Tavsiya: lug'at datasetini alohida ochiq (CC BY-SA) e'lon qilish. Nashrdan oldin yurist bilan maslahatlashish — **qaror kerak**.
- Litsenziyasi noaniq yoki tijoriy foydalanishni taqiqlovchi lug'atlardan (masalan, dict.cc ma'lumotlari) ma'lumot OLINMAYDI.
- Goethe so'z ro'yxatlari matni nusxalanmaydi, faqat daraja aniqlashda ma'lumotnoma.
- Yangi manba qo'shishdan oldin litsenziyasini `docs/sources.md` ga yoz.

## 12. Roadmap

### 1-bosqich: Pipeline asoslari
- [x] Loyiha tuzilmasi, `requirements.txt`, `.env.example`, `.gitignore`
- [x] `01_fetch_sources.py` — to'liq yuklandi: 371 261 ta nemischa yozuv (`data/raw/de-wiktextract.jsonl.gz`, 2026-09-20 eksporti) + Goethe PDF'lari
- [x] `02_build_level_lists.py` — A1: 773, A2: 588, B1: 1810 so'z; 68 tasi `data/levels/unmatched.csv` da qo'lda ko'rish uchun
- [x] Chastota ro'yxati — `02b_frequency.py`: OpenSubtitles (CC BY-SA) + Wikipedia (MIT), `frequency.csv` → `frequency_rank`; atributsiya ilovada va `docs/sources.md` da
- [x] B2 so'z ro'yxati — chastota asosida 2 000 lemma (`b2.csv`, istisnolar sababi bilan)
- [x] `03_extract_entries.py` + testlar — 3 484 yozuv, 7 243 ma'no, 3 519 misol; 25 ta so'z Wiktionary'da yo'q (extract_report.csv)
- [x] `schemas.py` (pydantic modellari) + `textnorm.py` (o'zbekcha imlo va qidiruv kaliti, Dart bilan umumiy testlar)

### 2-bosqich: AI tarjima
- [x] `prompts/translate_entry.md` (qoidalar + 3 ta namuna)
- [x] `04_translate_ai.py` — sinxron + Batch API, validatsiya, rezyume, xarajat logi (testlar: API'siz)
- [x] API'siz (agent) rejim: `agent-prepare / agent-check / agent-ingest`, `prompts/agent_task.md`; testlar
- [x] Pilot (a1_001, 40 so'z) qo'lda ko'rildi — sifat yaxshi, prompt o'zgarmadi
- [x] To'liq tarjima A1–B2: 5 344 so'z, 7 327 ma'no (har birida misol), 224 yozuv asosli rad etildi; 205 ta `ai_note` o'qituvchi uchun
- [ ] (ixtiyoriy) API rejimida ikkinchi fikr — `ANTHROPIC_API_KEY` bo'lsa, shubhali (`ai_note`li) yozuvlarni qayta ko'rish

### 3-bosqich: Tekshiruv va baza
- [x] `05_review_export.py`, `06_review_import.py` — Excel/CSV, holat ro'yxati, ziddiyat himoyasi, hammasi-yoki-hech-narsa import; testlar
- [ ] O'qituvchi A1 ni tekshiradi — fayllar tayyor: `data/review/review_{a1,a2,b1,b2}_2026-09-24.xlsx`
- [x] `07_build_sqlite.py` — sxema, barqaror ID, FTS5; dev baza `data/fixtures/dev_entries.jsonl` dan (release baza tekshiruvdan keyin)
- [ ] A2, B1, B2 uchun takrorlash
- [ ] Release baza: `07` (reviewed.jsonl dan, `--dev` siz) — faqat tekshirilgan ma'nolar

### 4-bosqich: Flutter ilova
- [x] Loyiha, arxitektura, dizayn tizimi (Liquid Glass), bazani assets'dan yuklash
- [x] Qidiruv ekrani (DE/UZ, shakllar, kirill) va so'z sahifasi; ekran rasmlari testlari
- [x] SRS kartochkalar — FSRS-6, kunlik navbat (takrorlash va yangi so'zlar teng aralash), streak, darajalar bo'yicha progress; progress alohida `user.db` da
- [x] der/die/das o'yini — 60 soniya, seriya bonusi, rekord, xatolarni takrorlashga qo'shish
- [x] Tarjima o'yini (4 variant, DE↔UZ) + testlar va ekran rasmlari
- [x] B2 darajasi ilovada (filtr, SRS to'plami, o'yinlar, premium qulfi)
- [x] Ilova bazasi — to'liq AI lug'at (5 344 so'z, DEV belgisi bilan); testlar uchun alohida `test/fixtures/dictionary.db`
- [x] Grammatika bo'limi: ro'yxat (darajalar, qulflar), dars sahifasi (jadvallar, TTS, interaktiv mashqlar); testlar
- [x] O'yinlar qismlar bo'yicha (20 so'z, foiz, daraja progressi), `game_parts` jadvali; ixcham dizayn (shrift, tab bar, tugmalar)
- [x] "AI tushuntir" — `ai_proxy/` (Gemini bepul tarifi, premium serverda, limit, kesh) + ilova oynasi; Gemini kaliti kerak (`.env`)
- [x] Diktant o'yini (eshitib yozish) va birinchi ochilishda daraja testi (onboarding)
- [x] Gapirish (Sprechen): 5-tab, AI imtihonchi/suhbatdosh (Goethe/telc formati + vaziyatlar, 56 vazifa), ovoz yoki yozish, tuzatish va baho; `/v1/speak`
- [x] So'z rasmlari A1–A2: 1 292 ta SVG (agentlar chizgan, 188 mavhum so'z rasmsiz), so'z sahifasi, kartochka orqasi, der/die/das o'yini
- [x] Kunlik eslatma: Profil → Eslatma (yoqish, vaqt), `flutter_local_notifications` (inexact, har kuni), ruxsat faqat yoqilganda so'raladi; Android desugaring va boot receiver
- [x] Gap tuzish o'yini: har so'zning misol gapi (3–9 bo'lak), aralash bo'laklardan yig'ish, xato joylar rangda, gap ovozi; qismlar tizimi
- [x] Mavzuli to'plamlar: 20 mavzu (`10_topics.py`), baza v2, Mavzular ekrani, SRS'ga qo'shish
- [x] Talaffuz: ona tilidagi yozuvlar (so'zlar, Commons) + Thorsten (gaplar), ilova ichida; TTS faqat zaxira
- [x] Obuna (kod): RevenueCat xizmati, paywall (do'kon narxlari, sinov sharti, tiklash, shartlar), Profil → obunani boshqarish va tiklash, daraja bo'yicha qulflar; testlar soxta do'kon bilan
- [ ] Obuna (sozlash) — qadamma-qadam qo'llanma `docs/payments.md`, tekshiruv `python -m ai_proxy.check_premium [id]`: RevenueCat loyihasi, `premium` entitlement, offering va do'kon mahsulotlari; `PRIVACY_URL`; sandbox'da haqiqiy xarid sinovi (TestFlight / Play internal testing)
- [x] "Manbalar va litsenziyalar" ekrani (LicenseRegistry)
- [x] Offline talaffuz (Premium): `16_audio_pack.py`, `/v1/packs`, Profil → Offline talaffuz (yuklash, davom, SHA-256, o'chirish); testlar va ekran rasmlari
- [x] Offline paket yig'ildi (2026-09-28): 59 950 ovoz — Commons 51 539 + Thorsten 8 411, 10 bo'lak, 266 MB;
  proksi orqali ilova kodi bilan to'liq yuklash sinovi o'tdi (SHA-256, Range, ATTRIBUTION)
- [ ] Offline paketni serverga joylash: `data/packs/dist/` → serverdagi `PACKS_DIR`
- [x] Gapirishda nemischa talaffuz: iboralar Thorsten audiosi bilan, AI javoblari proksi `/v1/tts` orqali, qurilmada nemischa ovoz bo'lmasa inglizcha ovoz ishlatilmaydi
- [x] Bepul qism: lug'at hamma uchun bepul; A2–B2 dan 5 qism (o'yinlar, kartochkalar) va 5 mavzu; paywall 4 reja (1/3/6/12 oy, tejash foizi)
- [x] Kengaytirilgan lug'at: 59 960 so'z (qisqa AI tarjimasi, bepul, darajasiz) — 13_extended.py, 200 vazifa agentlar bilan; ilova bazasi jami 65 304 so'z (24 MB). Haqoratli so'zlar "(haqoratli)" belgisi bilan — qoldirish/olib tashlash **qaror kerak**
- [x] Kengaytirilgan lug'at — ikkinchi AI o'tishi (Claude agentlari, `review-*`, prompts/extended_review.md): 1 583 tuzatish (~2.6%) — ruscha so'z/kalka, tushib qolgan asosiy ma'no (s=0), noto'g'ri o'simlik/hayvon nomlari, brendlar skip
- [ ] (ixtiyoriy) Mustaqil model (Gemini/GPT) bilan uchinchi fikr; o'simlik/qush nomlarini o'qituvchi tekshiruvi
- [x] 2026-09-26: bepul qism A1 ning ~10% i, sinovsiz; "tekshirilmagan" belgilari olib tashlandi; tarjima so'z ostida;
  kengaytirilgan so'zlarga C1/C2; javob ovozi + vibratsiya (sozlanadi); 60 ming so'z talaffuzi serverdan (`/v1/pronounce`)
- [x] Gapirish: imtihon matritsasi to'liq (A1–B2 × Goethe/telc × Teil, 4 variant), Teil kartalari; jami 277 mashq
- [x] Gapirish qayta loyihasi: 10 bo'lim, 159 mashq, "Bugungi mashq", bo'lim sahifalari, "Yordam" (AI variantlari), tarjima rejimi, AI suhbatdosh yo'riqnomasi tabiiyroq
- [x] Bosh sahifa launcher uslubida (2026-09-28, `feature/home-launcher`): tab bar olib tashlandi, bo'limlar to'ri va
  papkalar, bugungi reja, Kun so'zi, qidiruv kapsulasi; barcha ichki sahifalar `AppPageScaffold`, shisha → qattiq yuzalar;
  Fluent Emoji 3D ikonkalar; testlar (Home: 15) va ekran rasmlari 50–58 (2026-10-01 da maket bo'yicha almashtirildi)
- [x] Video darslar (2026-09-28): katalog 120 video (4×30, oEmbed tekshirilgan), `17_videos.py` (Gemini, bo'laklab,
  sifat nazorati), ilovada Videolar bo'limi (karaoke, so'z → lug'at, gapma-gap, sekin), Sozlamalar — sarlavhadagi tugma
- [ ] **Nashrgacha shart — YouTube qoidasi** (Developer Policies): joylashtirilgan pleyerda tomosha uchun pul olish va
  videoni play'dan boshqa shartga bog'lash taqiqlangan, bizda esa videolar Premium ortida (`canOpenVideo`). Taklif: video
  hamma uchun ochiq, Premium — subtitr, tarjima, so'z tarjimasi, sekin/gapma-gap (egasi qarori kutilmoqda). Subtitr
  matnlari: Easy German (transkriptlarni a'zolarga sotadi) va DW videolari B2 katalogi qayta tuzilgach (2026-10-11)
  katalogda qolmadi — ruxsat masalasi yo'q.
- [ ] Video subtitrlarini to'liq yig'ish (`data/videos/daily.cmd`, Windows rejalashtiruvchisida "DeutschUz video
  subtitrlari" — har kuni 13:00, 2026-09-30 qo'shildi): 2026-10-02 holatiga 35/120 (A1 16 — yangi katalog, A2 7, B1 8,
  B2 4); kunlik vazifa hozircha faqat A1 (`transcribe --level A1`). Band model (503) endi o'tkazib yuboriladi; vaqtlari
  chalkash natija (>3%) saqlanmaydi, ilova fayli yig'ilishida vaqtlar tartibga keltiriladi (`monotonic`).
  2026-10-04: A1 30/30 tayyor; kunlik vazifa endi `--level A2` (yangi katalog).
  2026-10-06: A2 12/30 (B1 8, B2 4) — Gemini bepul kvotasi amalda har modelga ~1 so'rov/kunga tushdi; uzun video
  o'rtada to'xtasa bo'laklar endi `cache/partial/` da saqlanadi (oldin har kuni noldan boshlanardi). Qolgani: A2 90,
  B1 68, B2 88 so'rov — bepul kvotada haftalar; pullik Gemini kaliti bilan bir kunda
  2026-10-11: A2 27/30 (qolgani ~19 bo'lak), B1 katalogi yangilandi — 0/30 (165 bo'lak), B2 4/30. Kunlik vazifa
  ("DeutschUz video subtitrlari", har kuni 00:00) endi `--level A2,B1`: A2 tugagach o'zi B1 ga o'tadi. So'nggi
  kunlarda kvota kuniga ~50–60 bo'lakka yetdi — B1 taxminan 3–4 kun.
  2026-10-18: B1 17/30 (qolgani ~65 bo'lak), B2 yangi katalog — 0/30 (182 bo'lak); kunlik vazifa `--level A2,B1,B2`.
  12–17-oktabrda vazifa ishga tushib, 1–2 daqiqada to'xtatilgan (0xC000013A — oyna yopilgan yoki kompyuter o'chgan) —
  hech narsa saqlanmagan; qo'lda davom ettirildi. Gemini ʻ/ʼ o'rniga o'xshash belgilar (koɹpincha, taʹlim, oȢzimiz)
  va HTML kodlari (m&ouml;chte) yozgan — `fix_uz` / `html.unescape` endi tozalaydi, eski kesh tuzatildi (126 gap).
- [x] Dizayn maketi bo'yicha qayta loyiha (2026-10-01, 15 ekran): 5 tabli pastki panel, yangi Bosh sahifa (kunlik
  maqsad, 8 pastel karta), Lug'at (eng mos natija kartasi), so'z sahifasi, Yodlash (2 tugma: Noto'g'ri / To'g'ri),
  O'yinlar (toifa filtri), Grammatika (daraja segmenti), Mavzular, AI yordamchi (`/v1/assistant`), Profil (ism, yutuqlar,
  sevimlilar, yuklab olinganlar), Sozlamalar (kesh tozalash), Videolar, kirish ekrani (Brandenburg darvozasi, ism),
  paywall (rejalar 1→12 oy, 6 oy "Eng mashhur", narx USD + "≈ soʻm" Markaziy bank kursi bilan), eslatma matni;
  ko'k palitra, 3D ikonkalar olib tashlandi; testlar 392 (Flutter) + 267 (Python), ekran rasmlari yangilandi
- [x] Yodlash daraja bo'yicha (2026-10-01): A1–B2 → 20 so'zlik qismlar → kartochkalar → test (≥80%) → FSRS takrorlash;
  testlar (learn_parts_test: 7) va ekran rasmlari 78–83; qismlar osondan qiyinga (A1 1-qism: der, sein, haben, ich…;
  2-qism: bitte, danke, ja, nein, tschüss…; sonlar 3–18-qismlarda; oxirgisi: Postleitzahl, Kugelschreiber…), kunlik
  takrorlashning yangi so'zlari va bepul 100 so'z ham shu tartibda
- [x] Talaffuz osilib qolishi tuzatildi (2026-10-01): so'z rasmlari AssetManifest'ni oldin o'qisa, `SynchronousFuture.catchError`
  hech qachon tugamasdi — barcha ovozlar (Windows va telefonlarda) jim edi; regressiya testi va qurilmada tekshiruv
  `app/integration_test/audio_smoke_test.dart` (`flutter test integration_test/audio_smoke_test.dart -d <qurilma>`)
- [ ] Do'stlar va raqobatchilar bilan chat (premium) — backend, akkaunt, moderatsiya kerak (reja: 13-bo'lim muhokamasi)
- [ ] Do'kon sahifalari, skrinshotlar, Data safety / App Privacy — matnlar va anketa javoblari tayyor: `docs/store/`
- [x] Nashr oldi auditi va tuzatishlar (2026-09-29): proksi (RevenueCat 201, atomar kunlik limit `reserve/refund`,
  endpointlar bo'yicha alohida tezlik cheklovi, kesilgan javob keshlanmaydi, loglarda foydalanuvchi matni yo'q, TTS
  kesh chegarasi, `deploy/packs` ulanishi); ilova (bugungi reja vaqt bilan yangilanadi — `clockTickProvider`, bepul
  foydalanuvchida to'plam A1 ga tushadi, kartochkani ikki marta baholash himoyasi, paywall 2×2 rejalar va o'zbekcha
  xatolar, Gapirish qotib qolmaydi, nutq navbati/kesh, offline paket isolate + qayta urinish, Android zaxira qoidalari,
  telefonlarda faqat tik ekran, grammatika javoblari saqlanadi va yumshoq tekshiruv, o'yindan chiqishda tasdiq).
  Dasturchi bo'limi (Premium'ni yoqish) endi faqat debug yoki `--dart-define=DEV_TOOLS=true` da.
- [x] user.db v4 va o'quv kengaytmasi (2026-10-01): sevimlilar, tarix, "Qiyin soʻzlar" (ro'yxat + mashq), grammatika
  natijalari, imtihonga tayyorlik, 3 ta yangi o'yin (Yozib tarjima, So'z shakllari, Tinglab tushunish), o'yinlar papkasi
  8 element (3 ustun); testlar (367) va ekran rasmlari 64–72
- [x] Android release imzosi (2026-10-01): upload kaliti `app/android/app/upload-keystore.jks` + `key.properties`
  (git'ga kirmaydi — **zaxira nusxa shart**), versiya 1.0.0+1, imzolangan AAB yig'ildi (174,5 MB; gap audiolari 24 kbps)
- [x] CI: `.github/workflows/ci.yml` (pytest, flutter analyze/test — ekran rasmlarisiz), `ios-build.yml`
  (macOS, `flutter build ios --no-codesign`; qo'lda yoki iOS fayllari o'zgarganda)
- [x] iOS kompilyatsiyasi GitHub Actions macOS'da tekshirildi (2026-10-01, `ios-build.yml` — muvaffaqiyatli)
- [ ] iOS'ni imzo bilan yig'ish va TestFlight (Apple Developer hisobi kerak)
- [x] AI korrektura (2026-10-01, sub-agentlar): grammatika 34 dars — 10 tuzatish, Gapirish 277 vazifa — 41 tuzatish;
  `status: draft` saqlandi, hisobotlar va "Oʻqituvchi koʻrsin" bandlari: `docs/content-review/` (grammar-*, sprechen-*),
  (imtihon formati faktlari — davomiylik, telc B1/B2 qismlari — tekshirilishi kerak)
- [ ] Loyiha egasi ishlari tartib bilan: `docs/launch-checklist.md` (kalit zaxirasi, hisoblar, qarorlar, server, to'lov)
- [x] Nashr tayyorgarligi (2026-10-01): "Tarjimada xato" (ilova + `/v1/report` + `ai_proxy/reports.py`), AI 18+
  tasdig'i, `deploy/setup.sh` (VPS'da bitta buyruq), `07 --with-ai-drafts`, `05 --noted-only`, do'kon matnlari va
  maxfiylik anketasi yangilandi, haqoratli so'zlar ro'yxati qaror uchun `data/extended/offensive_review.csv`
- [x] Ko'rinish: Avtomatik / Yorug' / Qorong'i (2026-10-03, Sozlamalar)
- [x] Kirill alifbosi (2026-10-03, 19-bo'lim): butun ilova — interfeys (596 matn), lug'at (65 ming so'z, baza v4),
  grammatika, Gapirish, videolar, AI javoblari; agentlar qarori bilan nemischa matn lotinda; Sozlamalar → Ilova tili va
  kirish ekrani; testlar (Python 379, Flutter 429) va kirill ekran rasmlari 84–87
- [ ] Kirill imlosi — o'qituvchi ko'rigi (`19 report` namunasi; ochiq qarorlar 19-bo'limda)
- [x] Admin panel (2026-10-04, `ai_proxy/admin`): statistika, foydalanuvchilar, Premium berish (RevenueCat promotional),
  xabarlar, kontent, xatolar, limitlar va AI o'chirgichi, adminlar (2FA, rollar), tizim va jurnal; ilovada Foydalanuvchi ID
- [x] Video A2 katalogi qayta tuzildi (2026-10-04): A1 dagi talab — 12 kanal, 30 mustaqil dars, nemischa nutq, 1080p
- [x] Video B1 katalogi qayta tuzildi (2026-10-10): 14 kanal, 30 mustaqil dars B1 grammatikasi tartibida, nemischa nutq,
  ≥1080p (Goethe — 720p), 292 daq; `17_videos.py vet` (nomzod sifati) va `transcribe --level A2,B1` (daraja navbati)
- [x] Video B2 katalogi qayta tuzildi (2026-10-11): 18 kanal, 30 mustaqil dars B2 grammatikasi tartibida, nemischa
  nutq, ≥1080p, 334 daq; Easy German va DW o'rniga (`vet --catalog B2` — 30/30, `check` — OK)
- [x] O'qish matnlari (2026-10-07…08, `20_texts.py`): Bosh sahifa → Matnlar, A1 30 + A2 30 (sub-agentlar, `draft`),
  har so'z lug'atga ulangan (bosilsa tarjima), savollar va natija, kirill nusxasi, har darajada 5 ta bepul; lug'atga
  `du` (sen) va `Ihr` (sizning) qo'shildi; nav bar fon tuzatishi (`AppPageScaffold`); testlar va ekran rasmlari 88–91;
  so'z ulanishi auditi — 118 tuzatish (gap boshi, kontekst qoidalari, hints), hisobot `docs/content-review/texts-a2-21-30.md`
- [x] O'qish matnlari B1 (2026-10-11): 30 ta (sub-agentlar, `draft`), so'z ulanishi auditi — 7 xato qoida bilan
  tuzatildi (sowohl … als auch, weder … noch, beide, ravishlar), kirill nusxasi (taxalluslar, DAAD/DSH/IHK lotinda);
  hisobot va lug'at uchun takliflar `docs/content-review/texts-b1.md`; jami 90 matn
- [ ] O'qish matnlari B2, C1 — 30 tadan (reja `texts/PLAN.md` ga qo'shiladi); A1–B1 matnlari — o'qituvchi ko'rigi
- [x] Marketing sayti (2026-10-19, alohida papka `deutschUz_sayt/`, qo'llanma — uning `README.md`): Next.js 16 statik
  eksport + Tailwind 4 + Motion; 7 sahifa o'z manzili bilan (bosh sahifa, imkoniyatlar, qanday ishlaydi, darajalar,
  narxlar, savollar, yuklab olish), rasmiy logotip (egasi bergan rasm); ishlaydigan demolar (kartochkalar, der/die/das,
  o'qish matni — so'z bosilsa tarjima); yuklab olish — qurilma aniqlanadi, havola bo'lmasa «… sahifasi hali yoʻq»
  (kompyuter versiyasi yo'q); faqat shu fayldagi tasdiqlangan ma'lumot; matnlar `src/content/`. Do'kon havolalari,
  domen, maxfiylik/shartlar — build muhit o'zgaruvchilari (`APP_STORE_URL`, `GOOGLE_PLAY_URL` — faqat rasmiy do'kon
  domeni, aks holda build to'xtaydi; `SITE_URL`, `PRIVACY_URL`, `TERMS_URL`). axe 0 xato, CLS 0, Lighthouse desktop
  99–100, mobil 91–95
- [ ] Marketing sayti: ilova chiqqach do'kon havolalari va domen bilan qayta build, serverga joylash
- [ ] Rus tili (interfeys + tarjimalar) — loyiha egasi qarori bilan keyin
- [ ] Yopiq test: TestFlight va Google Play closed testing
- [ ] Nashr

### 5-bosqich: AI va grammatika
- [x] `ai_proxy/` (FastAPI, kunlik + daqiqalik limit, premium tekshiruvi RevenueCat orqali)
- [x] "AI tushuntir" va "Gapirish" funksiyalari
- [x] Deploy tayyor: `deploy/` (Dockerfile, docker-compose + Caddy HTTPS), qo'llanma `docs/deploy.md`
- [ ] Serverni ishga tushirish (VPS + domen — loyiha egasi), ilovada `AI_PROXY_URL`
- [x] A1 grammatika darslari — 14 ta (`grammar/a1/`, `status: draft`, o'qituvchi tekshiruvi kerak)
- [x] A2 (10) va B1 (10) grammatika darslari — jami 34 dars, `status: draft`
- [x] Grammatika A1–C1 to'liq (2026-10-06): o'quv reja `grammar/CURRICULUM.md` (ishonchli manbalar bo'yicha mavzular),
  B1 11–20, B2 01–18, C1 01–16 — jami 78 dars (sub-agentlar yozdi, boshqa agentlar mustaqil tekshirdi:
  `docs/content-review/grammar-*.md`); ilovada A1–C1 segmenti (`GrammarLevel`), C1 faqat Premium; testlar
- [ ] Grammatika B1–C1 — o'qituvchi ko'rigi ("Oʻqituvchi koʻrsin" bandlari hisobotlarda), keyin `status: reviewed`

### Parallel: biznes va do'kon hisoblari (loyiha egasi bajaradi, kod vazifalarini to'xtatmaydi)
- [ ] Apple Developer Program va Google Play Console hisoblari (shaxsiy yoki tashkilot — 9-bo'lim)
- [ ] Apple Paid Apps Agreement, bank va soliq ma'lumotlari; Google Play merchant hisobi
- [x] Ilova nomi — **DeutschUz** (2026-10-03, loyiha egasi qarori), ikonka — egasi bergan rasm (`18_app_icon.py`);
  bundle ID / applicationId `uz.deutschuz.deutschuz` (nashrdan keyin o'zgarmaydi)
- [x] Maxfiylik siyosati va Foydalanish shartlari — qoralama (`deploy/site/`, serverda `/privacy`, `/terms`); `[...]` joylarini to'ldirish va yurist ko'rigi kerak
- [ ] AI provayder: Gemini pullik tarif yoki Claude; yosh chegarasi (9-bo'lim) — **qaror kerak**
- [x] Narxlar va bepul/premium chegarasi — 2026-09-25 qaror (9-bo'lim): 1/3/6/12 oy, $4.99/$11.99/$19.99/$29.99; lug'at bepul, A2–B2 dan 5 qism va 5 mavzu bepul
- [ ] CC BY-SA strategiyasi bo'yicha qaror (yurist bilan)

## 13. Claude Code uchun ish qoidalari

- Kichik qadamlar bilan ishlash; har bir skriptdan keyin sinab ko'rish.
- AI tarjima skriptini hech qachon butun baza uchun darhol ishga tushirma — avval 20–50 ta so'zda sinov va xarajat hisobi. Loyiha egasi pullik API'siz ishlashni tanlagan: tarjima va kontent (grammatika) Claude Code sub-agentlari orqali (agent rejimi), pilot → sifat tekshiruvi → to'lqinlar bilan.
- Windows: heredoc ichidagi Python kodida `\n` buziladi — maxsus belgili kodni Write/Edit vositasi bilan yozing.
- API kalitlari faqat `.env` da, kodga yozilmaydi. Ilovaga maxfiy kalit (RevenueCat secret, AI kalitlari) qo'yilmaydi; ilovada faqat RevenueCat public SDK kalitlari.
- Pullik va xarajatli funksiyalar (AI) uchun premium tekshiruvi server tomonda; faqat klientga ishonilmaydi.
- Katta xom fayllar git'ga qo'shilmaydi.
- Vazifa bajarilganda shu fayldagi Roadmap'da belgilab qo'y.
