'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  FileText,
  Hash,
  Info,
  Lightbulb,
  Menu,
  MessageSquare,
  Plug,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  TriangleAlert,
  X,
} from 'lucide-react';

import { useDrawer } from '@/components/notrix/NotrixHeader';
import { NotrixThemePicker } from '@/components/notrix/NotrixThemePicker';
import {
  notrixDocGroups,
  notrixDocHref,
  notrixDocPages,
  notrixDocSectionId,
  type NotrixDocGroup,
  type NotrixDocPage,
  type NotrixDocSection,
} from '@/data/notrix/docs';
import { notrixDocMarkdown } from '@/data/notrix/docs-markdown';
import { notrixCalendlyUrl } from '@/data/notrix/landing';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500';

const groupIcons: Record<NotrixDocGroup['icon'], typeof Rocket> = {
  start: Rocket,
  concepts: BookOpen,
  using: MessageSquare,
  connectors: Plug,
  security: ShieldCheck,
  admin: Settings2,
};

const sectionText = (section: NotrixDocSection) =>
  [
    section.title,
    ...(section.paragraphs ?? []),
    ...(section.steps ?? []),
    ...(section.bullets ?? []),
    ...(section.points ?? []).map((point) => `${point.title} ${point.text}`),
    section.closing ?? '',
    ...(section.tabs ?? []).flatMap((tab) => [tab.label, ...tab.asks]),
    section.callout?.text ?? '',
    section.note ?? '',
  ].join(' ');

