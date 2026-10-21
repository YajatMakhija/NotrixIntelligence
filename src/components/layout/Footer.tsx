import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

const columns = [
  { heading: "Product", links: [["/product/company-brain", "Company Brain"], ["/product/how-it-works", "How it works"], ["/product/integrations", "Integrations"]] },
  { heading: "Resources", links: [["/docs", "Documentation"], ["/security", "Security"], ["/contact", "Request a demo"]] },
  { heading: "Company", links: [["/company/about", "About"], ["/company/careers", "Careers"], ["/login", "Sign in"]] },
  { heading: "Legal", links: [["/legal/privacy", "Privacy"], ["/legal/terms", "Terms"], ["/legal/cookies", "Cookies"]] },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[var(--paper-line)] bg-white text-[var(--ink)]">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-6 py-16 md:grid-cols-[1.35fr_2fr] md:px-8 lg:px-14">
        <div>
          <Link href="/" className="flex w-fit items-center gap-2.5" aria-label={SITE.name}>
            <span className="relative h-10 w-10 overflow-hidden" aria-hidden="true"><Image src="/notrix-logo-final.png" alt="" width={72} height={72} className="absolute -left-4 -top-[9px] h-[72px] w-[72px] max-w-none" /></span>
            <span className="leading-none"><span className="block text-[12px] font-semibold tracking-[0.28em]">NOTRIX</span><span className="mt-1.5 block text-[7px] font-medium tracking-[0.34em] text-[var(--body)]">INTELLIGENCE</span></span>
          </Link>
          <p className="mt-5 max-w-[330px] text-[14px] leading-relaxed text-[var(--body)]">A shared company brain that connects workplace knowledge and returns answers with sources.</p>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-[13px] font-medium underline decoration-[var(--paper-line)] underline-offset-4">LinkedIn</a>
        </div>
        <div className="grid grid-cols-2 gap-9 sm:grid-cols-4">
          {columns.map((column) => <div key={column.heading}><p className="text-[13px] font-semibold">{column.heading}</p><ul className="mt-4 space-y-2.5">{column.links.map(([href, label]) => <li key={href}><Link href={href} className="text-[13px] text-[var(--body)] transition-colors hover:text-[var(--ink)]">{label}</Link></li>)}</ul></div>)}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1240px] flex-col gap-2 border-t border-[var(--paper-line)] px-6 py-6 text-[11px] text-[var(--body)] sm:flex-row sm:items-center sm:justify-between md:px-8 lg:px-14"><span>© {new Date().getFullYear()} {SITE.legal}</span><span>Built for verifiable company knowledge.</span></div>
    </footer>
  );
}
