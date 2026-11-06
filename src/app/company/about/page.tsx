import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "About",
  "Notrix builds Company Brain — the intelligence layer for modern organizations.",
);

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Company"
        title="About Notrix"
        intro="Notrix builds Company Brain for organizations where context is the difference between a useful answer and a dangerous one."
      />
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <div className="max-w-[560px] space-y-6 text-[15px] leading-relaxed text-[var(--body)]">
            <p>
              Most enterprise software asks teams to work in a new place.
              Company Brain is meant to sit next to the systems of record you
              already run — CRM, ticketing, documents, code — and answer from
              them with the permissions of the person asking.
            </p>
            <p>
              Teams can create a workspace and define their company profile
              before entering the console. Connecting production systems still
              follows an access and security review, because those systems must
              preserve company permissions and governance boundaries.
            </p>
            <p>
              Write to{" "}
              <a href={`mailto:${SITE.email}`} className="link-underline text-[var(--ink)]">
                {SITE.email}
              </a>
              .
            </p>
          </div>
          <div className="mt-10">
            <Button href="/contact">Request a demo</Button>
          </div>
        </div>
      </section>
    </>
  );
}
