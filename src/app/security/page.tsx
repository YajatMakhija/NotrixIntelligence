import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StatusMark } from "@/components/ui/StatusMark";
import {
  DEPLOYMENT,
  SECURITY_CONTROLS,
  SECURITY_PRINCIPLES,
  SECURITY_STANDARDS,
  SITE,
} from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Security",
  "How Notrix handles enterprise data: inherited permissions, no model training, full audit trails, and our current standing against SOC 2, GDPR, ISO and the EU AI Act.",
);

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Security"
        title="For the data you cannot afford to leak."
        intro="Company Brain reads your most sensitive systems. That only works if the controls around it are boring, provable, and open to your inspection."
      />

      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow">Controls</p>
            <h2 className="display mt-6 max-w-[16ch] text-[28px] text-[var(--ink)] md:text-[36px]">
              What is in place on every deployment.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {SECURITY_CONTROLS.map((control, i) => (
              <Reveal key={control.title} delay={(i % 3) * 50}>
                <div className="rule mb-6" />
                <h3 className="text-[16px] font-medium tracking-tight text-[var(--ink)]">
                  {control.title}
                </h3>
                <p className="mt-3 max-w-[400px] text-[14px] leading-relaxed text-[var(--body)]">
                  {control.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
            {SECURITY_PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.title} delay={(i % 2) * 50}>
                <div className="rule mb-6" />
                <h2 className="text-[17px] font-medium tracking-tight text-[var(--ink)]">
                  {principle.title}
                </h2>
                <p className="mt-4 max-w-[460px] text-[14px] leading-relaxed text-[var(--body)]">
                  {principle.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band-paper border-y border-[var(--paper-line)] bg-[var(--paper)]">
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow">Standards</p>
            <h2 className="display mt-6 max-w-[18ch] text-[28px] text-[var(--paper-ink)] md:text-[36px]">
              Where we actually stand
            </h2>
            <p className="mt-6 max-w-[520px] text-[15px] leading-relaxed text-[var(--paper-mute)]">
              We publish status plainly rather than implying certifications we do
              not hold. SOC 2 is in progress — not certified. GDPR is a
              regulation, not a badge. ISO entries are aligned, not issued.
            </p>
          </Reveal>

          <div className="mt-16 divide-y divide-[var(--paper-line)] border-y border-[var(--paper-line)]">
            {SECURITY_STANDARDS.map((standard, i) => (
              <Reveal key={standard.id} delay={Math.min(i, 3) * 40}>
                <div
                  id={standard.id}
                  className="grid scroll-mt-28 gap-4 py-8 md:grid-cols-[220px_140px_1fr] md:items-baseline md:gap-8"
                >
                  <h3 className="text-[16px] font-medium tracking-tight text-[var(--paper-ink)]">
                    {standard.name}
                  </h3>
                  <StatusMark status={standard.status} />
                  <p className="max-w-[560px] text-[14px] leading-relaxed text-[var(--paper-mute)]">
                    {standard.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow">Deployment</p>
            <h2 className="display mt-6 max-w-[18ch] text-[28px] text-[var(--ink)] md:text-[36px]">
              You choose where it runs.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {DEPLOYMENT.map((item, i) => (
              <Reveal key={item.title} delay={i * 50}>
                <h3 className="text-[16px] font-medium tracking-tight text-[var(--ink)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--body)]">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <h2 className="display max-w-[20ch] text-[28px] text-[var(--ink)] md:text-[36px]">
              DPA and questionnaires under NDA.
            </h2>
            <p className="mt-6 max-w-[520px] text-[15px] leading-relaxed text-[var(--body)]">
              The data processing agreement, subprocessor list, and security
              questionnaire responses are available under NDA during evaluation.
              Send them with the first message — we would rather answer the hard
              questions up front than find a blocker three months in.
            </p>
            <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-[var(--body)]">
              Write to{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="link-underline text-[var(--ink)]"
              >
                {SITE.email}
              </a>{" "}
              or start from the contact form.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/product">Explore product</Button>
              <Button href="/contact" variant="outline">
                Talk to us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
