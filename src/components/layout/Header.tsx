"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#product-demo", label: "Product" },
  { href: "/#integrations", label: "Integrations" },
  { href: "/#security", label: "Security" },
  { href: "/docs", label: "Resources" },
];

export function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const [scrolled, setScrolled] = useState(false);
  const open = menu.open && menu.path === pathname;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b text-[var(--ink)] transition-[background-color,border-color] duration-200", scrolled || open ? "border-[var(--paper-line)] bg-white/95 backdrop-blur-md" : "border-transparent bg-white")}>
      <div className="relative mx-auto flex h-20 max-w-[1240px] items-center px-6 md:px-8 lg:px-14">
        <Link
          href="/"
          className="site-logo flex shrink-0 items-center gap-2.5"
          aria-label={SITE.name}
        >
          <span className="relative h-10 w-10 shrink-0 overflow-hidden" aria-hidden="true">
            <Image
              src="/notrix-logo-final.png"
              alt=""
              width={72}
              height={72}
              className="absolute -left-4 -top-[9px] h-[72px] w-[72px] max-w-none"
              priority
            />
          </span>
          <span className="block leading-none" aria-hidden="true">
            <span className="block text-[12px] font-semibold tracking-[0.28em]">NOTRIX</span>
            <span className="mt-1.5 block text-[7px] font-medium tracking-[0.34em] text-[var(--body)]">
              INTELLIGENCE
            </span>
          </span>
        </Link>

        <nav className="ml-12 hidden items-center gap-8 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} pathname={pathname}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden items-center justify-end gap-5 lg:flex">
          <Link
            href="/login"
            className="text-[14px] font-medium text-[var(--ink)] transition-colors duration-200 hover:text-[var(--body)]"
          >
            Login
          </Link>
          <Link
            href="/contact"
            className="press rounded-full bg-[var(--ink)] px-5 py-2.5 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#292925]"
          >
            Request a demo
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenu({ open: !open, path: pathname })}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="site-menu ml-auto lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="flex h-8 w-8 flex-col items-end justify-center gap-[5px]">
            <span
              className={cn(
                "block h-px w-5 bg-current transition-transform duration-[120ms]",
                open && "translate-y-[3px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-5 bg-current transition-transform duration-[120ms]",
                open && "-translate-y-[3px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <div
        inert={!open}
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-[260ms] ease-[var(--ease-out)] lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden border-t border-[var(--paper-line)] bg-[var(--paper)]">
          <div className="flex flex-col gap-2 px-6 py-5">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="min-h-11 py-2 text-[16px] text-[var(--ink)]"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="text-[16px] text-[var(--ink)]">
              Login
            </Link>
            <Link
              href="/contact"
              className="press mt-1 inline-flex w-fit rounded-full bg-[var(--blue)] px-5 py-2.5 text-[14px] font-medium text-white"
            >
              Request a demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
}) {
  const active = !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));
  return (
    <Link
      href={href}
      className={cn(
        "text-[14px] font-medium transition-colors duration-200",
        active ? "text-[var(--ink)]" : "text-[var(--ink)] hover:text-[var(--body)]",
      )}
    >
      {children}
    </Link>
  );
}
