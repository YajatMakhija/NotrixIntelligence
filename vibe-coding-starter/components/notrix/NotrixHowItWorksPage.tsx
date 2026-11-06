import Link from 'next/link';
import {
  ArrowRight,
  BellRing,
  BookCheck,
  Check,
  Cloud,
  Eraser,
  FileClock,
  History,
  PauseCircle,
  PenLine,
  ShieldCheck,
  Sparkles,
  ThumbsDown,
} from 'lucide-react';

import { NotrixDemoDialog, NotrixDemoTrigger } from '@/components/notrix/NotrixDemoDialog';
import { NotrixFooter } from '@/components/notrix/NotrixFooter';
import { NotrixHeader } from '@/components/notrix/NotrixHeader';
import {
  NotrixGlassFrame,
  NotrixRibbon,
  notrixCtaClass,
  notrixEyebrowClass,
  notrixGlassCardClass,
  notrixSecondaryCtaClass,
  notrixWashClass,
} from '@/components/notrix/NotrixTheme';

// Every claim here maps to the companybrain phase-2 workflows, described at outcome level (no internal services: IP).
// The example company and figures are illustrative, matching the Acme records used on the home page.

const exampleQuestion = 'What price did we agree with Acme for the annual plan?';

const steps = [
  {
    title: 'Connect the sources you choose',
    body: 'An administrator picks the Slack channels and folders Notrix may read. Nothing else is touched.',
    example: ['#deals channel selected', 'Drive folder "Acme" selected', '3 documents found'],
  },
  {
    title: 'Index inside your AWS account',
    body: 'Notrix reads each file and builds a private, encrypted search index in your account. Each source’s permissions travel with it.',
    example: ['Original proposal · $74,000', 'Pricing discussion · $84,000', 'Approved agreement · $82,000'],
  },
  {
    title: 'Ask where you already work',
    body: 'Someone asks in Slack or on the web. Notrix checks who is asking before it searches.',
    example: [`“${exampleQuestion}”`],
  },
  {
    title: 'Find the best evidence',
    body: 'Notrix looks across documents, conversations and approved memory at once, and ranks what best supports an answer.',
    example: ['8 passages kept', 'Approved agreement ranked first', '1 approved memory matched'],
  },
  {
    title: 'Check the evidence, or refuse',
    body: 'If nothing usable is found, Notrix says so instead of guessing. Before answering it rechecks that each source still exists, is not suspended and is still allowed.',
    example: ['Sources still available', 'Citations numbered and in range'],
  },
  {
    title: 'Answer with sources and a receipt',
    body: 'The answer cites the passages it used. A receipt records which evidence and model produced it, so anyone can trace it later.',
    example: ['“$82,000 per year, priority support excluded [1].”', '[1] Approved agreement, March 12'],
  },
] as const;

const learnPoints = [
  [Sparkles, 'Notrix proposes', 'Notrix suggests decisions and commitments it finds in your sources, each tied to the exact quote it came from.'],
  [BookCheck, 'An owner approves', 'Nothing proposed is used in answers until an accountable person approves it, edits it or rejects it.'],
  [PenLine, 'You can teach it directly', 'Add a short owner note, such as a decision from a call. It is indexed and cited like any other source.'],
  [History, 'Every change is kept', 'Edits create a new revision with a reason. The full history stays visible, so you can see what changed and who changed it.'],
] as const;

const forgetPoints = [
  [ThumbsDown, 'Mark an answer wrong', 'Opens a correction with the evidence behind the answer, so you fix the cause, not the symptom.'],
  [FileClock, 'Replace or withdraw', 'Upload the newer document or withdraw a memory. Knowledge that depended on the old version is flagged for review.'],
  [PauseCircle, 'Suspend a source', 'Stops it being searched or downloaded right away, while keeping the data in case you change your mind.'],
  [Eraser, 'Delete it for good', 'Access is fenced first, then files, passages, versions, memories and receipts are removed in tracked steps you can check.'],
] as const;

const memoryTimeline = [
  ['Proposed', 'Renewal price is $84,000', 'From the pricing discussion', 'bg-neutral-100 text-neutral-600'],
  ['Superseded', 'Replaced after the agreement was signed', 'Linked to the new memory', 'bg-amber-50 text-amber-800'],
  ['Approved', 'Renewal price is $82,000, priority support excluded', 'Quote from the approved agreement', 'bg-secondary-50 text-secondary-800'],
] as const;

