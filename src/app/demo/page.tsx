import type { Metadata } from "next";
import { ContactForm } from "@/components/demo/ContactForm";
import { FadeIn, PageHero, SectionTheme } from "@/components/giga/SectionTheme";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Demo",
  "Book a demo with Notrix Intelligence. Let's build your enterprise AI ecosystem.",
);

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Get a personalized demo"
        title="Let's build your AI ecosystem."
        description="Notrix ingests your company data, builds a knowledge layer, and deploys agents, search, and workflows — live in weeks. Tell us what you'd automate and we'll show you how."
      />

      <SectionTheme theme="dark">
        <FadeIn>
          <div className="mx-auto max-w-xl">
            <ContactForm />
          </div>
        </FadeIn>
      </SectionTheme>
    </>
  );
}
