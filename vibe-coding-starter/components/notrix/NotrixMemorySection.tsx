import { ArrowRight, BookCheck, GitMerge, History, Moon, Network } from 'lucide-react';
import Link from 'next/link';

import { notrixWashClass } from '@/components/notrix/NotrixTheme';

// Illustrative: the same Acme records used elsewhere on the page.
const rawFacts = [
  ['#sales', 'Acme wants priority support'],
  ['Proposal', '$74,000 per year'],
  ['#sales', 'Let’s go to $84k with support'],
  ['Agreement', '$82,000, support included'],
  ['#ops', 'Maya owns Acme renewals'],
] as const;

const dreamSteps = [
  'Connecting related facts',
  'Resolving contradictions',
  'Retiring what is outdated',
  'Writing memories',
] as const;

const memories = [
  ['Decision', 'Acme’s annual plan is $82,000, priority support included', 'Agreement, March 10 · Approved by Maya', 'bg-secondary-50 text-secondary-800'],
  ['Owner', 'Maya owns the Acme renewal', '#ops thread · Approved', 'bg-secondary-50 text-secondary-800'],
  ['Superseded', 'The $84,000 suggestion', 'Replaced by the signed agreement', 'bg-amber-50 text-amber-800'],
] as const;

const points = [
  [Network, 'Connects', 'Facts about the same customer, project or decision are linked, even across tools.'],
  [GitMerge, 'Reconciles', 'When facts disagree, the newer approved record wins and the older one is marked superseded.'],
  [BookCheck, 'Stays accountable', 'Every memory keeps its evidence, and an owner approves it before agents rely on it.'],
  [History, 'Keeps history', 'Nothing is silently overwritten. You can see what changed, when and why.'],
] as const;

function FlowArrow() {
  return (
    <div className="flex items-center justify-center py-1 lg:py-0" aria-hidden="true">
      <div className="relative h-8 w-0.5 overflow-hidden rounded-full bg-neutral-200 lg:h-0.5 lg:w-12">
        <span className="absolute inset-x-0 top-0 h-1/3 animate-[notrix-dream-flow_1.8s_ease-in-out_infinite] bg-[linear-gradient(180deg,transparent,#8b5cf6,transparent)] motion-reduce:hidden lg:inset-y-0 lg:left-0 lg:h-auto lg:w-1/3 lg:animate-[notrix-line-flow_1.8s_ease-in-out_infinite] lg:bg-[linear-gradient(90deg,transparent,#8b5cf6,transparent)]" />
      </div>
    </div>
  );
}

function StageLabel({ number, label }: { number: string; label: string }) {
  return (
    <p className="flex items-center gap-2 text-xs font-medium text-neutral-500">
      <span className="font-semibold tabular-nums text-secondary-700">{number}</span>
      {label}
    </p>
  );
}

export function NotrixMemorySection() {
  return (
    <section
      id="memory"
      aria-labelledby="memory-title"
      className={`scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24 ${notrixWashClass}`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-secondary-700">
            <Moon className="size-3.5" aria-hidden="true" /> Notrix dreams
          </p>
          <h2
            id="memory-title"
            className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-primary-950 sm:text-5xl"
          >
            Raw facts in. Agent memory out.
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">
            Every message and document holds facts. In the background, Notrix
            dreams over them, the way people consolidate what they learned in
            a day: it connects related facts, settles contradictions, retires
            what is outdated and turns what matters into memories your team
            and your agents can rely on.
          </p>
        </div>

        {/* One framed panel: header bar, the three stages, then what consolidation guarantees. */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm shadow-neutral-200/60">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 px-5 py-4 sm:px-7">
            <h3 className="flex items-center gap-2 text-base font-semibold text-primary-950 sm:text-lg">
              <span className="size-2 rounded-full bg-secondary-500" aria-hidden="true" />
              How Notrix consolidates memory
            </h3>
            <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-neutral-600">
              Runs in the background
            </span>
          </div>

          <div className="grid items-stretch gap-2 p-5 sm:p-7 lg:grid-cols-[1fr_auto_minmax(0,0.8fr)_auto_1.15fr] lg:gap-3">
            {/* 1. Raw facts */}
            <div className="flex flex-col rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <StageLabel number="01" label="Raw facts, as they arrive" />
              <ul className="mt-4 space-y-2">
                {rawFacts.map(([where, text], index) => (
                  <li
                    key={text}
                    style={{ animationDelay: `${index * 0.6}s` }}
                    className="flex items-baseline gap-2 rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-neutral-200 motion-safe:animate-[notrix-dream-drift_6s_ease-in-out_infinite]"
                  >
                    <span className="shrink-0 text-[11px] font-medium text-neutral-400">{where}</span>
                    <span className="truncate text-neutral-700">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <FlowArrow />

            {/* 2. Dreaming */}
            <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl notrix-light bg-[linear-gradient(135deg,#251C49,#3D3078_55%,#3157e8)] px-5 py-10 text-center text-white">
              <p className="absolute left-5 top-4 text-[11px] font-semibold tabular-nums text-white/60">02</p>
              <span className="relative flex size-16 items-center justify-center" aria-hidden="true">
                <span className="absolute inset-0 rounded-full bg-white/10 motion-safe:animate-ping" />
                <span className="absolute inset-2 rounded-full bg-white/15" />
                <Moon className="relative size-7" />
              </span>
              <p className="mt-5 text-sm font-semibold">Notrix is dreaming</p>
              <div className="relative mt-2 h-5 w-full text-xs text-neutral-200">
                {dreamSteps.map((step, index) => (
                  <span
                    key={step}
                    style={{ animationDelay: `${index * 2}s` }}
                    className={`absolute inset-0 motion-safe:animate-[notrix-dream-cycle_8s_linear_infinite] motion-safe:opacity-0 ${index === 0 ? '' : 'motion-reduce:hidden'}`}
                  >
                    {step}…
                  </span>
                ))}
              </div>
            </div>

            <FlowArrow />

            {/* 3. Memories */}
            <div className="flex flex-col rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <StageLabel number="03" label="Memories, with evidence and an owner" />
              <ul className="mt-4 space-y-2">
                {memories.map(([kind, statement, evidence, badge]) => (
                  <li key={statement} className="rounded-lg bg-white p-3 ring-1 ring-neutral-200">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${badge}`}>{kind}</span>
                    <p className="mt-2 text-sm font-medium text-primary-950">{statement}</p>
                    <p className="mt-1 text-xs text-neutral-500">{evidence}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid border-t border-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
            {points.map(([Icon, title, body], index) => (
              <article
                key={title}
                className={`p-5 sm:p-6 ${index > 0 ? 'border-t border-neutral-200 sm:border-t-0' : ''} ${index % 2 === 1 ? 'sm:border-l' : ''} ${index >= 2 ? 'sm:border-t lg:border-t-0' : ''} ${index === 2 ? 'lg:border-l' : ''} border-neutral-200`}
              >
                <Icon className="size-5 text-secondary-700" aria-hidden="true" />
                <h4 className="mt-3 font-semibold text-primary-950">{title}</h4>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{body}</p>
              </article>
            ))}
          </div>
        </div>

        <Link
          href="/how-it-works#learn-and-forget"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-950 underline decoration-secondary-300 underline-offset-4 hover:decoration-secondary-600"
        >
          How Notrix learns and forgets <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
