import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactDialog } from "@/components/ContactDialog";
import { SampleContentBanner } from "@/components/SampleContentBanner";
import { ArrowRight, Container } from "@/components/ui";
import { isLocale, localePath, locales, type Locale } from "@/lib/i18n/config";
import {
  SHOW_SAMPLE_BANNER,
  getCaseStudies,
  getCaseStudy,
  type CaseStudy,
} from "@/lib/i18n/case-studies";
import { getMessages } from "@/lib/i18n/messages";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getCaseStudies(locale).map((study) => ({ locale, slug: study.slug })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return { title: "Case study not found" };
  const study = getCaseStudy(raw, slug);
  if (!study) return { title: "Case study not found" };

  return {
    title: study.title,
    description: study.summary,
    openGraph: { title: study.title, description: study.summary, type: "article" },
  };
}

function CostBox({ costBox }: { costBox: NonNullable<CaseStudy["costBox"]> }) {
  return (
    <div className="rounded-card border border-line bg-white p-6 shadow-[0_1px_2px_rgb(27_18_40_/_0.04),0_10px_28px_rgb(27_18_40_/_0.05)]">
      <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-violet">
        {costBox.title}
      </h2>
      <dl className="mt-5 divide-y divide-line">
        {costBox.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0"
          >
            <dt className="text-sm text-fg-muted">{row.label}</dt>
            <dd className="shrink-0 font-mono text-sm font-semibold text-fg">{row.value}</dd>
          </div>
        ))}
      </dl>
      {costBox.footnote && (
        <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-fg-subtle">
          {costBox.footnote}
        </p>
      )}
    </div>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getMessages(locale);
  const study = getCaseStudy(locale, slug);
  if (!study) notFound();

  const others = getCaseStudies(locale).filter((s) => s.slug !== study.slug).slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-30" aria-hidden="true" />
        <Container className="relative pb-16 pt-[5.5rem] sm:pb-20 sm:pt-32">
          <Link
            href={localePath(locale, "/work")}
            className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowRight className="rotate-180" /> {t.common.allWork}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
            <span>{study.industry}</span>
            <span aria-hidden="true">·</span>
            <span>{study.duration}</span>
            <span aria-hidden="true">·</span>
            <span>{study.year}</span>
          </div>

          <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
            {study.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{study.summary}</p>
        </Container>
      </section>

      <section className="border-b border-line bg-ink-900">
        <Container className="py-10">
          <dl className="grid gap-8 sm:grid-cols-3">
            {study.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <span className="block font-mono text-3xl font-bold text-violet sm:text-4xl">
                    {metric.value}
                  </span>
                  <span className="mt-2 block text-sm leading-snug text-fg-muted">
                    {metric.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        {SHOW_SAMPLE_BANNER && (
          <div className="mb-10">
            <SampleContentBanner locale={locale} />
          </div>
        )}

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="space-y-6">
            <article className="space-y-5">
              {study.story.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-[1.05rem] leading-relaxed text-fg-muted">
                  {paragraph}
                </p>
              ))}
            </article>

            {study.costBox && <CostBox costBox={study.costBox} />}

            {study.quote && (
              <blockquote className="rounded-card border-l-2 border-accent bg-ink-900 px-6 py-5">
                <p className="text-lg leading-relaxed">&ldquo;{study.quote.text}&rdquo;</p>
                <footer className="mt-4 text-sm text-fg-muted">
                  <span className="font-medium text-fg">{study.quote.author}</span>
                  <span className="mx-2 text-fg-subtle" aria-hidden="true">
                    ·
                  </span>
                  {study.quote.role}
                </footer>
              </blockquote>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-card border border-line bg-ink-900 p-6">
              <h2 className="text-xs uppercase tracking-wider text-fg-subtle">
                {t.common.projectDetails}
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-fg-subtle">{t.common.client}</dt>
                  <dd className="mt-0.5 text-fg">{study.client}</dd>
                </div>
                <div>
                  <dt className="text-fg-subtle">{t.common.industry}</dt>
                  <dd className="mt-0.5 text-fg">{study.industry}</dd>
                </div>
                <div>
                  <dt className="text-fg-subtle">{t.common.duration}</dt>
                  <dd className="mt-0.5 font-mono text-fg">{study.duration}</dd>
                </div>
                <div>
                  <dt className="text-fg-subtle">{t.common.stack}</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {study.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md border border-line bg-ink-850 px-2.5 py-1 font-mono text-[11px] text-fg-muted"
                      >
                        {tool}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 border-t border-line pt-5">
                <ContactDialog
                  locale={locale}
                  label={t.common.discussSimilar}
                  size="md"
                  className="w-full"
                />
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {others.length > 0 && (
        <section className="border-t border-line bg-ink-900/40">
          <Container className="py-16">
            <h2 className="text-xl font-semibold">{t.common.moreWork}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={localePath(locale, `/work/${other.slug}`)}
                  className="group rounded-card border border-line bg-ink-900 p-6 transition-colors hover:border-accent-dim"
                >
                  <p className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
                    {other.industry}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold leading-snug">{other.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet">
                    {t.common.readCaseStudy}{" "}
                    <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
