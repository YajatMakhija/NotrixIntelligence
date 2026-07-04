"use client";

import Image from "next/image";
import { FadeIn } from "@/components/giga/SectionTheme";
import { BRAND_APPS } from "@/components/giga/BrandLogos";

function LogoRibbonItems({ prefix }: { prefix: string }) {
  return (
    <>
      {BRAND_APPS.map(({ id, src, label }) => (
        <div key={`${prefix}-${id}`} className="logo-ribbon-item" title={label}>
          <Image
            src={src}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 object-contain"
            aria-hidden
          />
          <span className="whitespace-nowrap text-sm font-medium text-[var(--text-secondary)]">
            {label}
          </span>
        </div>
      ))}
    </>
  );
}

export function LogoWall() {
  return (
    <section className="relative bg-[var(--bg)] px-6 pb-24 pt-4 md:pb-32">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-8 text-center md:mb-10">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              Integrations
            </p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-[#18181B] md:text-2xl">
              The stack we connect your systems to
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-[var(--text-secondary)]">
              Notrix plugs into the tools your teams already run — CRM, chat,
              docs, and data — without a rip-and-replace migration.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="logo-ribbon logo-ribbon-fade py-1">
            <div className="logo-ribbon-track">
              <LogoRibbonItems prefix="a" />
              <LogoRibbonItems prefix="b" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
