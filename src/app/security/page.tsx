import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SECURITY_PRINCIPLES, SECURITY_STANDARDS, SITE } from "@/lib/site";
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

      <section className="border-y border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
            {SECURITY_PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.title} delay={(i % 2) * 90}>
                <div className="rule mb-6" />
                <h2 className="text-[17px] font-medium tracking-tight text-white">
                  {principle.title}
                </h2>
                <p className="mt-4 max-w-[460px] text-[14px] leading-relaxed text-[var(--fg-muted)]">
                  {principle.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow">Standards</p>
            <h2 className="display mt-6 max-w-[18ch] text-[28px] text-white md:text-[36px]">
              Where we actually stand
            </h2>
            <p className="mt-6 max-w-[520px] text-[15px] leading-relaxed text-[var(--fg-muted)]">
              We publish status plainly rather than implying certifications we do
              not hold. Each entry says exactly where it is, and this page is
              updated as audits complete.
            </p>
          </Reveal>

          <div className="mt-16 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {SECURITY_STANDARDS.map((standard, i) => (
              <Reveal key={standard.id} delay={Math.min(i, 3) * 60}>
                <div
                  id={standard.id}
                  className="grid scroll-mt-28 gap-4 py-8 md:grid-cols-[220px_120px_1fr] md:items-baseline md:gap-8"
                >
                  <h3 className="text-[16px] font-medium tracking-tight text-white">
                    {standard.name}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-faint)]">
                    {standard.status}
                  </p>
                  <p className="max-w-[560px] text-[14px] leading-relaxed text-[var(--fg-muted)]">
                    {standard.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <h2 className="display max-w-[20ch] text-[28px] text-white md:text-[36px]">
              Bring your security team to the first call.
            </h2>
            <p className="mt-6 max-w-[520px] text-[15px] leading-relaxed text-[var(--fg-muted)]">
              We would rather answer the hard questions up front than find a
              blocker three months into a deployment. Send your questionnaire to{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="link-underline text-white"
              >
                {SITE.email}
              </a>{" "}
              and we will work through it with you under NDA.
            </p>
            <div className="mt-10">
              <Button href="/contact">Talk to us</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
