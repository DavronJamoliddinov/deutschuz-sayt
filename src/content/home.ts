import { facts } from "./facts";
import { groupDigits } from "@/lib/format";
import { typo } from "@/lib/typography";

/* ---------- Hero ---------- */
export const hero = typo({
  statusSoon: "Tez orada App Store va Google Playʼda",
  statusLive: "iPhone va Android uchun",
  /** Sarlavha so'zlari: animatsiya so'zma-so'z, `highlight` — ajratib ko'rsatiladigan so'z. */
  titleWords: ["Nemis", "tilini", "oʻzbekcha", "tushunib", "oʻrganing."],
  highlight: 2,
  lead: "Yangi soʻzlar, grammatika va amaliy mashqlar orqali nemis tilini bosqichma-bosqich oʻzlashtiring — har bir qoida, tarjima va misol oʻzbek tilida.",
  secondaryCta: { href: "/imkoniyatlar", label: "Imkoniyatlarni koʻrish" },
  highlights: [
    `${groupDigits(facts.dictionaryWords)}+ soʻzli bepul lugʻat`,
    "A1–C1 grammatika",
    "Lotin va kirill alifbosi",
  ],
  visualLabel:
    "DeutschUz ilovasi: «die Sprache» soʻzining sahifasi — tarjimasi «til», koʻplik shakli, talaffuz tugmasi va misol gaplar",
} as const);

/* ---------- Raqamlar ---------- */
export const factsBand = typo({
  title: "Ilova ichida",
  note: `Ilova kontenti, ${facts.asOf} holatiga.`,
  items: [
    { value: facts.dictionaryWords, suffix: "+", label: "soʻz lugʻatda", hint: "internetsiz qidiruv" },
    { value: facts.learningWords, label: "oʻquv soʻzi", hint: "har biri misol gap bilan" },
    { value: facts.grammarLessons, label: "grammatika darsi", hint: "A1 dan C1 gacha" },
    { value: facts.speakingTasks, label: "gapirish mashqi", hint: "imtihon va hayotiy vaziyatlar" },
    { value: facts.videos, label: "video dars", hint: "A1–B2 darajalari" },
    { value: facts.texts, label: "oʻqish matni", hint: "A1–C1, savollar bilan" },
  ],
} as const);

/* ---------- Yondashuv ---------- */
export const approach = typo({
  eyebrow: "Yondashuv",
  title: "Tarjima emas — tushuntirish.",
  lead: "Nemis tilini begona til orqali emas, ona tilingizda tushunish osonroq. DeutschUz har bir soʻz va qoidani oʻzbek tilida, real misollar bilan beradi.",
  direct: {
    title: "Inglizcha «koʻprik»siz",
    text: "Tarjimalar nemischa soʻz, uning aniq maʼnosi va misol gap asosida tayyorlangan — inglizchadan koʻr-koʻrona oʻgirilmagan. Shuning uchun bir xil yoziladigan soʻzlar adashtirilmaydi.",
  },
  examples: {
    title: "Har bir maʼno — misol bilan",
    text: `A1–B2 dagi ${groupDigits(facts.learningWords)} ta soʻzning har bir maʼnosida nemischa misol gap va uning oʻzbekcha tarjimasi bor.`,
  },
  audio: {
    title: "Haqiqiy nemischa talaffuz",
    text: "Soʻzlarni nemis tilida soʻzlashuvchilar oʻqigan yozuvlarda tinglaysiz, misol gaplar esa nemischa nutq sintezi bilan oʻqiladi.",
  },
  script: {
    title: "Lotin yoki kirill",
    text: "Interfeys, lugʻat, grammatika va AI javoblari — siz tanlagan alifboda. Nemischa matn doim lotinda qoladi.",
  },
  offline: {
    title: "Internetsiz ham ishlaydi",
    text: "Lugʻat, talaffuz, kartochkalar va darslar telefoningizda saqlanadi. Internet faqat AI mashqlari va videolar uchun kerak.",
  },
} as const);

/* ---------- Qanday ishlaydi ---------- */
export const howItWorks = typo({
  eyebrow: "Qanday ishlaydi",
  title: "Uch qadam — va har kuni bir oz oldinga.",
  lead: "Ilova sizni oʻzingizga mos darajadan boshlab, har kuni qisqa va aniq mashgʻulotlar bilan olib boradi.",
  steps: [
    {
      title: "Darajangizni aniqlang",
      text: "Birinchi ochilishda qisqa test sizga mos darajani taklif qiladi. Noldan boshlasangiz — alifbo va talaffuzdan.",
    },
    {
      title: "Har kuni oz-ozdan oʻrganing",
      text: "Kunlik maqsad sizni yoʻnaltiradi: 20 soʻzlik qismlar, qisqa grammatika darslari va oʻyinlar. Eslatma vaqtini oʻzingiz tanlaysiz.",
    },
    {
      title: "Takrorlang va gapiring",
      text: "Soʻzlar unutilishidan oldin takrorlashga qaytadi, AI bilan suhbat esa bilimingizni jonli nutqqa aylantiradi.",
    },
  ],
} as const);

/* ---------- Bosh sahifadan boshqa sahifalarga ---------- */
export const explore = typo({
  eyebrow: "Batafsil",
  title: "Har bir boʻlim — alohida sahifada.",
  lead: "Imkoniyatlar, darajalar, narxlar va savollar bilan batafsil tanishing.",
  open: "Ochish",
} as const);

/* ---------- Yakuniy chaqiriq ---------- */
export const finalCta = typo({
  eyebrow: "Yuklab olish",
  title: "Nemis tilini oʻrganish sari ilk qadamingizni DeutschUz bilan qoʻying.",
  textSoon:
    "Ilova tez orada App Store va Google Playʼda chiqadi. Chiqishi bilan yuklab olish havolalari shu yerda paydo boʻladi.",
  textLive: "iPhone va Android uchun bepul yuklab oling. Lugʻat — doim bepul.",
  visualLabel:
    "DeutschUz ilovasining bosh sahifasi: lugʻat qidiruvi, kunlik maqsad va boʻlimlar — oʻyinlar, gapirish, matnlar, videolar, mavzular, AI yordamchi",
} as const);

/* ---------- Footer ---------- */
export const footer = typo({
  description:
    "Nemis tilini oʻzbek tili orqali oʻrgatuvchi mobil ilova: lugʻat, grammatika, kartochkalar, oʻyinlar va AI bilan gapirish.",
  sourcesTitle: "Manbalar",
  disclaimer:
    "Goethe-Zertifikat va telc — tegishli tashkilotlarning savdo belgilari. DeutschUz ular bilan bogʻliq emas.",
} as const);
