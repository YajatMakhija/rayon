import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactDialog } from "@/components/ContactDialog";
import { ButtonLink, Card, Container, Section, SectionHeading } from "@/components/ui";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getContact } from "@/lib/i18n/contacts";
import { getFaqs, getProcessSteps, getServices } from "@/lib/i18n/content";
import { getMessages } from "@/lib/i18n/messages";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getMessages(raw);
  return {
    title: t.servicesPage.eyebrow,
    description: t.servicesPage.lead,
  };
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" aria-hidden="true">
      <path
        d="m3.5 8.5 3 3 6-6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function ServicesPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getMessages(locale);
  const contact = getContact(locale);
  const services = getServices(locale);
  const processSteps = getProcessSteps(locale);
  const faqs = getFaqs(locale).filter(
    (faq) =>
      !/price|pricing|tarif/i.test(faq.question) && !/[€$]/.test(faq.answer),
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-30" aria-hidden="true" />
        <Container className="relative pb-16 pt-[5.5rem] sm:pb-20 sm:pt-32">
          <p className="eyebrow">{t.servicesPage.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            {t.servicesPage.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{t.servicesPage.lead}</p>
        </Container>
      </section>

      <Section>
        <div className="space-y-6">
          {services.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              className="scroll-mt-28 rounded-card border border-line bg-ink-900 p-6 shadow-[0_1px_2px_rgb(27_18_40_/_0.04),0_10px_28px_rgb(27_18_40_/_0.05)] sm:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <p className="text-xs font-bold text-violet">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">{service.title}</h2>
                  <p className="mt-3 leading-relaxed text-fg-muted">{service.summary}</p>

                  <ul className="mt-6 space-y-3">
                    {service.outcomes.map((outcome) => (
                      <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
                        <CheckIcon />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-line bg-violet-soft/60 p-5">
                  <dl>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-fg-subtle">
                        {t.common.timeline}
                      </dt>
                      <dd className="mt-1 font-mono text-xl font-bold text-fg">{service.timeline}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 border-t border-line pt-5">
                    <ContactDialog
                      locale={locale}
                      label={t.common.discussService}
                      size="md"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line bg-violet-soft/40">
        <SectionHeading
          eyebrow={t.servicesPage.processEyebrow}
          title={t.servicesPage.processTitle}
          lead={t.servicesPage.processLead}
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <li
              key={step.number}
              className="rounded-card border border-line bg-ink-900 p-5 shadow-[0_1px_2px_rgb(27_18_40_/_0.04)]"
            >
              <p className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-fg">
                {step.number}
              </p>
              <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading eyebrow={t.servicesPage.faqEyebrow} title={t.servicesPage.faqTitle} />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <h3 className="text-base font-semibold">{faq.question}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden border-t border-line bg-violet-deep">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 20% 50%, rgba(245,196,0,0.35), transparent 60%)",
          }}
        />
        <Container className="relative py-16 text-center sm:py-20">
          <h2 className="text-3xl font-bold text-white">{t.servicesPage.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/65">
            {t.servicesPage.ctaLead}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ContactDialog locale={locale} size="lg" />
            {contact.phones.map((phone) => (
              <ButtonLink
                key={phone.phoneHref}
                href={`tel:${phone.phoneHref}`}
                variant="secondary"
                size="lg"
                className="border-white/20 bg-white/10 text-white hover:border-accent hover:bg-white/15 hover:text-white"
              >
                {phone.label}: {phone.phoneDisplay}
              </ButtonLink>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
