'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, FileText } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';

import type { NotrixCardSettings } from '@/data/notrix/editor-layout';
import { notrixConversationExamples } from '@/data/notrix/landing';

const stackVariants: Variants = {
  initial: {},
  animate: {
    transition: { delayChildren: 0.06, staggerChildren: 0.12 },
  },
  exit: {
    transition: { staggerChildren: 0.07, staggerDirection: -1 },
  },
};

const cardVariants: Variants = {
  initial: { opacity: 0, y: 18, scale: 0.985 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.46, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.985,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export function NotrixConversationStack({
  embedded = false,
  flush = false,
  settings,
}: {
  embedded?: boolean;
  flush?: boolean;
  settings?: NotrixCardSettings;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [exampleIndex, setExampleIndex] = useState(0);
  const example = notrixConversationExamples[exampleIndex];
  const cardWidth = settings?.width ?? 100;
  const cardRadius = Math.min(settings?.radius ?? 14, 14);
  const overlap = Math.min(settings?.overlap ?? 8, 8);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = window.setInterval(
      () =>
        setExampleIndex(
          (current) => (current + 1) % notrixConversationExamples.length,
        ),
      6500,
    );
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  const cardStyle = (index: number) => ({
    width: `${Math.max(55, cardWidth - index * 5.5)}%`,
    minHeight: [76, 88, 64][index],
    marginTop: index === 0 ? 0 : -overlap,
    borderRadius: cardRadius,
  });

  return (
    <section
      id="activity"
      aria-label="Illustrative Notrix conversation"
      className={
        embedded
          ? 'relative z-10 mx-auto size-full'
          : `relative z-10 mx-auto w-full max-w-xl scroll-mt-8 pb-1 ${flush ? '' : 'mt-8 sm:mt-10'}`
      }
    >
      <div
        className="absolute left-1/2 top-1/2 h-64 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary-200/45 via-secondary-200/50 to-cyan-100/70 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={example.id}
            className="relative flex w-full flex-col items-center"
            variants={prefersReducedMotion ? undefined : stackVariants}
            initial={prefersReducedMotion ? false : 'initial'}
            animate={prefersReducedMotion ? undefined : 'animate'}
            exit={prefersReducedMotion ? undefined : 'exit'}
          >
            <motion.article
              variants={prefersReducedMotion ? undefined : cardVariants}
              className="relative z-20 border border-neutral-200/90 bg-white px-4 py-3 text-left shadow-lg shadow-neutral-200/60"
              style={cardStyle(0)}
            >
              <div className="flex items-start gap-3">
                <Image
                  src={example.question.avatar}
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-sm font-semibold text-neutral-900">
                      {example.question.sender}
                    </h2>
                    <span className="text-xs font-medium text-neutral-500">
                      {example.question.channel}
                    </span>
                    <time className="ml-auto text-xs text-neutral-400">
                      {example.question.time}
                    </time>
                  </div>
                  <p className="mt-1 text-sm leading-5 text-neutral-700">
                    {example.question.text}
                  </p>
                </div>
              </div>
            </motion.article>

            <motion.article
              variants={prefersReducedMotion ? undefined : cardVariants}
              className="relative z-30 border border-primary-200 bg-white px-4 py-4 text-left shadow-xl shadow-primary-200/30"
              style={cardStyle(1)}
            >
              <div className="flex items-start gap-3">
                <span className="relative size-9 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-white">
                  <Image
                    src="/static/images/notrix-logo.png"
                    alt=""
                    width={64}
                    height={64}
                    className="absolute -top-1 left-1/2 size-11 max-w-none -translate-x-1/2 object-contain"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-neutral-950">
                      Notrix
                    </h2>
                    <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-700">
                      App
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium leading-5 text-neutral-800">
                    {example.answer.text}
                  </p>
                </div>
              </div>
            </motion.article>

            <motion.article
              variants={prefersReducedMotion ? undefined : cardVariants}
              className="relative z-10 border border-neutral-200/90 bg-white px-4 py-3 text-left shadow-lg shadow-neutral-200/50"
              style={cardStyle(2)}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600">
                  <FileText className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-neutral-900">
                    {example.source.title}
                  </p>
                  <p className="truncate text-xs text-neutral-500">
                    {example.source.section}
                  </p>
                </div>
                <ExternalLink
                  className="size-4 shrink-0 text-primary-600"
                  aria-hidden="true"
                />
              </div>
            </motion.article>
          </motion.div>
        </AnimatePresence>

        <p className="mt-4 text-center text-xs font-medium leading-[1.125rem] text-neutral-500">
          Illustrative product conversation.
        </p>
      </div>
    </section>
  );
}
