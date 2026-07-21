import Link from "next/link";
import { Logo } from "@/components/Logo";
import { localePath, type Locale } from "@/lib/i18n/config";
import { getContact } from "@/lib/i18n/contacts";
import { getMessages } from "@/lib/i18n/messages";
import { site } from "@/lib/site";

const highlight =
  "inline-flex font-bold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-white hover:decoration-accent";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const t = getMessages(locale);
  const contact = getContact(locale);
  const columns = [
    {
      heading: t.footer.company,
      links: [
        { label: t.nav.services, href: localePath(locale, "/services") },
        { label: t.nav.work, href: localePath(locale, "/work") },
        { label: t.nav.about, href: localePath(locale, "/about") },
        { label: t.nav.contact, href: localePath(locale, "/contact") },
      ],
    },
    {
      heading: t.footer.legal,
      links: [
        { label: t.footer.privacy, href: localePath(locale, "/privacy") },
        { label: t.footer.terms, href: localePath(locale, "/terms") },
      ],
    },
  ];

  return (
    <footer className="bg-violet-deep text-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo locale={locale} inverted />
            <p className="mt-4 text-sm leading-relaxed text-white/65">{t.meta.tagline}.</p>

            <dl className="mt-6 space-y-3 text-sm">
              <div>
                <dt className="sr-only">{t.common.phone}</dt>
                <dd className="flex flex-col gap-2">
                  {contact.phones.map((phone) => (
                    <a key={phone.phoneHref} href={`tel:${phone.phoneHref}`} className={highlight}>
                      {phone.label}: {phone.phoneDisplay}
                    </a>
                  ))}
                </dd>
              </div>
              <div className="flex flex-col gap-2">
                <dt className="sr-only">{t.common.email}</dt>
                <dd>
                  <a href={`mailto:${contact.email}`} className={highlight}>
                    {contact.email}
                  </a>
                </dd>
                <dd>
                  <a href={`mailto:${contact.emailAlt}`} className={highlight}>
                    {contact.emailAlt}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="sr-only">{t.common.location}</dt>
                <dd className="text-white/55">{contact.location}</dd>
              </div>
            </dl>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-accent">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/45">
            © {year} {site.legalName}. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <span className="font-semibold text-white/80">{site.founder.name}</span>
            <a
              href={site.founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/45 transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
