"use client";

import { FadeIn, SectionTheme } from "@/components/giga/SectionTheme";
import { PILLARS } from "@/lib/constants";

export function StatsBand() {
  return (
    <SectionTheme theme="dark" className="border-t border-[#27272A]">
      <FadeIn>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#A1A1AA]">
          What we offer
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-[#FAFAFA] md:text-4xl">
          AI, built and run inside your business
        </h2>
      </FadeIn>

      <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {PILLARS.map((pillar, i) => (
          <FadeIn key={pillar.title} delay={i * 0.1}>
            <div className="card-hover h-full rounded-lg border border-[#27272A] bg-[#18181B] p-6">
              <div className="h-0.5 w-8 bg-[#00C2FF]" />
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-[#FAFAFA]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
                {pillar.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionTheme>
  );
}
