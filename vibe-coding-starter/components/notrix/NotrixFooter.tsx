import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { NotrixDemoTrigger } from '@/components/notrix/NotrixDemoDialog';
import { NotrixThemePicker } from '@/components/notrix/NotrixThemePicker';
import { notrixAppLoginUrl } from '@/data/notrix/landing';

const links = [
  ['Product', '/product'],
  ['Pricing', '/pricing'],
  ['Docs', 'https://docs.notrix.si'],
  ['Security', '/security'],
  ['Privacy', '/privacy'],
  ['Terms', '/terms'],
] as const;

export function NotrixFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white px-5 py-10 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-lg font-semibold text-neutral-950">
            <span className="relative size-9 overflow-hidden rounded-lg bg-white ring-1 ring-neutral-200" aria-hidden="true">
              <Image
                src="/static/images/notrix-logo.png"
                alt=""
                width={1254}
                height={1254}
                className="absolute -top-2 left-1/2 size-16 max-w-none -translate-x-1/2 object-contain"
              />
            </span>
            Notrix
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Shared memory infrastructure for AI agents and humans.
          </p>
          <p className="mt-3 text-sm text-neutral-600">
            Contact us:{' '}
            <a
              href="mailto:yajat@notrix.si"
              className="font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950"
            >
              yajat@notrix.si
            </a>
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer">
          {links.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-neutral-600 hover:text-neutral-950"
            >
              {label}
            </Link>
          ))}
          <a
            href={notrixAppLoginUrl}
            className="text-sm text-neutral-600 hover:text-neutral-950"
          >
            Sign in
          </a>
        </nav>
        <NotrixDemoTrigger className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white sm:self-auto">
          Book a demo <ArrowUpRight className="size-4" />
        </NotrixDemoTrigger>
      </div>
      <div className="mx-auto mt-8 flex max-w-5xl items-center justify-between gap-4">
        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()} Notrix Intelligence.
        </p>
        <NotrixThemePicker />
      </div>
    </footer>
  );
}
