import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getContact } from "@/lib/i18n/contacts";
import { getMessages } from "@/lib/i18n/messages";
import { site } from "@/lib/site";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return {
    title: "Privacy policy",
    description: `How ${site.name} handles the personal information you share with us.`,
    robots: { index: true, follow: false },
  };
}

/**
 * ⚠️ TEMPLATE — this is a plain-language starting point, not legal advice.
 * Have it reviewed against the law that applies to you (DPDP Act in India,
 * GDPR in the EU/UK) before launch, and update the "last reviewed" date.
 */
const LAST_REVIEWED = "Not yet reviewed — update this date once a lawyer has checked this page";

function Block({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="text-xl font-semibold">{heading}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-fg-muted">{children}</div>
    </section>
  );
}

export default async function PrivacyPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getMessages(locale);
  const contact = getContact(locale);

  return (
    <Container className="max-w-3xl pb-16 pt-[5.5rem] sm:pb-20 sm:pt-32">
      <p className="eyebrow">{t.common.legal}</p>
      <h1 className="mt-4 text-4xl font-semibold">Privacy policy</h1>
      <p className="mt-3 font-mono text-xs text-fg-subtle">
        {t.common.lastReviewed}: {LAST_REVIEWED}
      </p>

      <p className="mt-8 leading-relaxed text-fg-muted">
        This policy explains what {site.legalName} collects when you use {site.domain}, why we
        collect it, and what you can ask us to do about it.
      </p>

      <div className="mt-12 space-y-8">
        <Block heading="What we collect">
          <p>
            When you submit the contact form we collect the name, email address, and any company
            name, phone number, and message you choose to provide.
          </p>
          <p>
            Our server records the IP address that submitted the form. We use it only to rate-limit
            abuse of the form, and it is held in memory rather than stored long term.
          </p>
          <p>
            We do not use advertising cookies or third-party tracking pixels on this site.
          </p>
        </Block>

        <Block heading="Why we collect it">
          <p>
            Solely to respond to your enquiry and, if we go on to work together, to administer that
            engagement. We do not add you to a mailing list, and we do not sell, rent or share your
            details with third parties for their own purposes.
          </p>
        </Block>

        <Block heading="Who processes it">
          <p>
            Form submissions are delivered to us by email through our email provider, and this site
            is hosted by our hosting provider. Both act as processors on our instructions and only
            handle the data needed to deliver the message.
          </p>
        </Block>

        <Block heading="How long we keep it">
          <p>
            Enquiries that don&apos;t lead to work are deleted within 24 months. Records relating to
            engagements we take on are kept for as long as required for contractual and tax
            purposes, then deleted.
          </p>
        </Block>

        <Block heading="Client data during projects">
          <p>
            Data you share with us during an engagement is governed by the contract for that work,
            not by this policy. As a rule we keep client data inside your own systems wherever the
            architecture allows. Where a model provider must be involved, we use enterprise
            endpoints with training on your data disabled, and we document exactly what leaves your
            environment before building anything.
          </p>
        </Block>

        <Block heading="Your rights">
          <p>
            You can ask us for a copy of the personal information we hold about you, ask us to
            correct it, or ask us to delete it. Email{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-accent-bright underline underline-offset-4"
            >
              {contact.email}
            </a>{" "}
            and we&apos;ll respond within 30 days.
          </p>
        </Block>

        <Block heading="Changes">
          <p>
            If we change this policy we&apos;ll update the review date above. Material changes
            affecting people who have already contacted us will be communicated directly.
          </p>
        </Block>

        <Block heading="Contact">
          <p>
            Questions about this policy: <br />
            <a
              href={`mailto:${contact.email}`}
              className="text-accent-bright underline underline-offset-4"
            >
              {contact.email}
            </a>
            <br />
            {contact.phones.map((phone) => (
              <span key={phone.phoneHref}>
                <a href={`tel:${phone.phoneHref}`}>
                  {phone.label}: <span className="font-mono">{phone.phoneDisplay}</span>
                </a>
                <br />
              </span>
            ))}
            {contact.location}
          </p>
        </Block>
      </div>
    </Container>
  );
}
