"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DOCS_SECTIONS } from "@/lib/docs-nav";
import { cn } from "@/lib/utils";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="pt-[65px]">
      <div className="mx-auto flex max-w-[1280px]">
        {/* Desktop sidebar — Supermemory / Mintlify style */}
        <aside className="sticky top-[65px] hidden h-[calc(100svh-65px)] w-[260px] shrink-0 overflow-y-auto border-r border-[var(--line)] px-5 py-8 lg:block">
          <DocsNav pathname={pathname} />
        </aside>

        <div className="min-w-0 flex-1">
          {/* Mobile nav toggle */}
          <div className="sticky top-[65px] z-20 border-b border-[var(--line)] bg-black/90 px-6 py-3 backdrop-blur-md lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="text-[13px] text-[var(--fg-muted)]"
            >
              {mobileOpen ? "Close menu" : "Browse docs"}
            </button>
            {mobileOpen && (
              <div className="mt-4 max-h-[60svh] overflow-y-auto pb-4">
                <DocsNav pathname={pathname} onNavigate={() => setMobileOpen(false)} />
              </div>
            )}
          </div>

          <div className="px-6 py-12 md:px-10 md:py-16 lg:px-14">{children}</div>
        </div>
      </div>
    </div>
  );
}

function DocsNav({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Documentation" className="space-y-8">
      <div>
        <Link
          href="/docs"
          onClick={onNavigate}
          className={cn(
            "block rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors",
            pathname === "/docs"
              ? "bg-white/[0.06] text-white"
              : "text-[var(--fg-muted)] hover:bg-white/[0.03] hover:text-white",
          )}
        >
          Introduction
        </Link>
      </div>

      {DOCS_SECTIONS.map((section) => (
        <div key={section.slug}>
          <p className="px-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--fg-faint)]">
            {section.label}
          </p>
          <ul className="mt-2 space-y-0.5">
            <li>
              <Link
                href={`/docs/${section.slug}`}
                onClick={onNavigate}
                className={cn(
                  "block rounded-md px-2.5 py-1.5 text-[13px] transition-colors",
                  pathname === `/docs/${section.slug}`
                    ? "bg-white/[0.06] text-white"
                    : "text-[var(--fg-muted)] hover:bg-white/[0.03] hover:text-white",
                )}
              >
                Overview
              </Link>
            </li>
            {section.groups.flatMap((group) =>
              group.links.map((link) => {
                const href = `/docs/${section.slug}/${link.slug}`;
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      className={cn(
                        "block rounded-md px-2.5 py-1.5 text-[13px] transition-colors",
                        active
                          ? "bg-white/[0.06] text-white"
                          : "text-[var(--fg-muted)] hover:bg-white/[0.03] hover:text-white",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              }),
            )}
          </ul>
        </div>
      ))}
    </nav>
  );
}
