"use client";

import { FadeIn, SectionTheme } from "@/components/giga/SectionTheme";
import { Button } from "@/components/ui/Button";

interface ClosingCTAProps {
  title?: string;
  description?: string;
}

export function ClosingCTA({
  title = "We're onboarding early enterprise partners.",
  description = "Work directly with our engineering team to deploy a knowledge layer and your first production agents — scoped to your workflows, measured against your metrics.",
}: ClosingCTAProps) {
  return (
    <SectionTheme theme="light" className="relative overflow-hidden">
      <div aria-hidden className="aurora-echo" />
      <FadeIn className="relative z-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
          Get in touch
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-[var(--text-primary)] md:text-4xl">
          {title}
        </h2>
        <p className="mt-6 max-w-2xl text-[var(--text-secondary)]">{description}</p>
        <div className="mt-10">
          <Button href="/demo" variant="accent">
            Contact us
          </Button>
        </div>
      </FadeIn>
    </SectionTheme>
  );
}
