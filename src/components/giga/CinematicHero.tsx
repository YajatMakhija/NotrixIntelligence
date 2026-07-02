"use client";

import Image from "next/image";
import { FadeIn } from "@/components/giga/SectionTheme";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=80";

export function CinematicHero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-[#0c0c0c] pb-24 pt-28 md:items-center md:pb-0 md:pt-32">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Atmospheric mountain landscape"
          fill
          priority
          className="hero-ken-burns object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/50 via-[#0c0c0c]/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/75 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/70">
            {SITE.tagline}
          </p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-[1.1] tracking-tight text-[#f5f5f0] md:text-6xl lg:text-7xl">
            AI that knows your company.
            <br />
            Automates your workflows.
          </h1>
        </FadeIn>

        <FadeIn delay={0.24}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#f5f5f0]/75 md:text-lg">
            Notrix builds a knowledge layer from your data — then deploys agents,
            search, and workflows on top. One AI ecosystem, not another point tool.
          </p>
        </FadeIn>

        <FadeIn delay={0.36}>
          <div className="mt-10">
            <Button href="/demo">Talk to us</Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
