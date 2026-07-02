"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%", amount: 0.2 }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SectionThemeProps {
  theme: "dark" | "light";
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionTheme({ theme, children, className, id }: SectionThemeProps) {
  return (
    <section
      id={id}
      className={cn(
        theme === "dark" ? "section-dark" : "section-light",
        "px-6 py-24 md:py-32",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="section-dark px-6 pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#f5f5f0]/50">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-[#f5f5f0]/65">{description}</p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
