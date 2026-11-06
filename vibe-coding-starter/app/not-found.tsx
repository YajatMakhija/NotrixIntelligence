import Link from 'next/link';

import { NotrixDemoDialog } from '@/components/notrix/NotrixDemoDialog';
import { NotrixFooter } from '@/components/notrix/NotrixFooter';
import { NotrixHeader } from '@/components/notrix/NotrixHeader';
import { NotrixRibbon, notrixCtaClass, notrixEyebrowClass } from '@/components/notrix/NotrixTheme';

export default function NotFound() {
  return (
    <div className="notrix-site w-full overflow-x-clip bg-white text-neutral-950">
      <div className="mx-auto w-full max-w-screen-2xl px-3 pt-3 sm:px-5 sm:pt-6">
        <NotrixHeader />
      </div>
      <section className="relative min-h-[560px] overflow-hidden">
        <NotrixRibbon className="pointer-events-none absolute inset-x-0 bottom-0 h-[300px] w-full sm:h-[380px] lg:h-full" />
        <div className="relative z-10 mx-auto max-w-[1344px] px-5 pb-40 pt-16 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <p className={notrixEyebrowClass}>404</p>
          <h1 className="mt-6 max-w-xl text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
            We couldn&apos;t find this page.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-neutral-600">
            It may have moved. Head back to the homepage, or browse the docs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className={notrixCtaClass}>Back to homepage</Link>
          </div>
        </div>
      </section>
      <NotrixFooter />
      <NotrixDemoDialog />
    </div>
  );
}
