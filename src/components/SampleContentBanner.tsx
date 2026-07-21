import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

/**
 * Rendered while `SHOW_SAMPLE_BANNER` is true in src/lib/case-studies.ts.
 * Its job is to make it impossible to ship placeholder case studies by
 * accident. Delete the flag — and this banner — once the content is real.
 */
export function SampleContentBanner({ locale }: { locale: Locale }) {
  const t = getMessages(locale);

  return (
    <div className="rounded-lg border border-amber/40 bg-amber/10 px-4 py-3.5">
      <p className="text-sm font-semibold text-amber">{t.common.placeholderTitle}</p>
      <p className="mt-1 text-sm leading-relaxed text-fg-muted">{t.common.placeholderBody}</p>
    </div>
  );
}
