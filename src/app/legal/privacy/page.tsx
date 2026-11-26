import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Privacy policy",
  "How Notrix handles personal data on this marketing site, and how product data is treated.",
);

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy"
        intro="This page covers the marketing site. Product data handling for Company Brain is described on Security and in the DPA issued under NDA."
      />
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <div className="max-w-[560px] space-y-6 text-[15px] leading-relaxed text-[var(--body)]">
            <p>
              The contact form collects name, company, work email, and the
              message you type. Those fields are validated on the server. This
              site does not operate an automated mailer or analytics product
              that would send that information to a third-party tracker.
            </p>
            <p>
              We do not use the contents of that form to train models. We do
              ask for a password only in the account flow. The current site
              validates it and discards it after opening an illustrative console
              session; it does not store production credentials.
            </p>
            <p>
              For Company Brain itself — customer data in connected systems —
              see{" "}
              <Link href="/security" className="link-underline text-[var(--ink)]">
                Security
              </Link>
              . Inputs are not used to train models. A data processing agreement
              is available under NDA.
            </p>
            <p>
              Questions:{" "}
              <a href={`mailto:${SITE.email}`} className="link-underline text-[var(--ink)]">
                {SITE.email}
              </a>
              .
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/security">View security</Button>
            <Button href="/contact" variant="outline">
              Contact
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
