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
    <SectionTheme theme={theme} id={id}>
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-50">
              {eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed opacity-65 md:text-base">
              {description}
            </p>
            <Link
              href="/platform"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
            >
              {exploreLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>

          <div className="mt-12 space-y-6">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={0.1 + i * 0.08}>
                <div
                  className="border-l-2 border-current pl-4 opacity-80"
                  style={{
                    borderColor:
                      theme === "dark"
                        ? "rgba(245,245,240,0.2)"
                        : "rgba(26,26,26,0.15)",
                  }}
                >
                  <p className="font-medium">{step.title}</p>
                  <p className="mt-1 text-sm opacity-60">{step.description}</p>
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
