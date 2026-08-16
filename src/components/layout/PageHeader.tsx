import { Reveal } from "@/components/ui/Reveal";

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_20%_-10%,rgba(255,255,255,0.05),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-[1180px] px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="display mt-7 max-w-[16ch] text-[40px] text-white sm:text-[48px] lg:text-[56px]">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={160}>
            <p className="mt-7 max-w-[520px] text-[15px] leading-relaxed text-[var(--fg-muted)] md:text-[16px]">
              {intro}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
