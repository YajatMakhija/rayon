import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactDialog } from "@/components/ContactDialog";
import { SampleContentBanner } from "@/components/SampleContentBanner";
import { ArrowRight, Container, Section } from "@/components/ui";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { SHOW_SAMPLE_BANNER, getCaseStudies } from "@/lib/i18n/case-studies";
import { getMessages } from "@/lib/i18n/messages";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getMessages(raw);
  return {
    title: t.workPage.eyebrow,
    description: t.workPage.lead,
  };
}

export default async function WorkPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getMessages(locale);
  const caseStudies = getCaseStudies(locale);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-30" aria-hidden="true" />
        <Container className="relative pb-16 pt-[5.5rem] sm:pb-20 sm:pt-32">
          <p className="eyebrow">{t.workPage.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            {t.workPage.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{t.workPage.lead}</p>
        </Container>
      </section>

      <Section>
        {SHOW_SAMPLE_BANNER && (
          <div className="mb-10">
            <SampleContentBanner locale={locale} />
          </div>
        )}

        <div className="space-y-6">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={localePath(locale, `/work/${study.slug}`)}
              className="group block rounded-card border border-line bg-ink-900 p-6 shadow-[0_1px_2px_rgb(27_18_40_/_0.04),0_10px_28px_rgb(27_18_40_/_0.05)] transition-all hover:border-accent-dim hover:shadow-[0_8px_28px_rgb(27_18_40_/_0.1)] sm:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
                    <span>{study.industry}</span>
                    <span aria-hidden="true">·</span>
                    <span>{study.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span>{study.year}</span>
                  </div>

                  <h2 className="mt-3 text-2xl font-semibold leading-snug">{study.title}</h2>
                  <p className="mt-3 max-w-xl leading-relaxed text-fg-muted">{study.summary}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {study.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md border border-line bg-ink-850 px-2.5 py-1 font-mono text-[11px] text-fg-muted"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet">
                    {t.common.readCaseStudy}{" "}
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>

                <dl className="grid grid-cols-1 gap-5 rounded-xl border border-line bg-violet-soft/50 p-5 sm:grid-cols-3 lg:grid-cols-1">
                  {study.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="sr-only">{metric.label}</dt>
                      <dd>
                        <span className="block font-mono text-2xl font-bold text-violet">
                          {metric.value}
                        </span>
                        <span className="mt-1 block text-xs leading-snug text-fg-subtle">
                          {metric.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Link>
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
          <h2 className="text-3xl font-bold text-white">{t.workPage.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/65">{t.workPage.ctaLead}</p>
          <div className="mt-8 flex justify-center">
            <ContactDialog locale={locale} size="lg" />
          </div>
        </Container>
      </section>
    </>
  );
}
