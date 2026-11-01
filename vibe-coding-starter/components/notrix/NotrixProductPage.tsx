'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  CloudCog,
  FileText,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  SiConfluence,
  SiConfluenceHex,
  SiGithub,
  SiGithubHex,
  SiGoogledrive,
  SiGoogledriveHex,
  SiJira,
  SiJiraHex,
  SiNotion,
  SiNotionHex,
} from '@icons-pack/react-simple-icons';

import {
  NotrixDemoDialog,
  NotrixDemoTrigger,
} from '@/components/notrix/NotrixDemoDialog';
import { NotrixFooter } from '@/components/notrix/NotrixFooter';
import { NotrixHeader } from '@/components/notrix/NotrixHeader';
import {
  NotrixRibbon,
  notrixCtaClass,
  notrixEyebrowClass,
  notrixFocusRing,
  notrixGlassInnerClass,
  notrixGlassOuterClass,
  notrixSecondaryCtaClass,
} from '@/components/notrix/NotrixTheme';

// Illustrative questions, not customer quotes.
const useCases = [
  {
    team: 'Sales and customer success',
    question: 'What did we agree with this customer, and where is it written?',
    body: 'Find the signed terms instead of an older draft or a half-remembered thread, with the agreement cited.',
  },
  {
    team: 'Onboarding new people',
    question: 'Where is our process for approving a refund?',
    body: 'New joiners get answers from the real documents on day one, without waiting for a colleague to reply.',
  },
  {
    team: 'Product and engineering',
    question: 'Why did we change the onboarding flow?',
    body: 'Recover the reasoning behind a decision, with the retro and the Slack thread it came from.',
  },
  {
    team: 'Operations and policy',
    question: 'What is our current travel policy?',
    body: 'Answer from the latest approved version. When a source is replaced, knowledge based on the old one is flagged for review.',
  },
] as const;

// Same facts as the home page: Slack, citations, the customer's AWS account, approved memory.
const productPoints = [
  {
    icon: MessageSquareText,
    title: 'Ask in Slack',
    body: 'Ask a question in plain language from Slack. The answer comes back in the same conversation.',
  },
  {
    icon: FileText,
    title: 'Cited or refused',
    body: 'Notrix answers only from connected sources and shows the ones it used. If it cannot cite a source, it does not answer.',
  },
  {
    icon: CloudCog,
    title: 'Runs in your AWS account',
    body: 'Files, search data and the AI model on Amazon Bedrock run inside your own AWS account. Your knowledge is not used to train shared models.',
  },
  {
    icon: ShieldCheck,
    title: 'Memory you approve',
    body: 'Notrix suggests what to remember and an administrator approves it. Memory is marked stale when its source changes.',
  },
];

// What happens to one question, from Slack to a cited answer.
const steps = [
  {
    title: 'Ask',
    body: 'Ask Notrix a question in Slack, in plain language, the way you would ask a teammate.',
    visual: 'Why did we change the onboarding flow?',
  },
  {
    title: 'Search',
    body: 'Notrix searches the sources you connected. The search runs inside your own AWS account.',
    visual: 'Searching connected sources…',
  },
  {
    title: 'Check',
    body: 'Only passages that support the answer are kept. If nothing does, Notrix says so instead of guessing.',
    visual: '2 sources support an answer',
  },
  {
    title: 'Answer',
    body: 'A short answer is written with Amazon Bedrock in your account, and every source it used is cited.',
    visual: 'Answer ready · 2 sources cited',
  },
  {
    title: 'Remember',
    body: 'Useful facts become memory suggestions. An administrator approves them, and they go stale when the source changes.',
    visual: 'Memory suggested for approval',
  },
];

const STEP_MS = 6000;

