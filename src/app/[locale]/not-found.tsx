import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] max-w-xl flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-bold text-violet">404</p>
      <h1 className="mt-4 text-4xl font-bold">This page doesn&apos;t exist</h1>
      <p className="mt-2 text-lg font-semibold text-fg-muted">Cette page n&apos;existe pas</p>
      <p className="mt-4 leading-relaxed text-fg-muted">
        The link may be out of date, or the page may have moved. / Le lien est peut-être
        obsolète, ou la page a déménagé.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/">English home</ButtonLink>
        <ButtonLink href="/fr" variant="secondary">
          Accueil FR
        </ButtonLink>
      </div>
    </Container>
  );
}
