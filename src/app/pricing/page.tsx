import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PRICING } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Pricing",
  "Scoped engagements rather than seat licences. Pilot, Enterprise and Regulated deployments.",
);

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Priced like a deployment, not a seat licence."
        intro="Company Brain is built into your company rather than handed out as logins, so the shape of the engagement sets the number. You get a fixed figure after a scoping call — not before."
      />

      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-faint)]">
              Indicative — final pricing confirmed during scoping
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)] lg:grid-cols-3">
            {PRICING.map((tier, i) => (
              <Reveal
                key={tier.name}
                delay={i * 90}
                className={
                  tier.featured
                    ? "bg-[var(--card)] ring-1 ring-inset ring-white/10"
                    : "bg-[var(--bg)]"
                }
              >
                <div className="flex h-full flex-col p-8 md:p-10">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-[17px] font-medium tracking-tight text-white">
                      {tier.name}
                    </h2>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-faint)]">
                      {tier.price}
                    </span>
                  </div>

                  <p className="mt-4 text-[14px] leading-relaxed text-[var(--fg-muted)]">
                    {tier.tagline}
                  </p>

                  <ul className="mt-8 flex-1 space-y-3.5">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3 text-[13.5px] leading-relaxed text-[var(--fg-muted)]"
                      >
                        <span
                          aria-hidden
                          className="mt-[9px] h-px w-3 shrink-0 bg-[var(--line-strong)]"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    <Button
                      href="/contact"
                      variant={tier.featured ? "solid" : "outline"}
                      className="w-full"
                    >
                      {tier.cta}
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <h2 className="display max-w-[14ch] text-[28px] text-white md:text-[36px]">
                Why no numbers on this page?
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-[560px] text-[15px] leading-relaxed text-[var(--fg-muted)]">
                Because we would be inventing them. Cost depends on how many
                systems we connect, how many workflows we automate, and what your
                compliance requirements demand. There is no self-serve tier
                either — Company Brain needs access to real company systems to be useful,
                and that means a security review before anything works.
              </p>
              <p className="mt-6 max-w-[560px] text-[15px] leading-relaxed text-[var(--fg-muted)]">
                A pilot is a fixed fee agreed up front, sized to the workflow
                being automated, with the success metric defined before we start.
                If it does not move, we part ways and you keep the documentation.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
