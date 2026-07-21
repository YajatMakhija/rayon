import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactDialog } from "@/components/ContactDialog";
import { LogoRibbon } from "@/components/LogoRibbon";
import { CountUpValue, HeroAtmosphere, Reveal } from "@/components/Motion";
import { WorkflowDiagram } from "@/components/WorkflowDiagram";
import {
  ArrowRight,
  ButtonLink,
  Card,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getCaseStudies } from "@/lib/i18n/case-studies";
import { getContact } from "@/lib/i18n/contacts";
import { getFaqs, getProcessSteps, getServices } from "@/lib/i18n/content";
import { getMessages } from "@/lib/i18n/messages";
import { site } from "@/lib/site";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
  const featured = getCaseStudies(locale).slice(0, 3);

  return (
    <>
      <HeroAtmosphere>
        <div
          className="pointer-events-none absolute inset-0 z-0 grid-backdrop animate-grid-drift opacity-90"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[480px] glow-accent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[480px] glow-violet"
          aria-hidden="true"
        />

        <Container className="relative z-[2] pb-20 pt-[5.5rem] sm:pb-28 sm:pt-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div className="min-w-0 animate-rise">
              <p className="eyebrow">{t.home.eyebrow}</p>

              <h1 className="mt-5 text-4xl font-bold leading-[1.06] sm:text-5xl lg:text-[3.5rem]">
                {t.home.titleBefore}
                <span className="text-violet">{t.home.titleAccent}</span>
                {t.home.titleAfter}
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">{t.home.lead}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ContactDialog locale={locale} size="lg" />
                <ButtonLink href={localePath(locale, "/work")} variant="secondary" size="lg">
                  {t.common.seeOurWork} <ArrowRight />
                </ButtonLink>
              </div>

              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fg-muted">
                <span>
                  {t.home.builtBy}{" "}
                  <span className="font-semibold text-fg">{site.founder.name}</span>
                </span>
                <span className="text-fg-subtle" aria-hidden="true">
                  ·
                </span>
                <a
                  href={site.founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-violet underline decoration-violet/30 underline-offset-4 transition-colors hover:text-fg hover:decoration-violet"
                >
                  LinkedIn
                </a>
              </p>

              <ul className="mt-8 space-y-2.5 text-sm text-fg-muted">
                {t.home.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm text-fg-subtle">
                {t.home.preferTalk}{" "}
                {contact.phones.map((phone, i) => (
                  <span key={phone.phoneHref}>
                    {i > 0 ? " · " : null}
                    <a
                      href={`tel:${phone.phoneHref}`}
                      className="font-semibold text-violet transition-colors hover:text-fg"
                    >
                      {phone.label}: {phone.phoneDisplay}
                    </a>
                  </span>
                ))}
              </p>
            </div>

            <div className="relative hidden min-h-[240px] min-w-0 lg:block">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="w-[85%] max-w-md">
                  <WorkflowDiagram />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </HeroAtmosphere>

      <LogoRibbon locale={locale} />

      <Section>
        <SectionHeading
          eyebrow={t.home.problemEyebrow}
          title={t.home.problemTitle}
          lead={t.home.problemLead}
        />

        <div className="mt-12 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.home.problems.map((item, i) => (
            <Reveal key={item.title} delayMs={i * 90} className="h-full">
              <Card className="h-full">
                <div className="mb-3 h-1 w-10 rounded-full bg-accent" />
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{item.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line bg-violet-soft/40">
        <SectionHeading
          eyebrow={t.home.servicesEyebrow}
          title={t.home.servicesTitle}
          lead={t.home.servicesLead}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.slug} delayMs={i * 90}>
              <Card className="flex h-full flex-col">
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{service.summary}</p>

                <dl className="mt-5 border-t border-line pt-4 text-sm">
                  <div>
                    <dt className="text-xs font-medium text-fg-subtle">{t.common.timeline}</dt>
                    <dd className="mt-0.5 font-mono font-semibold text-fg">{service.timeline}</dd>
                  </div>
                </dl>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href={localePath(locale, "/services")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet transition-colors hover:text-fg"
          >
            {t.common.fullServiceDetails} <ArrowRight />
          </Link>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow={t.home.workEyebrow}
          title={t.home.workTitle}
          lead={t.home.workLead}
        />

        <div className="mt-12 grid gap-5 lg:max-w-2xl lg:grid-cols-1">
          {featured.map((study, i) => (
            <Reveal key={study.slug} delayMs={i * 100}>
              <Link
                href={localePath(locale, `/work/${study.slug}`)}
                className="group flex flex-col rounded-card border border-line bg-ink-900 p-6 shadow-[0_1px_2px_rgb(27_18_40_/_0.04),0_10px_28px_rgb(27_18_40_/_0.05)] transition-all hover:border-accent-dim hover:shadow-[0_8px_28px_rgb(27_18_40_/_0.1)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet">
                  {study.industry}
                </p>
                <h3 className="mt-3 text-lg font-bold leading-snug">{study.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{study.summary}</p>

                <div className="mt-5 grid gap-4 border-t border-line pt-4 sm:grid-cols-3">
                  {study.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="font-mono text-xl font-bold text-violet sm:text-2xl">
                        <CountUpValue value={metric.value} />
                      </p>
                      <p className="mt-1 text-xs text-fg-subtle">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet">
                  {t.common.readCaseStudy}{" "}
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line bg-ink-850/50">
        <SectionHeading
          eyebrow={t.home.processEyebrow}
          title={t.home.processTitle}
          lead={t.home.processLead}
        />

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li key={step.number}>
              <Reveal delayMs={i * 90}>
                <div className="rounded-card border border-line bg-ink-900 p-5 shadow-[0_1px_2px_rgb(27_18_40_/_0.04)]">
                  <p className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-fg">
                    {step.number}
                  </p>
                  <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading eyebrow={t.home.faqEyebrow} title={t.home.faqTitle} />

        <Reveal>
          <div className="mt-10 divide-y divide-[var(--color-line)] overflow-hidden rounded-card border border-line bg-ink-900 shadow-[0_1px_2px_rgb(27_18_40_/_0.04)]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group px-5 py-5 sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                  {faq.question}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-soft text-violet transition-transform group-open:rotate-45">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Section>

      <section className="relative overflow-hidden border-t border-line bg-violet-deep">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 20% 50%, rgba(245,196,0,0.35), transparent 60%), radial-gradient(ellipse 50% 60% at 90% 30%, rgba(255,216,77,0.18), transparent 55%)",
          }}
        />
        <Container className="relative py-20 text-center sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            {t.home.ctaEyebrow}
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            {t.home.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/65">{t.home.ctaLead}</p>

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

          <p className="mt-6 text-sm text-white/45">{contact.responseTime}</p>
        </Container>
      </section>
    </>
  );
}
