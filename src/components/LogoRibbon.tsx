import { stack } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

function LogoItem({ name, logo }: { name: string; logo: string }) {
  return (
    <div
      className="flex h-12 w-[7.5rem] shrink-0 items-center justify-center sm:h-14 sm:w-[8.5rem]"
      aria-hidden="true"
    >
      <img
        src={logo}
        alt=""
        className="max-h-8 max-w-full object-contain object-center sm:max-h-9"
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </div>
  );
}

export function LogoRibbon({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  // Duplicate once for a seamless -50% loop
  const items = [...stack, ...stack];

  return (
    <section className="border-y border-line bg-ink-900" aria-label={t.home.stackLabel}>
      <div className="mx-auto max-w-6xl px-5 pb-2 pt-12 sm:px-8 sm:pt-14">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-violet">
          {t.home.stackLabel}
        </p>
      </div>

      <div
        className="relative mt-8 overflow-hidden py-6"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)",
        }}
      >
        <div className="logo-marquee flex w-max items-center gap-8 sm:gap-12">
          {items.map((tool, index) => (
            <LogoItem key={`${tool.name}-${index}`} name={tool.name} logo={tool.logo} />
          ))}
        </div>
      </div>

      <span className="sr-only">{stack.map((tool) => tool.name).join(", ")}</span>
    </section>
  );
}
