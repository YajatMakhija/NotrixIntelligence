import type { Metadata } from "next";
import Link from "next/link";
import { DOCS_SECTIONS } from "@/lib/docs-nav";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Docs",
  "Documentation for Company Brain — concepts, integrations, security and API.",
);

const START_CARDS = [
  {
    title: "Introduction",
    description: "What Company Brain is, and how it fits in an organization.",
    href: "/docs/getting-started/introduction",
  },
  {
    title: "Quickstart",
    description: "Connect a source and ask a question against company context.",
    href: "/docs/getting-started/quickstart",
  },
  {
    title: "How it works",
    description: "Connect, ingest, understand, retrieve, reason, and act.",
    href: "/docs/concepts/how-it-works",
  },
];

export default function DocsHomePage() {
  return (
    <div className="mx-auto max-w-[760px]">
      <p className="text-[13px] font-medium text-[var(--faint)]">Documentation</p>
      <h1 className="display mt-4 text-[40px] text-[var(--ink)] md:text-[48px]">
        Company Brain
      </h1>
      <p className="mt-5 max-w-[540px] text-[16px] leading-relaxed text-[var(--body)]">
        The intelligence layer for your company. Concepts, connectors and
        security are outlined here. API and console reference ship with product
        access — the sidebar already shows where those pages will live.
      </p>

      <div className="mt-12 grid gap-3 sm:grid-cols-3">
        {START_CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-lg border border-[var(--line)] bg-[var(--elevated)] p-5 transition-colors duration-[120ms] hover:border-[var(--line-strong)]"
          >
            <h2 className="text-[15px] font-medium tracking-tight text-[var(--ink)]">
              {card.title}
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--body)]">
              {card.description}
            </p>
            <span className="mt-4 inline-block text-[12px] text-[var(--faint)] transition-colors group-hover:text-[var(--ink)]">
              Open →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-16 space-y-10">
        {DOCS_SECTIONS.map((section) => (
          <div key={section.slug}>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-[17px] font-medium text-[var(--ink)]">{section.title}</h2>
              <Link
                href={`/docs/${section.slug}`}
                className="text-[12px] text-[var(--faint)] hover:text-[var(--ink)]"
              >
                View all
              </Link>
            </div>
            <p className="mt-2 max-w-[520px] text-[14px] leading-relaxed text-[var(--body)]">
              {section.description}
            </p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {section.groups
                .flatMap((g) => g.links)
                .slice(0, 4)
                .map((link) => (
                  <li key={link.slug}>
                    <Link
                      href={`/docs/${section.slug}/${link.slug}`}
                      className="block rounded-md border border-transparent px-3 py-2 text-[13.5px] text-[var(--body)] transition-colors duration-[120ms] hover:border-[var(--line)] hover:text-[var(--ink)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-lg border border-dashed border-[var(--line-strong)] px-5 py-4">
        <p className="text-[13.5px] leading-relaxed text-[var(--body)]">
          <span className="text-[var(--ink)]">Console access is granted after review.</span>{" "}
          Sign-in lives at{" "}
          <Link href="/login" className="link-underline text-[var(--ink)]">
            /login
          </Link>
          . Operator docs are not a public app on this site.
        </p>
      </div>
    </div>
  );
}
