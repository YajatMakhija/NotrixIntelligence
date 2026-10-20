import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Careers",
  "Open roles at Notrix. We publish positions here as they open.",
);

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Company"
        title="Careers"
        intro="No open roles are listed on this site today. If the work described here is the kind of problem you want to work on, write to us."
      />
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <p className="max-w-[520px] text-[15px] leading-relaxed text-[var(--body)]">
            Send a note to{" "}
            <a href={`mailto:${SITE.email}`} className="link-underline text-[var(--ink)]">
              {SITE.email}
            </a>{" "}
            with what you have built and why Company Brain is the problem you
            want. We will only list roles here when they are actually open.
          </p>
          <div className="mt-10">
            <Button href="/contact">Get in touch</Button>
          </div>
        </div>
      </section>
    </>
  );
}
