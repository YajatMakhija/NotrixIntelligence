import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/metadata";
import { USE_CASES } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Solutions",
  "Company Brain for engineering, sales, support, operations, and leadership.",
);

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Built for the way your company actually works."
        intro="One intelligence layer, used differently by every team — always grounded in company context and source permissions."
      />
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-2">
            {USE_CASES.map((item, i) => (
              <Reveal key={item.id} delay={i * 50} className="bg-black p-8">
                <Link href={item.href} className="block">
                  <h2 className="text-[17px] font-medium tracking-tight text-white">
                    {item.title}
                  </h2>
                  <p className="mt-3 max-w-[440px] text-[14px] leading-relaxed text-[var(--fg-muted)]">
                    {item.body}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <Button href="/contact">Request access</Button>
          </div>
        </div>
      </section>
    </>
  );
}
