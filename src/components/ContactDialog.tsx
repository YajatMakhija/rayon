"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ContactForm } from "@/components/ContactForm";
import { buttonClass, cx } from "@/components/ui";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export function ContactDialog({
  locale,
  label,
  variant = "primary",
  size = "sm",
  className,
}: {
  locale: Locale;
  label?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const t = getMessages(locale);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([type="hidden"]):not([tabindex="-1"]), select, textarea:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const raf = requestAnimationFrame(() => {
      panelRef.current
        ?.querySelector<HTMLElement>('input:not([tabindex="-1"]), textarea')
        ?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(raf);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [open, close]);

  const dialog =
    open && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
          >
            <div
              className="absolute inset-0 bg-violet-deep/35 backdrop-blur-[2px]"
              onClick={close}
              aria-hidden="true"
            />

            <div
              ref={panelRef}
              className={cx(
                "relative z-[1] max-h-[min(90vh,880px)] w-full max-w-lg overflow-y-auto",
                "rounded-card border border-line bg-ink-900 p-6 sm:p-8",
                "shadow-[0_24px_64px_rgb(27_18_40_/_0.28)] animate-rise",
              )}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-md p-1.5 text-fg-subtle transition-colors hover:bg-ink-850 hover:text-fg"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path
                    d="m5 5 10 10M15 5 5 15"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <p className="eyebrow">{t.dialog.eyebrow}</p>
              <h2 id="contact-dialog-title" className="mt-2 text-2xl font-bold">
                {t.dialog.title}
              </h2>
              <p className="mt-2 mb-6 text-sm leading-relaxed text-fg-muted">{t.dialog.lead}</p>

              <ContactForm locale={locale} compact />
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen(true);
        }}
        className={buttonClass(
          variant,
          size,
          cx(variant === "primary" && "animate-cta-pulse", className),
        )}
      >
        {label ?? t.nav.bookDemo}
      </button>
      {dialog}
    </>
  );
}