const automations = [
  [BellRing, 'Digests', 'A short summary of new decisions and changes in the channels you choose.'],
  [FileClock, 'Stale knowledge alerts', 'A nudge to the owner when a memory’s source has changed and needs another look.'],
  [ShieldCheck, 'Drafts that wait for you', 'Suggested updates are prepared as drafts. Nothing is written to another tool without approval.'],
] as const;

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="max-w-3xl">
      <p className={notrixEyebrowClass}>{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-primary-950 sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">{body}</p>
    </div>
  );
}

function PointGrid({ points }: { points: readonly (readonly [typeof Check, string, string])[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {points.map(([Icon, title, body]) => (
        <article key={title} className={`p-5 ${notrixGlassCardClass}`}>
          <Icon className="size-5 text-secondary-700" aria-hidden="true" />
          <h4 className="mt-3 font-semibold text-primary-950">{title}</h4>
          <p className="mt-2 text-sm leading-6 text-neutral-600">{body}</p>
        </article>
      ))}
    </div>
  );
}

export function NotrixHowItWorksPage() {
  return (
    <div className="notrix-site w-full overflow-x-clip bg-white text-neutral-950">
      <div className="mx-auto w-full max-w-screen-2xl px-3 pt-3 sm:px-5 sm:pt-6">
        <NotrixHeader />
      </div>

      <section className="relative overflow-hidden">
        <NotrixRibbon className="pointer-events-none absolute inset-x-0 bottom-0 h-[380px] w-full sm:h-[460px] lg:inset-0 lg:h-full" />
        <div className="relative z-10 mx-auto grid max-w-[1344px] gap-12 px-5 pb-16 pt-12 sm:px-6 sm:pt-14 md:px-8 lg:min-h-[600px] lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-10 lg:pb-20 xl:px-12">
          <div className="max-w-[600px]">
            <p className={notrixEyebrowClass}>How it works</p>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
              Follow one question through Notrix.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-6 text-neutral-600 sm:text-lg sm:leading-7">
              From connecting a source to a cited answer, then learning the
              right fact and forgetting the wrong one. All of it runs in your
              own AWS account.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <NotrixDemoTrigger className={notrixCtaClass}>
                Book a demo
                <ArrowRight className="size-4" aria-hidden="true" />
              </NotrixDemoTrigger>
              <Link href="#example" className={notrixSecondaryCtaClass}>
                Walk through the example
              </Link>
            </div>
          </div>

          <NotrixGlassFrame className="mx-auto w-full max-w-[560px] lg:mx-0 lg:ml-auto">
            <div className="space-y-4 p-5 sm:p-8">
              <p className="text-xs font-medium text-neutral-500">#deals · Illustrative example</p>
              <div className="rounded-xl bg-white/90 p-4 text-sm text-primary-950 shadow-sm ring-1 ring-neutral-200">
                {exampleQuestion}
              </div>
              <div className="rounded-xl bg-white/90 p-4 text-sm leading-6 text-primary-950 shadow-sm ring-1 ring-secondary-200">
                <p className="text-xs font-semibold text-secondary-700">Notrix</p>
                <p className="mt-1">
                  $82,000 per year, with priority support excluded.{' '}
                  <span className="font-semibold text-secondary-700">[1]</span>
                </p>
                <p className="mt-3 border-t border-neutral-100 pt-3 text-xs text-neutral-500">
                  [1] Acme approved agreement · March 12
                </p>
              </div>
              <p className="rounded-xl bg-white/85 p-3 text-xs leading-5 text-neutral-600 ring-1 ring-neutral-200">
                The $74,000 proposal and $84,000 discussion were found too, but
                the signed agreement is newer and approved.
              </p>
            </div>
          </NotrixGlassFrame>
        </div>
      </section>

      <section id="example" className={`scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24 ${notrixWashClass}`}>
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="The example, step by step"
            title="From scattered files to one cited answer."
            body="Here is what happens between connecting Acme’s deal files and answering the renewal question."
          />
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className={`flex flex-col p-6 ${notrixGlassCardClass}`}>
                <span className="flex size-9 items-center justify-center rounded-full notrix-light bg-[linear-gradient(135deg,#3157e8,#3b82f6)] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-primary-950">{step.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-neutral-600">{step.body}</p>
                <ul className="mt-5 space-y-1.5 rounded-xl bg-white/80 p-3 text-xs text-neutral-700 ring-1 ring-secondary-100">
                  {step.example.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-3 shrink-0 text-secondary-700" aria-hidden="true" />
                      {line}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="byoc" className="scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Bring your own cloud"
            title="Every step above runs in your AWS account."
            body="Notrix installs a private knowledge application into your AWS account from your dashboard. Your documents, search index and memory stay there."
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <article className={`rounded-3xl p-6 ring-1 ring-secondary-100 sm:p-8 ${notrixWashClass}`}>
              <div className="flex items-center gap-3">
                <Cloud className="size-5 text-secondary-700" aria-hidden="true" />
                <h3 className="font-semibold text-primary-950">In your AWS account</h3>
              </div>
              <ul className="mt-5 grid gap-3 text-sm text-neutral-700 sm:grid-cols-2">
                {[
                  'Encrypted file storage, with a key you own',
                  'Private search index and memory',
                  'AI calls with your own Anthropic or OpenAI key',
                  'Background work that retries on failure',
                  'Connection tokens kept in your account',
                  'Answer receipts and audit records',
                ].map((item) => (
                  <li key={item} className={`flex items-start gap-2 p-3 ${notrixGlassCardClass}`}>
                    <Check className="mt-0.5 size-4 shrink-0 text-secondary-700" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl notrix-light bg-[linear-gradient(135deg,#172554,#1E3A8A_55%,#3157e8)] p-6 text-white sm:p-8">
              <h3 className="font-semibold">At Notrix</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-neutral-200">
                <li>Sign-in and your workspace record.</li>
                <li>Setup steps and the status of the one stack you installed, through a read-only role you can remove.</li>
                <li>Short-lived, signed access grants that expire after 60 seconds.</li>
              </ul>
              <h4 className="mt-8 text-sm font-semibold">Setting it up</h4>
              <ol className="mt-3 space-y-2 text-sm text-neutral-200">
                {['Create your account with Google or email', 'Install Notrix from your dashboard', 'Connect Slack and choose sources'].map((item, index) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-semibold text-white">{index + 1}.</span>
                    {item}
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </div>
      </section>

      <section id="learn-and-forget" className={`scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24 ${notrixWashClass}`}>
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Learn and forget"
            title="Knowledge you can correct, not just collect."
            body="Companies change their minds. Notrix keeps memory as a claim with evidence and an owner, so the right fact wins and the wrong one can be removed."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-primary-950">Learn</h3>
              <div className="mt-5">
                <PointGrid points={learnPoints} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-950">Forget</h3>
              <div className="mt-5">
                <PointGrid points={forgetPoints} />
              </div>
            </div>
          </div>

          <NotrixGlassFrame className="mt-12" innerClassName="p-5 sm:p-8">
            <p className="text-xs font-medium text-neutral-500">In the example: the Acme renewal memory</p>
            <ol className="mt-5 grid gap-3 md:grid-cols-3">
              {memoryTimeline.map(([status, statement, evidence, badge]) => (
                <li key={status} className="rounded-xl bg-white/90 p-4 shadow-sm ring-1 ring-neutral-200">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${badge}`}>
                    {status}
                  </span>
                  <p className="mt-3 text-sm font-medium text-primary-950">{statement}</p>
                  <p className="mt-1 text-xs text-neutral-500">{evidence}</p>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-xs leading-5 text-neutral-500">
              Approval means an accountable person approved that version. It is
              not a promise the fact is still current, which is why sources that
              change send dependent memories back for review.
            </p>
          </NotrixGlassFrame>
        </div>
      </section>

      <section id="automations" className="scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Automations"
              title="Small, supervised automations."
              body="We are building automations that keep knowledge fresh without acting on their own. They are not available yet; pilots help decide what ships first."
            />
            <span className="inline-flex shrink-0 self-start rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-800 ring-1 ring-inset ring-secondary-200 sm:self-auto">
              Coming next
            </span>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {automations.map(([Icon, title, body]) => (
              <article key={title} className={`rounded-2xl p-6 ring-1 ring-secondary-100 ${notrixWashClass}`}>
                <Icon className="size-5 text-secondary-700" aria-hidden="true" />
                <h3 className="mt-4 font-semibold text-primary-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-20 text-center sm:px-6 sm:py-28">
        <NotrixRibbon className="pointer-events-none absolute inset-0 size-full" />
        <NotrixGlassFrame className="relative mx-auto max-w-3xl" innerClassName="px-6 py-12 sm:px-12 sm:py-16">
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-primary-950 sm:text-5xl">
            Try it with your own question.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg">
            Bring a question your team asks every week, and we will walk it
            through these steps with you.
          </p>
          <NotrixDemoTrigger className={`mt-8 ${notrixCtaClass}`}>
            Book a demo <ArrowRight className="size-4" aria-hidden="true" />
          </NotrixDemoTrigger>
        </NotrixGlassFrame>
      </section>

      <NotrixFooter />
      <NotrixDemoDialog />
    </div>
  );
}
