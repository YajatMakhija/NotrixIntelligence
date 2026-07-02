"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, SectionTheme } from "@/components/giga/SectionTheme";

export function CustomerSpotlight() {
  return (
    <SectionTheme theme="dark">
      <FadeIn>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/50">
          Customer spotlight
        </p>
      </FadeIn>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
        <FadeIn delay={0.1}>
          <p className="font-serif text-5xl md:text-6xl">70%</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-[#f5f5f0]/50">
            reduction in manual workflow steps
          </p>
          <h3 className="mt-8 font-serif text-2xl md:text-3xl">
            How a Fortune 500 manufacturer unified ops with Notrix
          </h3>
          <Link
            href="/use-cases"
            className="mt-6 inline-flex items-center gap-2 text-sm text-[#f5f5f0]/70 transition-colors hover:text-[#f5f5f0]"
          >
            Learn more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>

        <FadeIn delay={0.2}>
          <blockquote className="border-l border-white/20 pl-6">
            <p className="text-lg leading-relaxed text-[#f5f5f0]/80 md:text-xl">
              &ldquo;Notrix gave us one intelligence layer across SAP, SharePoint,
              and our support stack. What used to take three teams and six months
              now runs as a single agentic workflow — deployed in weeks.&rdquo;
            </p>
            <footer className="mt-6">
              <p className="font-medium text-[#f5f5f0]">Sarah Chen</p>
              <p className="text-sm text-[#f5f5f0]/50">
                VP of Digital Operations, Global Manufacturing Co.
              </p>
            </footer>
          </blockquote>
        </FadeIn>
      </div>
    </SectionTheme>
  );
}
