"use client";

import { FadeIn, SectionTheme } from "@/components/giga/SectionTheme";
import { FEATURES } from "@/lib/constants";

export function FeatureGrid() {
  return (
    <SectionTheme theme="dark">
      <FadeIn>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-[#FAFAFA] md:text-4xl">
          Built for enterprise scale
        </h2>
      </FadeIn>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <FadeIn key={feature.title} delay={i * 0.1}>
            <div className="card-hover rounded-lg border border-[#27272A] bg-[#18181B] p-6">
              <div className="h-0.5 w-6 bg-[#14B8A6]" />
              <h3 className="mt-4 text-lg font-medium text-[#FAFAFA]">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
                {feature.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </SectionTheme>
  );
}
