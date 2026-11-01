'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { NotrixConversationStack } from '@/components/notrix/NotrixConversationStack';
import { NotrixDemoTrigger } from '@/components/notrix/NotrixDemoDialog';
import {
  NotrixGlassFrame,
  NotrixRibbon,
  notrixCtaClass,
  notrixEyebrowClass,
  notrixSecondaryCtaClass,
} from '@/components/notrix/NotrixTheme';

export function NotrixHero() {
  return (
    <section id="product" className="relative overflow-hidden">
      <NotrixRibbon className="pointer-events-none absolute inset-x-0 bottom-0 h-[380px] w-full sm:h-[460px] lg:inset-0 lg:h-full" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-2/3 bg-[radial-gradient(ellipse_at_bottom_left,theme(colors.secondary.100),transparent_70%)] [mask-image:linear-gradient(to_bottom,black_30%,transparent)]"
      />

      <div className="relative z-10 mx-auto grid max-w-[1344px] gap-12 px-5 pb-16 pt-12 sm:px-6 sm:pt-14 md:px-8 md:pt-16 lg:min-h-[640px] lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-10 lg:pb-20 lg:pt-16 xl:grid-cols-[minmax(0,600px)_minmax(0,600px)] xl:justify-between xl:px-12">
        <div className="max-w-[600px]">
          <p className={notrixEyebrowClass}>Company brain for Slack</p>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-neutral-950 sm:text-5xl">
            Your company&apos;s knowledge, connected.
            <span className="block">Your data stays with you.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-6 text-neutral-600 sm:text-lg sm:leading-7">
            Ask questions in Slack. Get answers with sources from your company&apos;s
            knowledge, stored in your own cloud.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <NotrixDemoTrigger className={notrixCtaClass}>
              Book a demo
              <ArrowRight className="size-4" aria-hidden="true" />
            </NotrixDemoTrigger>
            <Link href="#how-it-works" className={notrixSecondaryCtaClass}>
              See how it works
            </Link>
          </div>
        </div>

        <NotrixGlassFrame className="mx-auto w-full max-w-[600px] lg:mx-0 lg:ml-auto">
          <div className="px-3 py-8 sm:px-8 sm:py-12">
            <NotrixConversationStack flush />
          </div>
        </NotrixGlassFrame>
      </div>
    </section>
  );
}
