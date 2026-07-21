export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeCookie = "NEXT_LOCALE";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** English has no prefix; French lives under /fr. */
export function localePath(locale: Locale, path = "") {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  if (locale === defaultLocale) {
    return normalized || "/";
  }
  return `/${locale}${normalized}`;
}

/** Strip a leading locale segment from a pathname. */
export function stripLocale(pathname: string) {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) {
    const rest = parts.slice(2).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}
