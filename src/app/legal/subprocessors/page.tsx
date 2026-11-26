import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Subprocessors",
  "Processors used to operate Company Brain are disclosed under NDA during security review.",
);

export default function SubprocessorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust"
        title="Subprocessors"
        intro="We do not publish a guessed list on a marketing page. The processors for a given deployment are disclosed under NDA in the security review and attached to the DPA."
      />
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <div className="max-w-[560px] space-y-6 text-[15px] leading-relaxed text-[var(--body)]">
            <p>
              Managed deployments and VPC deployments do not share the same
              footprint. Publishing a single public list would either over-claim
              or omit what your review actually needs.
            </p>
            <p>
              Request the current list with your questionnaire:{" "}
              <a href={`mailto:${SITE.email}`} className="link-underline text-[var(--ink)]">
                {SITE.email}
              </a>
              .
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/legal/dpa">DPA</Button>
            <Button href="/contact" variant="outline">
              Contact
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
