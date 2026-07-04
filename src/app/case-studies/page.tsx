import type { Metadata } from "next";
import { ClosingCTA } from "@/components/giga/ClosingCTA";
import { FadeIn, PageHero, SectionTheme } from "@/components/giga/SectionTheme";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Case Studies",
  "Deployment blueprints: how a Notrix engagement is structured — from problem to architecture to target outcomes.",
);

const BLUEPRINTS = [
  {
    eyebrow: "Blueprint 01 · Financial services",
    title: "Automating invoice-to-ERP reconciliation",
    problem:
      "A finance operations team processes thousands of invoices a month across email, a procurement portal, and an ERP. Matching, exception handling, and posting are manual — slow, error-prone, and impossible to audit end to end.",
    architecture: [
      "Knowledge layer over procurement policies, vendor master data, and historical resolutions",
      "Extraction agent validates invoice fields against purchase orders and contract terms",
      "Workflow engine routes exceptions to approvers with full context attached",
      "Every action logged; human sign-off required above configurable thresholds",
    ],
    outcomes: [
      "Target: automate the majority of straight-through invoice matches",
      "Exceptions surfaced with reasoning, not just flags",
      "Complete audit trail from receipt to ERP posting",
    ],
  },
  {
    eyebrow: "Blueprint 02 · B2B software",
    title: "Support intelligence across a fragmented stack",
    problem:
      "A support organization answers the same questions repeatedly because knowledge lives in closed tickets, Slack threads, and an outdated wiki. New agents take months to ramp, and escalations climb as products grow.",
    architecture: [
      "Unified, permission-aware index across Zendesk, Slack, Confluence, and product docs",
      "Grounded support agent drafts responses with citations to source material",
      "Policy guardrails define what the agent may resolve versus escalate",
      "Resolution data feeds back into the knowledge layer weekly",
    ],
    outcomes: [
      "Target: resolve a substantial share of tier-1 tickets without escalation",
      "Faster new-agent ramp through cited, searchable institutional knowledge",
      "Measurable deflection tracked against the team's existing KPIs",
    ],
  },
  {
    eyebrow: "Blueprint 03 · Manufacturing",
    title: "Operational knowledge search for distributed teams",
    problem:
      "Plant engineers and field teams lose hours locating procedures, past incident reports, and equipment documentation scattered across shared drives and legacy systems — often falling back on whoever has been there longest.",
    architecture: [
      "Ingestion across SharePoint, network drives, and the maintenance system",
      "Semantic search with citations, filtered by site, equipment, and role",
      "Access controls mirror existing directory permissions automatically",
      "Deployed inside the company's own cloud environment",
    ],
    outcomes: [
      "Target: sub-second cited answers to operational queries",
      "Institutional knowledge preserved as senior staff rotate out",
      "Zero change to existing permission and residency boundaries",
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Deployment blueprints"
        description="We're early — so instead of inflated customer stories, here's exactly how we structure real engagements: the problem, the architecture we deploy, and the outcomes we target. Each blueprint reflects the scoping work we do with partners."
      />

      {BLUEPRINTS.map((blueprint, index) => (
        <SectionTheme
          key={blueprint.title}
          theme={index % 2 === 0 ? "dark" : "light"}
          className={index > 0 ? "border-t border-[var(--border)]" : undefined}
        >
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              {blueprint.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">
              {blueprint.title}
            </h2>
          </FadeIn>

          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            <FadeIn delay={0.05}>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                The problem
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {blueprint.problem}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                The architecture
              </p>
              <ul className="mt-3 space-y-2.5">
                {blueprint.architecture.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-[var(--text-secondary)]"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--brand-primary)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                Target outcomes
              </p>
              <ul className="mt-3 space-y-2.5">
                {blueprint.outcomes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-[var(--text-secondary)]"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#14B8A6]" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </SectionTheme>
      ))}

      <ClosingCTA
        title="Want a blueprint for your workflow?"
        description="Tell us about your stack and the process that hurts most. We'll map the architecture and target outcomes for your case — before any commitment."
      />
    </>
  );
}
