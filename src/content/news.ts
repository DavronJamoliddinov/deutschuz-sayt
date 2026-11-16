import { typo } from "@/lib/typography";

/**
 * Yangiliklar: Germaniyada o'qish va ishlash, nemis tili va imtihonlarga oid tekshirilgan xabarlar.
 *
 * Qoidalar (tahririyat siyosati — sahifada ham yozilgan):
 * - har bir raqam va da'vo manbadan: avval davlat organining o'z sahifasi, keyin ishonchli nashr; `cite` — shu maqola
 *   `sources` ro'yxatidagi tartib raqami (0 dan), sahifada fakt yonida manba belgisi bo'lib chiqadi;
 * - manbada yo'q narsa (taxmin, umumlashtirish) fakt sifatida yozilmaydi — maslahat bo'lsa, maslahat ekani ko'rinib turadi;
 * - rasm o'rniga o'zimizning ma'lumot vizuali (`cover`): begona surat va logotiplar ishlatilmaydi.
 *
 * Matnda: `**qalin**`, `[havola](/ichki/manzil/)` yoki `[havola](https://...)` — boshqa belgilash yo'q.
 * Yangi maqola: shu ro'yxatga bitta obyekt (slug — lotin harflari va «-»), kerak bo'lsa ijtimoiy tarmoq rasmi
 * (README «Yangiliklar»). Build tekshiruvi (`src/lib/news.ts`) noto'g'ri sana, manba raqami yoki havolada to'xtaydi.
 */

export type NewsCategory = "rasmiy" | "vakansiya";

export type NewsSource = {
  /** Nashr yoki tashkilot nomi, masalan «president.uz». */
  outlet: string;
  title: string;
  url: `https://${string}`;
  /** YYYY-MM-DD; noma'lum bo'lsa yozilmaydi. */
  date?: string;
  /** Davlat organining o'z sahifasi yoki kanali. */
  official?: boolean;
};

export type NewsStat = { value: string; label: string; accent?: boolean };

/**
 * Kartochka va ijtimoiy tarmoq rasmidagi vizual: begona surat emas — xabarning asosiy raqami.
 * units — katakchalar (har biri `unitValue` ta, `filled` tasi to'lgan); path — `steps` qadamli yo'l va maqsad.
 */
export type NewsCover =
  | { kind: "units"; total: number; filled: number; unitValue: number; unitLabel: string }
  | { kind: "path"; steps: number; stepLabel: string; goal: string; label: string };

export type NewsBlock =
  | { type: "h2"; id: string; text: string }
  | { type: "p"; text: string; cite?: number[] }
  | { type: "list"; items: string[]; cite?: number[] }
  | {
      type: "units";
      total: number;
      filled: number;
      unit: string;
      filledLabel: string;
      emptyLabel: string;
      caption: string;
      cite?: number[];
    }
  | { type: "steps"; title: string; items: { title: string; text: string }[] }
  | { type: "callout"; tone: "info" | "warning"; title: string; text: string; cite?: number[] }
  /** Ilova haqida qisqa blok — maqola mavzusiga bog'liq joyda, bittadan ko'p emas. */
  | { type: "app"; title: string; text: string };

export type NewsArticle = {
  slug: string;
  /** Saytda e'lon qilingan sana, YYYY-MM-DD. */
  date: string;
  updated?: string;
  category: NewsCategory;
  /** Yangiliklar sahifasining boshida katta kartochka bo'lib chiqadi. */
  featured?: boolean;
  title: string;
  /** Kartochka, meta tavsif va ijtimoiy tarmoqlar uchun (≤ 200 belgi). */
  summary: string;
  lead: string;
  stats: NewsStat[];
  cover: NewsCover;
  body: NewsBlock[];
  sources: NewsSource[];
  /** public/ ichidagi 1200×630 rasm (README «Yangiliklar»). Bo'lmasa saytning umumiy og.png'si. */
  ogImage?: `/${string}.png`;
};

export const newsCategories = typo({
  rasmiy: "Rasmiy xabar",
  vakansiya: "Vakansiya",
} as const satisfies Record<NewsCategory, string>);

