import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/metadata";
import { BRAIN_CAPABILITIES } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Company Brain",
  "Company Brain connects your company's knowledge, systems, and conversations into an intelligent layer that understands how your organization works.",
);

export default function CompanyBrainPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product"
        title="Company Brain"
        intro="One intelligence layer for the company: a governed index of what you already know, agents that finish work against it, and search that respects who is asking."
      />
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <div className="space-y-16">
            {BRAIN_CAPABILITIES.map((item, i) => (
              <Reveal key={item.id} delay={i * 40}>
                <p className="eyebrow">{item.label}</p>
                <h2 className="display mt-4 max-w-[18ch] text-[28px] text-[var(--ink)] md:text-[36px]">
                  {item.title}
                </h2>
                <p className="mt-5 max-w-[560px] text-[15px] leading-relaxed text-[var(--body)]">
                  {item.body}
                </p>
                <ul className="mt-6 max-w-[560px] space-y-2.5">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-[14px] leading-relaxed text-[var(--body)]"
                    >
                      <span
                        aria-hidden
                        className="mt-[9px] h-px w-3 shrink-0 bg-[var(--line-strong)]"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <div className="mt-16">
            <Button href="/contact">Request a demo</Button>
          </div>
        </div>
      </section>
    </>
  );
}
