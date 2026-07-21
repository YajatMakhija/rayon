import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated at build time so every share card matches the site palette. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fffdf8",
          padding: 80,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 55% at 15% 10%, rgba(245,196,0,0.35), transparent 60%), radial-gradient(ellipse 50% 45% at 90% 20%, rgba(107,45,155,0.14), transparent 55%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16, position: "relative" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#f5c400",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#2d1248" }} />
          </div>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#1b1228" }}>
            <span>Rayon</span>
            <span style={{ color: "#6b2d9b" }}>Intel</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              color: "#1b1228",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: 920,
            }}
          >
            Smarter operations with AI that thinks, acts, and resolves.
          </div>
          <div style={{ marginTop: 28, fontSize: 26, color: "#5a5368" }}>
            AI automation, scoped and priced up front.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 22,
            color: "#8b8499",
            borderTop: "1px solid #ebe5d8",
            paddingTop: 28,
            position: "relative",
          }}
        >
          <span>{site.domain}</span>
          <span>·</span>
          <span>{site.contact.phoneDisplay}</span>
        </div>
      </div>
    ),
    size,
  );
}
