import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DOCS_SECTIONS, getSection } from "@/lib/docs-nav";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return DOCS_SECTIONS.map((section) => ({ section: section.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section: slug } = await params;
  const section = getSection(slug);
  if (!section) return pageMetadata("Docs", "Documentation for Company Brain.");
  return pageMetadata(`${section.title} — Docs`, section.description);
}

export default async function DocsSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section: slug } = await params;
  const section = getSection(slug);
  if (!section) notFound();

  return (
    <div className="mx-auto max-w-[760px]">
      <p className="text-[13px] font-medium text-[var(--faint)]">Docs</p>
      <h1 className="display mt-4 text-[36px] text-[var(--ink)] md:text-[42px]">
        {section.title}
      </h1>
      <p className="mt-5 max-w-[540px] text-[15px] leading-relaxed text-[var(--body)]">
        {section.description}
      </p>

      <div className="mt-12 space-y-10">
        {section.groups.map((group) => (
          <div key={group.heading}>
            <p className="eyebrow">{group.heading}</p>
            <ul className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {group.links.map((link) => (
                <li key={link.slug}>
                  <Link
                    href={`/docs/${section.slug}/${link.slug}`}
                    className="flex items-center justify-between gap-6 py-3.5 text-[14px] text-[var(--body)] transition-colors duration-[120ms] hover:text-[var(--ink)]"
                  >
                    {link.label}
                    <span aria-hidden className="text-[var(--faint)]">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
