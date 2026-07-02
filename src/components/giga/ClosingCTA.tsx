"use client";

import { FadeIn, SectionTheme } from "@/components/giga/SectionTheme";
import { Button } from "@/components/ui/Button";

interface ClosingCTAProps {
  title?: string;
  description?: string;
}

export function ClosingCTA({
  title = "Ready to see Notrix build your AI ecosystem?",
  description = "Notrix agents handle complex workflows at scale — from knowledge retrieval to multi-system automation — while maintaining enterprise-grade security and auditability.",
}: ClosingCTAProps) {
  return (
    <SectionTheme theme="light">
      <FadeIn>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#1a1a1a]/50">
          Get a personalized demo
        </p>
        <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight text-[#111111] md:text-5xl">
          {title}
        </h2>
        <p className="mt-6 max-w-2xl text-[#1a1a1a]/65">{description}</p>
        <div className="mt-10">
          <Button href="/demo" variant="light">
            Talk to us
          </Button>
        </div>
      </FadeIn>
    </SectionTheme>
  );
}
