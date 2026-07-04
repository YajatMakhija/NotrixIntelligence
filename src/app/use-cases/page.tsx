import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ClosingCTA } from "@/components/giga/ClosingCTA";
import { FadeIn, PageHero, SectionTheme } from "@/components/giga/SectionTheme";
import { USE_CASES } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Use Cases",
  "See how enterprises use Notrix Intelligence for operations automation, knowledge search, support, and more.",
);

export default function UseCasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Use Cases"
        title="AI ecosystems built for real enterprise problems"
        description="From operations automation to compliance — see how Notrix transforms fragmented data and manual workflows into intelligent systems."
      />

      {USE_CASES.map((useCase, index) => (
        <SectionTheme
          key={useCase.title}
          theme={index % 2 === 0 ? "dark" : "light"}
          className={index > 0 ? "border-t border-[var(--border)]" : undefined}
        >
          <FadeIn>
            <p className="gradient-text text-5xl font-semibold tracking-tight md:text-6xl">
              {useCase.metric}
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
              {useCase.metricLabel}
            </p>
            <h2 className="mt-8 text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">
              {useCase.title}
            </h2>
          </FadeIn>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <FadeIn delay={0.1}>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                The problem
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{useCase.problem}</p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                How Notrix solves it
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{useCase.solution}</p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="mt-8">
            <Link
              href="/demo"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-primary)] transition-colors hover:text-[var(--brand-primary-hover)]"
            >
              Talk to us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </FadeIn>
        </SectionTheme>
      ))}

      <ClosingCTA
        title="Which workflow should we automate first?"
        description="Tell us about your stack and we'll show you what a Notrix deployment looks like for your team."
      />
    </>
  );
}
