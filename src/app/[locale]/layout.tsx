import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { GoogleTag } from "@/components/GoogleTag";
import { Header } from "@/components/Header";
import { TopBar } from "@/components/TopBar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getContact } from "@/lib/i18n/contacts";
import { getMessages } from "@/lib/i18n/messages";
import { site } from "@/lib/site";

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw;
  const t = getMessages(locale);

  return {
    title: {
      default: `${site.name} — ${t.meta.tagline}`,
      template: `%s · ${site.name}`,
    },
    description: t.meta.description,
    alternates: {
      languages: {
        en: site.url,
        fr: `${site.url}/fr`,
        "x-default": site.url,
      },
    },
    openGraph: {
      type: "website",
      url: locale === "fr" ? `${site.url}/fr` : site.url,
      siteName: site.name,
      title: `${site.name} — ${t.meta.tagline}`,
      description: t.meta.description,
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${t.meta.tagline}`,
      description: t.meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getMessages(locale);
  const contact = getContact(locale);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    description: t.meta.description,
    email: contact.email,
    telephone: contact.phoneHref,
    areaServed: "Worldwide",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phoneHref,
      email: contact.email,
      contactType: "sales",
      availableLanguage: ["English", "French"],
    },
  };

  return (
    <html
      lang={locale}
      className={`${display.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <GoogleTag />
      </head>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-fg"
        >
          {t.nav.skipToContent}
        </a>
        <TopBar locale={locale} />
        <Header locale={locale} />
        {/* Pull hero under the transparent header chrome so only the pill stays white */}
        <main id="main" className="relative z-0 -mt-[4.5rem] flex-1">
          {children}
        </main>
        <Footer locale={locale} />
        <WhatsAppButton label={locale === "fr" ? "Écrire sur WhatsApp" : "Chat on WhatsApp"} />
      </body>
    </html>
  );
}
