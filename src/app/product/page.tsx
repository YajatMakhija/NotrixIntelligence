import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/metadata";
import { NAV_PRODUCT } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Product",
  "Company Brain is the intelligence layer for your company — connecting knowledge, systems, and conversations.",
);

export default function ProductPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product"
        title="Company Brain"
        intro="The intelligence layer that connects your company's knowledge, systems, and conversations — then understands, retrieves, reasons, and acts."
      />
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
            {NAV_PRODUCT.map((item, i) => (
              <Reveal key={item.href} delay={i * 60} className="bg-black p-8">
                <Link href={item.href} className="block">
                  <h2 className="text-[16px] font-medium tracking-tight text-white">
                    {item.label}
                  </h2>
                  <span className="mt-4 inline-block text-[13px] text-[var(--fg-faint)]">
                    Open →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/contact">Request access</Button>
            <Button href="/#product" variant="outline">
              See it on the homepage
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
