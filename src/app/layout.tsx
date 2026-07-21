import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(site.url),
  robots: { index: true, follow: true },
};

/** Pass-through root so [locale] can own <html lang>. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
