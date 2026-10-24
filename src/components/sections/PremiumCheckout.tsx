"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertTriangle, Check, CircleX, Clock, Loader2, Lock } from "lucide-react";
import { checkoutCopy as t } from "@/content/premium";
import { groupDigits } from "@/lib/format";
import { cn } from "@/lib/cn";

/* Ilova serveri /v1/pay/* javoblari (ai_proxy/payments.py). */
type Plan = { key: string; months: number; label: string; uzs: number; usd: string; per_month_uzs: number; saving: number; popular: boolean };
type Plans = { enabled: boolean; test: boolean; plans: Plan[]; default: string };
type OrderState = "sms" | "verifying" | "paying" | "checking" | "paid" | "failed" | "expired";
type Order = {
  order_id: string;
  state: OrderState;
  label: string;
  amount: number;
  test: boolean;
  card: string | null;
  grant: "pending" | "done" | "skipped" | null;
  premium_until: string | null;
  error: string | null;
};
type Sms = { order_id: string; card: string | null; phone: string | null; wait: number; label: string; amount: number };

type View =
  | { step: "loading" }
  | { step: "unavailable"; reason: "disabled" | "load" }
  | { step: "form" }
  | { step: "sms"; sms: Sms }
  | { step: "processing"; orderId: string; slow?: boolean }
  | { step: "result"; order: Order };

const STORAGE_KEY = "dz-pay-order";
const USER_ID = /^[A-Za-z0-9_.:$-]{8,128}$/;
const FINAL: OrderState[] = ["paid", "failed", "expired"];
const MONTHS = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];

