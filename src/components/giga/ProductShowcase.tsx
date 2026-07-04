"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, SectionTheme } from "@/components/giga/SectionTheme";
import {
  AgentRuntimeMock,
  EnterpriseSearchMock,
  KnowledgeLayerMock,
  WorkflowEngineMock,
} from "@/components/giga/ProductMocks";

interface ProductShowcaseProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  exploreLabel: string;
  theme: "dark" | "light";
  steps: { title: string; description: string }[];
  mockType: "knowledge" | "agent" | "search" | "workflow";
}

const mocks = {
  knowledge: KnowledgeLayerMock,
  agent: AgentRuntimeMock,
  search: EnterpriseSearchMock,
  workflow: WorkflowEngineMock,
};

export function ProductShowcase({
  id,
  eyebrow,
  title,
  description,
  exploreLabel,
  theme,
  steps,
  mockType,
}: ProductShowcaseProps) {
  const Mock = mocks[mockType];

  return (
    <SectionTheme
      theme={theme}
      id={id}
      className={theme === "light" ? "border-t border-[var(--border)]" : undefined}
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
              {eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[var(--text-primary)] md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
              {description}
            </p>
            <Link
              href="/platform"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-primary)] transition-colors hover:text-[var(--brand-primary-hover)]"
            >
              {exploreLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </FadeIn>

          <div className="mt-12 space-y-6">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={0.1 + i * 0.08}>
                <div className="border-l-2 border-[var(--brand-primary)]/40 pl-4">
                  <p className="font-medium text-[var(--text-primary)]">{step.title}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.2}>
          <Mock />
        </FadeIn>
      </div>
    </SectionTheme>
  );
}
