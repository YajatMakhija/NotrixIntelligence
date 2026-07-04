"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/giga/SectionTheme";

const STACK_INTEGRATIONS = [
  { name: "SharePoint", logo: "/logos/sharepoint.svg" },
  { name: "Salesforce", logo: "/logos/salesforce-icon.svg" },
  { name: "Slack", logo: "/logos/slack.svg" },
  { name: "SAP", logo: "/logos/sap.svg" },
  { name: "Snowflake", logo: "/logos/snowflake.svg" },
  { name: "Zendesk", logo: "/logos/zendesk.svg" },
];

const ARCHITECTURE_LAYERS = [
  {
    label: "Your stack",
    description:
      "Connect the tools your teams already run — no rip-and-replace. We plug into CRM, chat, ERP, and your data warehouse in weeks, not quarters.",
    integrations: STACK_INTEGRATIONS,
  },
  {
    label: "Knowledge layer",
    description:
      "A unified, governed context layer that ingests documents, indexes them with permissions intact, and makes everything searchable with citations.",
    items: ["Ingest", "Index", "Govern", "Search"],
  },
  {
    label: "NotrixOS",
    description:
      "The runtime where agents execute work, workflows orchestrate across systems, and every action is logged for audit and compliance.",
    items: ["Agents", "Workflows", "Enterprise search", "Audit log"],
  },
  {
    label: "Outcomes",
    description:
      "Measurable impact on the metrics that matter — faster cycle times, lower cost per ticket, and higher resolution rates across departments.",
    items: ["Cycle time ↓", "Cost per ticket ↓", "Resolution rate ↑"],
  },
];

const CAPABILITIES = [
  {
    title: "Finance operations",
    teaser: "Invoice processing from email to ERP — fully automated.",
    example:
      "Invoice lands in email → agent extracts fields, matches POs, routes exceptions to approvers, posts to ERP — with a full audit trail on every step.",
    outcome: "Designed to automate the majority of straight-through invoice processing.",
  },
  {
    title: "Customer support",
    teaser: "Grounded replies with citations, human review only when needed.",
    example:
      "Agent reads ticket history, searches your knowledge base with citations, drafts a grounded reply, and escalates only when policy requires human review.",
    outcome: "Target: resolve a substantial share of tier-1 tickets without escalation.",
  },
  {
    title: "Cross-department workflows",
    teaser: "One workflow, many systems — branching, tools, and audit built in.",
    example:
      "A single workflow triggers across CRM, email, and internal docs — branching on conditions, calling tools, and logging every action for compliance.",
    outcome: "Multi-system orchestration that would otherwise take teams of people.",
  },
];

function RainbowHoverCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rainbow-hover-card group h-full ${className}`}>
      <div className="rainbow-hover-card-inner">{children}</div>
    </div>
  );
}

function ArchitectureLayerCard({
  layer,
}: {
  layer: (typeof ARCHITECTURE_LAYERS)[number];
}) {
  return (
    <RainbowHoverCard className="flex-1">
      <p className="text-xs font-semibold text-[#18181B]">{layer.label}</p>

      {"integrations" in layer && layer.integrations ? (
        <ul className="mt-3 grid grid-cols-3 gap-2">
          {layer.integrations.map(({ name, logo }) => (
            <li
              key={name}
              className="flex flex-col items-center gap-1 rounded-lg bg-[var(--card)] px-1 py-2"
              title={name}
            >
              <Image
                src={logo}
                alt=""
                width={22}
                height={22}
                className="h-[22px] w-[22px] object-contain"
                aria-hidden
              />
              <span className="text-[9px] leading-none text-[var(--text-secondary)]">
                {name}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-3 space-y-1.5">
          {layer.items?.map((item) => (
            <li
              key={item}
              className="text-[11px] leading-snug text-[var(--text-secondary)]"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="rainbow-card-detail">
        <div className="rainbow-card-detail-body">
          <p className="border-t border-[var(--border)] pt-3 text-[11px] leading-relaxed text-[var(--text-secondary)]">
            {layer.description}
          </p>
        </div>
      </div>
    </RainbowHoverCard>
  );
}

function CapabilityCard({ cap }: { cap: (typeof CAPABILITIES)[number] }) {
  return (
    <RainbowHoverCard>
      <div className="h-0.5 w-6 bg-[var(--brand-primary)] transition-all duration-300 group-hover:w-10" />
      <h3 className="mt-4 text-base font-semibold text-[#18181B]">{cap.title}</h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)]">{cap.teaser}</p>

      <div className="rainbow-card-detail">
        <div className="rainbow-card-detail-body">
          <p className="border-t border-[var(--border)] pt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            {cap.example}
          </p>
          <p className="mt-3 text-xs text-[var(--text-secondary)]">{cap.outcome}</p>
        </div>
      </div>
    </RainbowHoverCard>
  );
}

export function EnterpriseCapabilities() {
  return (
    <section className="relative border-t border-[var(--border)] bg-[var(--surface)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
            What we build for you
          </p>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-[#18181B] md:text-3xl">
            One architecture. Every department.
          </h2>
          <p className="mt-4 max-w-xl text-[var(--text-secondary)]">
            Notrix connects the systems you already run, builds a governed knowledge
            layer on top, and deploys agents and workflows that carry real work end
            to end.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-14">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
              System architecture
            </p>
            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-stretch md:gap-2">
              {ARCHITECTURE_LAYERS.map((layer, i) => (
                <div key={layer.label} className="flex flex-1 items-stretch gap-2">
                  {i > 0 && (
                    <div className="hidden shrink-0 items-center md:flex">
                      <ArrowRight className="h-4 w-4 text-[var(--text-secondary)]" />
                    </div>
                  )}
                  <ArchitectureLayerCard layer={layer} />
                  {i < ARCHITECTURE_LAYERS.length - 1 && (
                    <span
                      aria-hidden
                      className="py-1 text-center text-[var(--text-secondary)] md:hidden"
                    >
                      ↓
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <FadeIn key={cap.title} delay={0.15 + i * 0.08}>
              <CapabilityCard cap={cap} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4} className="mt-12 text-center">
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-primary)] transition-colors hover:text-[var(--brand-primary-hover)]"
          >
            See deployment blueprints
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
