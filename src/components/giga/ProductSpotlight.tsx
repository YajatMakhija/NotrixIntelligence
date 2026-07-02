"use client";

import Image from "next/image";
import { FadeIn } from "@/components/giga/SectionTheme";

export function ProductSpotlight() {
  return (
    <section className="section-dark relative px-6 py-24 md:py-32">
      {/* Fade into the white section below — only in this section */}
      <div
        aria-hidden
        className="section-fade-dark-to-light pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 md:h-52"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/50">
            Platform spotlight
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight md:text-5xl">
            Meet NotrixOS. Your enterprise AI operating system.
          </h2>
          <p className="mt-4 max-w-xl text-[#f5f5f0]/65">
            The intelligence layer of your enterprise — not another chatbot.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-[#E8E8E8]/80 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
            <Image
              src="/notrix-ecosystem.png"
              alt="Notrix unified knowledge core connecting company tools with autonomous AI departments"
              width={2048}
              height={1365}
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
              className="h-auto w-full"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
