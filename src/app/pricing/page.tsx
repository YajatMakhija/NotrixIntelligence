import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PRICING, PRICING_NEEDS } from "@/lib/site";
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
            <p className="status text-[var(--faint)]">
              Indicative — final pricing confirmed during scoping
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)] lg:grid-cols-3">
            {PRICING.map((tier, i) => (
              <Reveal
                key={tier.name}
                delay={i * 50}
                className={
                  tier.featured
                    ? "bg-[var(--elevated)] ring-1 ring-inset ring-[var(--limestone)]/25"
                    : "bg-[var(--canvas)]"
                }
              >
                <div className="flex h-full flex-col p-8 md:p-10">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-[17px] font-medium tracking-tight text-[var(--ink)]">
                      {tier.name}
                    </h2>
                    <span className="status text-[var(--faint)]">{tier.price}</span>
                  </div>

                  <p className="mt-4 text-[14px] leading-relaxed text-[var(--body)]">
                    {tier.tagline}
                  </p>

                  <ul className="mt-8 flex-1 space-y-3.5">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-3 text-[13.5px] leading-relaxed text-[var(--body)]"
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

      <section className="band-paper border-y border-[var(--paper-line)] bg-[var(--paper)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <Reveal>
            <p className="eyebrow">Before a number</p>
            <h2 className="display mt-5 max-w-[16ch] text-[28px] text-[var(--paper-ink)] md:text-[36px]">
              What we need from you.
            </h2>
            <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-[var(--paper-mute)]">
              A pilot is scoped against a real workflow. These three things
              decide whether we can start — and what the fixed fee covers.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {PRICING_NEEDS.map((item, i) => (
              <Reveal key={item.title} delay={i * 50}>
                <div className="rule mb-6" />
                <h3 className="text-[16px] font-medium tracking-tight text-[var(--paper-ink)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--paper-mute)]">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <h2 className="display max-w-[14ch] text-[28px] text-[var(--ink)] md:text-[36px]">
                Why no numbers on this page?
              </h2>
            </Reveal>
            <Reveal delay={50}>
              <p className="max-w-[560px] text-[15px] leading-relaxed text-[var(--body)]">
                Because we would be inventing them. Cost depends on how many
                systems we connect, how many workflows we automate, and what your
                compliance requirements demand. There is no self-serve tier
                either — Company Brain needs access to real company systems to be useful,
                and that means a security review before anything works.
              </p>
              <p className="mt-6 max-w-[560px] text-[15px] leading-relaxed text-[var(--body)]">
                A pilot is a fixed fee agreed up front, sized to the workflow
                being automated, with the success metric defined before we start.
                If it does not move, we part ways and you keep the documentation.
              </p>
              <div className="mt-10">
                <Button href="/contact">Request a demo</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
