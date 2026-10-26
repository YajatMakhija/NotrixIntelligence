import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Boxes,
  Check,
  Cloud,
  FileCheck2,
  FileSearch,
  FileText,
  KeyRound,
  MessageSquareText,
  Network,
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shared/ui/accordion';
import { NotrixDemoTrigger } from '@/components/notrix/NotrixDemoDialog';
import { NotrixContextPlayground } from '@/components/notrix/NotrixContextPlayground';

const faqs = [
  [
    'How do we get started?',
    'A pilot starts with one workflow, one department, and a success measure agreed up front. We then confirm the deployment boundary, connect the required sources, and validate answers with a focused user group.',
  ],
  [
    'Which sources can we connect?',
    'Notrix has first-party connectors for Slack, Notion, Google Drive and Docs, GitHub, Jira, Salesforce, Microsoft Teams, SharePoint, Zendesk, Snowflake, SAP, AWS, and Google Cloud. REST APIs, webhooks, and MCP cover custom ingestion.',
  ],
  [
    'Where is our knowledge stored?',
    'Deployment options include managed cloud, private cloud, and a customer VPC. Storage region, retention, model providers, and data boundaries are documented for the chosen deployment.',
  ],
  [
    'Who can access our information?',
    'Source permissions are captured during ingestion and travel with the content. Retrieval is scoped to the asking user’s access, with role controls and audit logs for retrievals and agent runs.',
  ],
  [
    'Which AI providers are involved?',
    'The provider and model allow-list depend on the deployment. Notrix requires zero-retention terms from model providers, and customer inputs are not used for training.',
  ],
  [
    'Can we disconnect and delete our data?',
    'Yes. Connected sources, retention, and deletion are configurable. The exact process and timelines are documented as part of the deployment agreement.',
  ],
] as const;

const integrations = [
  {
    name: 'Slack',
    purpose: 'Ask and receive cited answers',
    icon: (
      <Image
        src="/static/images/integrations/slack.svg"
        alt=""
        width={28}
        height={28}
        className="size-7"
      />
    ),
  },
  {
    name: 'Google Drive',
    purpose: 'Retrieve approved files',
    icon: <SiGoogledrive color={SiGoogledriveHex} className="size-7" />,
  },
  {
    name: 'Notion',
    purpose: 'Use workspace knowledge',
    icon: <SiNotion color={SiNotionHex} className="size-7" />,
  },
  {
    name: 'Confluence',
    purpose: 'Search team documentation',
    icon: <SiConfluence color={SiConfluenceHex} className="size-7" />,
  },
  {
    name: 'Jira',
    purpose: 'Understand project context',
    icon: <SiJira color={SiJiraHex} className="size-7" />,
  },
  {
    name: 'GitHub',
    purpose: 'Connect issues and code context',
    icon: <SiGithub color={SiGithubHex} className="size-7" />,
  },
] as const;

