import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";

const FOOTER_COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/platform", label: "Platform" },
      { href: "/platform#knowledge-layer", label: "Knowledge Layer" },
      { href: "/platform#agent-runtime", label: "Agent Runtime" },
      { href: "/platform#enterprise-search", label: "Enterprise Search" },
      { href: "/platform#workflow-engine", label: "Workflow Engine" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { href: "/use-cases", label: "Use Cases" },
      { href: "/case-studies", label: "Deployment Blueprints" },
      { href: "/demo", label: "Contact" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Us" },
      {
        href: "https://www.linkedin.com/company/notrix-intelligence",
        label: "LinkedIn",
        external: true,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--surface)] px-6 py-14">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/notrix-logo.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <p className="font-serif text-lg text-[var(--text-primary)]">{SITE.name}</p>
          </div>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-5 inline-block text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-primary)]"
          >
            {SITE.email}
          </a>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.heading}>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
              {column.heading}
            </p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-primary)]"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-primary)]"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 border-t border-[var(--border)] pt-8 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-[var(--text-secondary)]">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