function DocsSearch({
  onNavigate,
  shortcut,
}: {
  onNavigate?: () => void;
  shortcut?: boolean;
}) {
  const [query, setQuery] = useState('');
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!shortcut) return;
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shortcut]);
  const term = query.trim().toLowerCase();
  // ponytail: substring match over ~30 sections; swap for a real index if the docs grow large.
  const results = term
    ? notrixDocPages.flatMap((page) =>
        page.sections
          .filter((section) => `${page.title} ${sectionText(section)}`.toLowerCase().includes(term))
          .map((section) => ({ page, section })),
      )
    : [];

  return (
    <div className="relative w-full">
      <label className="relative block">
        <span className="sr-only">Search the docs</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500"
          aria-hidden="true"
        />
        <input
          ref={input}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => event.key === 'Escape' && setQuery('')}
          placeholder="Search documentation"
          className={`h-9 w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-9 pr-16 text-sm text-neutral-950 placeholder:text-neutral-500 hover:border-neutral-300 ${focusRing}`}
        />
        {shortcut && (
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-neutral-200 bg-white px-1.5 py-0.5 font-sans text-[11px] font-medium text-neutral-500">
            Ctrl K
          </kbd>
        )}
      </label>
      {term && (
        <div className="absolute inset-x-0 top-11 z-50 max-h-96 overflow-y-auto rounded-xl border border-neutral-200 bg-white p-1.5 shadow-2xl shadow-neutral-950/10">
          {results.length === 0 ? (
            <p className="px-3 py-2 text-sm text-neutral-500">No results for “{query}”.</p>
          ) : (
            results.slice(0, 8).map(({ page, section }) => (
              <Link
                key={`${page.slug}-${section.title}`}
                href={`${notrixDocHref(page)}#${notrixDocSectionId(section.title)}`}
                onClick={() => {
                  setQuery('');
                  onNavigate?.();
                }}
                className={`flex items-start gap-3 rounded-lg px-3 py-2 hover:bg-neutral-100 ${focusRing}`}
              >
                <FileText className="mt-0.5 size-4 shrink-0 text-neutral-400" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-medium text-neutral-950">{section.title}</span>
                  <span className="block text-xs text-neutral-500">{page.title}</span>
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// Groups fold open and closed with the browser's own <details>; all start open.
function DocsNav({ current, onNavigate }: { current: NotrixDocPage; onNavigate?: () => void }) {
  return (
    <div className="space-y-5">
      {notrixDocGroups.map((group) => {
        const Icon = groupIcons[group.icon];
        return (
          <details key={group.title} open className="group">
            <summary
              className={`flex cursor-pointer list-none items-center gap-2 rounded-md px-2 py-1.5 text-[13px] font-semibold text-neutral-950 [&::-webkit-details-marker]:hidden ${focusRing}`}
            >
              <Icon className="size-4 text-neutral-500" aria-hidden="true" />
              {group.title}
              <ChevronDown
                className="ml-auto size-3.5 text-neutral-400 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <ul className="ml-[15px] mt-1 border-l border-neutral-200">
              {group.pages.map((page) => {
                const active = page.slug === current.slug;
                return (
                  <li key={page.slug}>
                    <Link
                      href={notrixDocHref(page)}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={`-ml-px block border-l py-1.5 pl-4 pr-2 text-sm leading-5 ${focusRing} ${
                        active
                          ? 'border-neutral-950 font-semibold text-neutral-950'
                          : 'border-transparent text-neutral-600 hover:border-neutral-400 hover:text-neutral-950'
                      }`}
                    >
                      {page.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </details>
        );
      })}
    </div>
  );
}

function DocsTabs({ tabs }: { tabs: NonNullable<NotrixDocSection['tabs']> }) {
  const [open, setOpen] = useState(0);
  const tab = tabs[open];
  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const move = (event: React.KeyboardEvent, index: number) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    const next = (index + step + tabs.length) % tabs.length;
    setOpen(next);
    (event.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
  };
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200">
      <div role="tablist" className="flex flex-wrap gap-x-1 border-b border-neutral-200 bg-neutral-50 px-2">
        {tabs.map((item, index) => (
          <button
            key={item.label}
            type="button"
            role="tab"
            id={`tab-${index}`}
            aria-selected={index === open}
            aria-controls="tab-panel"
            tabIndex={index === open ? 0 : -1}
            onClick={() => setOpen(index)}
            onKeyDown={(event) => move(event, index)}
            className={`-mb-px border-b-2 px-3 py-3 text-sm font-medium ${focusRing} ${
              index === open
                ? 'border-neutral-950 text-neutral-950'
                : 'border-transparent text-neutral-500 hover:text-neutral-950'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="tab-panel" aria-labelledby={`tab-${open}`} className="p-5">
        <ul className="space-y-2.5">
          {tab.asks.map((ask) => (
            <li key={ask} className="flex gap-3">
              <MessageSquare className="mt-1.5 size-4 shrink-0 text-neutral-400" aria-hidden="true" />
              {ask}
            </li>
          ))}
        </ul>
        {tab.see && <p className="mt-4 border-t border-neutral-200 pt-4 text-[15px] text-neutral-600">{tab.see}</p>}
      </div>
    </div>
  );
}

const calloutStyles = {
  caution: {
    Icon: TriangleAlert,
    box: 'border-amber-300/70 bg-amber-50 dark:border-amber-400/30 dark:bg-amber-400/10',
    icon: 'text-amber-600 dark:text-amber-400',
  },
  tip: {
    Icon: Lightbulb,
    box: 'border-emerald-300/70 bg-emerald-50 dark:border-emerald-400/30 dark:bg-emerald-400/10',
    icon: 'text-emerald-600 dark:text-emerald-400',
  },
  note: {
    Icon: Info,
    box: 'border-secondary-200 bg-secondary-50/60',
    icon: 'text-secondary-600',
  },
};

function Callout({ tone, title, text }: { tone: keyof typeof calloutStyles; title: string; text: string }) {
  const style = calloutStyles[tone];
  return (
    <div className={`flex gap-3 rounded-xl border px-4 py-3.5 ${style.box}`}>
      <style.Icon className={`mt-1 size-4 shrink-0 ${style.icon}`} aria-hidden="true" />
      <div className="text-[15px] leading-7 text-neutral-700">
        <p className="font-semibold text-neutral-950">{title}</p>
        <p>{text}</p>
      </div>
    </div>
  );
}

function CopyPage({ page }: { page: NotrixDocPage }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(notrixDocMarkdown(page));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure origin or denied): the Markdown link next to this still works.
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex h-8 items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 ${focusRing}`}
    >
      {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
      {copied ? 'Copied' : 'Copy page'}
    </button>
  );
}

function SectionBody({ section }: { section: NotrixDocSection }) {
  return (
    <div className="mt-4 space-y-5 text-base leading-7 text-neutral-700">
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.steps && (
        <ol>
          {section.steps.map((step, stepIndex) => (
            <li key={step} className="relative flex gap-4 pb-5 last:pb-0">
              {stepIndex < section.steps!.length - 1 && (
                <span className="absolute bottom-0 left-[13px] top-8 w-px bg-neutral-200" aria-hidden="true" />
              )}
              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-white text-[13px] font-semibold text-neutral-950"
                aria-hidden="true"
              >
                {stepIndex + 1}
              </span>
              <p className="pt-0.5">{step}</p>
            </li>
          ))}
        </ol>
      )}
      {section.bullets && (
        <ul className="space-y-2">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-neutral-400" aria-hidden="true" />
              {bullet}
            </li>
          ))}
        </ul>
      )}
      {section.points && (
        <ul className="grid gap-3 sm:grid-cols-2">
          {section.points.map((point) => (
            <li key={point.title} className="rounded-xl border border-neutral-200 bg-white p-5">
              <p className="font-semibold leading-6 text-neutral-950">{point.title.replace(/\.$/, '')}</p>
              <p className="mt-1.5 text-[15px] leading-6 text-neutral-600">{point.text}</p>
            </li>
          ))}
        </ul>
      )}
      {section.closing && <p>{section.closing}</p>}
      {section.tabs && <DocsTabs tabs={section.tabs} />}
      {section.callout && <Callout {...section.callout} />}
      {section.note && <Callout tone="note" title="Note" text={section.note} />}
      {section.action && (
        <a
          href={section.action.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex h-10 items-center gap-2 rounded-lg bg-neutral-950 px-4 text-sm font-semibold text-white hover:opacity-90 ${focusRing}`}
        >
          {section.action.label}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      )}
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
  const page = notrixDocPages.find((candidate) => candidate.slug === slug) ?? notrixDocPages[0];
  const index = notrixDocPages.indexOf(page);
  const group = notrixDocGroups.find((candidate) => candidate.pages.includes(page));
  const previous = notrixDocPages[index - 1];
  const next = notrixDocPages[index + 1];
  const sectionIds = useMemo(() => page.sections.map((section) => notrixDocSectionId(section.title)), [page]);
  const minutes = useMemo(
    () =>
      Math.max(
        1,
        Math.round(`${page.intro} ${page.sections.map(sectionText).join(' ')}`.split(/\s+/).length / 220),
      ),
    [page],
  );
  const activeSection = useActiveSection(sectionIds);

  return (
    <div className="min-w-0 xl:grid xl:grid-cols-[minmax(0,1fr)_15rem]">
      <main className="min-w-0 px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
        <article key={page.slug} className="docs-enter mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] font-medium text-neutral-500">
            <span>Docs</span>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span className="text-secondary-600">{group?.title}</span>
          </nav>
          <h1 className="mt-3 text-balance font-display text-[2.5rem] font-bold leading-[1.15] tracking-[-0.02em]">
            {page.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-neutral-600">{page.intro}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-neutral-200 pb-6">
            <span className="inline-flex items-center gap-1.5 text-[13px] text-neutral-500">
              <Clock className="size-3.5" aria-hidden="true" />
              {minutes} min read
            </span>
            <div className="ml-auto flex gap-2">
              <CopyPage page={page} />
              <a
                href={`/${page.slug}.md`}
                className={`inline-flex h-8 items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 text-[13px] font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 ${focusRing}`}
              >
                <FileText className="size-3.5" aria-hidden="true" />
                View as Markdown
              </a>
            </div>
          </div>

          {page.sections.map((section) => {
            const id = notrixDocSectionId(section.title);
            return (
              <section key={section.title} id={id} className="mt-12 scroll-mt-24">
                <h2 className="group/h font-display text-2xl font-bold tracking-[-0.01em]">
                  <a href={`#${id}`} className={`inline-flex items-center gap-2 rounded ${focusRing}`}>
                    {section.title}
                    <Hash
                      className="size-4 text-neutral-400 opacity-0 transition-opacity group-hover/h:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                </h2>
                <SectionBody section={section} />
              </section>
            );
          })}

          <nav aria-label="Pagination" className="mt-16 grid gap-3 sm:grid-cols-2">
            {previous ? (
              <Link
                href={notrixDocHref(previous)}
                className={`group rounded-xl border border-neutral-200 p-4 hover:border-neutral-400 ${focusRing}`}
              >
                <span className="flex items-center gap-1 text-[13px] text-neutral-500">
                  <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" /> Previous
                </span>
                <span className="mt-1 block font-semibold">{previous.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={notrixDocHref(next)}
                className={`group rounded-xl border border-neutral-200 p-4 text-right hover:border-neutral-400 ${focusRing}`}
              >
                <span className="flex items-center justify-end gap-1 text-[13px] text-neutral-500">
                  Next <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <span className="mt-1 block font-semibold">{next.title}</span>
              </Link>
            )}
          </nav>

          <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-6 text-[13px] text-neutral-500">
            <span>© {new Date().getFullYear()} Notrix</span>
            <span>
              Need help?{' '}
              <a href="mailto:yajat@notrix.si" className={`font-medium text-neutral-950 underline-offset-4 hover:underline ${focusRing}`}>
                Contact support
              </a>{' '}
              or{' '}
              <a
                href={notrixCalendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-medium text-neutral-950 underline-offset-4 hover:underline ${focusRing}`}
              >
                book a call
              </a>
              .
            </span>
          </footer>
        </article>
      </main>

      <aside className="hidden xl:block">
        <nav aria-label="On this page" className="sticky top-16 py-12 pr-6">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-neutral-950">
            <BookOpen className="size-3.5 text-neutral-500" aria-hidden="true" />
            On this page
          </p>
          <ul className="mt-3 border-l border-neutral-200">
            {page.sections.map((section) => {
              const id = notrixDocSectionId(section.title);
              const active = id === activeSection;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`-ml-px block border-l py-1.5 pl-4 text-[13px] leading-5 ${focusRing} ${
                      active
                        ? 'border-neutral-950 font-medium text-neutral-950'
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
  );
}

// The header, sidebar and mobile menu live in app/docs/layout.tsx, so they stay mounted between pages:
// the sidebar keeps its scroll position and only the article changes.
export function NotrixDocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // docs.notrix.si/<slug> in production, /docs/<slug> without the docs host.
  const slug = pathname.split('/').filter((part) => part && part !== 'docs').pop();
  const page = notrixDocPages.find((candidate) => candidate.slug === slug) ?? notrixDocPages[0];
  const [menuOpen, setMenuOpen] = useState(false);
  useDrawer(menuOpen, setMenuOpen);
  const sidebar = useRef<HTMLElement>(null);
  // Bring the current page into view only if it is outside the visible part of the sidebar.
  useEffect(() => {
    const nav = sidebar.current;
    const link = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !link) return;
    if (link.offsetTop < nav.scrollTop || link.offsetTop + link.offsetHeight > nav.scrollTop + nav.clientHeight) {
      nav.scrollTop = link.offsetTop - nav.clientHeight / 3;
    }
  }, [page.slug]);

  return (
    <div className="notrix-site min-h-screen w-full bg-white text-neutral-950">
      <header className="sticky top-0 z-40 flex h-16 w-full items-center gap-3 border-b border-neutral-200 bg-white/90 px-4 backdrop-blur-md lg:px-0">
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
        <div className="flex shrink-0 items-center gap-3 lg:w-[17rem] lg:px-5">
          <Link href="https://www.notrix.si" aria-label="Notrix home" className={`flex items-center gap-2 rounded-lg ${focusRing}`}>
            <span className="relative size-9 overflow-hidden rounded-lg bg-white" aria-hidden="true">
              <Image
                src="/static/images/notrix-logo.png"
                alt=""
                width={1254}
                height={1254}
                priority
                className="absolute -top-2 left-1/2 size-16 max-w-none -translate-x-1/2 object-contain dark:invert"
              />
            </span>
            <span className="text-base font-semibold tracking-[-0.01em]">Notrix</span>
          </Link>
          <span className="rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs font-medium text-neutral-600">
            Docs
          </span>
        </div>
        <div className="hidden w-full max-w-md md:block lg:px-5">
          <DocsSearch shortcut />
        </div>
        <div className="ml-auto flex items-center gap-2 lg:pr-5">
          <a
            href="/llms.txt"
            className={`hidden h-8 items-center gap-1 rounded-lg px-2.5 text-[13px] font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 xl:inline-flex ${focusRing}`}
          >
            llms.txt
          </a>
          <a
            href="mailto:yajat@notrix.si"
            className={`hidden h-8 items-center rounded-lg px-2.5 text-[13px] font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 sm:inline-flex ${focusRing}`}
          >
            Support
          </a>
          <NotrixThemePicker />
          <a
            href="https://app.notrix.si"
            className={`hidden h-8 items-center gap-1 rounded-lg bg-neutral-950 px-3 text-[13px] font-semibold text-white hover:opacity-90 sm:inline-flex ${focusRing}`}
          >
            Open app
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="hidden border-r border-neutral-200 bg-neutral-50 lg:block">
          <nav
            ref={sidebar}
            aria-label="Documentation"
            className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain px-3 py-6"
          >
            <DocsNav current={page} />
          </nav>
        </aside>
        {children}
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
            className="absolute inset-y-0 left-0 flex w-[85%] max-w-xs flex-col gap-5 overflow-y-auto border-r border-neutral-200 bg-neutral-50 p-4"
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
