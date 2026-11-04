'use client';

import { ArrowRight } from 'lucide-react';

import { NotrixConversationStack } from '@/components/notrix/NotrixConversationStack';
import { NotrixDemoTrigger } from '@/components/notrix/NotrixDemoDialog';
import { notrixSignupUrl } from '@/data/notrix/landing';
import {
  NotrixGlassFrame,
  NotrixRibbon,
  notrixCtaClass,
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
          <p className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 py-1 pl-1.5 pr-3.5 text-sm font-medium text-neutral-700 shadow-sm shadow-neutral-200/50 backdrop-blur">
            <span className="rounded-full notrix-light bg-[linear-gradient(135deg,#3157e8,#8b5cf6)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
              New
            </span>
            Shared memory infrastructure<span className="hidden sm:inline">&nbsp;for AI agents and humans</span>
          </p>
          <h1 className="mt-7 text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.03em] text-neutral-950 sm:text-5xl">
            One memory for your AI agents and your team.
            <span className="block text-neutral-500">Running in your own cloud.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-6 text-neutral-600 sm:text-lg sm:leading-7">
            Notrix turns your documents and conversations into shared memory
            that people and AI agents both work from. Every fact keeps its
            source and its owner, and all of it stays in your AWS account.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={notrixSignupUrl} className={notrixCtaClass}>
              Get started
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <NotrixDemoTrigger className={notrixSecondaryCtaClass}>
              Book a demo
            </NotrixDemoTrigger>
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
