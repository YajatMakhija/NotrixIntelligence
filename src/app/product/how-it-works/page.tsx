import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/metadata";
import { PIPELINE } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "How it works",
  "Connect, ingest, understand, retrieve, reason, and act — how Company Brain turns information into intelligence.",
);

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product"
        title="How Company Brain works"
        intro="From connected sources to governed action. Each stage inherits permissions from the last — nothing is re-permissioned after the fact."
      />
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <ol className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {PIPELINE.map((stage, i) => (
              <Reveal key={stage.title} as="li" delay={Math.min(i, 4) * 40}>
                <div className="grid gap-4 py-8 md:grid-cols-[80px_200px_1fr] md:items-baseline md:gap-10">
                  <p className="status text-[var(--limestone)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="text-[17px] font-medium tracking-tight text-[var(--ink)]">
                    {stage.title}
                  </h2>
                  <p className="max-w-[520px] text-[14px] leading-relaxed text-[var(--body)]">
                    {stage.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="mt-14">
            <Button href="/contact">Request a demo</Button>
          </div>
        </div>
      </section>
    </>
  );
}