// [angle in degrees, orbit radius as % of the card, logo]
const orbitLogos = [
  [
    215,
    38,
    <Image
      key="slack"
      src="/static/images/integrations/slack.svg"
      alt=""
      width={28}
      height={28}
      className="size-7"
    />,
  ],
  [
    272,
    38,
    <SiGoogledrive key="drive" color={SiGoogledriveHex} className="size-7" />,
  ],
  [325, 38, <SiJira key="jira" color={SiJiraHex} className="size-7" />],
  [
    135,
    27,
    <SiConfluence
      key="confluence"
      color={SiConfluenceHex}
      className="size-7"
    />,
  ],
  [
    80,
    38,
    <SiNotion
      key="notion"
      color={SiNotionHex}
      className="size-7 dark:invert"
    />,
  ],
  [
    35,
    38,
    <SiGithub
      key="github"
      color={SiGithubHex}
      className="size-7 dark:invert"
    />,
  ],
] as const;

const orbitDots = [
  [245, 38],
  [180, 38],
  [355, 38],
  [300, 27],
  [60, 27],
] as const;

function orbitPosition(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;
  // Rounded so server and browser trig agree (avoids a hydration mismatch).
  const round = (value: number) => Math.round(value * 1000) / 1000;
  return {
    left: `${round(50 + radius * Math.cos(radians))}%`,
    top: `${round(50 + radius * Math.sin(radians))}%`,
  };
}

