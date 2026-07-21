import type { MetadataRoute } from "next";
import { localePath } from "@/lib/i18n/config";
import { getCaseStudies } from "@/lib/i18n/case-studies";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/work", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];

  const caseSlugs = getCaseStudies("en").map((study) => study.slug);

  return [
    ...(["en", "fr"] as const).flatMap((locale) =>
      staticRoutes.map((route) => ({
        url: `${site.url}${localePath(locale, route.path)}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: route.priority,
      })),
    ),
    ...(["en", "fr"] as const).flatMap((locale) =>
      caseSlugs.map((slug) => ({
        url: `${site.url}${localePath(locale, `/work/${slug}`)}`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
    ),
  ];
}
