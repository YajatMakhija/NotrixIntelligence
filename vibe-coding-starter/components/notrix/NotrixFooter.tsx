import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { NotrixDemoTrigger } from '@/components/notrix/NotrixDemoDialog';
import { notrixAppLoginUrl } from '@/data/notrix/landing';

const links = [
  ['Product', '/product'],
  ['Docs', '/docs'],
  ['Security', '/security'],
  ['Privacy', '/privacy'],
  ['Terms', '/terms'],
  ['Contact', 'mailto:hello@notrix.ai'],
] as const;

export function NotrixFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white px-5 py-10 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-neutral-950">Notrix</p>
          <p className="mt-1 text-sm text-neutral-500">
            Company knowledge, connected in Slack.
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
      <p className="mx-auto mt-8 max-w-5xl text-xs text-neutral-400">
        © {new Date().getFullYear()} Notrix Intelligence.
      </p>
    </footer>
  );
}
