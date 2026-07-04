"use client";

import { FadeIn, SectionTheme } from "@/components/giga/SectionTheme";
import { LIFECYCLE_STEPS } from "@/lib/constants";

export function StepFlow() {
  return (
    <SectionTheme theme="light">
      <FadeIn>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#A1A1AA]">
          Deployment lifecycle
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-[#FAFAFA] md:text-4xl">
          From data to production in five steps
        </h2>
      </FadeIn>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {LIFECYCLE_STEPS.map((step, i) => (
          <FadeIn key={step.title} delay={i * 0.08}>
            <p className="font-mono text-xs text-[#00C2FF]">{step.step}</p>
            <h3 className="mt-2 font-medium text-[#FAFAFA]">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">
              {step.description}
            </p>
          </FadeIn>
        ))}
      </div>
    </SectionTheme>
  );
}
