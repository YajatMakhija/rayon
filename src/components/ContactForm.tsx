"use client";

import { useState } from "react";
import { buttonClass, cx } from "@/components/ui";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-xl border border-line bg-ink-950 px-3.5 py-2.5 text-sm text-fg " +
  "placeholder:text-fg-subtle shadow-sm transition-colors focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/15";

const labelClass = "mb-1.5 block text-xs font-semibold tracking-wide text-fg-muted";

export function ContactForm({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const t = getMessages(locale);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, locale }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-card border border-accent/50 bg-ink-850 p-8 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent/30">
          <svg viewBox="0 0 20 20" className="h-5 w-5 text-violet" fill="none">
            <path
              d="m4.5 10.5 3.5 3.5 7.5-8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-bold">{t.form.messageReceived}</h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{t.form.thanks}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-violet underline underline-offset-4 hover:text-fg"
        >
          {t.form.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="space-y-4">
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="company_website">Do not fill this in</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={cx("grid gap-4", !compact && "sm:grid-cols-2")}>
        <div>
          <label className={labelClass} htmlFor="name">
            {t.form.name} <span className="text-danger">*</span>
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            {t.form.workEmail} <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>
      </div>

      <div className={cx("grid gap-4", !compact && "sm:grid-cols-2")}>
        <div>
          <label className={labelClass} htmlFor="company">
            {t.form.company}
          </label>
          <input id="company" name="company" autoComplete="organization" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            {t.form.phone}
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          {t.form.automate} <span className="text-danger">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={compact ? 4 : 5}
          className={cx(fieldClass, "resize-y")}
        />
      </div>

      {status === "error" && error && (
        <p role="alert" className="rounded-xl border border-danger/40 bg-danger/10 px-3.5 py-2.5 text-sm text-danger">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className={buttonClass("primary", "md", "w-full")}>
        {status === "sending" ? t.form.sending : t.form.sendEnquiry}
      </button>

      <p className="text-xs leading-relaxed text-fg-subtle">{t.form.privacyNote}</p>
    </form>
  );
}
