import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Data processing agreement",
  "Request the Notrix DPA for enterprise procurement. Issued under NDA during evaluation.",
);

export default function DpaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust"
        title="Data processing agreement"
        intro="The DPA is issued under NDA for enterprise evaluation. It is not a public download on this site."
      />
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <div className="max-w-[560px] space-y-6 text-[15px] leading-relaxed text-[var(--body)]">
            <p>
              If you are running a vendor review, send the DPA request or your
              paper with the first message. We complete questionnaires under NDA
              before a technical workshop so security is not an afterthought.
            </p>
            <p>
              Related:{" "}
              <Link href="/legal/subprocessors" className="link-underline text-[var(--ink)]">
                subprocessors
              </Link>{" "}
              (disclosed in the same review) and{" "}
              <Link href="/security" className="link-underline text-[var(--ink)]">
                security
              </Link>
              .
            </p>
            <p>
              <a href={`mailto:${SITE.email}`} className="link-underline text-[var(--ink)]">
                {SITE.email}
              </a>
            </p>
          </div>
          <div className="mt-10">
            <Button href="/contact">Request the DPA</Button>
          </div>
        </div>
      </section>
    </>
  );
}
