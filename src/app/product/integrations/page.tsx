import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { LogoGrid } from "@/components/ui/LogoGrid";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/metadata";
import { CUSTOM_CONNECTORS, INTEGRATION_GROUPS } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Integrations",
  "Connect the systems your company already uses — documents, conversations, engineering, CRM, and data.",
);

export default function IntegrationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product"
        title="Integrations"
        intro="Company Brain connects the systems your teams already run. These are the connector families we deploy with — not a customer logo wall."
      />
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] space-y-16 px-6 py-20 md:px-10 md:py-24">
          {INTEGRATION_GROUPS.map((group) => (
            <div key={group.heading}>
              <Reveal>
                <h2 className="text-[15px] font-medium tracking-tight text-[var(--ink)]">
                  {group.heading}
                </h2>
              </Reveal>
              <div className="mt-5">
                <LogoGrid items={group.items} />
              </div>
            </div>
          ))}

          <div>
            <Reveal>
              <h2 className="display max-w-[16ch] text-[28px] text-[var(--ink)] md:text-[32px]">
                Beyond the named connectors.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-10 md:grid-cols-3">
              {CUSTOM_CONNECTORS.map((item, i) => (
                <Reveal key={item.title} delay={i * 50}>
                  <div className="rule mb-6" />
                  <h3 className="text-[16px] font-medium tracking-tight text-[var(--ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--body)]">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <Button href="/contact">Request a demo</Button>
        </div>
      </section>
    </>
  );
}
