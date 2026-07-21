import type { Locale } from "./config";
import {
  SHOW_SAMPLE_BANNER,
  caseStudies as caseStudiesEn,
  type CaseStudy,
  getCaseStudy as getCaseStudyEn,
} from "@/lib/case-studies";

export { SHOW_SAMPLE_BANNER };
export type { CaseStudy };

const caseStudiesFr: CaseStudy[] = [
  {
    slug: "pt-clinic-voice-outreach",
    client: "Clinique de physiothérapie · Californie, USA",
    industry: "Physiothérapie",
    title: "Outreach clinique automatisé avec un agent vocal",
    summary:
      "Une clinique de physiothérapie en Californie appelait chaque referral à la main. Voici ce que ça donnait avant, ce que nous avons construit, et comment ça les a aidés.",
    duration: "6 semaines",
    year: "2025",
    metrics: [
      { value: "~€0.55", label: "coût moyen par appel d'outreach" },
      { value: "~€165", label: "coût mensuel pour ~300 leads (10/jour)" },
      { value: "Hours → minutes", label: "temps staff passé à relancer les referrals" },
    ],
    story: [
      "Une clinique de physiothérapie en Californie, aux États-Unis, avait besoin d'aide pour l'outreach des referrals.",
      "Avant, leur équipe appelait chaque referral un par un. Si quelqu'un ne décrochait pas, il fallait rappeler plus tard et tout noter à la main. Cela prenait beaucoup de temps, et suivre qui avait été appelé, qui devait être rappelé, et qui ne devait plus être contacté était difficile à gérer.",
      "Nous leur avons construit un système d'outreach clinique automatisé avec un agent vocal.",
      "Maintenant, l'agent vocal appelle les patients. Pendant l'appel, les patients peuvent demander un rappel, recevoir un message avec un lien de réservation, ou être transférés à un membre de l'équipe pour réserver une séance. Ils peuvent aussi décliner l'appel, ou demander à ne plus être rappelés.",
      "Si un patient ne décroche pas, l'agent rappelle après une heure. S'il ne décroche toujours pas, il rappelle le lendemain. S'il n'y a toujours pas de réponse, il envoie un message avec le lien de réservation.",
      "La clinique saisit les détails des patients dans une Google Sheet, et le système s'occupe du reste. Ils ont aussi un tableau de bord avec les détails patients et les résultats d'appels. Des messages de callback sont envoyés quand un patient en demande un.",
      "L'agent vocal suit des règles et des garde-fous clairs, et ne partage pas d'informations personnelles. Il n'appelle pas non plus les jours fériés comme Pâques, Noël, Memorial Day, Independence Day, et jours similaires.",
      "Grâce à cela, l'équipe ne passe plus des heures à appeler les referrals et à gérer les suivis à la main. Le même type de workflow peut être conçu comme vous le voulez — et nous serions heureux de le construire pour vous.",
    ],
    costBox: {
      title: "Ce que ça coûte à faire tourner",
      rows: [
        { label: "Agent vocal", value: "€0.18 / minute" },
        { label: "Durée moyenne d'appel", value: "~1 min 30 s" },
        { label: "Coût voix par appel moyen", value: "~€0.27" },
        { label: "Téléphonie", value: "~€0.28 / appel" },
        { label: "Total par appel moyen", value: "~€0.55" },
        { label: "10 leads / jour", value: "~€5.50 / jour" },
        { label: "~300 leads / mois", value: "~€165 / mois" },
      ],
      footnote:
        "Chiffres approximatifs pour la durée et le volume d'appels typiques de cette clinique.",
    },
    tools: ["Voice AI", "Twilio", "Google Sheets", "n8n", "Claude"],
  },
];

export function getCaseStudies(locale: Locale): CaseStudy[] {
  return locale === "fr" ? caseStudiesFr : caseStudiesEn;
}

export function getCaseStudy(locale: Locale, slug: string) {
  if (locale === "fr") return caseStudiesFr.find((s) => s.slug === slug);
  return getCaseStudyEn(slug);
}
