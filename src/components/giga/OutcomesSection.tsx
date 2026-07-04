"use client";

import { FadeIn } from "@/components/giga/SectionTheme";

const OUTCOME_PILLARS = [
  {
    title: "AI company knowledge",
    description:
      "Every document, ticket, and conversation indexed into one governed layer your entire organization can search and act on — so institutional knowledge stops living in people's heads.",
  },
  {
    title: "An AI coworker for every employee",
    description:
      "Each person gets an assistant grounded in their role, permissions, and context — drafting, researching, and executing inside the tools they already use.",
  },
  {
    title: "100+ agents across your departments",
    description:
      "Autonomous agents deployed in finance, support, sales, legal, and operations — handling workflows end to end while your teams focus on decisions that need a human.",
  },
];

const IMPACT_AREAS = [
  {
    label: "Cost",
    detail: "Fewer manual handoffs, less rework, and lower cost per transaction across high-volume workflows.",
  },
  {
    label: "Time",
    detail: "Cycle times compressed — from invoice processing to ticket resolution to deal preparation.",
  },
  {
    label: "Productivity",
    detail: "Employees spend less time searching and more time on work that requires judgment.",
  },
  {
    label: "Efficiency",
    detail: "Departments run on connected systems instead of copy-paste between tools and inboxes.",
  },
];

export function OutcomesSection() {
  return (
    <section className="relative bg-[var(--bg)] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
            Outcomes
          </p>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-[#18181B] md:text-3xl">
            What Notrix delivers for your company
          </h2>
          <p className="mt-4 max-w-xl text-[var(--text-secondary)]">
            Not a chatbot on the side — a full AI operating layer that knows your
            business, works alongside your people, and runs at scale across every
            department.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {OUTCOME_PILLARS.map((pillar, i) => (
            <FadeIn key={pillar.title} delay={i * 0.08}>
              <div className="card-hover h-full rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
                <div className="h-0.5 w-6 bg-[var(--brand-secondary)]" />
                <h3 className="mt-4 text-base font-semibold text-[#18181B]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {pillar.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.25} className="mt-14">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
              Measured impact
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              {IMPACT_AREAS.map((area) => (
                <div key={area.label}>
                  <p className="text-sm font-semibold text-[#18181B]">{area.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                    {area.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
