import { facts } from "./facts";
import { groupDigits } from "@/lib/format";
import { typo } from "@/lib/typography";

export type FaqItem = { question: string; answer: string };

export const faqIntro = typo({
  eyebrow: "Savollar",
  title: "Koʻp soʻraladigan savollar",
  lead: "Ilova, darajalar va obuna haqida qisqa va aniq javoblar.",
} as const);

/** Javoblar faqat CLAUDE.md da tasdiqlangan ma'lumotga tayanadi. */
export function getFaq({ storesAvailable }: { storesAvailable: boolean }): FaqItem[] {
  return typo([
    {
      question: "DeutschUz kimlar uchun?",
      answer:
        "Germaniyada oʻqish, Ausbildung yoki ishga tayyorlanayotgan va nemis tilini oʻzbek tili orqali oʻrganmoqchi boʻlganlar uchun. Ilova ayniqsa Goethe va telc A1–B2 imtihonlariga tayyorlanuvchilarga moʻljallangan.",
    },
    {
      question: "Nemis tilini noldan boshlasam boʻladimi?",
      answer:
        "Ha. A1 darajasi alifbo va talaffuzdan boshlanadi. Birinchi ochilishda qisqa test bilimingizga mos darajani taklif qiladi.",
    },
    {
      question: "Ilovani qayerdan yuklab olaman?",
      answer: storesAvailable
        ? "App Store va Google Playʼdan — havolalar «Yuklab olish» sahifasida, qurilmangiz avtomatik aniqlanadi. Veb-versiya va kompyuter dasturi yoʻq: oʻrganish mobil ilovada boʻladi."
        : "DeutschUz iPhone va Android uchun App Store hamda Google Play orqali tarqatiladi. Ilova hozir chiqishga tayyorlanmoqda — yuklab olish havolalari «Yuklab olish» sahifasida paydo boʻladi. Veb-versiya va kompyuter dasturi yoʻq.",
    },
    {
      question: "Nimalar bepul?",
      answer: `Lugʻat toʻliq bepul: ${groupDigits(facts.dictionaryWords)}+ soʻz, qidiruv va talaffuz. Bundan tashqari A1 dan 5 ta oʻyin qismi, kartochkalarda dastlabki 100 soʻz (kuniga 10 tadan), 2 ta grammatika darsi, har darajadan 5 tadan oʻqish matni va 2 ta mavzu bepul.`,
    },
    {
      question: "Premium qancha turadi va qanday toʻlanadi?",
      answer:
        "1 oy — $4.99, 3 oy — $11.99, 6 oy — $19.99, 1 yil — $29.99. Obuna ilova ichida App Store yoki Google Play orqali bank kartasi bilan rasmiylashtiriladi va istalgan vaqtda doʻkon sozlamalarida bekor qilinadi. Bepul sinov muddati yoʻq.",
    },
    {
      question: "Internetsiz ishlaydimi?",
      answer:
        "Asosiy qismi — ha. Lugʻat, soʻzlar talaffuzi, kartochkalar, oʻyinlar, grammatika va oʻqish matnlari telefonda saqlanadi. AI funksiyalari va videolar uchun internet kerak. Kengaytirilgan lugʻatdagi soʻzlar talaffuzini Premium foydalanuvchilar oflayn paket sifatida yuklab oladi.",
    },
    {
      question: "Qaysi darajalar mavjud?",
      answer: `Soʻzlar, oʻyinlar va kartochkalar — A1–B2; grammatika — A1–C1 (${facts.grammarLessons} ta dars); oʻqish matnlari — A1–B1 (B2 va C1 tayyorlanmoqda); video darslar va gapirish mashqlari — A1–B2.`,
    },
    {
      question: "Tarjimalar qanday tayyorlangan?",
      answer:
        "Lugʻat Wiktionary maʼlumotlariga asoslanadi. Tarjimalar sunʼiy intellekt yordamida inglizcha orqali emas, nemischa maʼno va misol gap asosida yozilgan. Xato koʻrsangiz, soʻz sahifasidagi «Tarjimada xato» tugmasi orqali xabar bering.",
    },
    {
      question: "AI qanday yordam beradi?",
      answer:
        "«AI tushuntir» soʻz yoki gapni oʻzbek tilida tushuntiradi. Gapirish mashqlarida darajani (A1–B2) va shu darajadagi vazifani tanlaysiz — AI imtihonchi yoki suhbatdosh boʻlib, suhbatni oʻsha vazifa doirasida olib boradi. AI yordamchi esa nemis tili boʻyicha savollaringizga javob beradi. Bu funksiyalar Premium obunada, kunlik limit bilan ishlaydi; birinchi foydalanishda 18 yoshdan kattaligingizni tasdiqlaysiz.",
    },
    {
      question: "Ilova sertifikat beradimi?",
      answer:
        "Yoʻq. DeutschUz rasmiy imtihon markazi emas va Goethe-Institut yoki telc bilan bogʻliq emas. Ilova imtihon formatida mashq qilishga yordam beradi, sertifikat esa rasmiy imtihonni topshirib olinadi.",
    },
    {
      question: "Kirill alifbosida foydalansa boʻladimi?",
      answer:
        "Ha. Sozlamalarda ilova tilini «Oʻzbekcha (lotin)» yoki «Ўзбекча (кирилл)» qilib tanlaysiz — interfeys, tarjimalar, grammatika va AI javoblari shu alifboda koʻrinadi. Nemischa soʻzlar doim lotinda qoladi.",
    },
  ]);
}
