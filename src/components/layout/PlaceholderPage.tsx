import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";

export function PlaceholderPage({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} intro={intro} />
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <p className="max-w-[520px] text-[15px] leading-relaxed text-[var(--fg-muted)]">
            This page is part of the Company Brain architecture and will be
            written in full as the product ships. The homepage already covers
            the product story, how it works, and how we handle security.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact">Request access</Button>
            <Button href="/docs" variant="outline">
              Read the docs
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
