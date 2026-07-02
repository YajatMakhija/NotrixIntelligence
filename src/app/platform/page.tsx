import type { Metadata } from "next";
import { ClosingCTA } from "@/components/giga/ClosingCTA";
import { FadeIn, PageHero, SectionTheme } from "@/components/giga/SectionTheme";
import { ProductShowcase } from "@/components/giga/ProductShowcase";
import { INTEGRATIONS, PLATFORM_MODULES, SECURITY_FEATURES } from "@/lib/constants";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Platform",
  "One knowledge layer. Agents, search, and workflows — unified in the Notrix Intelligence platform.",
);

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title={
          <>
            One knowledge layer.
            <br />
            Agents, search, and workflows — unified.
          </>
        }
        description="Notrix is the AI operating system for your enterprise. Ingest data from every system, build a governed knowledge layer, and deploy agents, search, and automations on top."
      />

      <SectionTheme theme="light">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-4xl">How it works</h2>
          <p className="mt-4 max-w-2xl text-[#1a1a1a]/65">
            Data flows from your enterprise systems into a unified knowledge layer.
            Agents, search, and workflows all read from the same source of truth.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-12">
          <div className="grid gap-4 md:grid-cols-5 md:gap-2">
            {["Ingest", "Knowledge Layer", "Agents", "Search", "Workflows"].map(
              (step, i) => (
                <div key={step} className="relative flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 font-mono text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="mt-3 text-center text-sm font-medium">{step}</p>
                  {i < 4 && (
                    <div className="absolute left-[calc(50%+24px)] top-6 hidden h-px w-[calc(100%-48px)] bg-black/10 md:block" />
                  )}
                </div>
              ),
            )}
          </div>
        </FadeIn>
      </SectionTheme>

      {PLATFORM_MODULES.map((module) => (
        <ProductShowcase
          key={module.id}
          id={module.id}
          eyebrow={module.eyebrow}
          title={module.title}
          description={module.description}
          exploreLabel={module.exploreLabel}
          theme={module.theme}
          steps={module.steps}
          mockType={
            module.id === "knowledge-layer"
              ? "knowledge"
              : module.id === "agent-runtime"
                ? "agent"
                : module.id === "enterprise-search"
                  ? "search"
                  : "workflow"
          }
        />
      ))}

      <SectionTheme theme="light">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#1a1a1a]/50">
            Integrations
          </p>
          <h2 className="mt-4 font-serif text-3xl">Connect your entire stack</h2>
        </FadeIn>
        <div className="mt-12 flex flex-wrap gap-3">
          {INTEGRATIONS.map((name, i) => (
            <FadeIn key={name} delay={i * 0.05}>
              <span className="rounded-full border border-black/10 px-5 py-2.5 text-sm text-[#1a1a1a]/75">
                {name}
              </span>
            </FadeIn>
          ))}
        </div>
      </SectionTheme>

      <SectionTheme theme="dark">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/50">
            Security & governance
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl">
            Enterprise-grade from day one
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {SECURITY_FEATURES.map((feature, i) => (
            <FadeIn key={feature} delay={i * 0.08}>
              <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-[#f5f5f0]/80">
                {feature}
              </div>
            </FadeIn>
          ))}
        </div>
      </SectionTheme>

      <ClosingCTA />
    </>
  );
}
