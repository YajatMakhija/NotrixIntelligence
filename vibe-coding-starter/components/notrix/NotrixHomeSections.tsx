import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Boxes,
  Check,
  Cloud,
  Cpu,
  Database,
  FileCheck2,
  HardDrive,
  KeyRound,
  Server,
  ShieldCheck,
  Workflow,
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
import {
  NotrixGlassFrame,
  NotrixRibbon,
  notrixGlassCardClass,
  notrixWashClass,
} from '@/components/notrix/NotrixTheme';
import { NotrixByocSection } from '@/components/notrix/NotrixByocSection';
import { NotrixCapabilitiesSection } from '@/components/notrix/NotrixCapabilitiesSection';
import { NotrixMemorySection } from '@/components/notrix/NotrixMemorySection';

const faqs = [
  [
    'How do we get started?',
    'Notrix is invite-only for now. Book a short call or request access and we send you an invite link. Your administrator then installs Notrix in your AWS account from the dashboard and connects Slack. We agree one team, one set of questions and a success measure up front.',
  ],
  [
    'Which sources can we connect?',
    'Notrix has first-party connectors for Slack, Notion, Google Drive and Docs, GitHub, Jira, Salesforce, Microsoft Teams, SharePoint, Zendesk, Snowflake, SAP, AWS, and Google Cloud. REST APIs, webhooks, and MCP cover custom ingestion.',
  ],
  [
    'Where is our knowledge stored?',
    'In your own AWS account, in the region you choose. Your files, search index and memory are private and encrypted with a key you own. Notrix keeps only sign-in, workspace and installation status records.',
  ],
  [
    'Who can access our information?',
    'Source permissions are captured during ingestion and travel with the content. Retrieval is scoped to the asking user’s access, with role controls and audit logs for retrievals and agent runs.',
  ],
  [
    'Which AI providers are involved?',
    'The one you choose, with your own API key: Anthropic or OpenAI. Calls are made from your AWS account and billed to you by the provider. Your content is never sent to Notrix for processing.',
  ],
  [
    'Can we disconnect and delete our data?',
    'Yes. Deleting a source removes its stored files and search data. Disconnecting Slack removes the indexed Slack data and the bot token from your account. Because everything runs in your AWS account, you can also delete the whole installation yourself.',
  ],
] as const;

// Outcome-level description of the customer installation. Keep service names and internals out (IP).
const awsResources = [
  [
    Database,
    'Private knowledge store',
    'Your search index and memory, with no public access.',
  ],
  [
    HardDrive,
    'Encrypted file storage',
    'Encrypted with a key that lives in your account.',
  ],
  [
    Cpu,
    'Your own AI key',
    'Answers use your Anthropic or OpenAI key, called from your account.',
  ],
  [
    Server,
    'Protected application',
    'Runs privately in your account, behind a web firewall.',
  ],
  [
    Workflow,
    'Reliable background work',
    'Failed work is retried automatically and never silently lost.',
  ],
  [
    KeyRound,
    'Your secrets',
    'Connection tokens are kept in your account, never at Notrix.',
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
    icon: <SiNotion color={SiNotionHex} className="size-7 dark:invert" />,
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
    icon: <SiGithub color={SiGithubHex} className="size-7 dark:invert" />,
  },
] as const;

