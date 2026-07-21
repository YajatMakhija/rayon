import type { Locale } from "./config";
import type { Faq, ProcessStep, Service } from "@/lib/content";
import { stack as toolStack } from "@/lib/content";

export { toolStack as stack };

const servicesEn: Service[] = [
  {
    slug: "document-processing",
    title: "Document & data processing",
    summary:
      "Invoices, purchase orders, contracts, claims and forms read, validated and pushed into your systems without anyone retyping them.",
    outcomes: [
      "Extract structured fields from PDFs, scans and email attachments",
      "Validate against your existing records before anything is written",
      "Route low-confidence cases to a human instead of guessing",
      "Write clean data straight into your ERP, CRM or database",
    ],
    typical: "$4k–$15k",
    timeline: "3–6 weeks",
  },
  {
    slug: "internal-workflows",
    title: "Internal workflow automation",
    summary:
      "The handoffs that live in inboxes and spreadsheets — approvals, onboarding, ticket triage, status chasing — turned into reliable automated flows.",
    outcomes: [
      "Map the process as it actually runs, not as the SOP describes it",
      "Automate the repetitive path, keep humans on the exceptions",
      "Notifications where your team already works — Slack, Teams, email",
      "Full audit trail of every automated decision",
    ],
    typical: "$500–$10k",
    timeline: "2–5 weeks",
  },
  {
    slug: "ai-assistants",
    title: "Internal AI assistants",
    summary:
      "Assistants grounded in your own documentation, policies and data — so answers cite a source your team can verify instead of being invented.",
    outcomes: [
      "Retrieval over your real knowledge base, with citations",
      "Scoped permissions so people only see what they should",
      "Evaluation suite that catches quality regressions before users do",
      "Deployed inside Slack, your intranet, or a standalone app",
    ],
    typical: "$5k–$18k",
    timeline: "4–8 weeks",
  },
  {
    slug: "automation-audit",
    title: "Automation audit",
    summary:
      "A fixed-scope review of your operations that identifies what is worth automating, what isn't, and what it would realistically cost.",
    outcomes: [
      "Shadow your team through the processes that consume the most hours",
      "Ranked opportunity list with effort and payback estimates",
      "Honest assessment of what should stay manual",
      "Delivered as a document you own — no obligation to hire us",
    ],
    typical: "from $500",
    timeline: "1–2 weeks",
  },
];

const servicesFr: Service[] = [
  {
    slug: "document-processing",
    title: "Traitement documentaire & données",
    summary:
      "Factures, bons de commande, contrats, sinistres et formulaires lus, validés et poussés dans vos systèmes sans ressaisie.",
    outcomes: [
      "Extraire des champs structurés depuis PDF, scans et pièces jointes",
      "Valider contre vos données existantes avant toute écriture",
      "Router les cas peu confiants vers un humain plutôt que de deviner",
      "Écrire des données propres directement dans votre ERP, CRM ou base",
    ],
    typical: "Sur devis",
    timeline: "3–6 semaines",
  },
  {
    slug: "internal-workflows",
    title: "Automatisation des workflows internes",
    summary:
      "Les passages de relais qui vivent dans les boîtes mail et les tableurs — validations, onboarding, triage de tickets, relances — transformés en flux fiables.",
    outcomes: [
      "Cartographier le processus tel qu'il tourne vraiment, pas tel que le SOP le décrit",
      "Automatiser le chemin répétitif, garder les humains sur les exceptions",
      "Notifications là où votre équipe travaille déjà — Slack, Teams, e-mail",
      "Piste d'audit complète de chaque décision automatisée",
    ],
    typical: "Sur devis",
    timeline: "2–5 semaines",
  },
  {
    slug: "ai-assistants",
    title: "Assistants IA internes",
    summary:
      "Des assistants ancrés dans votre documentation, vos politiques et vos données — pour que les réponses citent une source vérifiable plutôt que d'être inventées.",
    outcomes: [
      "Retrieval sur votre vraie base de connaissances, avec citations",
      "Permissions limitées pour que chacun ne voie que ce qu'il doit",
      "Suite d'évaluation qui détecte les régressions avant les utilisateurs",
      "Déployé dans Slack, votre intranet, ou une app dédiée",
    ],
    typical: "Sur devis",
    timeline: "4–8 semaines",
  },
  {
    slug: "automation-audit",
    title: "Audit d'automatisation",
    summary:
      "Une revue à périmètre fixe de vos opérations qui identifie ce qui vaut la peine d'être automatisé, ce qui ne l'est pas, et ce que cela coûterait réellement.",
    outcomes: [
      "Observer votre équipe sur les processus qui consomment le plus d'heures",
      "Liste d'opportunités classée avec effort et retour sur investissement",
      "Évaluation honnête de ce qui doit rester manuel",
      "Livré comme un document que vous possédez — sans obligation de nous engager",
    ],
    typical: "Sur devis",
    timeline: "1–2 semaines",
  },
];

