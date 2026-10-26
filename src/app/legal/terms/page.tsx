import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Terms",
  "Terms of use for the Notrix marketing site. Product terms are agreed in the deployment contract.",
);

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms"
        intro="These terms cover use of notrix.ai as a marketing and documentation site. They are not the master services agreement for Company Brain."
      />
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <div className="max-w-[560px] space-y-6 text-[15px] leading-relaxed text-[var(--body)]">
            <p>
              You may browse this site and submit a demo request. You may not
              attempt to probe, scrape, or overload it, or to use the login form
              as if it were a public authentication service — it is not.
            </p>
            <p>
              Copy, marks and product descriptions on this site belong to Notrix
              Intelligence. Connector names and logos belong to their owners and
              are used to identify integrations, not to imply a partnership we
              have not stated.
            </p>
            <p>
              A deployment of Company Brain is governed by the contract, DPA and
              security review for that engagement — not by this page. Write to{" "}
              <a href={`mailto:${SITE.email}`} className="link-underline text-[var(--ink)]">
                {SITE.email}
              </a>{" "}
              for those documents.
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
