"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/product", label: "Product" },
  { href: "/solutions", label: "Solutions" },
  { href: "/security", label: "Security" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastPath = useRef(pathname);
  if (lastPath.current !== pathname) {
    lastPath.current = pathname;
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-black/90 backdrop-blur-md transition-colors duration-300",
        scrolled || open ? "border-[var(--line)]" : "border-[var(--line)]/70",
      )}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-2.5" aria-label={SITE.name}>
          <Image
            src="/notrix-monogram.png"
            alt=""
            width={64}
            height={64}
            priority
            className="h-6 w-6 object-contain"
          />
          <span className="text-[15px] font-medium tracking-tight text-white">
            {SITE.short}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} pathname={pathname}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="rounded-md bg-white px-4 py-2 text-[13px] font-medium tracking-tight text-black transition-colors duration-200 hover:bg-[#e8e8e8]"
          >
            Request access
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-8 w-8 flex-col items-end justify-center gap-[5px] lg:hidden"
        >
          <span
            className={cn(
              "block h-px w-5 bg-white transition-transform duration-300",
              open && "translate-y-[3px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block h-px w-5 bg-white transition-transform duration-300",
              open && "-translate-y-[3px] -rotate-45",
            )}
          />
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden transition-all duration-300 lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden border-t border-[var(--line)] bg-black">
          <div className="flex flex-col gap-5 px-6 py-7">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-[15px] text-white">
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-1 inline-flex w-fit rounded-md bg-white px-4 py-2 text-[13px] font-medium text-black"
            >
              Request access
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
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 text-[13px] tracking-tight transition-colors duration-200",
        active ? "text-white" : "text-[var(--fg-muted)] hover:text-white",
      )}
    >
      {children}
    </Link>
  );
}
