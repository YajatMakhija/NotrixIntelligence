"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-[#0c0c0c]/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex flex-col items-center gap-1 text-[#f5f5f0]">
          <Image
            src="/notrix-logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className="h-10 w-10 object-contain"
          />
          <span className="font-serif text-lg tracking-tight">{SITE.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors",
                pathname === link.href
                  ? "text-[#f5f5f0]"
                  : "text-[#f5f5f0]/65 hover:text-[#f5f5f0]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button href="/demo" variant="dark" className="text-xs md:text-sm">
          Talk to us
        </Button>
      </div>
    </header>
  );
}
