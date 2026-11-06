import Link from 'next/link';

import { NotrixDemoDialog } from '@/components/notrix/NotrixDemoDialog';
import { NotrixFooter } from '@/components/notrix/NotrixFooter';
import { NotrixHeader } from '@/components/notrix/NotrixHeader';
import {
  NotrixGlassFrame,
  NotrixRibbon,
  notrixEyebrowClass,
} from '@/components/notrix/NotrixTheme';

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
    <div className="notrix-site w-full overflow-x-clip bg-white text-neutral-950">
      <div className="mx-auto w-full max-w-screen-2xl px-3 pt-3 sm:px-5 sm:pt-6">
        <NotrixHeader />
      </div>
      <section className="relative overflow-hidden">
        <NotrixRibbon className="pointer-events-none absolute inset-x-0 bottom-0 h-[260px] w-full sm:h-[320px] lg:h-full" />
        <div className="relative z-10 mx-auto max-w-[1344px] px-5 pb-36 pt-14 sm:px-6 sm:pb-44 sm:pt-20 md:px-8 lg:px-10 xl:px-12">
          <div className="max-w-xl">
            <p className={notrixEyebrowClass}>{eyebrow}</p>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              {introduction}
            </p>
            <p className="mt-4 text-sm text-neutral-500">
              Last updated {updated}
            </p>
          </div>
        </div>
      </section>
      <main className="relative z-10 -mt-28 px-5 pb-16 sm:-mt-32 sm:px-6 sm:pb-24">
        <NotrixGlassFrame
          className="mx-auto max-w-4xl"
          innerClassName="bg-white/80 px-5 py-4 sm:px-10 sm:py-6"
        >
          <div className="divide-y divide-neutral-200">
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
          <div className="mb-4 mt-4 rounded-2xl bg-neutral-50 p-6 text-sm text-neutral-600 ring-1 ring-neutral-200">
            Questions about this page?{' '}
            <Link
              href="mailto:yajat@notrix.si"
              className="font-semibold text-neutral-950 underline underline-offset-4"
            >
              Contact Notrix
            </Link>
            .
          </div>
        </NotrixGlassFrame>
      </main>
      <NotrixFooter />
      <NotrixDemoDialog />
    </div>
  );
}
