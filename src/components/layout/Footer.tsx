import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { href: "/product/company-brain", label: "Company Brain" },
      { href: "/product/integrations", label: "Integrations" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { href: "/solutions/engineering", label: "Engineering" },
      { href: "/solutions/sales", label: "Sales" },
      { href: "/solutions/support", label: "Support" },
      { href: "/solutions/operations", label: "Operations" },
    ],
  },
  {
    heading: "Trust",
    links: [
      { href: "/security", label: "Security" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/dpa", label: "DPA" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { href: "/docs", label: "Docs" },
      { href: "/docs/api/overview", label: "API" },
      { href: "/docs/getting-started/introduction", label: "Changelog" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/company/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/company/careers", label: "Careers" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/privacy", label: "Privacy policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto max-w-[1180px] px-6 py-14 md:px-10 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/notrix-monogram.png"
                alt=""
                width={48}
                height={48}
                className="h-5 w-5 object-contain opacity-90"
              />
              <p className="text-[13px] font-medium tracking-[0.14em] text-white">
                {SITE.name.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3 xl:grid-cols-6">
            {COLUMNS.map((column) => (
              <div key={column.heading}>
                <p className="eyebrow">{column.heading}</p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={`${column.heading}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-[var(--fg-muted)] transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-14 text-xs text-[var(--fg-faint)]">
          © {new Date().getFullYear()} {SITE.legal}
        </p>
      </div>
    </footer>
  );
}