const processEn: ProcessStep[] = [
  {
    number: "01",
    title: "Map",
    description:
      "We sit with the people doing the work and document the process as it actually runs — including the workarounds nobody wrote down.",
  },
  {
    number: "02",
    title: "Scope",
    description:
      "You get a written proposal with a fixed price, a clear boundary, and the success metric we'll be judged on. No open-ended retainers.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We ship in weekly increments against a staging environment you can see. You review real output, not slide decks.",
  },
  {
    number: "04",
    title: "Handover",
    description:
      "Documentation, monitoring and a walkthrough with your team. You own the system and the accounts it runs on — not us.",
  },
];

const processFr: ProcessStep[] = [
  {
    number: "01",
    title: "Cartographier",
    description:
      "Nous nous asseyons avec les personnes qui font le travail et documentons le processus tel qu'il tourne vraiment — y compris les contournements que personne n'a écrits.",
  },
  {
    number: "02",
    title: "Cadrer",
    description:
      "Vous recevez une proposition écrite avec un prix fixe, un périmètre clair, et l'indicateur de succès sur lequel nous serons jugés. Pas de forfaits ouverts.",
  },
  {
    number: "03",
    title: "Construire",
    description:
      "Nous livrons par incréments hebdomadaires sur un environnement de staging que vous pouvez voir. Vous revue du vrai résultat, pas des slides.",
  },
  {
    number: "04",
    title: "Transmettre",
    description:
      "Documentation, monitoring et une prise en main avec votre équipe. Vous possédez le système et les comptes — pas nous.",
  },
];

const faqsEn: Faq[] = [
  {
    question: "How do you price work?",
    answer:
      "Fixed price per project, quoted after a scoping conversation. Projects can start from as low as $500; most engagements land between $500 and $18k depending on scope and how many systems are involved. You'll know the number before any work starts.",
  },
  {
    question: "What if automation isn't the right answer?",
    answer:
      "We'll tell you. Plenty of processes are too low-volume or too irregular to be worth automating, and a bad automation costs more than the manual work it replaced. Our audit exists partly to rule things out.",
  },
  {
    question: "Who owns what you build?",
    answer:
      "You do — code, workflows, prompts and documentation. Everything runs on accounts in your name. We don't hold anything hostage as a retention strategy.",
  },
  {
    question: "What happens to our data?",
    answer:
      "It stays in your systems wherever possible. Where a model provider must be involved we use enterprise endpoints with training disabled, and we document exactly what leaves your environment before we build anything.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Optionally. After handover you can run everything yourself, or take a monthly support arrangement for monitoring and changes. It's a separate decision from the build, made after delivery.",
  },
  {
    question: "How long until we see results?",
    answer:
      "Most projects ship a working first version within three to four weeks. The audit turns around in one to two weeks and gives you something usable regardless of whether you continue with us.",
  },
];

const faqsFr: Faq[] = [
  {
    question: "Et si l'automatisation n'est pas la bonne réponse ?",
    answer:
      "Nous vous le dirons. Beaucoup de processus sont trop rares ou trop irréguliers pour valoir l'automatisation, et une mauvaise automatisation coûte plus cher que le manuel. Notre audit sert aussi à écarter.",
  },
  {
    question: "Qui possède ce que vous construisez ?",
    answer:
      "Vous — code, workflows, prompts et documentation. Tout tourne sur des comptes à votre nom. Nous ne retenons rien en otage.",
  },
  {
    question: "Que devient nos données ?",
    answer:
      "Elles restent dans vos systèmes autant que possible. Quand un fournisseur de modèle est nécessaire, nous utilisons des endpoints entreprise sans entraînement, et documentons ce qui quitte votre environnement avant de construire.",
  },
  {
    question: "Proposez-vous un support continu ?",
    answer:
      "En option. Après transmission, vous pouvez tout faire tourner vous-mêmes, ou prendre un support mensuel pour le monitoring et les évolutions. C'est une décision séparée de la construction.",
  },
  {
    question: "Combien de temps avant des résultats ?",
    answer:
      "La plupart des projets livrent une première version utilisable en trois à quatre semaines. L'audit sort en une à deux semaines et reste utile même si vous ne continuez pas avec nous.",
  },
];

export function getServices(locale: Locale) {
  return locale === "fr" ? servicesFr : servicesEn;
}

export function getProcessSteps(locale: Locale) {
  return locale === "fr" ? processFr : processEn;
}

export function getFaqs(locale: Locale) {
  return locale === "fr" ? faqsFr : faqsEn;
}
