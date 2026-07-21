import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/ui";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getContact } from "@/lib/i18n/contacts";
import { getFaqs } from "@/lib/i18n/content";
import { getMessages } from "@/lib/i18n/messages";

type Params = { params: Promise<{ locale: string }> };

const highlightClass =
  "rounded-md bg-violet-soft px-2 py-1 font-bold text-violet ring-1 ring-violet/20 transition-colors hover:bg-accent hover:text-fg";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw;
  const t = getMessages(locale);
  const contact = getContact(locale);
  return {
    title: t.contactPage.eyebrow,
    description: `${t.contactPage.lead} ${contact.responseTime}`,
  };
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line py-4 first:border-t-0 first:pt-0">
      <dt className="text-xs uppercase tracking-wider text-fg-subtle">{label}</dt>
      <dd className="mt-1.5 text-fg">{children}</dd>
    </div>
  );
}

export default async function ContactPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getMessages(locale);
  const contact = getContact(locale);
  const faqs = getFaqs(locale).filter(
    (faq) =>
      !/price|pricing|tarif/i.test(faq.question) && !/[€$]/.test(faq.answer),
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-30" aria-hidden="true" />
        <Container className="relative pb-16 pt-[5.5rem] sm:pb-20 sm:pt-32">
          <p className="eyebrow">{t.contactPage.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            {t.contactPage.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{t.contactPage.lead}</p>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="text-xl font-semibold">{t.common.reachUs}</h2>
            <dl className="mt-6">
              <Row label={t.common.phone}>
                <div className="flex flex-col gap-2">
                  {contact.phones.map((phone) => (
                    <a
                      key={phone.phoneHref}
                      href={`tel:${phone.phoneHref}`}
                      className={`text-lg ${highlightClass}`}
                    >
                      <span className="font-semibold">{phone.label}</span>
                      <span className="mx-1.5 text-fg-subtle" aria-hidden="true">
                        ·
                      </span>
                      <span className="font-mono">{phone.phoneDisplay}</span>
                    </a>
                  ))}
                </div>
              </Row>
              <Row label={t.common.email}>
                <div className="flex flex-col gap-2">
                  <a href={`mailto:${contact.email}`} className={`text-lg ${highlightClass}`}>
                    {contact.email}
                  </a>
                  <a href={`mailto:${contact.emailAlt}`} className={`text-lg ${highlightClass}`}>
                    {contact.emailAlt}
                  </a>
                </div>
              </Row>
              <Row label={t.common.location}>{contact.location}</Row>
              <Row label={t.common.responseTime}>
                <span className="text-fg-muted">{contact.responseTime}</span>
              </Row>
            </dl>

            <div className="mt-10 rounded-card border border-line bg-violet-soft/50 p-6">
              <h3 className="text-base font-bold">{t.common.whatHappensNext}</h3>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed text-fg-muted">
                {t.contactPage.nextSteps.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-mono font-bold text-violet">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="self-start rounded-card border border-line bg-ink-900 p-6 shadow-[0_1px_2px_rgb(27_18_40_/_0.04),0_10px_28px_rgb(27_18_40_/_0.05)] sm:p-8">
            <h2 className="text-xl font-bold">{t.common.sendEnquiry}</h2>
            <p className="mt-2 mb-6 text-sm text-fg-muted">
              {t.common.fieldsRequired.split("*")[0]}
              <span className="text-danger">*</span>
              {t.common.fieldsRequired.split("*")[1]}
            </p>
            <ContactForm locale={locale} />
          </div>
        </div>
      </Container>

      <section className="border-t border-line bg-ink-900/40">
        <Container className="py-16">
          <h2 className="text-2xl font-semibold">{t.common.commonQuestions}</h2>
          <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-base font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
