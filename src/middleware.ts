import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, localeCookie, type Locale } from "@/lib/i18n/config";

/** Prefer cookie, then France geo, then primary Accept-Language tag. */
function detectLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(localeCookie)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code") ||
    (request as { geo?: { country?: string } }).geo?.country;

  if (country?.toUpperCase() === "FR") return "fr";

  const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const primary = accept.split(",")[0]?.trim().split(";")[0]?.trim() ?? "";
  if (primary === "fr" || primary.startsWith("fr-")) return "fr";

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Old /en URLs → unprefixed English
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/en" ? "/" : pathname.slice(3) || "/";
    const response = NextResponse.redirect(url);
    response.cookies.set(localeCookie, "en", { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  // French stays prefixed — always honor explicit /fr visits
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    const response = NextResponse.next();
    response.cookies.set(localeCookie, "fr", { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  const locale = detectLocale(request);

  // Auto-send first-time FR visitors to /fr. Cookie=en keeps unprefixed English.
  if (locale === "fr") {
    const url = request.nextUrl.clone();
    url.pathname = `/fr${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set(localeCookie, "fr", { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  // English: rewrite internally to /en… so [locale] routes still work
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.rewrite(url);
  response.cookies.set(localeCookie, "en", { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
