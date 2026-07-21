"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/components/ui";
import { defaultLocale, localeCookie, localePath, stripLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const t = getMessages(locale);
  const bare = stripLocale(pathname);

  return (
    <div
      className="inline-flex items-center rounded-lg border border-line bg-ink-900/80 p-0.5 text-xs font-semibold"
      role="group"
      aria-label={t.common.language}
    >
      {(["en", "fr"] as const).map((code) => {
        const href = localePath(code, bare === "/" ? "" : bare);
        const active = code === locale;
        return (
          <Link
            key={code}
            href={href}
            hrefLang={code}
            prefetch={false}
            onClick={() => {
              document.cookie = `${localeCookie}=${code};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
            }}
            className={cx(
              "rounded-md px-2.5 py-1.5 uppercase tracking-wide transition-colors",
              active ? "bg-accent text-fg" : "text-fg-muted hover:text-fg",
            )}
          >
            {code === defaultLocale ? "EN" : "FR"}
          </Link>
        );
      })}
    </div>
  );
}
