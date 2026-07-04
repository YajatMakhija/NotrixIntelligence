"use client";

import Link from "next/link";
import { FadeIn } from "@/components/giga/SectionTheme";

export function CinematicHero() {
  return (
    <section className="relative flex min-h-[78vh] flex-col items-center justify-center overflow-hidden bg-[var(--bg)] px-6 pb-16 pt-36 text-center">
      <div aria-hidden className="aurora-container">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
        <div className="aurora-blob aurora-blob-4" />
        <div className="aurora-mask" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--text-primary)] md:text-5xl lg:text-6xl">
            AI that knows your company.
            <br />
            <span className="gradient-text">Automates your departments.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.12}>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            We build the AI layer your company runs on — scoped to your outcomes,
            not generic demos.
          </p>
        </FadeIn>

        <FadeIn delay={0.24}>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)]">
            Currently onboarding enterprise partners
          </p>
        </FadeIn>

        <FadeIn delay={0.36}>
          <Link
            href="#console"
            className="mt-10 inline-block text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-primary)]"
          >
            See how it works ↓
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
