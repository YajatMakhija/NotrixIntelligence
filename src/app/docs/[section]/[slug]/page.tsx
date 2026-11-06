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
      <nav aria-label="Breadcrumb" className="text-[12px] text-[var(--faint)]">
        <Link href="/docs" className="hover:text-[var(--ink)]">
          Docs
        </Link>
        <span className="px-2">/</span>
        <Link href={`/docs/${section.slug}`} className="hover:text-[var(--ink)]">
          {section.title}
        </Link>
        <span className="px-2">/</span>
        <span className="text-[var(--body)]">{article.link.label}</span>
      </nav>

      <h1 className="display mt-5 text-[34px] text-[var(--ink)] md:text-[40px]">
        {article.link.label}
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--body)]">
        {article.group.heading} · {section.title}
      </p>

      <div className="mt-12 rounded-lg border border-dashed border-[var(--line-strong)] px-8 py-14 text-center">
        <p className="eyebrow">Ships with the product</p>
        <p className="mx-auto mt-5 max-w-[420px] text-[14px] leading-relaxed text-[var(--body)]">
          API and console reference land with Company Brain access. If you need
          this detail for a review now, ask us and we will walk through it
          under NDA.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13.5px]">
          <Link href="/contact" className="link-underline text-[var(--ink)]">
            Talk to us
          </Link>
          <Link href="/console" className="text-[var(--body)] hover:text-[var(--ink)]">
            Console access
          </Link>
          <a
            href={`mailto:${SITE.email}`}
            className="text-[var(--body)] hover:text-[var(--ink)]"
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
              <span className="block text-[11px] text-[var(--faint)]">Previous</span>
              <span className="mt-1 block text-[14px] text-[var(--ink)]">{prev.label}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/docs/${section.slug}/${next.slug}`}
              className="rounded-lg border border-[var(--line)] p-4 text-right transition-colors hover:border-[var(--line-strong)] hover:bg-white/[0.02]"
            >
              <span className="block text-[11px] text-[var(--faint)]">Next</span>
              <span className="mt-1 block text-[14px] text-[var(--ink)]">{next.label}</span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
