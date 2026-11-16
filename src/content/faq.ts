import { facts } from "./facts";
import { storeNames as storeNamesOf } from "./home";
import { plans } from "./pricing";
import { support } from "./support";
import type { StoreState } from "@/config/site";
import { groupDigits } from "@/lib/format";
import { typo } from "@/lib/typography";

export type FaqItem = { question: string; answer: string };

export const faqIntro = typo({
  eyebrow: "Savollar",
  title: "Koʻp soʻraladigan savollar",
  lead: "Ilova, darajalar va obuna haqida qisqa va aniq javoblar.",
} as const);

/** Javoblar faqat CLAUDE.md da tasdiqlangan ma'lumotga tayanadi. */
export function getFaq({
  stores,
  webPayments = false,
  webApp = false,
}: {
  stores: StoreState;
  webPayments?: boolean;
  webApp?: boolean;
}): FaqItem[] {
  // Obuna qaysi do'kon orqali: chiqmagan do'kon va'da qilinmaydi.
  const storeNames = storeNamesOf(stores);
  // Narxlar — «Narxlar» sahifasidagi bilan bitta manba (content/pricing.ts), so'mda.
  const prices = plans.map((plan) => `${plan.label} — ${groupDigits(plan.uzs)} soʻm`).join(", ");
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
      answer:
        stores === "both"
          ? webApp
            ? "App Store va Google Playʼdan — havolalar «Yuklab olish» sahifasida, qurilmangiz avtomatik aniqlanadi. Brauzer orqali oʻrnatish ham mumkin; alohida kompyuter dasturi yoʻq."
            : "App Store va Google Playʼdan — havolalar «Yuklab olish» sahifasida, qurilmangiz avtomatik aniqlanadi. Alohida kompyuter dasturi yoʻq: oʻrganish mobil ilovada boʻladi."
          : stores === "play"
            ? webApp
              ? "Androidʼda — Google Playʼdan: havola «Yuklab olish» sahifasida. iPhoneʼda hozircha brauzer orqali: «iPhoneʼga oʻrnatish» tugmasi ilovani Safariʼda ochadi, hisobga kirib, koʻrsatma boʻyicha bosh ekranga qoʻshasiz. App Store — tez orada. Kompyuterda ham brauzer orqali ishlaydi."
              : "Androidʼda — Google Playʼdan: havola «Yuklab olish» sahifasida. iPhone uchun App Store versiyasi tayyorlanmoqda — chiqishi bilan havola shu sahifada paydo boʻladi. Alohida kompyuter dasturi yoʻq."
            : stores === "apple"
              ? "iPhoneʼda — App Storeʼdan: havola «Yuklab olish» sahifasida. Google Play — tez orada. Alohida kompyuter dasturi yoʻq."
              : webApp
                ? "iPhoneʼga hozirdan: «Yuklab olish» sahifasidagi «iPhoneʼga oʻrnatish» tugmasi ilovani Safariʼda ochadi, u yerda hisobga kirasiz va koʻrsatma boʻyicha bosh ekranga qoʻshasiz. App Store va Google Play — tez orada. Android va kompyuterda ham brauzer orqali ishlaydi."
                : "DeutschUz iPhone va Android uchun App Store hamda Google Play orqali tarqatiladi. Ilova hozir chiqishga tayyorlanmoqda — yuklab olish havolalari «Yuklab olish» sahifasida paydo boʻladi. Alohida kompyuter dasturi yoʻq.",
    },
    {
      question: "Nimalar bepul?",
      answer: `Lugʻat toʻliq bepul: ${groupDigits(facts.dictionaryWords)}+ soʻz, qidiruv va talaffuz. Bundan tashqari A1 dan 5 ta oʻyin qismi, kartochkalarda dastlabki 100 soʻz (kuniga 10 tadan), 2 ta grammatika darsi, har darajadan 5 tadan oʻqish matni va 2 ta mavzu bepul.`,
    },
    {
      question: "Premium qancha turadi va qanday toʻlanadi?",
      answer:
        `${prices}. Obuna ilova ichida ${storeNames} orqali bank kartasi bilan rasmiylashtiriladi va istalgan vaqtda doʻkon sozlamalarida bekor qilinadi. Bepul sinov muddati yoʻq.` +
        (webApp
          ? " iPhoneʼga brauzer orqali oʻrnatilgan ilovada Premium soʻmda: Payme, Click, Uzum yoki Google Pay bilan, bir martalik toʻlov (avtomatik yechilmaydi)."
          : "") +
        (webPayments
          ? " Saytdagi «Premium» sahifasida xuddi shu narxda Payme orqali ham toʻlash mumkin — bir martalik toʻlov, avtomatik yangilanmaydi."
          : ""),
    },
    {
      question: "Internetsiz ishlaydimi?",
      answer:
        "Asosiy qismi — ha. Lugʻat, A1–B2 soʻzlari talaffuzi, kartochkalar, oʻyinlar, grammatika va oʻqish matnlari telefonda saqlanadi. AI funksiyalari va videolar uchun internet kerak. C1 va kengaytirilgan lugʻatdagi soʻzlar talaffuzini Premium foydalanuvchilar oflayn paket sifatida yuklab oladi.",
    },
    {
      question: "Qaysi darajalar mavjud?",
      answer: `Soʻzlar, oʻyinlar va kartochkalar — A1–C1 (${groupDigits(facts.learningWords)} ta oʻquv soʻzi); grammatika — A1–C1 (${facts.grammarLessons} ta dars); oʻqish matnlari — A1–C1 (${facts.texts} ta); video darslar — A1–C1 (${facts.videos} ta); gapirish mashqlari — A1–B2.`,
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
      question: "Savol yoki muammo boʻlsa, qayerga yozaman?",
      answer: `Email: ${support.email} yoki Telegram: @${support.telegram}. Ilovadagi Foydalanuvchi IDʼni (Profil → Sozlamalar → «Foydalanuvchi ID») qoʻshing, toʻlov boʻyicha murojaatda — buyurtma raqamini ham. Ilovaning oʻzida: Profil → «Yordam va qoʻllab-quvvatlash».`,
    },
    {
      question: "Kirill alifbosida foydalansa boʻladimi?",
      answer:
        "Ha. Sozlamalarda ilova tilini «Oʻzbekcha (lotin)» yoki «Ўзбекча (кирилл)» qilib tanlaysiz — interfeys, tarjimalar, grammatika va AI javoblari shu alifboda koʻrinadi. Nemischa soʻzlar doim lotinda qoladi.",
    },
  ]);
}
