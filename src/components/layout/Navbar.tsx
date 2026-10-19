"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks, startCta } from "@/content/navigation";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

/** Joriy sahifa: "/narxlar" yoki uning ichki manzillari. */
function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar({ statusNote }: { statusNote: string }) {
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 12,
    () => false,
  );
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);
  const condensed = scrolled && !open;

  // Brauzerning «Orqaga/Oldinga» tugmasi bilan sahifa almashsa ham menyu yopiladi.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  return (
    <header className="surface-dark fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto transition-[max-width,padding,margin] duration-500 ease-out-expo",
          condensed ? "mt-2 max-w-[1184px] px-2.5 sm:px-4" : "mt-0 max-w-[1240px] px-0",
        )}
      >
        <nav
          aria-label="Asosiy"
          className={cn(
            "flex h-16 items-center gap-4 rounded-2xl px-5 transition-[background-color,box-shadow,padding] duration-500 ease-out-expo sm:px-8",
            condensed
              ? "bg-navy-900/[0.92] shadow-[0_16px_40px_-16px_rgb(3_7_18/0.6)] ring-1 ring-white/10 backdrop-blur-xl sm:px-5"
              : "bg-transparent",
          )}
        >
          <Link href="/" aria-label="DeutschUz — bosh sahifa" className="-m-1 rounded-xl p-1">
            <Logo />
          </Link>

          <ul className="ml-auto hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = isCurrent(pathname, link.href);
              return (
                <li key={link.href} className="relative">
                  {isActive && (
                    <m.span
                      layoutId="nav-active"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-white/[0.1] ring-1 ring-inset ring-white/10"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-[14.5px] font-medium transition-colors duration-200",
                      isActive ? "text-paper" : "text-paper/70 hover:text-paper",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href={startCta.href}
            aria-current={isCurrent(pathname, startCta.href) ? "page" : undefined}
            className="group hidden h-10 items-center gap-1.5 rounded-full bg-sun pl-4 pr-3.5 text-[14px] font-semibold text-navy-900 transition-[background-color,transform] duration-300 ease-out-expo hover:-translate-y-px hover:bg-[#ffdb63] active:scale-[0.98] lg:inline-flex"
          >
            {startCta.label}
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
            className="relative ml-auto grid size-11 place-items-center rounded-xl text-paper ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/[0.06] lg:hidden"
          >
            <AnimatePresence initial={false} mode="wait">
              <m.span
                key={open ? "close" : "open"}
                initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                className="grid place-items-center"
              >
                {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
              </m.span>
            </AnimatePresence>
          </button>
        </nav>
      </div>

      <MobileMenu open={open} onClose={close} pathname={pathname} statusNote={statusNote} toggleRef={toggleRef} />
    </header>
  );
}

function MobileMenu({
  open,
  onClose,
  pathname,
  statusNote,
  toggleRef,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  statusNote: string;
  toggleRef: RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const focusables = () =>
      [toggleRef.current, ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [])].filter(
        (el): el is HTMLElement => el !== null,
      );
    const frame = requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open, onClose, toggleRef]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="menu"
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menyu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 -z-10 flex flex-col overflow-y-auto bg-navy-950 px-5 pb-8 pt-24 sm:px-8 lg:hidden"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-dark mask-radial opacity-60" />
          <ul className="relative">
            {navLinks.map((link, index) => {
              const isActive = isCurrent(pathname, link.href);
              return (
                <m.li
                  key={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + index * 0.05, duration: 0.5, ease: EASE }}
                  className="border-b border-white/10"
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className="group flex min-h-16 items-center justify-between py-3 font-display text-[28px] font-semibold tracking-[-0.03em] text-paper"
                  >
                    <span className={cn("transition-colors", isActive && "text-sun")}>{link.label}</span>
                    <ArrowRight aria-hidden className="size-5 text-paper/40 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </m.li>
              );
            })}
          </ul>
          <m.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 + navLinks.length * 0.05, duration: 0.5, ease: EASE }}
            className="relative mt-auto pt-10"
          >
            <Link
              href={startCta.href}
              onClick={onClose}
              className="flex h-14 items-center justify-center gap-2 rounded-full bg-sun text-[16px] font-semibold text-navy-900"
            >
              {startCta.label}
              <ArrowRight aria-hidden className="size-[18px]" />
            </Link>
            <p className="mt-4 text-center text-[13.5px] text-paper/60">{statusNote}</p>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
