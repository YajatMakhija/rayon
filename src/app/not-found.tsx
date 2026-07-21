import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1.5rem", textAlign: "center" }}>
        <h1>404</h1>
        <p>Page not found · Page introuvable</p>
        <p>
          <Link href="/">English</Link>
          {" · "}
          <Link href="/fr">Français</Link>
        </p>
      </body>
    </html>
  );
}
