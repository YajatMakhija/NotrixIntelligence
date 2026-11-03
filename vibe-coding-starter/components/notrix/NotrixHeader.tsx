'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { useTheme } from 'next-themes';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';

import { NotrixDemoTrigger } from '@/components/notrix/NotrixDemoDialog';
import { useNotrixPublishedLayout } from '@/components/notrix/useNotrixPublishedLayout';
import { notrixAppLoginUrl, notrixNavItems, notrixSignupUrl } from '@/data/notrix/landing';

// Shared behaviour for slide-in menus: Escape closes, a route change closes,
// the page behind doesn't scroll, and widening to desktop (where the menu is hidden) closes it.
export function useDrawer(open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, desktopQuery = '(min-width: 1024px)') {
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname, setOpen]);
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    const desktop = window.matchMedia(desktopQuery);
    const onDesktop = () => { if (desktop.matches) close(); };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onDesktop);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [open, setOpen, desktopQuery]);
}

export function NotrixThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is only known in the browser; render a placeholder until then to avoid a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="flex size-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
    >
      {mounted && (dark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />)}
    </button>
  );
}

export function NotrixHeader() {
  const { document, viewport } = useNotrixPublishedLayout();
  const navigation = document?.layouts[viewport].navigation;
  const [menuOpen, setMenuOpen] = useState(false);
  useDrawer(menuOpen, setMenuOpen, '(min-width: 768px)');

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
            className="absolute -top-2 left-1/2 size-16 max-w-none -translate-x-1/2 object-contain dark:invert"
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
        <NotrixThemeToggle />
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
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="notrix-mobile-menu"
          className="flex size-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 md:hidden"
        >
          {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>
        </header>
        {menuOpen && (
          <nav
            id="notrix-mobile-menu"
            aria-label="Mobile navigation"
            className="mx-auto mt-2 grid max-w-5xl gap-1 rounded-2xl border border-neutral-200/80 bg-white/95 p-3 shadow-xl shadow-neutral-300/25 backdrop-blur-md md:hidden"
          >
            {[...notrixNavItems, { label: 'Sign in', href: notrixAppLoginUrl }, { label: 'Create an account', href: notrixSignupUrl }].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-neutral-800 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
      {menuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] md:hidden"
        />
      )}
      <div className="h-14" aria-hidden="true" />
    </>
  );
}