export const newsCopy = typo({
  path: "/yangiliklar",
  eyebrow: "Yangiliklar",
  title: "Germaniya, nemis tili va imtihonlar — tekshirilgan yangiliklar.",
  lead: "Germaniyada oʻqish va ishlashga oid muhim xabarlar: qisqa, tushunarli va har bir raqam manbasi bilan.",
  metaDescription:
    "Germaniyada ishlash va oʻqish, nemis tili va imtihonlar haqida tekshirilgan yangiliklar — rasmiy manbalar asosida, oʻzbek tilida.",
  readMore: "Batafsil oʻqish",
  all: "Barcha yangiliklar",
  minutes: "daqiqa",
  updated: "yangilandi",
  sourcesTitle: "Manbalar",
  sourcesLead: "Maqoladagi raqamlar va faktlar shu sahifalardan olingan.",
  official: "Rasmiy",
  sourceLabel: "Manba",
  contents: "Mundarija",
  keyNumbers: "Asosiy raqamlar",
  more: "Boshqa yangiliklar",
  share: "Ulashish",
  shareTelegram: "Telegramʼda ulashish",
  copyLink: "Havolani nusxalash",
  copied: "Nusxalandi",
  disclaimer:
    "DeutschUz — nemis tilini oʻrgatuvchi ilova. Biz ishga joylashtirmaymiz, vakansiya va hujjat qabul qilmaymiz. Ariza va hujjatlar boʻyicha faqat rasmiy manbalarga murojaat qiling.",
  appCta: "Ilovani yuklab olish",
  home: {
    eyebrow: "Yangiliklar",
    title: "Germaniyada ish bor. Yetishmayotgani — nemis tili.",
    lead: "Bu yil Germaniyadan 45 ming mutaxassisga buyurtma kelgan, ishga atigi 2 ming kishi joylashgan. Rasmiy manbalardan eng muhim yangiliklar — qisqa va aniq.",
  },
  principlesTitle: "Yangiliklarni qanday tayyorlaymiz",
  principles: [
    {
      title: "Rasmiy manba — birinchi",
      text: "Avval davlat organlarining oʻz sahifalari, keyin ishonchli nashrlar. Har bir maqola oxirida manbalar roʻyxati bor.",
    },
    {
      title: "Har bir raqam — havola bilan",
      text: "Fakt yonida u olingan manba koʻrsatiladi. Taxmin va mish-mish yangilik sifatida yozilmaydi.",
    },
    {
      title: "Siz uchun nima oʻzgaradi",
      text: "Faqat xabar emas: kimga tegishli, nima qilish kerak va nimadan ehtiyot boʻlish kerak.",
    },
  ],
  errorsTitle: "Xato topdingizmi?",
  errorsText: "Yozing — tekshirib, tuzatamiz. Tuzatilgan maqolada yangilangan sana koʻrsatiladi.",
} as const);

