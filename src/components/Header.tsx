"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ContactDialog } from "@/components/ContactDialog";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { cx } from "@/components/ui";
import { localePath, stripLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const barePath = stripLocale(pathname);
  const t = getMessages(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const nav = [
    { label: t.nav.services, href: localePath(locale, "/services") },
    { label: t.nav.work, href: localePath(locale, "/work") },
    { label: t.nav.about, href: localePath(locale, "/about") },
    { label: t.nav.contact, href: localePath(locale, "/contact") },
  ];

  const [menuPathname, setMenuPathname] = useState(pathname);
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none sticky top-0 z-50 bg-transparent px-3 py-3 sm:px-5 sm:py-3.5">
      <div
        className={cx(
          "pointer-events-auto mx-auto max-w-6xl overflow-hidden border transition-[background-color,box-shadow,backdrop-filter,border-color] duration-300",
          open ? "rounded-3xl" : "rounded-full",
          scrolled
            ? "border-white/50 bg-white/55 shadow-[0_8px_32px_rgb(27_18_40_/_0.14)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/40"
            : "border-line/40 bg-white shadow-[0_4px_24px_rgb(27_18_40_/_0.08)]",
        )}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 sm:gap-4 sm:px-5 sm:py-3">
          <Logo locale={locale} />

          <nav aria-label="Main" className="hidden items-center gap-0.5 md:flex">
            {nav.map((item) => {
              const itemBare = stripLocale(item.href);
              const active = barePath === itemBare || barePath.startsWith(`${itemBare}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                    active ? "bg-violet-soft text-violet" : "text-fg-muted hover:bg-ink-850 hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2.5 md:flex">
            <LanguageSwitcher locale={locale} />
            <ContactDialog locale={locale} />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-full p-2 text-fg-muted transition-colors hover:bg-ink-850 hover:text-fg md:hidden"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
              {open ? (
                <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div
            id="mobile-nav"
            className="border-t border-line/60 bg-white/90 px-4 py-3 backdrop-blur-md md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-2.5 text-sm font-medium text-fg-muted transition-colors hover:bg-ink-850 hover:text-fg"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-3 px-1 pb-1">
                <LanguageSwitcher locale={locale} />
                <ContactDialog locale={locale} size="md" className="w-full" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
