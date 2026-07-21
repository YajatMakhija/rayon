import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactDialog } from "@/components/ContactDialog";
import { ButtonLink, Card, Container, Section, SectionHeading } from "@/components/ui";
import { isLocale, localePath, type Locale } from "@/lib/i18n/config";
import { getContact } from "@/lib/i18n/contacts";
import { getMessages } from "@/lib/i18n/messages";
import { site } from "@/lib/site";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getMessages(raw);
  return {
    title: t.aboutPage.eyebrow,
    description: t.aboutPage.lead,
  };
}

/**
 * Founder — shown on About. Role and bio come from locale messages.
 */
const teamMeta = {
  name: "Yajat Makhija",
  initials: "YM",
  linkedin: site.founder.linkedin,
};

export default async function AboutPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getMessages(locale);
  const contact = getContact(locale);
  const team = [
    {
      ...teamMeta,
      role: t.aboutPage.founderRole,
      bio: t.aboutPage.founderBio,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-30" aria-hidden="true" />
        <Container className="relative pb-16 pt-[5.5rem] sm:pb-20 sm:pt-32">
          <p className="eyebrow">{t.aboutPage.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            {t.aboutPage.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{t.aboutPage.lead}</p>
        </Container>
      </section>

      <Section>
        <SectionHeading
          eyebrow={t.aboutPage.principlesEyebrow}
          title={t.aboutPage.principlesTitle}
          lead={t.aboutPage.principlesLead}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.aboutPage.principles.map((principle) => (
            <Card key={principle.title} className="hover:border-line-strong">
              <h3 className="text-base font-semibold">{principle.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{principle.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line bg-violet-soft/40">
        <SectionHeading
          eyebrow={t.aboutPage.teamEyebrow}
          title={t.aboutPage.teamTitle}
          lead={t.aboutPage.teamLead}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <Card key={member.name}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent font-mono text-sm font-bold text-fg">
                {member.initials}
              </div>
              <h3 className="mt-4 text-lg font-bold">{member.name}</h3>
              <p className="mt-0.5 text-sm font-semibold text-violet">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{member.bio}</p>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm text-fg-muted underline underline-offset-4 transition-colors hover:text-fg"
                >
                  LinkedIn
                </a>
              )}
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">{t.aboutPage.takeOnTitle}</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-fg-muted">
              {t.aboutPage.takeOn.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{t.aboutPage.declineTitle}</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-fg-muted">
              {t.aboutPage.decline.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
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
          <h2 className="text-3xl font-bold text-white">{t.aboutPage.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/65">
            {contact.responseTime}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ContactDialog locale={locale} size="lg" />
            <ButtonLink
              href={localePath(locale, "/contact")}
              variant="secondary"
              size="lg"
              className="border-white/20 bg-white/10 text-white hover:border-accent hover:bg-white/15 hover:text-white"
            >
              {t.common.contactDetails}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
