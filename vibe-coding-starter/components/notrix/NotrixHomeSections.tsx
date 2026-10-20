import Link from 'next/link';
import {
  ArrowRight,
  Cloud,
  FileCheck2,
  KeyRound,
  MessageSquareText,
  Plug,
  Search,
  ShieldCheck,
} from 'lucide-react';

import { NotrixDemoTrigger } from '@/components/notrix/NotrixDemoDialog';

const questions = [
  {
    question: 'What price did we quote this customer?',
    answer: 'The approved annual price is $84,000, including priority support.',
    source: 'Acme pricing proposal · Page 4',
  },
  {
    question: 'Why did the project deadline change?',
    answer:
      'The launch moved to Friday after the security review added two days.',
    source: 'Atlas launch plan · Decision log',
  },
  {
    question: 'Where is the latest onboarding guide?',
    answer: 'The current guide is in the People workspace, updated yesterday.',
    source: 'Employee onboarding · Version 8',
  },
];

const faqs = [
  [
    'What sources can I connect today?',
    'Pilot connections are agreed during onboarding. Slack is the question interface; approved document repositories are connected according to your pilot scope. Google Drive, Notion, and Confluence integrations are planned and should not be assumed available until confirmed.',
  ],
  [
    'Does my team need another app?',
    'No for everyday questions. Your team asks Notrix from Slack and receives an answer with supporting sources in the same workflow.',
  ],
  [
    'Where is our data stored and processed?',
    'Notrix is designed for customer-controlled cloud deployment. The exact storage region, processing path, and subprocessors are documented for each pilot.',
  ],
  [
    'Who can access the answers?',
    'Access follows the identity, workspace, and source permissions configured for your deployment. Pilot administrators define who can connect sources and use Notrix.',
  ],
  [
    'What does setting up a pilot involve?',
    'We agree on a focused use case, review security requirements, connect approved sources, configure Slack access, and validate answers with a small group before wider rollout.',
  ],
  [
    'How is pricing determined?',
    'Launch pricing is tailored to pilot scope, deployment requirements, connected sources, and expected usage. Book a demo for a written proposal.',
  ],
] as const;

export function NotrixHomeSections() {
  return (
    <>
      <section className="border-t border-neutral-200 px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-700">
            Product examples
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
            What your team can ask
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
            Ask a direct question and get a concise answer grounded in the
            company material your team is allowed to use.
          </p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {questions.map((item, index) => (
              <article
                key={item.question}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{item.question}</h3>
                <p className="mt-4 text-sm leading-6 text-neutral-700">
                  {item.answer}
                </p>
                <p className="mt-5 border-t border-neutral-100 pt-4 text-xs font-medium text-neutral-500">
                  Source: {item.source}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="bg-neutral-50 px-5 py-20 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-700">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              From company sources to a sourced answer
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              [
                Plug,
                'Connect approved sources',
                'Choose the repositories and documents included in your pilot.',
              ],
              [
                MessageSquareText,
                'Ask in Slack',
                'Use the place your team already works instead of opening another app.',
              ],
              [
                FileCheck2,
                'Verify the answer',
                'Every response includes supporting sources your team can inspect.',
              ],
            ].map(([Icon, title, body], index) => {
              const StepIcon = Icon as typeof Search;
              return (
                <article
                  key={title as string}
                  className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-neutral-200"
                >
                  <StepIcon className="size-6 text-primary-700" />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">
                    {title as string}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {body as string}
                  </p>
                </article>
              );
            })}
          </div>
          <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 bg-white p-5 text-center text-sm text-neutral-600">
            Planned integrations include Google Drive, Notion, and Confluence.
            Availability is confirmed for each pilot.
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-700">
              Your data and access
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Customer control is part of the architecture
            </h2>
            <p className="mt-5 text-lg leading-8 text-neutral-600">
              Notrix is designed around customer-controlled storage, explicit
              permissions, and deployment details agreed before a pilot begins.
            </p>
            <Link
              href="/security"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-neutral-950"
            >
              Read about security <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-4">
            {[
              [
                Cloud,
                'Storage',
                'Company knowledge remains in the customer-controlled cloud environment defined for the deployment.',
              ],
              [
                KeyRound,
                'Permissions',
                'Identity and source access rules determine who can connect knowledge and receive answers.',
              ],
              [
                ShieldCheck,
                'Control',
                'Customers approve sources, administrators, retention requirements, and deletion steps.',
              ],
            ].map(([Icon, title, body]) => {
              const ItemIcon = Icon as typeof Search;
              return (
                <article
                  key={title as string}
                  className="flex gap-4 rounded-2xl border border-neutral-200 p-5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
                    <ItemIcon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{title as string}</h3>
                    <p className="mt-1 text-sm leading-6 text-neutral-600">
                      {body as string}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-700">
              FAQs
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Questions before a pilot
            </h2>
          </div>
          <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 font-semibold marker:hidden">
                  {question}
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 text-center sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            See Notrix with your team&apos;s workflow.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-600">
            Bring one real knowledge problem. We&apos;ll show how a focused
            pilot would work.
          </p>
          <NotrixDemoTrigger className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white">
            Book a demo <ArrowRight className="size-4" />
          </NotrixDemoTrigger>
        </div>
      </section>
    </>
  );
}
