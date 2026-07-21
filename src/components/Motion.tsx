"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "@/components/ui";

/** Cursor-follow glow for the hero. Disabled when reduced motion is preferred. */
export function HeroAtmosphere({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 30 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(!reduce && fine);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    function onMove(event: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setPos({ x, y });
    }

    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, [enabled]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {enabled && (
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-70 transition-[background] duration-200"
          aria-hidden="true"
          style={{
            background: `radial-gradient(480px circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 55%)`,
          }}
        />
      )}
      {children}
    </section>
  );
}

/** Fade/rise in when scrolled into view. */
export function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cx(visible ? "reveal-in" : "reveal-pending", className)}
      style={visible ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/** Animates the first number found in a metric string when visible. */
export function CountUpValue({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const match = value.match(/(\d+(?:[.,]\d+)?)/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const raw = match[1].replace(",", ".");
    const target = Number(raw);
    if (!Number.isFinite(target)) {
      setDisplay(value);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();

        const duration = 1100;
        const start = performance.now();
        const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;

        function tick(now: number) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const current = target * eased;
          const formatted =
            decimals > 0 ? current.toFixed(decimals) : String(Math.round(current));
          setDisplay(value.replace(match![1], formatted));
          if (t < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
