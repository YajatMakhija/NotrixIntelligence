"use client";

import { FadeIn, SectionTheme } from "@/components/giga/SectionTheme";
import { STATS } from "@/lib/constants";

export function StatsBand() {
  return (
    <SectionTheme theme="light">
      <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.08}>
            <p className="font-serif text-3xl text-[#1a1a1a] md:text-4xl">{stat.value}</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/50">
              {stat.label}
            </p>
          </FadeIn>
        ))}
      </div>
    </SectionTheme>
  );
}
