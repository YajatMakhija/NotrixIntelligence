import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  Cloud,
  Database,
  File,
  FileText,
  KeyRound,
  LockKeyhole,
  Settings2,
  UsersRound,
} from 'lucide-react';
import { SiNotion } from '@icons-pack/react-simple-icons';

import { notrixGlassInnerClass, notrixWashClass } from '@/components/notrix/NotrixTheme';

const securityFeatures = [
  {
    icon: Database,
    title: 'Your data, your account',
    description:
      'Documents, memories and indexes stay in your AWS environment.',
  },
  {
    icon: UsersRound,
    title: 'Permissions come first',
    description:
      'Answers respect each person’s access to the underlying sources.',
  },
  {
    icon: FileText,
    title: 'Evidence behind answers',
    description: 'Follow citations back to the documents that support them.',
  },
] as const;

function NotrixMark() {
  return (
    <span
      className="relative inline-block size-11 shrink-0 overflow-hidden bg-white"
      aria-hidden="true"
    >
      <Image
        src="/static/images/notrix-logo.png"
        alt=""
        width={1254}
        height={1254}
        className="absolute -top-2 left-1/2 size-20 max-w-none -translate-x-1/2 object-contain dark:invert"
      />
    </span>
  );
}

function DataConnector() {
  return (
    <span
      className="flex h-7 items-center justify-center md:h-auto md:w-8 md:shrink-0"
      aria-hidden="true"
    >
      <svg
        className="hidden h-2 w-full text-neutral-300 md:block"
        viewBox="0 0 32 8"
        fill="none"
      >
        <path d="M2 4h28" stroke="currentColor" />
        <circle cx="2" cy="4" r="2" fill="currentColor" />
        <circle cx="30" cy="4" r="2" fill="currentColor" />
      </svg>
      <svg
        className="h-full w-2 text-neutral-300 md:hidden"
        viewBox="0 0 8 28"
        fill="none"
      >
        <path d="M4 2v24" stroke="currentColor" />
        <circle cx="4" cy="2" r="2" fill="currentColor" />
        <circle cx="4" cy="26" r="2" fill="currentColor" />
      </svg>
    </span>
  );
}

export function NotrixByocSection() {
  return (
    <section
      id="byoc"
      aria-labelledby="byoc-title"
      className={`scroll-mt-24 px-5 py-14 text-primary-950 sm:px-8 lg:py-20 ${notrixWashClass}`}
    >
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-secondary-700">
            Your cloud. Your control.
          </p>
          <h2
            id="byoc-title"
            className="mt-5 text-balance text-3xl font-medium leading-tight tracking-tight lg:text-4xl"
          >
            Company knowledge. On your terms.
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-neutral-500 sm:text-lg">
            Bring Notrix to your AWS account. Keep documents, memories and
            search indexes within infrastructure you control.
          </p>
        </header>

        <div className={`mt-10 p-5 sm:p-7 ${notrixGlassInnerClass}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-medium sm:text-xl">
              How your deployment works
            </h3>
            <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium uppercase text-neutral-600">
              Bring your own cloud
            </span>
          </div>

          <div className="mt-6 grid items-stretch lg:grid-cols-[minmax(0,1fr)_6rem_minmax(0,3fr)]">
            <div className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <NotrixMark />
                <div>
                  <h4 className="font-semibold">Notrix</h4>
                  <p className="mt-1 text-sm text-neutral-500">Control plane</p>
                </div>
              </div>
              <ul className="mt-5 space-y-5 border-t border-neutral-200 pt-5 text-sm leading-relaxed text-neutral-600">
                <li className="flex items-center gap-3">
                  <Settings2
                    className="size-5 shrink-0 text-primary-950"
                    aria-hidden="true"
                  />
                  Deployment management
                </li>
                <li className="flex items-center gap-3">
                  <Activity
                    className="size-5 shrink-0 text-primary-950"
                    aria-hidden="true"
                  />
                  Configuration &amp; health
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 py-5 text-neutral-400 lg:px-2 lg:py-0">
              <span className="text-xs font-medium text-neutral-500">
                Management
              </span>
              <svg
                className="hidden h-4 w-full lg:block"
                viewBox="0 0 88 16"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="3" cy="8" r="2.5" fill="currentColor" />
                <path d="M3 8h79" stroke="currentColor" strokeDasharray="4 5" />
                <path
                  d="m76 2 6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <svg
                className="h-8 w-4 lg:hidden"
                viewBox="0 0 16 32"
                fill="none"
                aria-hidden="true"
              >
                <path d="M8 1v28" stroke="currentColor" strokeDasharray="4 4" />
                <path
                  d="m2 23 6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <div className="min-w-0 rounded-lg border border-secondary-100 bg-neutral-50/70 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="flex items-center gap-3 font-medium">
                  <Cloud className="size-6" aria-hidden="true" />
                  Your AWS account
                </h4>
                <span className="rounded-full border border-secondary-200 bg-white px-2 py-1 text-xs font-medium text-secondary-700">
                  Your data boundary
                </span>
              </div>

              <div className="mt-5 flex flex-col md:flex-row md:items-stretch">
                <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white px-3 py-5 text-center">
                  <div
                    className="flex h-11 items-center gap-4"
                    aria-hidden="true"
                  >
                    <Image
                      src="/static/images/integrations/slack.svg"
                      alt=""
                      width={28}
                      height={28}
                      className="size-7"
                    />
                    <SiNotion className="size-7" />
                    <File className="size-6" />
                  </div>
                  <h5 className="mt-3 text-base font-medium">Your sources</h5>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                    Connected tools &amp; files
                  </p>
                </div>
                <DataConnector />
                <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white px-3 py-5 text-center">
                  <NotrixMark />
                  <h5 className="mt-3 text-base font-medium">Company memory</h5>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                    Documents · Memories · Indexes
                  </p>
                </div>
                <DataConnector />
                <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white px-3 py-5 text-center">
                  <div
                    className="flex h-11 items-center gap-4"
                    aria-hidden="true"
                  >
                    <FileText className="size-6" />
                    <KeyRound className="size-6" />
                  </div>
                  <h5 className="mt-3 text-base font-medium">
                    Trusted answers
                  </h5>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                    Permissions &amp; citations
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 text-neutral-500">
                <span
                  className="h-px flex-1 bg-neutral-200"
                  aria-hidden="true"
                />
                <p className="flex items-center gap-2 text-center text-xs leading-relaxed">
                  <LockKeyhole className="size-4 shrink-0" aria-hidden="true" />
                  Knowledge stored in your account
                </p>
                <span
                  className="h-px flex-1 bg-neutral-200"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-neutral-500">
            Source icons represent connections to external services, not
            services hosted in your AWS account. AI processing follows the
            provider and model policies configured for your deployment.
          </p>
        </div>

        <div className="mt-8 grid divide-y divide-neutral-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {securityFeatures.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex gap-5 py-6 first:pt-0 last:pb-0 md:px-7 md:py-2 md:first:pl-0 md:last:pr-0"
            >
              <Icon
                className="mt-1 size-7 shrink-0"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <h3 className="text-base font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-9 text-center">
          <Link
            href="/security"
            className="inline-flex items-center gap-1.5 rounded-sm text-sm text-neutral-600 underline decoration-secondary-300 underline-offset-8 transition-colors hover:text-primary-950 hover:decoration-secondary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-600 focus-visible:ring-offset-4"
          >
            Explore our security architecture
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
