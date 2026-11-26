import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export function SolutionPage({
  title,
  intro,
  points,
}: {
  title: string;
  intro: string;
  points: { title: string; body: string }[];
}) {
  return (
    <>
      <PageHeader eyebrow="Solutions" title={title} intro={intro} />
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <div className="grid gap-x-16 gap-y-12 md:grid-cols-3">
            {points.map((point, i) => (
              <Reveal key={point.title} delay={i * 50}>
                <div className="rule mb-6" />
                <h2 className="text-[16px] font-medium tracking-tight text-[var(--ink)]">
                  {point.title}
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--body)]">
                  {point.body}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16">
            <Button href="/contact">Request a demo</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
