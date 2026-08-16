import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DOCS_SECTIONS,
  flattenSection,
  getArticle,
  getSection,
} from "@/lib/docs-nav";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return DOCS_SECTIONS.flatMap((section) =>
    flattenSection(section).map((link) => ({
      section: section.slug,
      slug: link.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> {
  const { section, slug } = await params;
  const article = getArticle(section, slug);
  if (!article) return pageMetadata("Docs", "Documentation for Company Brain.");
  return pageMetadata(
    `${article.link.label} — Docs`,
    `${article.link.label} in the Company Brain documentation.`,
  );
}

export default async function DocsArticlePage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section: sectionSlug, slug } = await params;
  const section = getSection(sectionSlug);
  const article = getArticle(sectionSlug, slug);
  if (!section || !article) notFound();

  const ordered = flattenSection(section);
  const index = ordered.findIndex((l) => l.slug === slug);
  const prev = index > 0 ? ordered[index - 1] : undefined;
  const next = index < ordered.length - 1 ? ordered[index + 1] : undefined;

  return (
    <article className="mx-auto max-w-[720px]">
      <nav aria-label="Breadcrumb" className="text-[12px] text-[var(--fg-faint)]">
        <Link href="/docs" className="hover:text-white">
          Docs
        </Link>
        <span className="px-2">/</span>
        <Link href={`/docs/${section.slug}`} className="hover:text-white">
          {section.title}
        </Link>
        <span className="px-2">/</span>
        <span className="text-[var(--fg-muted)]">{article.link.label}</span>
      </nav>

      <h1 className="display mt-5 text-[34px] text-white md:text-[40px]">
        {article.link.label}
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--fg-muted)]">
        {article.group.heading} · {section.title}
      </p>

      <div className="mt-12 rounded-lg border border-dashed border-[var(--line-strong)] px-8 py-14 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--fg-faint)]">
          Being written
        </p>
        <p className="mx-auto mt-5 max-w-[420px] text-[14px] leading-relaxed text-[var(--fg-muted)]">
          This page lands alongside the product. If you need this detail now,
          ask us directly and we will walk you through it.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13.5px]">
          <Link href="/contact" className="link-underline text-white">
            Talk to us
          </Link>
          <a
            href={`mailto:${SITE.email}`}
            className="text-[var(--fg-muted)] hover:text-white"
          >
            {SITE.email}
          </a>
        </div>
      </div>

      {(prev || next) && (
        <nav
          aria-label="Pagination"
          className="mt-16 grid gap-4 border-t border-[var(--line)] pt-8 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={`/docs/${section.slug}/${prev.slug}`}
              className="rounded-lg border border-[var(--line)] p-4 transition-colors hover:border-[var(--line-strong)] hover:bg-white/[0.02]"
            >
              <span className="block text-[11px] text-[var(--fg-faint)]">Previous</span>
              <span className="mt-1 block text-[14px] text-white">{prev.label}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/docs/${section.slug}/${next.slug}`}
              className="rounded-lg border border-[var(--line)] p-4 text-right transition-colors hover:border-[var(--line-strong)] hover:bg-white/[0.02]"
            >
              <span className="block text-[11px] text-[var(--fg-faint)]">Next</span>
              <span className="mt-1 block text-[14px] text-white">{next.label}</span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