export const news: NewsArticle[] = typo([
  {
    slug: "germaniya-45-ming-orin",
    date: "2026-11-02",
    category: "rasmiy",
    featured: true,
    title: "45 000 oʻrin, 2 000 kishi: Germaniyada ishlash yoʻlidagi asosiy toʻsiq — nemis tili",
    summary:
      "Germaniyadan bu yil 45 ming mutaxassisga buyurtma kelgan, ishga atigi 2 ming kishi joylashgan. Kelasi yil 10 ming kishini kasb va nemis tiliga oʻrgatish vazifasi qoʻyildi.",
    lead: "2-noyabr kuni Prezident Shavkat Mirziyoyev mehnat migratsiyasi masalalari boʻyicha yigʻilish oʻtkazdi. Rasmiy maʼlumotga koʻra, Germaniyadan joriy yilning oʻzida 45 ming mutaxassisga buyurtma kelgan, ammo atigi 2 ming kishi ishga joylashgan. Sabab — nemis tilini biladigan kadrlar yetishmasligi.",
    stats: [
      { value: "45 000", label: "mutaxassisga buyurtma — Germaniyadan, 2026-yil" },
      { value: "2 000", label: "kishi ishga joylashgan", accent: true },
      { value: "10 000", label: "kishini kelasi yil kasb va tilga oʻrgatib, Germaniyaga joylashtirish — vazifa" },
      { value: "500", label: "nemis tili egasi maktab va texnikumlarga jalb etiladi" },
    ],
    cover: { kind: "units", total: 45, filled: 2, unitValue: 1000, unitLabel: "mutaxassis" },
    body: [
      { type: "h2", id: "nima-deyildi", text: "Yigʻilishda nima deyildi" },
      {
        type: "p",
        text: "Yigʻilish mehnat migratsiyasi hamda xorijga ishga ketmoqchi boʻlganlarni til va kasbga oʻqitish masalalariga bagʻishlandi. Germaniya, Turkiya, Slovakiya va Qatardagi ish beruvchilarni texnikumlar bilan bogʻlash ijobiy misol sifatida keltirildi.",
        cite: [0, 3],
      },
      {
        type: "p",
        text: "Germaniya boʻyicha raqamlar alohida tilga olindi: joriy yilning oʻzida **45 ming mutaxassisga** buyurtma kelib tushgan, lekin ishga **atigi 2 ming kishi** joylashgan. Bunga nemis tilini biladigan kadrlar yetishmasligi sabab boʻlmoqda.",
        cite: [0, 1],
      },
      {
        type: "units",
        total: 45,
        filled: 2,
        unit: "1 katak — 1 000 mutaxassis",
        filledLabel: "ishga joylashgan — 2 000",
        emptyLabel: "toʻlmay qolgan — 43 000",
        caption: "Germaniya soʻragan oʻrinlarning 5 foizidan kami toʻldi.",
        cite: [0],
      },
      {
        type: "p",
        text: "Shu bois kasbiy taʼlim bilan til tayyorgarligini birga olib borish va xorijlik ish beruvchilar buyurtmasini texnikumlardagi oʻquv dasturlari bilan bogʻlash muhimligi taʼkidlandi.",
        cite: [0],
      },

      { type: "h2", id: "choralar", text: "Qanday choralar belgilandi" },
      {
        type: "list",
        items: [
          "Kelasi yil **10 ming kishini** kasb va nemis tiliga oʻrgatib, Germaniyada ishga joylashtirish vazifasi qoʻyildi.",
          "Har bir viloyatda ikki-uchta texnikumda kasb bilan birga **nemis tilini** oʻqitish yoʻlga qoʻyiladi.",
          "«Intil» xalqaro oʻquv markazida telc ishtirokida **100 nafar nemis tili oʻqituvchisini** tayyorlash boshlandi — kelasi yil ular hududlardagi texnikumlarga jalb qilinadi.",
          "Maktab va texnikumlar uchun **500 nafar nemis tili egasi** olib kelinadi.",
          "Oliy taʼlimda nemis tili oʻqituvchilarini tayyorlash boʻyicha davlat buyurtmasi **ikki karra** oshiriladi.",
          "Kelasi yil har bir viloyatda **yagona migratsiya markazi** ochiladi — har biriga 8 milliard soʻmdan ajratiladi.",
          "Bir oy ichida **20 ta texnikum** tanlanib, dasturlari xorijlik ish beruvchilar talabiga moslashtiriladi.",
        ],
        cite: [0, 2],
      },

      { type: "h2", id: "siz-uchun", text: "Bu siz uchun nimani anglatadi" },
      {
        type: "p",
        text: "Germaniyada ish oʻrinlari bor — ularni egallash uchun til kerak. Talab qilinadigan daraja vakansiyaga qarab farq qiladi: masalan, Deutsche Bahn qurilish vakansiyasida nomzodlar Germaniyada ish boshlashdan oldin [B1 imtihonini](/yangiliklar/deutsche-bahn-qurilish-mutaxassislari/) topshirishi shart.",
      },
      {
        type: "p",
        text: "Davlat dasturlari kelasi yildan boshlanadi, tilni esa hoziroq oʻrganishni boshlash mumkin. Tanlovga asos bilan kelsangiz, kursni ham osonroq oʻzlashtirasiz.",
      },
      {
        type: "steps",
        title: "Bugundan boshlash uchun",
        items: [
          {
            title: "Maqsadli darajani bilib oling",
            text: "Noldan boshlasangiz — A1 dan. Qaysi daraja kerakligini vakansiyaning oʻzidan tekshiring va oʻsha darajani maqsad qiling.",
          },
          {
            title: "Har kuni 15–20 daqiqa",
            text: "Soʻzlar, grammatika va takrorlash — kichik qadamlar bilan. Muntazam qisqa mashgʻulot bir martalik uzoq darsdan foydaliroq.",
          },
          {
            title: "Imtihon formatida mashq qiling",
            text: "Sertifikat Goethe-Institut yoki telc imtihonida olinadi. Ularning formatidagi gapirish va oʻqish mashqlari bilan oldindan tayyorlaning.",
          },
        ],
      },
      {
        type: "app",
        title: "Nemis tilini oʻzbek tilida, bugundan",
        text: "DeutschUz — A1 dan C1 gacha soʻzlar, grammatika, oʻqish matnlari va Goethe hamda telc formatidagi gapirish mashqlari. Lugʻat doim bepul.",
      },
      {
        type: "callout",
        tone: "warning",
        title: "Firibgarlardan ehtiyot boʻling",
        text: "Yigʻilishda xususiy bandlik agentliklari faoliyatidagi xatolar, korrupsiya va aldov holatlari ham tilga olindi. Vakansiyani Migratsiya agentligining rasmiy «Xorijda ish» tizimida ([xorijdaish.uz](https://xorijdaish.uz)) tekshiring va «kafolatlangan viza» vaʼda qilganlarga oldindan pul bermang.",
        cite: [4],
      },
    ],
    sources: [
      {
        outlet: "president.uz",
        title: "Mehnat migratsiyasi tizimini takomillashtirish boʻyicha vazifalar belgilandi",
        url: "https://president.uz/oz/lists/view/9804",
        date: "2026-11-02",
        official: true,
      },
      {
        outlet: "Kun.uz",
        title: "Germaniyadagi 45 ming ish oʻrniga atigi 2 ming kishi joylashdi",
        url: "https://kun.uz/news/2026/11/02/germaniyadagi-45-ming-ish-orniga-atigi-2-ming-kishi-joylashdi-58908",
        date: "2026-11-02",
      },
      {
        outlet: "Kun.uz",
        title: "Germaniyada ishlash uchun 10 ming oʻzbekistonlik tayyorlanadi",
        url: "https://kun.uz/news/2026/11/02/germaniyada-ishlash-uchun-10-ming-ozbekistonlik-tayyorlanadi-58918",
        date: "2026-11-02",
      },
      {
        outlet: "Gazeta.uz",
        title: "Oʻzbekistonning har bir hududida migratsiya markazi ochiladi — prezident",
        url: "https://www.gazeta.uz/oz/2026/11/02/migration-centers/",
        date: "2026-11-02",
      },
      {
        outlet: "UzDaily.uz",
        title: "Узбекистан направит 287 тысяч граждан на работу в 34 странах",
        url: "https://www.uzdaily.uz/ru/prezident-shavkat-mirziioev-provodit-soveshchanie-posviashchionnoe-voprosam-trudovoi-migratsii/",
        date: "2026-11-02",
      },
    ],
    ogImage: "/og/news-germaniya-45-ming-orin.png",
  },
  {
    slug: "deutsche-bahn-qurilish-mutaxassislari",
    date: "2026-11-11",
    category: "vakansiya",
    title: "Deutsche Bahn oʻzbekistonlik quruvchilarni ishga taklif qilmoqda: 8 oy bepul nemis tili va B1 imtihoni",
    summary:
      "Germaniya temir yoʻl kompaniyasi qurilish mutaxassislarini qidirmoqda. Nemis tili shart emas — tanlanganlar Toshkentda 8 oy bepul oʻqib, B1 imtihonini topshiradi.",
    lead: "Migratsiya agentligi Deutsche Bahn bilan hamkorlikda temir yoʻl qurilishi uchun mutaxassislar tanlovini eʼlon qildi. Nemis tilini hali bilmasangiz ham ariza topshirish mumkin: tanlanganlar Toshkentda 8 oy bepul til oʻrganadi va Germaniyada ish boshlashdan oldin B1 imtihonini topshiradi.",
    stats: [
      { value: "3 418,84 €", label: "brutto oylik — shu summadan boshlanadi" },
      { value: "8 oy", label: "Toshkentda bepul nemis tili kursi" },
      { value: "B1", label: "ishdan oldin topshiriladigan imtihon", accent: true },
      { value: "30 kun", label: "yillik haq toʻlanadigan taʼtil" },
    ],
    cover: { kind: "path", steps: 8, stepLabel: "oy", goal: "B1", label: "Toshkentda 8 oy bepul kurs — keyin B1 imtihoni" },
    body: [
      { type: "h2", id: "kimlar", text: "Kimlar ariza bera oladi" },
      {
        type: "list",
        items: [
          "Qurilish boʻyicha **kasbiy taʼlim** olganlar: bino va inshootlar, yer osti obyektlari qurilishi, beton ishlari yoki yoʻl qurilishi.",
          "Qurilish maydonidagi tajriba va **B toifali** haydovchilik guvohnomasi — afzallik.",
          "Jismoniy chidamlilik, jamoada ishlash, turli obyektlarda ishlash va kerak boʻlsa obyektda tunab qolishga tayyorlik.",
        ],
        cite: [0],
      },

      { type: "h2", id: "sharoit", text: "Ish va sharoit" },
      {
        type: "p",
        text: "Ish — temir yoʻl qurilishida: platformalar, stansiyalar va temir yoʻl inshootlarini qurish, taʼmirlash va saqlash; gʻisht terish, qolip va beton ishlari, poydevor va yer osti ishlari.",
        cite: [2],
      },
      {
        type: "list",
        items: [
          "Brutto oylik ish haqi **3 418,84 yevrodan** boshlanadi; qoʻshimcha ustamalar, dam olish va bayram kunlaridagi ish uchun alohida haq toʻlanadi.",
          "Yiliga **30 kun** haq toʻlanadigan taʼtil.",
          "Uy-joy topish va Germaniyada roʻyxatdan oʻtishda yordam beriladi.",
          "Kompaniyaning ichki oʻquv dasturlari.",
        ],
        cite: [0],
      },
      {
        type: "callout",
        tone: "info",
        title: "Brutto va qoʻlga tegadigan maosh",
        text: "Brutto — soliq va sugʻurta toʻlovlari ushlab qolinishidan oldingi summa. Gazeta.uz Migratsiya agentligiga tayanib, qoʻlga taxminan 2 300–2 400 yevro tegishini yozgan.",
        cite: [2],
      },

      { type: "h2", id: "til", text: "Nemis tili sharti" },
      {
        type: "p",
        text: "Ariza topshirishda nemis tili majburiy emas, lekin bilish afzallik hisoblanadi. Tanlanganlar Toshkentda **8 oy** nemis tilini oʻrganadi — kurslar Deutsche Bahn tomonidan moliyalashtiriladi. Kurs yakunida, Germaniyada ish boshlashdan oldin **B1 darajasidagi imtihonni** topshirish shart.",
        cite: [0, 1],
      },
      {
        type: "p",
        text: "Sakkiz oyda noldan B1 gacha — jadal surʼat. Kursgacha alifbo, talaffuz va A1 asoslarini oʻzlashtirib olsangiz, kursda ham, imtihonda ham ancha yengil boʻladi.",
      },
      {
        type: "app",
        title: "Kursgacha A1 asoslarini oʻrganib oling",
        text: "DeutschUz — alifbo va talaffuzdan boshlab A1–C1 grammatika, kundalik soʻzlar va imtihon formatidagi mashqlar, hammasi oʻzbek tilida.",
      },

      { type: "h2", id: "hujjatlar", text: "Qanday hujjatlar kerak" },
      {
        type: "list",
        items: [
          "Maktab attestati va uning ilovasi (baholar bilan)",
          "Oʻrta maxsus yoki oliy taʼlim diplomi va ilovasi (boʻlsa)",
          "Rezyume (CV)",
          "Ish tajribasini tasdiqlovchi hujjat",
          "Pasport",
          "Haydovchilik guvohnomasi",
        ],
        cite: [0],
      },
      { type: "p", text: "Barcha taʼlim hujjatlari tizimga yuklanadi.", cite: [0] },

      { type: "h2", id: "ariza", text: "Qanday ariza beriladi" },
      {
        type: "p",
        text: "Ariza Migratsiya agentligining «Xorijda ish» axborot tizimida qabul qilinadi: [vakansiya sahifasi](https://xorijdaish.uz/vacancy?vacancy_id=1715). Eʼlonda muddat koʻrsatilmagan — ariza berishdan oldin vakansiya hali ochiqligini tizimning oʻzida tekshiring.",
        cite: [1],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Faqat rasmiy yoʻl bilan",
        text: "Arizani faqat rasmiy tizim orqali topshiring. Kompaniya yoki agentlik nomidan pul soʻragan vositachilarga ishonmang va hujjatlaringizni notanish kanallarga yubormang.",
      },
    ],
    sources: [
      {
        outlet: "Migratsiya agentligi",
        title: "Vakansiya shartlari: Deutsche Bahn kompaniyasida qurilish mutaxassisi",
        url: "https://telegra.ph/Germaniyada-ishlash-Deutsche-Bahn-Nemis-temir-yollari-kompaniyasida-qurilish-mutaxassisi-11-09-2",
        date: "2026-11-09",
        official: true,
      },
      {
        outlet: "«Xorijda ish» — Migratsiya agentligi kanali",
        title: "Deutsche Bahn bilan hamkorlikda: temir yoʻl qurilishida ishlash",
        url: "https://t.me/migratsiyaagentligi/16366",
        official: true,
      },
      {
        outlet: "Gazeta.uz",
        title: "Oʻzbekistonlik qurilish mutaxassislari Germaniyaga ishga taklif qilinmoqda, maosh — 2400 yevrogacha",
        url: "https://gazeta.uz/oz/2026/11/11/work-in-germany",
        date: "2026-11-11",
      },
    ],
    ogImage: "/og/news-deutsche-bahn-qurilish-mutaxassislari.png",
  },
]);
