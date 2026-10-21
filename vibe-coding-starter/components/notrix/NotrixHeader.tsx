'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { NotrixDemoTrigger } from '@/components/notrix/NotrixDemoDialog';
import { useNotrixPublishedLayout } from '@/components/notrix/useNotrixPublishedLayout';
import { notrixAppLoginUrl, notrixNavItems } from '@/data/notrix/landing';

export function NotrixHeader() {
  const { document, viewport } = useNotrixPublishedLayout();
  const navigation = document?.layouts[viewport].navigation;

  return (
    <>
      <div className="fixed inset-x-3 top-3 z-50 sm:inset-x-5 sm:top-6">
        <header
          style={
            navigation
              ? {
                  width: `${navigation.width}%`,
                  left: `${navigation.x + navigation.width / 2 - 50}%`,
                  minHeight: `${navigation.height}vh`,
                }
              : undefined
          }
          className="relative mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-3 rounded-2xl border border-neutral-200/80 border-b-neutral-300/80 bg-white/95 px-4 shadow-xl shadow-neutral-300/25 backdrop-blur-md sm:px-6"
        >
      <Link
        href="/"
        aria-label="Notrix home"
        className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
      >
        <span
          className="relative size-9 overflow-hidden rounded-lg bg-white"
          aria-hidden="true"
        >
          <Image
            src="/static/images/notrix-logo.png"
            alt=""
            width={1254}
            height={1254}
            priority
            className="absolute -top-2 left-1/2 size-16 max-w-none -translate-x-1/2 object-contain"
          />
        </span>
        <span className="hidden text-sm font-semibold tracking-tight text-neutral-950 sm:block">
          Notrix
        </span>
      </Link>

      <nav
        aria-label="Primary navigation"
        className="hidden items-center gap-6 md:flex"
      >
        {notrixNavItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <a
          href={notrixAppLoginUrl}
          className="hidden h-9 items-center justify-center rounded-full px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 sm:inline-flex"
        >
          Sign in
        </a>
        <NotrixDemoTrigger className="inline-flex h-9 items-center justify-center gap-1 rounded-full bg-neutral-950 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2">
          Book a demo
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </NotrixDemoTrigger>
      </div>
        </header>
      </div>
      <div className="h-14" aria-hidden="true" />
    </>
  );
}