class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function call<T>(api: string, path: string, body?: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${api}/v1/pay/${path}`, {
      cache: "no-store",
      ...(body === undefined
        ? {}
        : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }),
    });
  } catch {
    throw new ApiError(t.network, 0);
  }
  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
    /* bo'sh javob */
  }
  if (!response.ok) {
    const detail = (data as { detail?: unknown } | null)?.detail;
    throw new ApiError(typeof detail === "string" ? detail : t.network, response.status);
  }
  return data as T;
}

/* sessionStorage: sahifa yangilansa ham boshlangan to'lov natijasi yo'qolmaydi (faqat buyurtma raqami). */
function stored(value?: string | null): string | null {
  try {
    if (value === undefined) return sessionStorage.getItem(STORAGE_KEY);
    if (value === null) sessionStorage.removeItem(STORAGE_KEY);
    else sessionStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* yopiq rejim — saqlanmaydi */
  }
  return null;
}

/** Hodisa va effektlarda ishlatiladi (render paytida emas) — SMS qayta yuborish taymeri uchun. */
const clock = () => Date.now();
const som = (value: number) => `${groupDigits(value)} soʻm`;
const digitsOf = (value: string) => value.replace(/\D/g, "");
const formatCard = (value: string) => digitsOf(value).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

function formatExpire(value: string, previous: string): string {
  const digits = digitsOf(value).slice(0, 4);
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  if (digits.length === 2 && value.length > previous.length) return `${digits}/`;
  return digits;
}

function expireValid(value: string): boolean {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  const now = new Date();
  return month >= 1 && month <= 12 && (year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1));
}

function cardBrand(digits: string): string | null {
  if (/^(8600|5614)/.test(digits)) return "Uzcard";
  if (/^9860/.test(digits)) return "Humo";
  return null;
}

/** Payme: "99890*****66" → "+998 90 *** ** 66" */
function formatPhone(phone: string | null): string | null {
  if (!phone) return null;
  const match = /^998(\d{2})\*+(\d{2})$/.exec(phone);
  return match ? `+998 ${match[1]} *** ** ${match[2]}` : phone;
}

/** "2027-04-23T12:00:00Z" → "2027-yil 23-aprel" */
function formatDate(iso: string): string {
  const date = new Date(iso);
  return `${date.getFullYear()}-yil ${date.getDate()}-${MONTHS[date.getMonth()]}`;
}

const inputClass =
  "h-12 w-full rounded-xl bg-paper px-4 text-[16px] text-ink tabular-nums ring-1 ring-inset ring-ink/15 transition-shadow placeholder:text-ink-3/70 focus:outline-none focus:ring-2 focus:ring-app aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-coral";

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[13.5px] leading-snug text-coral-700">
      <AlertTriangle aria-hidden className="mt-0.5 size-3.5 shrink-0" />
      {children}
    </p>
  );
}

function PrimaryButton({ children, busy, disabled }: { children: ReactNode; busy: boolean; disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={busy || disabled}
      aria-busy={busy}
      className="relative inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-sun px-7 text-[16px] font-semibold tracking-[-0.01em] text-navy-900 shadow-[0_10px_30px_-10px_rgb(255_212_71/0.55)] transition-[background-color,box-shadow,transform] duration-300 ease-out-expo hover:bg-[#ffdb63] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
    >
      {busy && <Loader2 aria-hidden className="size-5 animate-spin" />}
      {children}
    </button>
  );
}

function Notice({ tone, icon, children }: { tone: "warn" | "error"; icon?: ReactNode; children: ReactNode }) {
  return (
    <div
      role={tone === "error" ? "alert" : undefined}
      className={cn(
        "flex items-start gap-2.5 rounded-2xl px-4 py-3 text-[14px] leading-snug ring-1 ring-inset",
        tone === "warn" ? "bg-sun-soft text-ink-2 ring-sun/60" : "bg-coral/[0.08] text-coral-700 ring-coral/30",
      )}
    >
      {icon ?? <AlertTriangle aria-hidden className="mt-0.5 size-4 shrink-0" />}
      <span>{children}</span>
    </div>
  );
}

/**
 * Saytdagi Premium to'lovi: muddat → Foydalanuvchi ID → karta → SMS kod → natija. Karta raqami faqat sahifa
 * xotirasida va to'lov so'rovida; serverda saqlanmaydi. Javob kelmasa (tarmoq) to'lov holati serverdan so'raladi —
 * foydalanuvchi qayta to'lab yubormaydi.
 */
export function PremiumCheckout({ api, termsUrl }: { api: string; termsUrl: string | null }) {
  const [plans, setPlans] = useState<Plans | null>(null);
  const [view, setView] = useState<View>({ step: "loading" });
  const [plan, setPlan] = useState("6m");
  const [userId, setUserId] = useState("");
  const [card, setCard] = useState("");
  const [expire, setExpire] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [resendAt, setResendAt] = useState(0);
  const [now, setNow] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLInputElement>(null);
  const expireRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  // Narxlar va (sahifa yangilangan bo'lsa) boshlangan to'lov holati.
  useEffect(() => {
    let alive = true;
    (async () => {
      let data: Plans;
      try {
        data = await call<Plans>(api, "plans");
      } catch {
        if (alive) setView({ step: "unavailable", reason: "load" });
        return;
      }
      if (!alive) return;
      setPlans(data);
      setPlan(data.default);
      const orderId = stored();
      if (orderId) {
        try {
          const order = await call<Order>(api, `orders/${orderId}`);
          if (!alive) return;
          if (order.state === "sms") {
            setView({ step: "sms", sms: { order_id: order.order_id, card: order.card, phone: null, wait: 0, label: order.label, amount: order.amount } });
            return;
          }
          if (order.state === "paid") {
            setView({ step: "result", order });
            return;
          }
          if (!FINAL.includes(order.state)) {
            setView({ step: "processing", orderId: order.order_id });
            return;
          }
        } catch {
          /* eskirgan yoki topilmadi — yangidan */
        }
        stored(null);
      }
      setView(data.enabled ? { step: "form" } : { step: "unavailable", reason: "disabled" });
    })();
    return () => {
      alive = false;
    };
  }, [api]);

  // To'lov jarayonida va Premium berilishini kutishda holat serverdan so'raladi: avval tez-tez, ~3 daqiqadan keyin
  // siyrak (to'lov holati aniqlanmagan bo'lsa) yoki to'xtaydi (Premium hali berilmagan bo'lsa — matn qoladi).
  useEffect(() => {
    const orderId =
      view.step === "processing"
        ? view.orderId
        : view.step === "result" && view.order.state === "paid" && view.order.grant === "pending"
          ? view.order.order_id
          : null;
    if (!orderId) return;
    const slow = view.step === "processing" && Boolean(view.slow);
    let alive = true;
    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = async () => {
      tries += 1;
      try {
        const order = await call<Order>(api, `orders/${orderId}`);
        if (!alive) return;
        if (FINAL.includes(order.state)) {
          if (view.step === "processing" || order.grant !== "pending") {
            setView({ step: "result", order });
            return;
          }
        } else if (order.state === "sms") {
          // Tasdiq serverga yetmagan (tarmoq) — kodni qayta kiritish mumkin.
          setError(t.network);
          setView({ step: "sms", sms: { order_id: order.order_id, card: order.card, phone: null, wait: 0, label: order.label, amount: order.amount } });
          return;
        }
      } catch {
        /* vaqtincha xato — keyingi urinish */
      }
      if (!alive) return;
      if (!slow && tries >= 40) {
        if (view.step === "processing") setView({ step: "processing", orderId, slow: true });
        return;
      }
      timer = setTimeout(tick, slow ? 15_000 : tries < 10 ? 2000 : 5000);
    };
    timer = setTimeout(tick, slow ? 15_000 : view.step === "processing" ? 1500 : 4000);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [api, view]);

  // SMS qayta yuborish taymeri.
  useEffect(() => {
    if (view.step !== "sms" || resendAt <= clock()) return;
    const id = setInterval(() => setNow(clock()), 500);
    return () => clearInterval(id);
  }, [view.step, resendAt]);

  // Yangi bosqichda fokus: SMS maydoni yoki natija sarlavhasi (ekran o'quvchilar uchun ham).
  useEffect(() => {
    if (view.step === "sms") codeRef.current?.focus();
    else if (view.step === "result" || view.step === "processing") rootRef.current?.querySelector<HTMLElement>("[data-focus]")?.focus();
  }, [view.step]);

  const selected = plans?.plans.find((p) => p.key === plan) ?? plans?.plans[0];
  const cardDigits = digitsOf(card);
  const idOk = USER_ID.test(userId.trim());
  const cardOk = cardDigits.length === 16;
  const expireOk = expireValid(expire);

  const restart = () => {
    stored(null);
    setCode("");
    setError(null);
    setInfo(null);
    setView(plans?.enabled ? { step: "form" } : { step: "unavailable", reason: "disabled" });
  };

  const showOrder = (order: Order) => {
    if (order.state === "sms") return;
    if (FINAL.includes(order.state)) {
      if (order.state === "paid") setCard("");
      setView({ step: "result", order });
    } else setView({ step: "processing", orderId: order.order_id });
  };

  const submitCard = async (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    setError(null);
    if (!idOk) return idRef.current?.focus();
    if (!cardOk) return cardRef.current?.focus();
    if (!expireOk) return expireRef.current?.focus();
    if (!selected) return;
    setBusy(true);
    try {
      const sms = await call<Sms>(api, "card", { user_id: userId.trim(), plan: selected.key, number: cardDigits, expire });
      stored(sms.order_id);
      setCode("");
      setInfo(null);
      setResendAt(clock() + sms.wait * 1000);
      setNow(clock());
      setView({ step: "sms", sms });
    } catch (e) {
      setError(e instanceof Error ? e.message : t.network);
    } finally {
      setBusy(false);
    }
  };

  const submitCode = async (event: FormEvent, sms: Sms) => {
    event.preventDefault();
    setInfo(null);
    if (!/^\d{4,8}$/.test(code)) {
      setError(t.smsInvalid);
      return codeRef.current?.focus();
    }
    setBusy(true);
    setError(null);
    try {
      showOrder(await call<Order>(api, "confirm", { order_id: sms.order_id, code }));
    } catch (e) {
      const status = e instanceof ApiError ? e.status : 0;
      if (status === 0 || status >= 500) {
        // Javob kelmadi — to'lov o'tgan bo'lishi mumkin: holat serverdan aniqlanadi.
        setView({ step: "processing", orderId: sms.order_id });
      } else {
        setError(e instanceof Error ? e.message : t.network);
        if (status === 410) {
          stored(null);
          setView({ step: "result", order: { order_id: sms.order_id, state: "expired", label: sms.label, amount: sms.amount, test: false, card: sms.card, grant: null, premium_until: null, error: null } });
        } else codeRef.current?.select();
      }
    } finally {
      setBusy(false);
    }
  };

  const resend = async (sms: Sms) => {
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      const sent = await call<{ phone: string | null; wait: number }>(api, "resend", { order_id: sms.order_id });
      setResendAt(clock() + sent.wait * 1000);
      setNow(clock());
      setInfo(t.resent);
      setView({ step: "sms", sms: { ...sms, phone: sent.phone ?? sms.phone } });
      codeRef.current?.focus();
    } catch (e) {
      setError(e instanceof Error ? e.message : t.network);
    } finally {
      setBusy(false);
    }
  };

  const testBanner = plans?.test && view.step !== "loading" && view.step !== "unavailable" && (
    <Notice tone="warn">{t.testBanner}</Notice>
  );

  return (
    <div
      ref={rootRef}
      className="rounded-[28px] bg-white p-4 shadow-card ring-1 ring-ink/[0.07] min-[400px]:p-5 sm:p-8"
      aria-label={t.formLabel}
      role="region"
    >
      <noscript>
        <Notice tone="warn">{t.noscript}</Notice>
      </noscript>

      {view.step === "loading" && (
        <div className="grid min-h-[420px] place-items-center text-[15px] text-ink-3" role="status">
          <span className="inline-flex items-center gap-2">
            <Loader2 aria-hidden className="size-5 animate-spin" />
            {t.loading}
          </span>
        </div>
      )}

      {view.step === "unavailable" && (
        <div className="grid min-h-[320px] place-items-center text-center">
          <div className="max-w-[26rem]">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-paper-2 text-ink-2">
              <Lock aria-hidden className="size-6" />
            </span>
            <h2 className="mt-5 font-display text-[22px] font-semibold tracking-[-0.025em]">
              {view.reason === "disabled" ? t.disabledTitle : t.loadTitle}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{view.reason === "disabled" ? t.disabled : t.loadError}</p>
            {view.reason === "load" && (
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 inline-flex h-12 items-center rounded-full px-6 text-[15px] font-semibold text-ink ring-1 ring-inset ring-ink/15 transition-colors hover:bg-ink/[0.04]"
              >
                {t.reload}
              </button>
            )}
          </div>
        </div>
      )}

      {view.step === "form" && plans && selected && (
        <form noValidate onSubmit={submitCard} className="grid gap-7">
          {testBanner}

          <fieldset>
            <legend className="font-display text-[19px] font-semibold tracking-[-0.02em]">{t.stepPlan}</legend>
            <div className="mt-4 grid grid-cols-2 gap-3 pt-2">
              {plans.plans.map((p) => (
                <label
                  key={p.key}
                  className={cn(
                    "relative flex cursor-pointer flex-col rounded-2xl p-3.5 ring-1 ring-inset transition-[box-shadow,background-color] duration-200 sm:p-4",
                    "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-app",
                    p.key === selected.key ? "bg-sun-soft/60 ring-2 ring-navy-900" : "bg-paper ring-ink/10 hover:ring-ink/25",
                  )}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={p.key}
                    checked={p.key === selected.key}
                    onChange={() => setPlan(p.key)}
                    className="sr-only"
                  />
                  {p.popular && (
                    <span className="absolute -top-2.5 left-3 whitespace-nowrap rounded-full bg-sun px-2.5 py-0.5 text-[11.5px] font-semibold text-navy-900">
                      {t.popular}
                    </span>
                  )}
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[14px] font-semibold text-ink-2">{p.label}</span>
                    {p.saving > 0 && (
                      <span className="rounded-full bg-das/12 px-2 py-0.5 text-[12px] font-semibold tabular-nums text-das">−{p.saving}%</span>
                    )}
                  </span>
                  <span className="mt-2.5 flex flex-wrap items-baseline gap-x-1 font-display text-[clamp(1.1rem,0.85rem+1.1vw,1.5rem)] font-semibold leading-tight tracking-[-0.03em] tabular-nums">
                    <span className="whitespace-nowrap">{groupDigits(p.uzs)}</span>
                    <span className="text-[13px] font-medium tracking-normal text-ink-3">soʻm</span>
                  </span>
                  <span className="mt-1 text-[13px] tabular-nums text-ink-3">≈ ${p.usd}</span>
                  <span className="mt-auto pt-2.5">
                    <span className="block border-t border-ink/10 pt-2.5 text-[12.5px] tabular-nums text-ink-2">
                      {t.perMonth} {som(p.per_month_uzs)}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="pay-user" className="font-display text-[19px] font-semibold tracking-[-0.02em]">
              {t.stepId}
            </label>
            <input
              ref={idRef}
              id="pay-user"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder={t.idPlaceholder}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              aria-invalid={touched && !idOk}
              aria-describedby={touched && !idOk ? "pay-user-hint pay-user-error" : "pay-user-hint"}
              className={cn(inputClass, "mt-3 font-mono")}
            />
            <p id="pay-user-hint" className="mt-2 text-[13.5px] leading-snug text-ink-3">
              {t.idHint}
            </p>
            {touched && !idOk && <FieldError id="pay-user-error">{t.idInvalid}</FieldError>}
          </div>

          <fieldset>
            <legend className="font-display text-[19px] font-semibold tracking-[-0.02em]">{t.stepCard}</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_8.5rem]">
              <div>
                <label htmlFor="pay-card" className="text-[13.5px] font-medium text-ink-2">
                  {t.cardLabel}
                </label>
                <div className="relative mt-1.5">
                  <input
                    ref={cardRef}
                    id="pay-card"
                    value={card}
                    onChange={(e) => setCard(formatCard(e.target.value))}
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder={t.cardPlaceholder}
                    aria-invalid={touched && !cardOk}
                    aria-describedby={touched && !cardOk ? "pay-card-error" : undefined}
                    className={cn(inputClass, cardBrand(cardDigits) && "pr-20")}
                  />
                  {cardBrand(cardDigits) && (
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-navy-900 px-2 py-0.5 text-[11.5px] font-semibold text-paper">
                      {cardBrand(cardDigits)}
                    </span>
                  )}
                </div>
              </div>
              <div className="max-w-[11rem] sm:max-w-none">
                <label htmlFor="pay-expire" className="text-[13.5px] font-medium text-ink-2">
                  {t.expireLabel}
                </label>
                <input
                  ref={expireRef}
                  id="pay-expire"
                  value={expire}
                  onChange={(e) => setExpire(formatExpire(e.target.value, expire))}
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder={t.expirePlaceholder}
                  aria-invalid={touched && !expireOk}
                  aria-describedby={touched && !expireOk ? "pay-expire-error" : undefined}
                  className={cn(inputClass, "mt-1.5")}
                />
              </div>
            </div>
            {touched && !cardOk && <FieldError id="pay-card-error">{t.cardInvalid}</FieldError>}
            {touched && cardOk && !expireOk && <FieldError id="pay-expire-error">{t.expireInvalid}</FieldError>}
          </fieldset>

          <div className="grid gap-4">
            {error && <Notice tone="error">{error}</Notice>}
            <PrimaryButton busy={busy}>{t.pay.replace("{amount}", som(selected.uzs))}</PrimaryButton>
            <p className="flex items-start gap-2 text-[13px] leading-snug text-ink-3">
              <Lock aria-hidden className="mt-0.5 size-3.5 shrink-0" />
              <span>
                {t.secure}{" "}
                {termsUrl ? (
                  <>
                    {t.agree.split("{terms}")[0]}
                    <a href={termsUrl} className="font-medium text-ink-2 underline decoration-ink/25 underline-offset-[3px] hover:decoration-ink">
                      {t.terms}
                    </a>
                    {t.agree.split("{terms}")[1]}
                  </>
                ) : null}
              </span>
            </p>
          </div>
        </form>
      )}

      {view.step === "sms" && (
        <form noValidate onSubmit={(e) => submitCode(e, view.sms)} className="grid gap-6">
          {testBanner}
          <div>
            <h2 className="font-display text-[22px] font-semibold tracking-[-0.025em]">{t.smsTitle}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">
              {view.sms.phone ? t.smsSent.replace("{phone}", formatPhone(view.sms.phone) ?? "") : t.smsSentUnknown}
            </p>
            <p className="mt-3 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl bg-paper px-3.5 py-2 text-[13.5px] tabular-nums text-ink-2 ring-1 ring-inset ring-ink/10">
              <span className="font-semibold text-ink">{view.sms.label}</span>
              <span>{som(view.sms.amount)}</span>
              {view.sms.card && <span>{view.sms.card}</span>}
            </p>
          </div>
          <div>
            <label htmlFor="pay-code" className="text-[13.5px] font-medium text-ink-2">
              {t.smsLabel}
            </label>
            <input
              ref={codeRef}
              id="pay-code"
              value={code}
              onChange={(e) => setCode(digitsOf(e.target.value).slice(0, 8))}
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="••••••"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "pay-code-error" : undefined}
              className={cn(inputClass, "mt-1.5 h-14 text-center font-display text-[24px] font-semibold tracking-[0.35em]")}
            />
          </div>
          <div className="grid gap-4">
            {error && (
              <div id="pay-code-error">
                <Notice tone="error">{error}</Notice>
              </div>
            )}
            {info && (
              <p role="status" className="flex items-center gap-1.5 text-[13.5px] text-das">
                <Check aria-hidden className="size-4" />
                {info}
              </p>
            )}
            <PrimaryButton busy={busy}>{t.confirm}</PrimaryButton>
            <div className="flex flex-wrap items-center justify-between gap-2 text-[14px]">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setInfo(null);
                  stored(null);
                  setView({ step: "form" });
                }}
                className="inline-flex min-h-11 items-center rounded-lg px-1 font-medium text-ink-2 underline decoration-ink/20 underline-offset-[3px] hover:decoration-ink"
              >
                {t.back}
              </button>
              {resendAt > now ? (
                <span className="inline-flex min-h-11 items-center gap-1.5 tabular-nums text-ink-3" aria-live="off">
                  <Clock aria-hidden className="size-4" />
                  {t.resendIn.replace("{time}", `0:${String(Math.ceil((resendAt - now) / 1000)).padStart(2, "0")}`)}
                </span>
              ) : (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => resend(view.sms)}
                  className="inline-flex min-h-11 items-center rounded-lg px-1 font-medium text-app-text underline decoration-app-text/30 underline-offset-[3px] hover:decoration-app-text disabled:opacity-60"
                >
                  {t.resend}
                </button>
              )}
            </div>
          </div>
        </form>
      )}

      {view.step === "processing" && (
        <div className="grid min-h-[320px] place-items-center text-center" role="status" aria-live="polite">
          <div className="max-w-[26rem]">
            {view.slow ? (
              <Clock aria-hidden className="mx-auto size-10 text-ink-3" />
            ) : (
              <Loader2 aria-hidden className="mx-auto size-10 animate-spin text-app" />
            )}
            <h2 data-focus tabIndex={-1} className="mt-5 font-display text-[22px] font-semibold tracking-[-0.025em] outline-none">
              {t.processing}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{view.slow ? t.processingLong : t.processingNote}</p>
          </div>
        </div>
      )}

      {view.step === "result" && <Result order={view.order} onRestart={restart} />}
    </div>
  );
}

function Result({ order, onRestart }: { order: Order; onRestart: () => void }) {
  const paid = order.state === "paid";
  const lines: Array<[string, string]> = [
    [t.orderNo, order.order_id],
    [t.plan, order.label],
    [t.amount, som(order.amount)],
    ...(order.card ? ([[t.card, order.card]] as Array<[string, string]>) : []),
  ];
  const title = paid ? t.successTitle : order.state === "expired" ? t.expiredTitle : t.failedTitle;
  return (
    <div className="grid gap-6" aria-live="polite">
      <div className="text-center">
        <span
          className={cn(
            "mx-auto grid size-16 place-items-center rounded-full",
            paid ? "bg-das/12 text-das" : "bg-coral/[0.1] text-coral-700",
          )}
        >
          {paid ? <Check aria-hidden className="size-8" strokeWidth={2.6} /> : <CircleX aria-hidden className="size-8" />}
        </span>
        <h2 data-focus tabIndex={-1} className="mt-5 font-display text-[26px] font-semibold tracking-[-0.03em] outline-none">
          {title}
        </h2>
        <div className="mx-auto mt-3 max-w-[30rem] space-y-1.5 text-[15.5px] leading-relaxed text-ink-2">
          {paid && order.grant === "done" && order.premium_until && (
            <>
              <p className="font-semibold text-ink">{t.successUntil.replace("{date}", formatDate(order.premium_until))}</p>
              <p>{t.successReopen}</p>
            </>
          )}
          {paid && order.grant === "pending" && (
            <>
              <p className="inline-flex items-center gap-2 font-semibold text-ink">
                <Loader2 aria-hidden className="size-4 animate-spin" />
                {t.pendingGrant}
              </p>
              <p>{t.pendingLong}</p>
            </>
          )}
          {paid && order.grant === "skipped" && <p>{t.testDone}</p>}
          {paid && order.grant === "done" && !order.premium_until && <p>{t.successReopen}</p>}
          {!paid && <p>{order.state === "expired" ? t.expiredText : order.error}</p>}
        </div>
      </div>
      <dl className="divide-y divide-ink/[0.08] rounded-2xl bg-paper px-4 ring-1 ring-inset ring-ink/10">
        {lines.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 py-3 text-[14.5px]">
            <dt className="text-ink-3">{label}</dt>
            <dd className={cn("text-right font-medium tabular-nums text-ink", label === t.orderNo && "font-mono text-[13.5px]")}>{value}</dd>
          </div>
        ))}
      </dl>
      <button
        type="button"
        onClick={onRestart}
        className="inline-flex h-12 w-full items-center justify-center rounded-full text-[15px] font-semibold text-ink ring-1 ring-inset ring-ink/15 transition-colors hover:bg-ink/[0.04]"
      >
        {paid ? t.again : t.retry}
      </button>
    </div>
  );
}
