"use client";

import { FadeIn, SectionTheme } from "@/components/giga/SectionTheme";
import { IMPROVE_FEATURES } from "@/lib/constants";

export function ImproveSection() {
  return (
    <SectionTheme theme="light">
      <FadeIn>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#1a1a1a]/50">
          Smart suggestions
        </p>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl md:text-4xl">
          Improve as you go
        </h2>
      </FadeIn>

      <div className="mt-16 grid gap-12 md:grid-cols-3">
        {IMPROVE_FEATURES.map((feature, i) => (
          <FadeIn key={feature.title} delay={i * 0.1}>
            <h3 className="text-lg font-medium">{feature.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#1a1a1a]/65">
              {feature.description}
            </p>
          </FadeIn>
        ))}
      </div>
    </SectionTheme>
  );
}