function HowNotrixWorks() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return;
    const timer = window.setTimeout(
      () => setActive((active + 1) % steps.length),
      STEP_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, auto]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-secondary-50/60 ring-1 ring-secondary-100">
      <style>{`
        @keyframes notrix-step { from { width: 0 } to { width: 100% } }
        .notrix-step-bar { animation: notrix-step ${STEP_MS}ms linear forwards; }
        @media (prefers-reduced-motion: reduce) { .notrix-step-bar { animation: none; } }
      `}</style>
      <NotrixRibbon className="pointer-events-none absolute bottom-0 right-0 h-[55%] w-full opacity-90 lg:h-[80%] lg:w-[65%]" />

      <div className="relative grid gap-12 p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-16">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-4xl">
            How Notrix works
          </h2>
          <ol className="mt-10 lg:mt-14">
            {steps.map((step, index) => {
              const open = index === active;
              return (
                <li key={step.title} className="border-b border-neutral-200">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`step-${index}`}
                      onClick={() => {
                        setActive(index);
                        setAuto(false);
                      }}
                      className={`flex w-full items-center gap-6 rounded py-4 text-left ${notrixFocusRing}`}
                    >
                      <span
                        className={`w-6 text-sm font-semibold tabular-nums ${open ? 'text-secondary-700' : 'text-neutral-500'}`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-lg font-medium text-neutral-950">
                        {step.title}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`step-${index}`}
                    hidden={!open}
                    className="pb-5 pl-12 pr-4"
                  >
                    <p className="max-w-md text-sm leading-6 text-neutral-600">
                      {step.body}
                    </p>
                  </div>
                  <div className="-mb-px h-0.5">
                    {open && (
                      <div
                        key={`${active}-${auto}`}
                        className={`h-full bg-gradient-to-r from-[#3157e8] to-[#8b5cf6] ${auto ? 'notrix-step-bar' : 'w-full'}`}
                      />
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          aria-hidden="true"
          className={`relative mx-auto aspect-square w-full max-w-[520px] ${notrixGlassInnerClass}`}
        >
          <div className="absolute inset-[12%] rounded-full border border-neutral-300/80" />
          <div className="absolute inset-[23%] rounded-full border border-neutral-300/80" />
          {orbitDots.map(([angle, radius]) => (
            <span
              key={`${angle}-${radius}`}
              style={orbitPosition(angle, radius)}
              className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-400 bg-white"
            />
          ))}
          {orbitLogos.map(([angle, radius, logo]) => (
            <span
              key={`${angle}-${radius}`}
              style={orbitPosition(angle, radius)}
              className="absolute flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-lg shadow-neutral-300/40 sm:size-14"
            >
              {logo}
            </span>
          ))}
          <div className="absolute left-1/2 top-1/2 w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-center text-sm text-neutral-900 shadow-[0_12px_32px_rgba(0,0,0,0.07)] sm:text-base">
            {steps[active].visual}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sizes are in em so the whole artboard scales from one font size (1em = 16px at 608px wide).
function ProductIllustration() {
  return (
    <figure className="relative mx-auto w-full max-w-[560px] [container-type:inline-size] md:max-w-[608px] lg:mx-0 lg:ml-auto [@media(min-width:1440px)]:-mr-[34px]">
      <figcaption className="sr-only">
        Illustration: a teammate asks why the onboarding flow changed, and
        Notrix answers with a decision summary citing two sources, a pilot retro
        document and a Slack thread.
      </figcaption>
      <div
        aria-hidden="true"
        className="relative rounded-[9px] p-8 text-[16px] sm:aspect-square sm:p-0 sm:text-[calc(100cqw/38)]"
      >
        <div className={`absolute inset-0 ${notrixGlassOuterClass}`} />
        <div
          className={`absolute inset-[16px] sm:inset-[2.63%] ${notrixGlassInnerClass}`}
        />
        <div className="absolute left-[18.75%] top-[36.68%] hidden h-[31.25%] w-[65.3%] rounded-[0.75em] border border-white/80 sm:block" />

        {/* Source document */}
        <div className="absolute left-[11.68%] top-[12.83%] hidden h-[18.59%] w-[30.43%] overflow-hidden rounded-[0.5em] border border-neutral-200 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.07)] sm:block">
          <div className="flex items-center gap-[0.4em] border-b border-neutral-100 px-[0.6em] py-[0.45em]">
            <span className="size-[0.75em] rounded-[0.2em] bg-[#27B982]" />
            <span className="text-[0.625em] font-medium text-neutral-700">
              Decision log
            </span>
            <span className="ml-auto h-[0.4em] w-[1.6em] rounded-full bg-[#E6E3FA]" />
            <span className="h-[0.4em] w-[1em] rounded-full bg-[#E6E3FA]" />
          </div>
          <div className="space-y-[0.4em] px-[0.6em] py-[0.5em] text-[0.5625em] leading-tight text-neutral-500">
            <p className="text-neutral-400">Mar 04 · Pricing page copy</p>
            <p className="-mx-[0.4em] rounded-[0.3em] px-[0.4em] py-[0.2em] text-neutral-800 ring-1 ring-[#6D54DD]">
              Mar 12 · Simplify account setup
            </p>
            <p className="text-neutral-400">Mar 19 · Trial length</p>
            <p className="text-neutral-400">Mar 26 · Slack-first onboarding</p>
          </div>
        </div>

        {/* Teammate question */}
        <div className="relative ml-auto w-[88%] rounded-[0.75em] bg-white p-[0.75em] shadow-[0_12px_32px_rgba(0,0,0,0.07)] sm:absolute sm:left-[37.34%] sm:top-[19.74%] sm:ml-0 sm:w-[44.9%]">
          <p className="mr-[2.25em] text-right text-[0.8125em] leading-[1.4] text-neutral-500">
            Mila Costa
          </p>
          <div className="mt-[0.35em] flex items-start gap-[0.6em]">
            <p className="flex-1 rounded-[1.625em] bg-neutral-100 px-[1em] py-[0.6em] text-[0.875em] leading-[1.36] text-neutral-800">
              <span className="font-medium text-secondary-700">@Notrix</span>{' '}
              why did we change the onboarding flow?
            </p>
            <span className="flex size-[2.67em] shrink-0 items-center justify-center rounded-full bg-secondary-100 text-[0.5625em] font-semibold text-secondary-800">
              MC
            </span>
          </div>
        </div>

        {/* Notrix answer */}
        <div className="relative mt-3 rounded-[0.75em] bg-white p-[1em] shadow-[0_12px_32px_rgba(0,0,0,0.07)] sm:absolute sm:left-[20.56%] sm:top-[38.49%] sm:mt-0 sm:w-[61.68%]">
          <p className="ml-[2.75em] text-[0.8125em] leading-[1.4] text-neutral-500">
            Notrix
          </p>
          <div className="mt-[0.4em] flex items-start gap-[0.6em]">
            <span className="relative size-[2.125em] shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-neutral-200">
              <Image
                src="/static/images/notrix-logo.png"
                alt=""
                width={1254}
                height={1254}
                className="absolute -top-[0.35em] left-1/2 size-[3.6em] max-w-none -translate-x-1/2 object-contain dark:invert"
              />
            </span>
            <div className="flex-1 rounded-[1.625em] bg-neutral-100 px-[1em] py-[0.75em]">
              <p className="text-[1.125em] leading-[1.39] text-neutral-900">
                The team changed it after the pilot revealed friction in account
                setup.
              </p>
              <p className="mt-[0.5em] flex items-center gap-[0.4em] text-[0.75em] text-neutral-500">
                <Sparkles className="size-[1.1em] text-secondary-600" />
                Decision summary · 2 sources
              </p>
            </div>
          </div>
        </div>

        {/* Cited sources */}
        <div className="relative -mt-2 ml-auto w-[80%] overflow-hidden rounded-[0.5em] border border-neutral-200 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.07)] sm:absolute sm:left-[62.17%] sm:top-[60.2%] sm:mt-0 sm:w-[29.28%]">
          <div className="flex items-center gap-[0.4em] border-b border-neutral-100 px-[0.6em] py-[0.45em]">
            <span className="size-[0.75em] rounded-[0.2em] bg-[#F5C400]" />
            <span className="text-[0.625em] font-medium text-neutral-700">
              Sources
            </span>
            <span className="ml-auto h-[0.4em] w-[1.4em] rounded-full bg-[#E6E3FA]" />
          </div>
          <ul className="space-y-[0.35em] p-[0.55em] text-[0.625em] leading-tight">
            {[
              ['1', 'Pilot retro', 'Account setup took too long'],
              ['2', '#product thread', 'Decision to simplify setup'],
            ].map(([n, title, detail]) => (
              <li
                key={n}
                className="flex items-start gap-[0.5em] rounded-[0.4em] bg-neutral-50 p-[0.45em]"
              >
                <span className="flex size-[1.4em] shrink-0 items-center justify-center rounded-full bg-secondary-50 font-semibold text-secondary-700">
                  {n}
                </span>
                <span>
                  <span className="block font-medium text-neutral-800">
                    {title}
                  </span>
                  <span className="block text-neutral-500">{detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}

export function NotrixProductPage() {
  return (
    <div className="notrix-site w-full overflow-x-clip bg-white text-neutral-950">
      <div className="mx-auto w-full max-w-screen-2xl px-3 pt-3 sm:px-5 sm:pt-6">
        <NotrixHeader />
      </div>

      <main>
        <section className="relative overflow-hidden">
          <NotrixRibbon className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[380px] w-full sm:h-[460px] lg:inset-0 lg:h-full" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-64 w-2/3 bg-[radial-gradient(ellipse_at_bottom_left,theme(colors.secondary.100),transparent_70%)] [mask-image:linear-gradient(to_bottom,black_30%,transparent)]"
          />

          <div className="relative z-10 mx-auto grid max-w-[1344px] gap-10 px-5 pb-12 pt-12 sm:gap-12 sm:px-6 sm:pt-14 md:gap-14 md:px-8 md:pt-16 lg:min-h-[620px] lg:grid-cols-2 lg:items-start lg:gap-10 lg:px-10 lg:pb-0 lg:pt-[88px] xl:min-h-[646px] xl:grid-cols-[minmax(0,600px)_608px] xl:justify-between xl:gap-16 xl:px-12 xl:pt-[120px]">
            <div className="max-w-[600px]">
              <p className={notrixEyebrowClass}>Notrix Company Brain</p>
              <h1 className="mt-6 text-[38px] font-semibold leading-[1.08] tracking-[-0.03em] text-neutral-950 sm:text-[44px] md:text-5xl xl:text-[52px] xl:leading-[1.06]">
                <span className="block [@media(min-width:1440px)]:whitespace-nowrap">
                  Your company’s knowledge.
                </span>
                <span className="block">Connected.</span>
              </h1>
              <p className="mt-6 max-w-[500px] text-base leading-6 tracking-[-0.01em] text-neutral-600 xl:leading-[23px]">
                Bring scattered documents, Slack conversations and decisions
                into one company memory. Your team asks in Slack and gets
                answers with the sources behind them.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <NotrixDemoTrigger className={notrixCtaClass}>
                  Book a demo
                  <ArrowRight className="size-4" aria-hidden="true" />
                </NotrixDemoTrigger>
                <a href="#how-it-works" className={notrixSecondaryCtaClass}>
                  See how it works
                </a>
              </div>
            </div>

            <ProductIllustration />
          </div>
        </section>

        <section
          id="how-it-works"
          className="relative z-10 scroll-mt-24 bg-neutral-50"
        >
          <div className="mx-auto max-w-[1376px] px-5 pb-24 pt-24 sm:px-6 md:border-x md:border-neutral-200 md:px-8 lg:px-10 xl:px-12">
            <div className="mx-auto max-w-[1248px]">
              <HowNotrixWorks />

              <p className={`${notrixEyebrowClass} mt-24`}>Why Notrix</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-4xl">
                One place to ask. Every answer shows its sources.
              </h2>
              <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
                {productPoints.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="bg-white p-6">
                    <Icon
                      className="size-6 text-secondary-600"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <h3 className="mt-6 text-lg font-semibold tracking-[-0.01em] text-neutral-950">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-24 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
                <div>
                  <p className={notrixEyebrowClass}>About Company Brain</p>
                  <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-4xl">
                    Your company’s memory, one question away.
                  </h2>
                  <div className="mt-6 space-y-4 text-base leading-7 text-neutral-600">
                    <p>
                      Every company keeps its knowledge in many places:
                      documents in Drive and Notion, decisions in Slack threads,
                      context in tickets and repositories. Company Brain
                      connects the sources you approve and turns them into one
                      place to ask. Your team asks in Slack, in plain language,
                      and gets a short answer with the exact sources behind it.
                    </p>
                    <p>
                      It helps people stop interrupting each other for answers
                      that already exist, and stop trusting answers they cannot
                      check. When the evidence is not there, Notrix says so
                      instead of guessing. Over time it proposes decisions and
                      commitments worth remembering, and a person on your team
                      approves, corrects or removes them, so the knowledge stays
                      current.
                    </p>
                  </div>
                </div>
                <div className={`p-3 sm:p-4 ${notrixGlassOuterClass}`}>
                  <div className={`h-full p-6 sm:p-8 ${notrixGlassInnerClass}`}>
                    <CloudCog
                      className="size-6 text-secondary-600"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-neutral-950">
                      Bring your own cloud
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-neutral-600">
                      Company Brain installs inside your own AWS account with
                      CloudFormation. Your files, search index, memory and AI
                      calls on Amazon Bedrock stay in infrastructure you own,
                      encrypted with your own key. Notrix keeps only sign-in and
                      setup records, sees your installation only through a
                      read-only role you can remove, and every request it makes
                      expires after 60 seconds. If you leave, you delete the
                      stack and your knowledge goes with it.
                    </p>
                  </div>
                </div>
              </div>

              <p className={`${notrixEyebrowClass} mt-24`}>Use cases</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-4xl">
                Where teams use it first.
              </h2>
              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {useCases.map(({ team, question, body }) => (
                  <article
                    key={team}
                    className="rounded-xl border border-neutral-200 bg-white p-6"
                  >
                    <h3 className="text-lg font-semibold tracking-[-0.01em] text-neutral-950">
                      {team}
                    </h3>
                    <p className="mt-3 rounded-lg bg-secondary-50 px-3 py-2 text-sm italic text-secondary-800">
                      “{question}”
                    </p>
                    <p className="mt-3 text-sm leading-6 text-neutral-600">
                      {body}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-12 flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-base text-neutral-700">
                  Start with a focused pilot: one team, one knowledge problem, a
                  defined set of sources.
                </p>
                <NotrixDemoTrigger className={`${notrixCtaClass} shrink-0`}>
                  Book a demo
                  <ArrowRight className="size-4" aria-hidden="true" />
                </NotrixDemoTrigger>
              </div>
            </div>
          </div>
        </section>
      </main>

      <NotrixFooter />
      <NotrixDemoDialog />
    </div>
  );
}
