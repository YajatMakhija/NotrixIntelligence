import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="section-dark border-t border-white/10 px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-serif text-xl text-[#f5f5f0]">{SITE.name}</p>
          <p className="mt-2 max-w-sm text-sm text-[#f5f5f0]/60">
            Enterprise AI ecosystem — knowledge layer, agents, search, and workflows.
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#f5f5f0]/40">
              Product
            </p>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#f5f5f0]/70 transition-colors hover:text-[#f5f5f0]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/demo"
                  className="text-sm text-[#f5f5f0]/70 transition-colors hover:text-[#f5f5f0]"
                >
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[#f5f5f0]/40">
              Contact
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 block text-sm text-[#f5f5f0]/70 transition-colors hover:text-[#f5f5f0]"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-8">
        <p className="text-xs text-[#f5f5f0]/40">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
