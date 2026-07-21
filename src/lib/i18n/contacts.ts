import type { Locale } from "./config";

export const phones = [
  {
    labelEn: "English",
    labelFr: "Anglais",
    phoneDisplay: "0091-8527495335",
    phoneHref: "+918527495335",
  },
  {
    labelEn: "French",
    labelFr: "Français",
    phoneDisplay: "0091-9868607853",
    phoneHref: "+919868607853",
  },
] as const;

export function getContact(locale: Locale) {
  return {
    phones: phones.map((phone) => ({
      ...phone,
      label: locale === "fr" ? phone.labelFr : phone.labelEn,
    })),
    /** Primary number for single-CTA spots (English line) */
    phoneDisplay: phones[0].phoneDisplay,
    phoneHref: phones[0].phoneHref,
    email: "yajatmakhija@rayonintel.com",
    emailAlt: "yajatmakhijaofficial@gmail.com",
    location: locale === "fr" ? "À distance · Monde entier" : "Remote · Worldwide",
    responseTime:
      locale === "fr"
        ? "Nous répondons à chaque demande sous un jour ouvré."
        : "We reply to every enquiry within one business day.",
  };
}
