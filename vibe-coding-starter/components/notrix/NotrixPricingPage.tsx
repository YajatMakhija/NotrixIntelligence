import { ArrowRight, Calculator, Check, Cloud, Sparkles } from 'lucide-react';

import { NotrixDemoDialog, NotrixDemoTrigger } from '@/components/notrix/NotrixDemoDialog';
import { NotrixFooter } from '@/components/notrix/NotrixFooter';
import { NotrixHeader } from '@/components/notrix/NotrixHeader';
import {
  NotrixGlassFrame,
  NotrixRibbon,
  notrixCtaClass,
  notrixEyebrowClass,
  notrixGlassCardClass,
  notrixWashClass,
} from '@/components/notrix/NotrixTheme';

// Plan contents are shipped features (companybrain phase 1 and 2). No AWS dollar figures are
// shown to customers; we estimate them per team on the demo call.
const included = [
  'Ask in Slack and on the web, with cited answers',
  'Slack and document sources you choose',
  'Answers only from evidence, or an honest “no source”',
  'Company memory you approve, edit and correct',
  'Decision register and owner notes',
  'Corrections, feedback and a trust scorecard',
  'Suspend or delete sources, with a deletion receipt',
  'Runs in your own AWS account, set up from the dashboard',
] as const;

const directCosts = [
  [Cloud, 'Your AWS storage and hosting', 'The storage, database and compute Notrix uses are billed by AWS in your own account, at AWS prices.'],
  [Sparkles, 'Your AI API key', 'Answers use your own Anthropic or OpenAI API key, so model usage is billed by the provider directly, at their prices.'],
  [Calculator, 'Estimated up front', 'On the demo call we estimate both for your team size and sources, before you install anything.'],
] as const;

const faqs = [
  ['Is the price per person?', 'No. Notrix is $200 a month for your workspace, billed monthly.'],
  ['What else do we pay for?', 'Two things, paid directly and never through Notrix: your AWS storage and hosting, billed by AWS in your own account, and AI usage on your own Anthropic or OpenAI API key, billed by that provider. Notrix adds no markup to either.'],
  ['Why is it set up this way?', 'So your knowledge never leaves infrastructure you own. Your files live in your AWS account, and the AI provider bills you under your own agreement.'],
  ['How do we start?', 'Book a demo and tell us about your company. We send an invite link, you create your workspace and install Notrix in your AWS account from the dashboard.'],
  ['Can we cancel?', 'Yes. And because everything runs in your AWS account, you can delete the whole installation yourself.'],
] as const;

export function NotrixPricingPage() {
  return (
    <div className="notrix-site w-full overflow-x-clip bg-white text-neutral-950">
      <div className="mx-auto w-full max-w-screen-2xl px-3 pt-3 sm:px-5 sm:pt-6">
        <NotrixHeader />
      </div>

      <section className="relative overflow-hidden">
        <NotrixRibbon className="pointer-events-none absolute inset-x-0 bottom-0 h-[300px] w-full sm:h-[380px] lg:h-full" />
        <div className="relative z-10 mx-auto max-w-[1344px] px-5 pb-40 pt-14 sm:px-6 sm:pb-48 sm:pt-20 md:px-8 lg:px-10 xl:px-12">
          <p className={notrixEyebrowClass}>Pricing</p>
          <h1 className="mt-6 max-w-xl text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
            One plan. Everything included.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-neutral-600">
            A flat monthly price for your workspace. You pay AWS and your AI provider directly for what you use, with no markup.
          </p>
        </div>
      </section>

      <main className="relative z-10 -mt-32 px-5 pb-20 sm:-mt-40 sm:px-6">
        <NotrixGlassFrame className="mx-auto max-w-3xl" innerClassName="bg-white/85 p-6 sm:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-primary-950">Notrix</h2>
              <p className="mt-1 text-sm text-neutral-600">Shared memory infrastructure, in your own AWS account</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-semibold tracking-[-0.03em] text-primary-950">$200</span>
                <span className="text-base text-neutral-600">/ month</span>
              </p>
              <p className="mt-2 text-sm text-neutral-500">Per workspace, billed monthly. Your AWS storage and AI API usage are paid directly to AWS and your AI provider.</p>
              <NotrixDemoTrigger className={`mt-8 ${notrixCtaClass}`}>
                Book a demo <ArrowRight className="size-4" aria-hidden="true" />
              </NotrixDemoTrigger>
            </div>
            <ul className="grid gap-3 text-sm text-neutral-700 md:max-w-sm">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-secondary-700" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </NotrixGlassFrame>
      </main>

      <section className={`px-5 py-20 sm:px-6 sm:py-24 ${notrixWashClass}`}>
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <p className={notrixEyebrowClass}>Paid directly by you</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-primary-950 sm:text-4xl">
              Your AWS storage and your AI key. No markup.
            </h2>
            <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">
              Notrix runs in your AWS account and answers with your own Anthropic or OpenAI API key, so these two costs
              are billed to you by AWS and your AI provider, not by Notrix.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {directCosts.map(([Icon, title, body]) => (
              <article key={title} className={`p-6 ${notrixGlassCardClass}`}>
                <Icon className="size-5 text-secondary-700" aria-hidden="true" />
                <h3 className="mt-4 font-semibold text-primary-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance text-center text-3xl font-semibold tracking-[-0.03em] text-primary-950 sm:text-4xl">
            Questions about pricing
          </h2>
          <dl className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
            {faqs.map(([question, answer]) => (
              <div key={question} className="py-6">
                <dt className="font-semibold text-primary-950">{question}</dt>
                <dd className="mt-2 text-sm leading-6 text-neutral-600">{answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <NotrixFooter />
      <NotrixDemoDialog />
    </div>
  );
}
