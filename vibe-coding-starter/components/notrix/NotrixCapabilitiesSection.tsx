'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileText,
  Search,
  MessageSquare,
} from 'lucide-react';
import {
  SiGoogledrive,
  SiGoogledriveHex,
} from '@icons-pack/react-simple-icons';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shared/ui/tabs';
import { capabilities, companyRecords } from '@/data/notrix/capabilities';
import { notrixWashClass } from '@/components/notrix/NotrixTheme';

type RecordId = (typeof companyRecords)[number]['id'];
type CapabilityId = (typeof capabilities)[number]['id'];

function SourceIcon({ discussion = false }: { discussion?: boolean }) {
  return discussion ? (
    <Image
      src="/static/images/integrations/slack.svg"
      alt="Slack"
      width={20}
      height={20}
      className="size-5 shrink-0"
    />
  ) : (
    <SiGoogledrive
      color={SiGoogledriveHex}
      className="size-5 shrink-0"
      aria-label="Google Drive"
    />
  );
}

function CapabilityView({
  view,
  recordId,
  onOpen,
}: {
  view: CapabilityId;
  recordId: RecordId;
  onOpen: (id: RecordId) => void;
}) {
  const record =
    companyRecords.find((entry) => entry.id === recordId) ?? companyRecords[2];
  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 px-5 py-4 sm:px-7">
        <span className="flex items-center gap-2 text-sm font-medium text-primary-950">
          <span
            className="size-2 rounded-full bg-secondary-500"
            aria-hidden="true"
          />
          Company Brain
        </span>
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-600">
          Illustrative company records
        </span>
      </div>

      {view === 'find' && (
        <div className="flex flex-1 flex-col p-5 sm:p-7">
          <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
            <Search
              className="size-4 shrink-0 text-neutral-500"
              aria-hidden="true"
            />
            Acme annual subscription
          </div>
          <div className="mb-2 mt-5 flex items-center justify-between text-xs text-neutral-500">
            <span>Sources connected for this example</span>
            <span>{companyRecords.length} records · 2 tools</span>
          </div>
          <ul className="mt-2 space-y-3">
            {companyRecords.map((entry) => (
              <li key={entry.id}>
                <button
                  type="button"
                  onClick={() => onOpen(entry.id)}
                  className="group flex w-full gap-3 rounded-2xl border border-neutral-200 p-4 text-left transition-colors hover:border-secondary-200 hover:bg-secondary-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-600"
                >
                  <span className="mt-1">
                    <SourceIcon discussion={entry.id === 'discussion'} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-2">
                      <span className="text-sm font-medium text-primary-950 group-hover:text-secondary-700">
                        {entry.title}
                      </span>
                      <ArrowUpRight
                        className="mt-0.5 size-4 shrink-0 text-neutral-400"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-1 block text-xs text-neutral-500">
                      {entry.source} · {entry.date}
                    </span>
                    <span
                      className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${entry.id === 'agreement' ? 'bg-secondary-50 text-secondary-800' : 'bg-neutral-100 text-neutral-600'}`}
                    >
                      {entry.status}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-neutral-600">
                      {entry.excerpt}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-4 text-xs leading-relaxed text-neutral-500">
            Select a record to inspect its original context.
          </p>
        </div>
      )}

      {view === 'history' && (
        <div className="flex flex-1 flex-col p-5 sm:p-7">
          <div>
            <h4 className="text-lg font-medium text-primary-950">
              One agreement. A documented history.
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              The figures changed. Their status matters.
            </p>
          </div>
          <ol className="mt-6">
            {companyRecords.map((entry, index) => (
              <li key={entry.id} className="relative flex gap-4 pb-6 last:pb-0">
                {index < 2 && (
                  <span
                    className="absolute bottom-0 left-3 top-6 w-px bg-neutral-200"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`relative mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border ${index === 2 ? 'border-secondary-200 bg-secondary-50 text-secondary-700' : 'border-neutral-200 bg-white text-neutral-500'}`}
                  aria-hidden="true"
                >
                  {index === 2 ? (
                    <Check className="size-3.5" />
                  ) : index === 1 ? (
                    <MessageSquare className="size-3" />
                  ) : (
                    <FileText className="size-3" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`text-sm font-medium ${index === 2 ? 'text-secondary-700' : 'text-primary-950'}`}
                    >
                      {entry.status}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {entry.date}
                    </span>
                  </div>
                  <p className="mt-2 text-2xl font-medium tabular-nums tracking-tight text-primary-950">
                    {entry.amount}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    {index === 0
                      ? 'Initial annual subscription proposal.'
                      : index === 1
                        ? 'Conditional on priority support. No approval recorded.'
                        : 'Priority support included. Approved by Maya.'}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-5 rounded-xl bg-neutral-50 p-4 text-sm leading-relaxed text-neutral-600">
            The March 10 agreement records the approved price. The March 8
            message remains a conditional suggestion.
          </p>
          <button
            type="button"
            onClick={() => onOpen('agreement')}
            className="mt-6 inline-flex min-h-11 items-center gap-2 self-start rounded-sm text-sm font-medium text-secondary-700 hover:text-secondary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-600"
          >
            Inspect approved agreement
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {view === 'evidence' && (
        <div className="flex flex-1 flex-col p-5 sm:p-7">
          <div className="flex items-start gap-3">
            <SourceIcon discussion={record.id === 'discussion'} />
            <div>
              <h4 className="text-base font-medium text-primary-950">
                {record.title}
              </h4>
              <p className="mt-1 text-xs text-neutral-500">
                {record.source} · {record.date} · {record.status}
              </p>
            </div>
          </div>
          <dl className="mt-5 grid gap-4 rounded-xl bg-neutral-50 p-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-neutral-500">Source</dt>
              <dd className="mt-1 text-sm font-medium text-primary-950">
                {record.source}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-neutral-500">Recorded</dt>
              <dd className="mt-1 text-sm font-medium text-primary-950">
                {record.date}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-neutral-500">Decision status</dt>
              <dd className="mt-1 text-sm font-medium text-primary-950">
                {record.status}
              </dd>
            </div>
          </dl>
          <div className="mt-6 border-t border-neutral-200 pt-6">
            <p className="text-xs font-medium text-neutral-500">
              Supporting passage
            </p>
            <h5 className="mt-4 text-sm font-medium text-primary-950">
              {record.heading}
            </h5>
            <blockquote className="mt-4 rounded-xl bg-secondary-50 p-5 text-lg leading-relaxed text-primary-950">
              <mark className="bg-secondary-100 text-primary-950 decoration-clone">
                {record.excerpt}
              </mark>
            </blockquote>
            <p className="mt-5 text-sm leading-relaxed text-neutral-600">
              {record.detail}
            </p>
          </div>
          <p className="mt-auto pt-6 text-xs leading-relaxed text-neutral-500">
            Evidence stays attached to its source and original context.
          </p>
        </div>
      )}
    </div>
  );
}

export function NotrixCapabilitiesSection() {
  const [active, setActive] = useState('find');
  const [recordId, setRecordId] = useState<RecordId>('agreement');

  function openRecord(id: RecordId) {
    setRecordId(id);
    setActive('evidence');
  }

  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-title"
      className="scroll-mt-24 bg-white px-5 py-14 text-primary-950 selection:bg-secondary-100 sm:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl border-t border-neutral-200 pt-12 lg:pt-16">
        <header className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2
            id="capabilities-title"
            className="text-balance text-3xl font-medium leading-tight tracking-tight lg:text-4xl"
          >
            Connected knowledge.
            <br />
            Clearer company context.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-neutral-600">
            Bring approved documents and conversations into Company Brain. Find
            relevant information, follow the history behind decisions, and
            inspect the sources supporting an answer.
          </p>
        </header>

        <Tabs
          value={active}
          onValueChange={setActive}
          className="mt-9 lg:mt-12"
        >
          <TabsList
            aria-label="Company Brain capabilities"
            className="grid h-auto grid-cols-3 gap-2 rounded-none bg-transparent p-0 sm:gap-4"
          >
            {capabilities.map((capability, index) => (
              <TabsTrigger
                key={capability.id}
                value={capability.id}
                className="group flex min-h-16 items-center justify-start gap-3 whitespace-normal rounded-2xl border border-neutral-200 bg-white/70 px-3 backdrop-blur py-3 text-left text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 data-[state=active]:border-secondary-200 data-[state=active]:bg-secondary-50 data-[state=active]:text-secondary-800 data-[state=active]:shadow-none focus-visible:ring-secondary-600 sm:px-5 sm:text-base"
              >
                <span className="hidden text-xs tabular-nums text-neutral-400 group-data-[state=active]:text-secondary-700 sm:block">
                  0{index + 1}
                </span>
                <span>{capability.label}</span>
                <ArrowRight
                  className="ml-auto hidden size-4 shrink-0 text-neutral-400 group-data-[state=active]:text-secondary-700 sm:block"
                  aria-hidden="true"
                />
              </TabsTrigger>
            ))}
          </TabsList>

          {capabilities.map((capability, index) => (
            <TabsContent
              key={capability.id}
              value={capability.id}
              className={`mt-7 rounded-3xl p-4 ring-1 ring-secondary-100 focus-visible:ring-secondary-600 sm:p-7 lg:mt-6 lg:p-8 ${notrixWashClass}`}
            >
              <div className="grid items-start gap-7 lg:grid-cols-5 lg:gap-10">
                <div className="py-2 lg:col-span-2 lg:py-5">
                  <p className="text-xs font-medium text-neutral-500">
                    {index === 0
                      ? 'Across connected sources'
                      : index === 1
                        ? 'From proposal to approval'
                        : 'Back to the original record'}
                  </p>
                  <h3 className="mt-4 max-w-md text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                    {capability.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-7 text-neutral-600 sm:text-base">
                    {capability.description}
                  </p>
                  <div className="mt-7 border-t border-neutral-200 pt-5">
                    <p className="text-xs font-medium text-neutral-500">
                      In this example
                    </p>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-700">
                      {index === 0
                        ? 'Three Acme records, connected across Google Drive and Slack. Select a record to read its supporting passage.'
                        : index === 1
                          ? 'An initial proposal, a conditional suggestion, and an approved agreement. Review the status of each record.'
                          : 'Read the exact source passage with its date, status, and supporting context.'}
                    </p>
                    <dl className="mt-5 divide-y divide-neutral-200">
                      {capability.facts.map(([label, value]) => (
                        <div
                          key={label}
                          className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-4"
                        >
                          <dt className="text-xs leading-6 text-neutral-500">
                            {label}
                          </dt>
                          <dd className="text-sm leading-6 text-neutral-700 sm:col-span-2">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <div className="min-w-0 lg:col-span-3">
                  <CapabilityView
                    view={capability.id}
                    recordId={recordId}
                    onOpen={openRecord}
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs leading-relaxed text-neutral-500">
            Illustrative records. No customer data is shown.
          </p>
          <Link
            href="/product"
            className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-neutral-700 underline decoration-secondary-300 underline-offset-8 hover:text-primary-950 hover:decoration-secondary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-600 focus-visible:ring-offset-4"
          >
            Explore Company Brain
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
