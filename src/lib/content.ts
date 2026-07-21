export type Service = {
  slug: string;
  title: string;
  summary: string;
  outcomes: string[];
  typical: string;
  timeline: string;
};

export const services: Service[] = [
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

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
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

/** Tools we actually build with. Showing the stack signals operator, not reseller. */
export const stack = [
  { name: "Claude", logo: "/logos/claude-icon.svg" },
  { name: "OpenAI", logo: "/logos/openai.svg" },
  { name: "AWS", logo: "/logos/aws.svg" },
  { name: "GCP", logo: "/logos/gcp.svg" },
  { name: "Azure", logo: "/logos/azure.svg" },
  { name: "n8n", logo: "/logos/n8n.svg" },
  { name: "Make", logo: "/logos/make.svg" },
  { name: "Zapier", logo: "/logos/zapier.svg" },
  { name: "Python", logo: "/logos/python-icon.svg" },
  { name: "Postgres", logo: "/logos/postgres.svg" },
  { name: "Docker", logo: "/logos/docker.svg" },
  { name: "Supabase", logo: "/logos/supabase.svg" },
  { name: "Airtable", logo: "/logos/airtable.svg" },
  { name: "Slack", logo: "/logos/slack.svg" },
  { name: "Google Workspace", logo: "/logos/google-workspace.svg" },
  { name: "Microsoft 365", logo: "/logos/microsoft-365.svg" },
  { name: "Twilio", logo: "/logos/twilio.svg" },
  { name: "GitHub", logo: "/logos/github.svg" },
  { name: "Vercel", logo: "/logos/vercel.svg" },
  { name: "Notion", logo: "/logos/notion.png" },
] as const;

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
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
