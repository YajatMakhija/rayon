import Link from "next/link";
import type { ReactNode } from "react";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cx("py-20 sm:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-fg-muted">{lead}</p>}
    </div>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const buttonVariants = {
  primary:
    "bg-accent text-fg shadow-[0_8px_20px_rgb(245_196_0_/_0.28)] hover:bg-accent-bright hover:shadow-[0_10px_24px_rgb(245_196_0_/_0.36)]",
  secondary:
    "border border-line-strong bg-ink-900 text-fg shadow-sm hover:border-violet hover:text-violet",
  ghost: "text-fg-muted hover:text-violet",
} as const;

const buttonSizes = {
  sm: "h-9 px-4",
  md: "h-11 px-5",
  lg: "h-12 px-7 text-base",
} as const;

export function buttonClass(
  variant: keyof typeof buttonVariants = "primary",
  size: keyof typeof buttonSizes = "md",
  className?: string,
) {
  return cx(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  className?: string;
}) {
  const external =
    href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const classes = buttonClass(variant, size, className);
  if (external) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} prefetch>
      {children}
    </Link>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "rounded-card border border-line bg-ink-900 p-6 shadow-[0_1px_2px_rgb(27_18_40_/_0.04),0_10px_28px_rgb(27_18_40_/_0.05)] transition-all duration-200 hover:border-accent-dim hover:shadow-[0_4px_16px_rgb(27_18_40_/_0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Metric display — violet for enterprise emphasis. */
export function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-mono text-3xl font-bold text-violet sm:text-4xl">{value}</p>
      <p className="mt-2 text-sm leading-snug text-fg-muted">{label}</p>
    </div>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cx("h-4 w-4", className)}
    >
      <path
        d="M3 8h10m0 0-3.5-3.5M13 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
