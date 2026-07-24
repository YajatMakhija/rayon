/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR CONTACT DETAILS
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "RayonIntel",
  legalName: "RayonIntel",
  domain: "rayonintel.com",
  url: "https://rayonintel.com",

  founder: {
    name: "Yajat Makhija",
    linkedin: "https://www.linkedin.com/in/yajatmakhija",
  },

  tagline: "AI automation for teams that run on manual work",
  description:
    "RayonIntel designs and ships AI automations that remove repetitive operational work — document processing, data entry, reporting and internal workflows.",

  contact: {
    phoneDisplay: "0091-8527495335",
    phoneHref: "+918527495335",
    email: "yajatmakhija@rayonintel.com",
    emailAlt: "yajatmakhijaofficial@gmail.com",
    location: "Remote · Worldwide",
    responseTime: "We reply to every enquiry within one business day.",
  },

  social: {
    linkedin: "https://www.linkedin.com/in/yajatmakhija",
    github: "",
    x: "",
  },

  // Google tag (Google Ads / gtag.js). Empty string disables the tag.
  googleTagId: "AW-18340606168",

  nav: [
    { label: "Services", href: "/services" },
    { label: "Case Study", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type Site = typeof site;
