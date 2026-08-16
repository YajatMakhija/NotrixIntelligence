import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Request access",
  "Request access to Company Brain. Tell us the workflow and the systems it touches.",
);

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Request access"
        title="Tell us the workflow. We'll tell you the number."
        intro="One call to understand what you are trying to automate and which systems it touches. You get a scoped proposal with a fixed fee."
      />

      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-24 md:px-10 md:py-32">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={100}>
              <div className="space-y-12 lg:sticky lg:top-28 lg:self-start">
                <div>
                  <p className="eyebrow">Direct</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="link-underline mt-3 inline-block text-[15px] text-white"
                  >
                    {SITE.email}
                  </a>
                </div>
                <div>
                  <p className="eyebrow">Security review</p>
                  <p className="mt-3 max-w-[320px] text-[14px] leading-relaxed text-[var(--fg-muted)]">
                    Send your vendor questionnaire with your first message and we
                    will complete it under NDA before the technical call.
                  </p>
                </div>
                <div>
                  <p className="eyebrow">Elsewhere</p>
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-3 inline-block text-[14px] text-[var(--fg-muted)] hover:text-white"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
