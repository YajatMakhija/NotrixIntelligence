import Link from 'next/link';

import { NotrixDemoDialog } from '@/components/notrix/NotrixDemoDialog';
import { NotrixFooter } from '@/components/notrix/NotrixFooter';
import { NotrixHeader } from '@/components/notrix/NotrixHeader';

type InformationSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export function NotrixInformationPage({
  eyebrow,
  title,
  introduction,
  sections,
  updated = 'October 20, 2026',
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: InformationSection[];
  updated?: string;
}) {
  return (
    <div className="w-full bg-white text-neutral-950">
      <div className="mx-auto w-full max-w-screen-2xl px-3 pt-3 sm:px-5 sm:pt-6">
        <NotrixHeader />
      </div>
      <main className="px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-700">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-neutral-600">
            {introduction}
          </p>
          <p className="mt-4 text-sm text-neutral-400">
            Last updated {updated}
          </p>
          <div className="mt-14 divide-y divide-neutral-200 border-y border-neutral-200">
            {sections.map((section) => (
              <section key={section.title} className="py-8">
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-neutral-600">
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-2 pl-5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="list-disc pl-1">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-neutral-50 p-6 text-sm text-neutral-600 ring-1 ring-neutral-200">
            Questions about this page?{' '}
            <Link
              href="mailto:hello@notrix.ai"
              className="font-semibold text-neutral-950 underline underline-offset-4"
            >
              Contact Notrix
            </Link>
            .
          </div>
        </div>
      </main>
      <NotrixFooter />
      <NotrixDemoDialog />
    </div>
  );
}
