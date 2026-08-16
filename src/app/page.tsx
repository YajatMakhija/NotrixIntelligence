import Image from "next/image";
import Link from "next/link";
import { LogoCube } from "@/components/cube/LogoCube";
import { ProductMockup } from "@/components/home/ProductMockup";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  HERO_INTEGRATIONS,
  SECURITY_STANDARDS,
  TRUST_INTEGRATIONS,
  USE_CASES,
} from "@/lib/site";

const SECURITY_ROW = SECURITY_STANDARDS.filter((item) =>
  ["soc2", "iso-27001", "gdpr", "iso-42001"].includes(item.id),
);

const SECURITY_CAPABILITIES = [
  "Encryption",
  "Access control",
  "Auditability",
  "Data protection",
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden pt-[65px]">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-6 py-16 md:px-10 md:py-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8 lg:py-8 lg:min-h-[calc(100svh-65px)]">
          <div className="relative z-10 max-w-[560px]">
            <p className="hero-in eyebrow">Company Brain</p>
            <h1 className="hero-in hero-in-delay-1 display mt-5 text-[42px] text-white sm:text-[56px] md:text-[68px] lg:text-[80px]">
              The intelligence layer for your company.
            </h1>
            <p className="hero-in hero-in-delay-2 mt-6 max-w-[440px] text-[17px] leading-snug text-[var(--fg-muted)] md:text-[18px]">
              Company Brain connects your company&apos;s knowledge, systems, and
              conversations into one intelligent layer.
            </p>
            <div className="hero-in hero-in-delay-3 mt-9 flex flex-wrap items-center gap-3">
              <Button href="/contact">Request access</Button>
              <Button href="#product" variant="outline">
                Explore Company Brain
              </Button>
            </div>
            <p className="hero-in hero-in-delay-3 mt-6 text-[13px] text-[var(--fg-faint)]">
              Built for organizations where context matters.
            </p>
          </div>

          <div className="relative h-[42vh] min-h-[280px] lg:h-[min(72vh,760px)]">
            <LogoCube
              quiet
              logos={HERO_INTEGRATIONS.map((app) => app.src)}
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      <section id="product" className="scroll-mt-24 border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <h2 className="display max-w-[16ch] text-[36px] text-white md:text-[48px] lg:text-[56px]">
              One place to understand your company.
            </h2>
            <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-[var(--fg-muted)] md:text-[18px]">
              Company Brain brings together the knowledge and context scattered
              across the tools your teams use every day.
            </p>
          </Reveal>
          <Reveal delay={80} className="mt-14">
            <ProductMockup />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <Reveal>
            <h2 className="display max-w-[18ch] text-[32px] text-white md:text-[44px]">
              For every team that runs on context.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {USE_CASES.map((item, i) => (
              <Reveal key={item.id} delay={i * 50}>
                <Link
                  href={item.href}
                  className="group block"
                >
                  <h3 className="text-[15px] font-medium tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--fg-muted)] transition-colors duration-200 group-hover:text-[var(--fg)]">
                    {item.body}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <Reveal>
            <h2 className="display max-w-[16ch] text-[32px] text-white md:text-[44px]">
              Built for your company&apos;s most sensitive knowledge.
            </h2>
            <p className="mt-5 max-w-[480px] text-[17px] text-[var(--fg-muted)]">
              Security, privacy and access controls are foundational to Company Brain.
            </p>
          </Reveal>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
            {SECURITY_ROW.map((item) => (
              <div key={item.id}>
                <p className="text-[14px] tracking-tight text-white">{item.name}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[var(--fg-faint)]">
                  {item.status}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[13px] text-[var(--fg-muted)]">
            {SECURITY_CAPABILITIES.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <Reveal className="mt-10">
            <Link href="/security" className="link-underline text-[14px] text-white">
              Explore security →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <Reveal>
            <h2 className="display max-w-[18ch] text-[32px] text-white md:text-[44px]">
              Works with the tools your company already uses.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {TRUST_INTEGRATIONS.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <Image
                  src={item.src}
                  alt=""
                  width={22}
                  height={22}
                  className="h-[22px] w-[22px] object-contain opacity-70"
                />
                <span className="text-[13.5px] text-[var(--fg-muted)]">{item.label}</span>
              </div>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link
              href="/product/integrations"
              className="link-underline text-[14px] text-white"
            >
              View integrations →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-[var(--line)]">
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-[240px] max-w-[480px] opacity-40">
            <LogoCube quiet logos={[]} className="h-full w-full" />
          </div>
          <div className="relative mx-auto max-w-[640px] px-6 py-32 text-center md:px-10 md:py-40">
            <Reveal>
              <h2 className="display text-[36px] text-white md:text-[56px]">
                Give your company a brain.
              </h2>
              <p className="mx-auto mt-5 max-w-[400px] text-[17px] text-[var(--fg-muted)]">
                Turn fragmented company knowledge into organizational intelligence.
              </p>
              <div className="mt-10">
                <Button href="/contact">Request access</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
