import type { Locale } from "@/lib/i18n/config";
import { getContact } from "@/lib/i18n/contacts";

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={12}
      height={12}
      className="shrink-0"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5.6 2.5 6.9 5.2 5.5 6.4a7.6 7.6 0 0 0 4.1 4.1l1.2-1.4 2.7 1.3v2.2c0 .6-.5 1-1.1 1A11 11 0 0 1 2.1 3.6c0-.6.4-1.1 1-1.1h2.5Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={12}
      height={12}
      className="shrink-0"
      fill="none"
      aria-hidden="true"
    >
      <rect x="1.8" y="3.5" width="12.4" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="m2.4 4.5 5.6 4 5.6-4" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

export function TopBar({ locale }: { locale: Locale }) {
  const contact = getContact(locale);

  return (
    <div className="topbar-shimmer relative z-[60] overflow-hidden bg-accent text-fg">
      <div className="relative mx-auto flex h-8 max-w-6xl items-center gap-x-5 overflow-x-auto px-5 text-xs sm:px-8">
        {contact.phones.map((phone) => (
          <a
            key={phone.phoneHref}
            href={`tel:${phone.phoneHref}`}
            title={`Call ${phone.label}: ${phone.phoneDisplay}`}
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-medium hover:opacity-75"
          >
            <PhoneIcon />
            <span>
              <span className="font-semibold">{phone.label}</span>
              <span className="mx-1 text-fg/50" aria-hidden="true">
                ·
              </span>
              <span className="font-mono">{phone.phoneDisplay}</span>
            </span>
          </a>
        ))}

        <a
          href={`mailto:${contact.email}`}
          title={`Email ${contact.email}`}
          className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-medium hover:opacity-75"
        >
          <MailIcon />
          <span>{contact.email}</span>
        </a>

        <a
          href={`mailto:${contact.emailAlt}`}
          title={`Email ${contact.emailAlt}`}
          className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-medium hover:opacity-75"
        >
          <MailIcon />
          <span>{contact.emailAlt}</span>
        </a>
      </div>
    </div>
  );
}