export function NotrixHomeSections() {
  return (
    <>
      <NotrixContextPlayground />

      <section className="bg-neutral-50/70 px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-secondary-700">
              What your team can do
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-primary-950 sm:text-5xl">
              Find the context. Keep work moving.
            </h2>
            <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">
              Turn scattered records into answers people can verify without
              losing the history behind them.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_rgba(11,13,16,0.04)]">
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary-800 ring-1 ring-secondary-200">
                <FileSearch className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-primary-950">
                Find company information
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Find relevant information across the sources your team connects.
              </p>
              <div className="mt-7 rounded-xl bg-neutral-50 p-4 ring-1 ring-neutral-200">
                <p className="text-xs font-medium text-neutral-500">Question</p>
                <p className="mt-2 text-sm font-semibold text-primary-950">
                  Where are Acme’s renewal terms?
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-secondary-800">
                  <FileText className="size-4" aria-hidden="true" />
                  Agreement · Section 8
                </div>
              </div>
            </article>

            <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_rgba(11,13,16,0.04)]">
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary-800 ring-1 ring-secondary-200">
                <Network className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-primary-950">
                Understand past decisions
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Follow the evidence behind a decision and see how it changed.
              </p>
              <ol className="relative mt-7 space-y-4 before:absolute before:bottom-2 before:left-[0.4375rem] before:top-2 before:w-px before:bg-secondary-200">
                {[
                  'Proposal · $74,000',
                  'Conditional suggestion · $84,000',
                  'Approved agreement · $82,000',
                ].map((item, index) => (
                  <li
                    key={item}
                    className="relative flex items-center gap-3 text-sm text-neutral-700"
                  >
                    <span
                      className={`relative z-10 size-3.5 rounded-full border-2 ${index === 2 ? 'border-secondary-600 bg-secondary-100' : 'border-neutral-300 bg-white'}`}
                    />
                    {item}
                  </li>
                ))}
              </ol>
            </article>

            <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_rgba(11,13,16,0.04)]">
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary-800 ring-1 ring-secondary-200">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-primary-950">
                Catch up on projects
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Recover updates, decisions, and ownership from connected
                knowledge.
              </p>
              <div className="mt-7 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-neutral-50 px-4">
                {[
                  ['Launch date', 'Friday'],
                  ['Decision owner', 'Maya'],
                  ['Open dependency', 'Security review'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 py-3 text-xs"
                  >
                    <span className="text-neutral-500">{label}</span>
                    <span className="font-semibold text-primary-950">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-secondary-700">
              How it works
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-primary-950 sm:text-5xl">
              From scattered knowledge to shared understanding.
            </h2>
          </div>

          <div className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
            <div
              className="absolute left-[16.66%] right-[16.66%] top-5 hidden h-px bg-neutral-200 md:block"
              aria-hidden="true"
            />
            {[
              [
                Boxes,
                'Connect selected sources',
                'Choose the systems and content your team wants Notrix to work with.',
              ],
              [
                KeyRound,
                'Carry access with the content',
                'Source permissions are captured at ingestion and remain attached during retrieval.',
              ],
              [
                FileCheck2,
                'Ask and check the evidence',
                'Get a concise answer and inspect the original sources behind it.',
              ],
            ].map(([Icon, title, body], index) => {
              const StepIcon = Icon as typeof Boxes;
              return (
                <article
                  key={title as string}
                  className="relative text-center md:text-left"
                >
                  <span className="relative z-10 mx-auto flex size-10 items-center justify-center rounded-full bg-primary-950 text-sm font-semibold text-white ring-8 ring-white md:mx-0">
                    {index + 1}
                  </span>
                  <StepIcon
                    className="mx-auto mt-7 size-6 text-secondary-700 md:mx-0"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 text-xl font-semibold text-primary-950">
                    {title as string}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {body as string}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50/70 px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-primary-950 sm:text-5xl">
                Start where your team already works.
              </h2>
              <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">
                First-party connectors bring company context into one
                permission-aware knowledge layer.
              </p>
            </div>
            <Link
              href="/product"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-950 underline decoration-secondary-300 underline-offset-4 hover:decoration-secondary-600"
            >
              View the product{' '}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration) => (
              <article
                key={integration.name}
                className="flex min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-neutral-50 ring-1 ring-neutral-200">
                  {integration.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-primary-950">
                    {integration.name}
                  </h3>
                  <p className="mt-1 truncate text-xs text-neutral-500">
                    {integration.purpose}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-secondary-800 ring-1 ring-inset ring-secondary-200">
                  <Check className="size-3" aria-hidden="true" /> Available
                </span>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm text-neutral-500">
            Also available: Google Docs, Salesforce, Microsoft Teams,
            SharePoint, Zendesk, Snowflake, SAP, AWS, Google Cloud, plus custom
            ingestion through REST, webhooks, and MCP.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-secondary-700">
              Deployment and data control
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-primary-950 sm:text-5xl">
              Know where your company knowledge lives.
            </h2>
            <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">
              Choose managed cloud, private cloud, or a customer VPC. Notrix
              documents the storage, processing, model, and access boundaries
              before deployment.
            </p>
            <div className="mt-7 space-y-3">
              {[
                'Permissions remain attached to content during retrieval.',
                'Retrievals and agent runs are recorded in audit logs.',
                'Retention and deletion are configurable for the deployment.',
              ].map((item) => (
                <p
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-neutral-700"
                >
                  <ShieldCheck
                    className="mt-0.5 size-4 shrink-0 text-secondary-700"
                    aria-hidden="true"
                  />
                  {item}
                </p>
              ))}
            </div>
            <Link
              href="/security"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-950 underline decoration-secondary-300 underline-offset-4 hover:decoration-secondary-600"
            >
              Explore security and deployment{' '}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-5 shadow-[0_18px_60px_rgba(89,65,186,0.08)] sm:p-7">
            <div
              className="absolute -right-16 -top-20 size-64 rounded-full bg-cyan-100/70 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl bg-white p-5 ring-1 ring-neutral-200">
                <span className="flex size-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary-800 ring-1 ring-secondary-200">
                  <Cloud className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-semibold text-primary-950">
                  Customer environment
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                  <li>Knowledge storage</li>
                  <li>Processing in customer VPC deployments</li>
                  <li>Regional controls where required</li>
                </ul>
              </article>
              <article className="rounded-2xl bg-white p-5 ring-1 ring-neutral-200">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary-950 text-white">
                  <ShieldCheck className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-semibold text-primary-950">
                  Notrix control plane
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                  <li>Account management</li>
                  <li>Deployment management</li>
                  <li>Access and audit controls</li>
                </ul>
              </article>
            </div>
            <div className="relative mt-4 flex items-start gap-3 rounded-2xl bg-primary-950 p-4 text-white">
              <MessageSquareText
                className="mt-0.5 size-5 shrink-0 text-secondary-300"
                aria-hidden="true"
              />
              <p className="text-sm leading-6 text-neutral-200">
                AI processing follows the provider and model allow-list
                configured for the deployment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50/70 px-5 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance text-center text-3xl font-semibold tracking-[-0.03em] text-primary-950 sm:text-5xl">
            A few things you might be wondering.
          </h2>
          <Accordion
            type="single"
            collapsible
            className="mt-10 border-y border-neutral-200"
          >
            {faqs.map(([question, answer], index) => (
              <AccordionItem
                key={question}
                value={`faq-${index}`}
                className="border-neutral-200"
              >
                <AccordionTrigger className="min-h-16 text-left text-base font-semibold text-primary-950 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl pb-5 text-sm leading-6 text-neutral-600">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-20 text-center sm:px-6 sm:py-28">
        <div
          className="absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary-100/60 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-primary-950 sm:text-5xl">
            Bring a question your team asks every week.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-neutral-600 sm:text-lg">
            See how Notrix brings the answer, its evidence, and your access
            rules together.
          </p>
          <NotrixDemoTrigger className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary-950 px-6 text-sm font-semibold text-white shadow-lg shadow-neutral-300/40 transition-colors hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2">
            Book a demo <ArrowRight className="size-4" aria-hidden="true" />
          </NotrixDemoTrigger>
        </div>
      </section>
    </>
  );
}
