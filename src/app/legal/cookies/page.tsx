import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Cookie policy",
  "How the Notrix marketing site uses cookies. No advertising or analytics cookies.",
);

export default function CookiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Cookies"
        intro="This marketing site does not run advertising or analytics cookies, and does not identify visitors for marketing."
      />
      <section className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1180px] px-6 py-20 md:px-10 md:py-24">
          <div className="max-w-[560px] space-y-6 text-[15px] leading-relaxed text-[var(--body)]">
            <p>
              Forms post to same-origin server actions. The framework may set
              strictly functional cookies required to submit those forms safely.
              We do not load third-party analytics, tag managers, or advertising
              pixels on this site.
            </p>
            <p>
              Signing in or creating a workspace sets functional session and
              workspace cookies (`notrix_console_session` and `notrix_workspace`)
              so this site can keep the company name and console session until
              sign out. They are not used for advertising or analytics.
            </p>
            <p>
              Questions:{" "}
              <a href={`mailto:${SITE.email}`} className="link-underline text-[var(--ink)]">
                {SITE.email}
              </a>
            </p>
          </div>
          <div className="mt-10">
            <Button href="/legal/privacy">Privacy</Button>
          </div>
        </div>
      </section>
    </>
  );
}