export function NotrixHomeSections() {
  return (
    <>
      <NotrixByocSection />

      <NotrixCapabilitiesSection />

      <NotrixMemorySection />

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
            {/* Circles sit at the left of each column on desktop, so the line runs from
                circle 1's centre (20px in) to circle 3's centre (one column minus 20px from the right). */}
            <div
              className="absolute left-5 right-[calc((100%_-_5rem)/3_-_20px)] top-[19px] hidden h-0.5 overflow-hidden rounded-full bg-neutral-200 md:block"
              aria-hidden="true"
            >
              {/* A blue-purple band that travels along the line from step 1 to step 3. */}
              <span className="absolute inset-y-0 left-0 w-1/3 animate-[notrix-line-flow_3.5s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,#3157e8,#8b5cf6,transparent)] motion-reduce:hidden" />
            </div>
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
                  <span className="relative z-10 mx-auto flex size-10 items-center justify-center rounded-full notrix-light bg-[linear-gradient(135deg,#3157e8,#8b5cf6)] text-sm font-semibold text-white ring-8 ring-white md:mx-0">
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

      <section className={`px-5 py-20 sm:px-6 sm:py-24 ${notrixWashClass}`}>
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
                className={`flex min-w-0 items-center gap-3 overflow-hidden p-4 ${notrixGlassCardClass}`}
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

      <section
        id="aws"
        className="scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-secondary-700">
              Runs in your AWS account
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-primary-950 sm:text-5xl">
              Your knowledge never leaves your cloud.
            </h2>
            <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg">
              Notrix installs a private knowledge application inside your own
              AWS account in a few clicks. Your documents, search index and
              memory stay there. Notrix only runs sign-in and setup.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
            <article className={`rounded-3xl p-5 ring-1 ring-secondary-100 sm:p-7 ${notrixWashClass}`}>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-white text-secondary-800 ring-1 ring-secondary-200">
                  <Cloud className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-primary-950">
                    Your AWS account
                  </h3>
                  <p className="text-xs text-neutral-500">
                    You own it, you can inspect it, you can delete it.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {awsResources.map(([Icon, title, body]) => {
                  const ResourceIcon = Icon as typeof Cloud;
                  return (
                    <div
                      key={title as string}
                      className={`p-4 ${notrixGlassCardClass}`}
                    >
                      <div className="flex items-center gap-2">
                        <ResourceIcon
                          className="size-4 text-secondary-700"
                          aria-hidden="true"
                        />
                        <h4 className="text-sm font-semibold text-primary-950">
                          {title as string}
                        </h4>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-neutral-600">
                        {body as string}
                      </p>
                    </div>
                  );
                })}
              </div>
            </article>

            <div className="flex flex-col gap-4">
              <article className={`rounded-3xl p-5 sm:p-7 ${notrixGlassCardClass}`}>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl notrix-light bg-[linear-gradient(135deg,#3157e8,#8b5cf6)] text-white">
                    <ShieldCheck className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-semibold text-primary-950">
                    Notrix account
                  </h3>
                </div>
                <ul className="mt-5 space-y-3 text-sm text-neutral-600">
                  {[
                    'Sign-in and your workspace record',
                    'Setup steps and installation status',
                    'Short-lived, signed access to your installation',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-secondary-700"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="flex-1 rounded-3xl notrix-light bg-[linear-gradient(135deg,#251C49,#3D3078_55%,#3157e8)] p-5 text-white sm:p-7">
                <h3 className="font-semibold">What Notrix can see</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-300">
                  <li>
                    The status of the one stack you installed, through a
                    read-only role you create and can remove at any time.
                  </li>
                  <li>
                    Every request into your installation carries a signed
                    grant that expires after 60 seconds.
                  </li>
                  <li>
                    Slack events pass briefly through Notrix on their way to
                    your account. They are not stored there.
                  </li>
                </ul>
              </article>
            </div>
          </div>

          <Link
            href="/security"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-950 underline decoration-secondary-300 underline-offset-4 hover:decoration-secondary-600"
          >
            Read the security details{' '}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>





      <section className={`px-5 py-20 sm:px-6 sm:py-24 ${notrixWashClass}`}>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance text-center text-3xl font-semibold tracking-[-0.03em] text-primary-950 sm:text-5xl">
            A few things you might be wondering.
          </h2>
          <NotrixGlassFrame className="mt-10" innerClassName="bg-white/70 px-5 sm:px-8">
          <Accordion type="single" collapsible>
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
          </NotrixGlassFrame>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-20 text-center sm:px-6 sm:py-28">
        <NotrixRibbon className="pointer-events-none absolute inset-0 size-full" />
        <NotrixGlassFrame className="relative mx-auto max-w-3xl" innerClassName="px-6 py-12 sm:px-12 sm:py-16">
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
        </NotrixGlassFrame>
      </section>
    </>
  );
}
