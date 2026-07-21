import Link from "next/link";
import { localePath, type Locale } from "@/lib/i18n/config";
import { site } from "@/lib/site";

/** Wordmark + mark. Yellow tile with a violet ray motif. */
export function Logo({
  className,
  inverted = false,
  locale = "en",
}: {
  className?: string;
  inverted?: boolean;
  locale?: Locale;
}) {
  const href = localePath(locale);

  return (
    <Link
      href={href}
      aria-label={`${site.name} — home`}
      className={`relative z-10 inline-flex items-center gap-2.5 ${className ?? ""}`}
    >
      <svg viewBox="0 0 28 28" className="h-8 w-8 shrink-0" aria-hidden="true">
        <rect width="28" height="28" rx="8" fill="var(--color-accent)" />
        <circle cx="10" cy="14" r="2.6" fill="var(--color-violet-deep)" />
        <g stroke="var(--color-violet-deep)" strokeWidth="1.7" strokeLinecap="round">
          <path d="M15.5 10.5 20.5 8" />
          <path d="M15.5 14h5.5" />
          <path d="M15.5 17.5 20.5 20" />
        </g>
      </svg>
      <span
        className={`text-[17px] font-bold tracking-tight ${
          inverted ? "text-white" : "text-fg"
        }`}
      >
        Rayon
        <span className={inverted ? "text-accent" : "text-violet"}>Intel</span>
      </span>
    </Link>
  );
}
