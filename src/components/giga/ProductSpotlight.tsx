"use client";

import { FadeIn } from "@/components/giga/SectionTheme";
import { NotrixConsole } from "@/components/giga/NotrixConsole";

export function ProductSpotlight() {
  return (
    <section
      id="console"
      className="relative scroll-mt-24 bg-[var(--bg)] px-6 pb-12 pt-4 md:pb-16"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <FadeIn>
          <h2 className="text-center text-2xl font-semibold tracking-tight text-[#18181B] md:text-3xl lg:text-4xl">
            Meet NotrixOS. Your enterprise AI operating system.
          </h2>
        </FadeIn>

        <FadeIn delay={0.12} className="mt-10">
          <NotrixConsole />
        </FadeIn>
      </div>
    </section>
  );
}
