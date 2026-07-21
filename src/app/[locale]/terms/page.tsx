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
    title: "Terms of service",
    description: `Terms governing use of ${site.domain}.`,
    robots: { index: true, follow: false },
  };
}

/**
 * ⚠️ TEMPLATE — a plain-language starting point, not legal advice.
 * These terms cover use of the website only. The terms governing actual
 * engagements live in the contract you sign per project. Have both
 * reviewed by a lawyer before launch.
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

export default async function TermsPage({ params }: Params) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const t = getMessages(locale);
  const contact = getContact(locale);

  return (
    <Container className="max-w-3xl pb-16 pt-[5.5rem] sm:pb-20 sm:pt-32">
      <p className="eyebrow">{t.common.legal}</p>
      <h1 className="mt-4 text-4xl font-semibold">Terms of service</h1>
      <p className="mt-3 font-mono text-xs text-fg-subtle">
        {t.common.lastReviewed}: {LAST_REVIEWED}
      </p>

      <p className="mt-8 leading-relaxed text-fg-muted">
        These terms govern your use of {site.domain}. They do not govern any project we carry out
        for you — that is covered by the separate written agreement for the engagement.
      </p>

      <div className="mt-12 space-y-8">
        <Block heading="Use of this site">
          <p>
            You may read, print and share the content of this site for your own evaluation. You may
            not scrape it at scale, republish it as your own, or use it to train a model without
            our written permission.
          </p>
        </Block>

        <Block heading="Accuracy of information">
          <p>
            Prices and timelines shown on this site are indicative and given in good faith to help
            you judge fit. They are not offers. The binding figures for your project are the ones
            in your signed proposal.
          </p>
          <p>
            Case studies describe past engagements. Past results do not guarantee that a similar
            project will produce similar outcomes for you.
          </p>
        </Block>

        <Block heading="Enquiries">
          <p>
            Submitting the contact form does not create a client relationship, an obligation on us
            to take on your project, or any confidentiality obligation beyond our privacy policy.
            Please do not send confidential information through the form — wait until we have a
            confidentiality agreement in place.
          </p>
        </Block>

        <Block heading="Intellectual property">
          <p>
            The content, design and code of this site belong to {site.legalName}. Third-party
            product names mentioned on this site are the trademarks of their respective owners, and
            referring to them does not imply any partnership or endorsement.
          </p>
        </Block>

        <Block heading="Liability">
          <p>
            This site is provided as is. To the extent permitted by law we are not liable for loss
            arising from reliance on its content. Nothing here limits liability that cannot lawfully
            be limited.
          </p>
        </Block>

        <Block heading="Governing law">
          <p>
            {/* ⚠️ PLACEHOLDER — set your actual jurisdiction */}
            These terms are governed by the laws of [jurisdiction], and disputes are subject to the
            exclusive jurisdiction of the courts of [jurisdiction].
          </p>
        </Block>

        <Block heading="Contact">
          <p>
            Questions about these terms:{" "}
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
          </p>
        </Block>
      </div>
    </Container>
  );
}
