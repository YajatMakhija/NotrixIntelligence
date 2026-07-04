import type { Metadata } from "next";
import { ClosingCTA } from "@/components/giga/ClosingCTA";
import { FadeIn, PageHero, SectionTheme } from "@/components/giga/SectionTheme";
import { SITE } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "About Us",
  "Notrix Intelligence builds AI ecosystems for the enterprise — with an embedded engineering model and outcomes defined by your metrics.",
);

const PRINCIPLES = [
  {
    title: "Outcomes before technology",
    description:
      "We scope every engagement around a business metric — cycle time, cost per ticket, resolution rate — and design the system backward from there. If we can't tie the work to a number you care about, we don't start it.",
  },
  {
    title: "Embedded, not outsourced",
    description:
      "Notrix engineers work inside your environment, alongside your team. Your people learn the system as it's built, so the capability stays with you after we step back.",
  },
  {
    title: "Governed by default",
    description:
      "Permission-aware access, audit trails on every agent action, and human review where it matters. Trust isn't a feature we add later — it's how the platform is architected.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="We build the AI layer enterprises actually run on"
        description="Notrix Intelligence exists because most enterprise AI stalls at the demo. We build systems that reach production — and stay there."
      />

      <SectionTheme theme="light" className="border-t border-[var(--border)]">
        <div className="grid gap-12 md:grid-cols-2">
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              Our mission
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
              Make company knowledge do the work
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="leading-relaxed text-[var(--text-secondary)]">
              Every enterprise already owns its most valuable AI asset: the
              documents, tickets, conversations, and records accumulated over
              years of operating. Our mission is to turn that knowledge into a
              governed layer that agents can reason over and act on — so
              departments run faster without giving up control.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
              We started Notrix after watching enterprise AI projects fail the
              same way, repeatedly: impressive pilots, no path to production,
              no owner for outcomes. We built the company around fixing exactly
              that.
            </p>
          </FadeIn>
        </div>
      </SectionTheme>

      <SectionTheme theme="dark">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
            How we operate
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
            Three principles behind every engagement
          </h2>
        </FadeIn>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {PRINCIPLES.map((principle, i) => (
            <FadeIn key={principle.title} delay={i * 0.1}>
              <div className="card-hover h-full rounded-lg border border-[var(--border)] bg-[var(--card)] p-6">
                <div className="h-0.5 w-8 bg-[#14B8A6]" />
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {principle.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </SectionTheme>

      <SectionTheme theme="light">
        <div className="grid gap-12 md:grid-cols-2">
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              Where we are
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
              Early, deliberate, and hands-on
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="leading-relaxed text-[var(--text-secondary)]">
              We're an early-stage company working with a small number of
              enterprise partners at a time. That's a deliberate choice: deep
              engagements produce systems that survive contact with production,
              and partners get engineering attention that larger vendors can't
              offer.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
              If that model fits how you want to adopt AI, we'd like to talk.
              Reach us at{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-[var(--brand-primary)] underline underline-offset-4 hover:text-[var(--brand-primary-hover)]"
              >
                {SITE.email}
              </a>{" "}
              or book a working session through the demo page.
            </p>
          </FadeIn>
        </div>
      </SectionTheme>

      <ClosingCTA />
    </>
  );
}
