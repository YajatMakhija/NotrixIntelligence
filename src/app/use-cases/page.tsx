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
          theme={index % 2 === 0 ? "light" : "dark"}
        >
          <FadeIn>
            <p className="font-serif text-5xl md:text-6xl">
              {useCase.metric}
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest opacity-50">
              {useCase.metricLabel}
            </p>
            <h2 className="mt-8 font-serif text-2xl md:text-3xl">{useCase.title}</h2>
          </FadeIn>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <FadeIn delay={0.1}>
              <p className="font-mono text-xs uppercase tracking-widest opacity-40">
                The problem
              </p>
              <p className="mt-3 text-sm leading-relaxed opacity-70">{useCase.problem}</p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="font-mono text-xs uppercase tracking-widest opacity-40">
                How Notrix solves it
              </p>
              <p className="mt-3 text-sm leading-relaxed opacity-70">{useCase.solution}</p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="mt-8">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
            >
              Talk to us
              <ArrowRight className="h-4 w-4" />
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
