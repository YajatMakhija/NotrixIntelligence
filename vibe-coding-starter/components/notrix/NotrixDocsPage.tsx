'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Headset,
  Menu,
  MessageSquareText,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  X,
} from 'lucide-react';

import { NotrixThemeToggle, useDrawer } from '@/components/notrix/NotrixHeader';
import {
  notrixDocGroups,
  notrixDocHref,
  notrixDocPages,
  notrixDocSectionId,
  type NotrixDocGroup,
  type NotrixDocPage,
} from '@/data/notrix/docs';

const groupIcons: Record<NotrixDocGroup['icon'], typeof Rocket> = {
  start: Rocket,
  concepts: Compass,
  using: MessageSquareText,
  security: ShieldCheck,
  admin: Settings2,
};

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500';

function DocsSearch({ onNavigate }: { onNavigate?: () => void }) {
  const [query, setQuery] = useState('');
  const term = query.trim().toLowerCase();
  // ponytail: substring match over ~30 sections; swap for a real index if the docs grow large.
  const results = term
    ? notrixDocPages.flatMap((page) =>
        page.sections
          .filter((section) =>
            [
              page.title,
              section.title,
              ...(section.paragraphs ?? []),
              ...(section.bullets ?? []),
            ]
              .join(' ')
              .toLowerCase()
              .includes(term),
          )
          .map((section) => ({ page, section })),
      )
    : [];

  return (
    <div className="relative w-full">
      <label className="relative block">
        <span className="sr-only">Search the docs</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => event.key === 'Escape' && setQuery('')}
          placeholder="Search"
          className={`h-10 w-full rounded-xl border border-neutral-200 bg-white/70 pl-4 pr-10 text-sm text-neutral-950 placeholder:text-neutral-500 ${focusRing}`}
        />
        <Search
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500"
          aria-hidden="true"
        />
      </label>
      {term && (
        <div className="absolute inset-x-0 top-12 z-50 max-h-80 overflow-y-auto rounded-xl border border-neutral-200 bg-white p-2 shadow-xl shadow-neutral-950/10">
          {results.length === 0 ? (
            <p className="px-3 py-2 text-sm text-neutral-500">
              No results for “{query}”.
            </p>
          ) : (
            results.slice(0, 8).map(({ page, section }) => (
              <Link
                key={`${page.slug}-${section.title}`}
                href={`${notrixDocHref(page)}#${notrixDocSectionId(section.title)}`}
                onClick={() => {
                  setQuery('');
                  onNavigate?.();
                }}
                className={`block rounded-lg px-3 py-2 hover:bg-neutral-100 ${focusRing}`}
              >
                <span className="block text-sm font-medium text-neutral-950">
                  {section.title}
                </span>
                <span className="block text-xs text-neutral-500">
                  {page.title}
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function DocsNav({
  current,
  onNavigate,
}: {
  current: NotrixDocPage;
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-7">
      {notrixDocGroups.map((group) => {
        const Icon = groupIcons[group.icon];
        return (
          <div key={group.title}>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-950">
              <Icon className="size-4 text-secondary-600" aria-hidden="true" />
              {group.title}
            </p>
            <ul className="mt-3 space-y-1">
              {group.pages.map((page) => {
                const active = page.slug === current.slug;
                return (
                  <li key={page.slug}>
                    <Link
                      href={notrixDocHref(page)}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center gap-2 rounded-md py-1.5 text-[11px] uppercase tracking-[0.06em] transition-colors ${focusRing} ${
                        active
                          ? 'font-semibold text-neutral-950'
                          : 'text-neutral-500 hover:text-neutral-950'
                      }`}
                    >
                      <span
                        className={`size-1.5 shrink-0 rounded-full ${active ? 'bg-secondary-500' : 'bg-transparent'}`}
                        aria-hidden="true"
                      />
                      {page.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    setActive(ids[0]);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -65% 0px' },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export function NotrixDocsPage({ slug }: { slug: string }) {
  const page =
    notrixDocPages.find((candidate) => candidate.slug === slug) ??
    notrixDocPages[0];
  const index = notrixDocPages.indexOf(page);
  const previous = notrixDocPages[index - 1];
  const next = notrixDocPages[index + 1];
  const sectionIds = useMemo(
    () => page.sections.map((section) => notrixDocSectionId(section.title)),
    [page],
  );
  const activeSection = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  useDrawer(menuOpen, setMenuOpen);

  return (
    <div className="notrix-site relative min-h-screen w-full overflow-x-clip bg-white text-neutral-950">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(50%_40%_at_85%_100%,rgba(139,92,246,0.16),transparent),radial-gradient(40%_30%_at_50%_0%,rgba(49,87,232,0.10),transparent)]"
      />

      <div className="relative mx-auto max-w-[1440px] px-3 pb-16 sm:px-5">
        <header className="sticky top-3 z-40 mt-3 flex h-16 items-center gap-3 rounded-2xl border border-neutral-200 bg-white/80 px-3 shadow-sm backdrop-blur-md sm:top-5 sm:mt-5 sm:px-5">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open docs menu"
            aria-expanded={menuOpen}
            aria-controls="notrix-docs-drawer"
            className={`flex size-9 items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100 lg:hidden ${focusRing}`}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
          <Link
            href="/"
            aria-label="Notrix home"
            className={`flex shrink-0 items-center gap-2 rounded-lg ${focusRing}`}
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
            <span className="text-lg font-semibold tracking-tight">Notrix</span>
            <span className="rounded-md bg-secondary-50 px-1.5 py-0.5 text-[11px] font-semibold text-secondary-700 ring-1 ring-inset ring-secondary-200">
              Docs
            </span>
          </Link>
          <div className="mx-auto hidden w-full max-w-md md:block">
            <DocsSearch />
          </div>
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <a
              href="mailto:yajat@notrix.si"
              className={`hidden h-9 items-center gap-2 rounded-xl border border-neutral-200 bg-white/70 px-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 sm:inline-flex ${focusRing}`}
            >
              <Headset className="size-4" aria-hidden="true" />
              Contact support
            </a>
            <NotrixThemeToggle />
          </div>
        </header>

        <div className="mt-5 grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)_210px]">
          <aside className="hidden lg:block">
            <nav
              aria-label="Documentation"
              className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-neutral-200 bg-white/60 p-5 backdrop-blur-md"
            >
              <DocsNav current={page} />
            </nav>
          </aside>

          <main className="min-w-0 px-2 py-6 sm:px-6 lg:px-10 lg:py-10">
            <article className="max-w-3xl">
              <h1 className="text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                {page.title}
              </h1>
              <p className="mt-5 text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
                {page.intro}
              </p>

              {page.sections.map((section) => (
                <section
                  key={section.title}
                  id={notrixDocSectionId(section.title)}
                  className="mt-10 scroll-mt-28 border-t border-neutral-200 pt-10"
                >
                  <h2 className="text-2xl font-semibold tracking-[-0.02em]">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-[15px] leading-7 text-neutral-600">
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets && (
                      <ul className="space-y-2">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span
                              className="mt-2.5 size-1.5 shrink-0 rounded-full bg-secondary-500"
                              aria-hidden="true"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}

              <nav
                aria-label="Pagination"
                className="mt-14 grid gap-3 border-t border-neutral-200 pt-8 sm:grid-cols-2"
              >
                {previous ? (
                  <Link
                    href={notrixDocHref(previous)}
                    className={`rounded-xl border border-neutral-200 bg-white/60 p-4 hover:border-secondary-300 ${focusRing}`}
                  >
                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                      <ArrowLeft className="size-3" aria-hidden="true" />{' '}
                      Previous
                    </span>
                    <span className="mt-1 block font-medium">
                      {previous.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link
                    href={notrixDocHref(next)}
                    className={`rounded-xl border border-neutral-200 bg-white/60 p-4 text-right hover:border-secondary-300 ${focusRing}`}
                  >
                    <span className="flex items-center justify-end gap-1 text-xs text-neutral-500">
                      Next <ArrowRight className="size-3" aria-hidden="true" />
                    </span>
                    <span className="mt-1 block font-medium">{next.title}</span>
                  </Link>
                )}
              </nav>
            </article>
          </main>

          <aside className="hidden xl:block">
            <nav aria-label="On this page" className="sticky top-28 py-10">
              <p className="text-sm font-semibold">On this page</p>
              <ul className="mt-4 space-y-1 border-l border-neutral-200">
                {page.sections.map((section) => {
                  const id = notrixDocSectionId(section.title);
                  const active = id === activeSection;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        className={`-ml-px block border-l-2 py-1.5 pl-4 text-[13px] transition-colors ${focusRing} ${
                          active
                            ? 'border-secondary-500 font-medium text-neutral-950'
                            : 'border-transparent text-neutral-500 hover:text-neutral-950'
                        }`}
                      >
                        {section.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" id="notrix-docs-drawer">
          <button
            type="button"
            aria-label="Close docs menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <nav
            aria-label="Documentation"
            className="absolute inset-y-0 left-0 flex w-[85%] max-w-xs flex-col gap-5 overflow-y-auto border-r border-neutral-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">Notrix Docs</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close docs menu"
                className={`flex size-9 items-center justify-center rounded-lg hover:bg-neutral-100 ${focusRing}`}
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <DocsSearch onNavigate={() => setMenuOpen(false)} />
            <DocsNav current={page} onNavigate={() => setMenuOpen(false)} />
          </nav>
        </div>
      )}
    </div>
  );
}
