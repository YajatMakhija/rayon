# rayonintel.com

Marketing site for RayonIntel. Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

---

## ⚠️ Before you go live

The site is complete and builds clean, but three kinds of placeholder content **must**
be replaced. They are marked with `⚠️` comments in the source.

### 1. Contact details — `src/lib/site.ts`

Everything flows from this one file: the top bar, footer, contact page, `tel:` links
and the JSON-LD structured data. Replace:

| Field | Current placeholder |
|---|---|
| `contact.phoneDisplay` | `+91 00000 00000` |
| `contact.phoneHref` | `+910000000000` |
| `contact.email` | `hello@rayonintel.com` |
| `contact.location` | `City, Country` |
| `social.linkedin` | placeholder company URL |

### 2. Case studies — `src/lib/case-studies.ts`

**All three case studies are invented.** Clients, figures and quotes are fabricated
scaffolding written to build the layout.

Replace each with a real engagement you can substantiate, or delete it. Publishing
invented case studies or testimonials as real destroys the credibility this site is
built to create, and in most jurisdictions it is unlawful advertising.

While placeholders are live, a visible amber banner renders on `/work` and every case
study page. Once the content is real, set `SHOW_SAMPLE_BANNER = false`.

If you have no clients yet: write up automations you built for yourself and label them
honestly as internal projects. Two real examples beat ten vague ones.

### 3. Team and legal

- `src/app/about/page.tsx` — the `team` array is one placeholder person. Real name,
  real bio, real LinkedIn. An anonymous services company is the single biggest trust
  deficit this kind of site can have.
- `src/app/privacy/page.tsx` and `src/app/terms/page.tsx` — plain-language templates,
  **not legal advice**. Have them reviewed against the law that applies to you (DPDP
  Act in India, GDPR in the EU/UK), set the jurisdiction in the terms, and update the
  "last reviewed" dates.

---

## Contact form

`src/app/api/contact/route.ts` posts to Resend over plain `fetch` — no SDK dependency.

```bash
cp .env.example .env.local
```

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | From resend.com. Free tier is plenty for a marketing site. |
| `CONTACT_FROM_EMAIL` | Must be on a domain verified in Resend. |
| `CONTACT_TO_EMAIL` | Where enquiries land. Falls back to `site.contact.email`. |

**Until those are set the form deliberately fails** with a visible message telling
visitors to email you directly. It never reports success for a message it did not
send — a silently swallowed enquiry is worse than a visible error.

Also included: honeypot field, in-memory rate limiting (5/hour/IP), server-side
validation, and HTML escaping on all user input. The rate limiter is per-instance;
move it to Upstash or Redis if you ever run more than one.

---

## Design system

Tokens live in `@theme` at the top of `src/app/globals.css`. Change them there, not
in components.

**Palette.** Deep navy base rather than pure black — pure black reads crypto, navy
reads institutional. One desaturated teal (`--color-accent`) carries every action.
Amber (`--color-amber`) is reserved exclusively for metrics, so numbers read as
measured rather than decorative. Restraint is the trust signal; adding a third accent
will cheapen it.

**Type.** Inter for everything, JetBrains Mono for technical labels, metrics and
eyebrows. The mono labels are deliberate — they signal engineer rather than marketer.
There is no decorative display font, which is precisely what makes template sites look
untrustworthy.

**Motion.** Scroll-free entrance fades and a looping dashed-line pipeline in the hero.
All of it collapses under `prefers-reduced-motion`.

---

## Structure

```
src/
  app/
    page.tsx                 Home
    services/                Services + pricing bands
    work/                    Case study index
    work/[slug]/             Case study detail (SSG)
    about/                   Principles, team, what we decline
    contact/                 Full form + direct details
    privacy/  terms/         Legal templates
    api/contact/route.ts     Form handler
    opengraph-image.tsx      Generated share card
    sitemap.ts  robots.ts
  components/
    TopBar.tsx               Phone + email strip above the nav
    Header.tsx               Sticky nav, mobile menu, CTA
    ContactDialog.tsx        Popup enquiry form (focus-trapped)
    ContactForm.tsx          Shared form, used in dialog and on /contact
    WorkflowDiagram.tsx      Hero pipeline visual
    ui.tsx                   Container, Section, Button, Card, Metric
  lib/
    site.ts                  ⚠️ contact details
    content.ts               Services, process, stack, FAQs
    case-studies.ts          ⚠️ sample case studies
```

Contact is reachable three ways by design: always-visible phone in the top bar, the
`Start a project` popup from any page, and the full `/contact` page.

---

## Deploy

Vercel: import the repo, add the three env vars, point `rayonintel.com` at it. The
build has no external service dependencies beyond Resend.

Then, in order of impact:

1. Real case studies (the actual conversion driver)
2. Business email on the domain
3. Analytics — Plausible or Vercel Analytics; both avoid the cookie banner
4. `Cal.com` embed on `/contact` if you want self-serve booking
