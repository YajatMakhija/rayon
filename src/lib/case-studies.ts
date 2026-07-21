/**
 * Case studies — real engagements.
 * Keep claims specific and defensible.
 */

export const SHOW_SAMPLE_BANNER = false;

export type CaseStudyCostRow = {
  label: string;
  value: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  summary: string;
  duration: string;
  year: string;
  metrics: { value: string; label: string }[];
  /** Narrative paragraphs — written as a story */
  story: string[];
  /** Cost breakdown shown in a dedicated box (not mixed into the story) */
  costBox?: {
    title: string;
    rows: CaseStudyCostRow[];
    footnote?: string;
  };
  tools: string[];
  quote?: { text: string; author: string; role: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "pt-clinic-voice-outreach",
    client: "Physical therapy clinic · California, USA",
    industry: "Physical therapy",
    title: "Automated clinic outreach with a voice agent",
    summary:
      "A physical therapy clinic in California used to call every referral by hand. Here’s what that looked like, what we built, and how it helped.",
    duration: "6 weeks",
    year: "2025",
    metrics: [
      { value: "~$0.55", label: "average cost per completed outreach call" },
      { value: "~$165", label: "monthly cost at ~300 leads (10/day)" },
      { value: "Hours → minutes", label: "staff time spent chasing referrals" },
    ],
    story: [
      "A physical therapy clinic in California, USA, needed help with referral outreach.",
      "Before, their team called every referral one by one. If someone didn’t pick up, they had to call again later and write everything down by hand. That took a lot of time, and keeping track of who was called, who needed a callback, and who should not be contacted again was hard to manage.",
      "We built them an automated clinic outreach system with a voice agent.",
      "Now the voice agent calls the patients. On the call, patients can choose a callback, get a message with a booking link, or transfer to a team member to book a therapy session. They can also decline the call, or ask not to be called again.",
      "If a patient doesn’t pick up, the agent calls again after one hour. If they still don’t pick up, it calls the next day. If there’s still no answer, it sends a message with the booking link.",
      "The clinic enters patient details in a Google Sheet, and the system handles the rest. They also get a dashboard with patient details and call outcomes. Callback messages are sent when a patient asks for one.",
      "The voice agent follows clear rules and guardrails, and does not share personal information. It also does not call on holidays like Easter, Christmas, Memorial Day, Independence Day, and similar days.",
      "Because of this, the team no longer spends hours calling referrals and managing follow-ups by hand. The same kind of workflow can be designed the way you want — and we’d be happy to build it for you.",
    ],
    costBox: {
      title: "What it costs to run",
      rows: [
        { label: "Voice agent", value: "$0.18 per minute" },
        { label: "Average call length", value: "~1 min 30 sec" },
        { label: "Voice cost per average call", value: "~$0.27" },
        { label: "Telephony", value: "~$0.28 per call" },
        { label: "Total per average call", value: "~$0.55" },
        { label: "10 leads / day", value: "~$5.50 / day" },
        { label: "~300 leads / month", value: "~$165 / month" },
      ],
      footnote:
        "Figures are approximate operating costs for this clinic’s typical call length and volume.",
    },
    tools: ["Voice AI", "Twilio", "Google Sheets", "n8n", "Claude"],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
