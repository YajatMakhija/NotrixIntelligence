"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/contact/actions";
import { SubmitButton } from "@/components/ui/Button";
import { LIMITS } from "@/lib/forms";
import { SITE } from "@/lib/site";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, null as ContactState);

  return (
    <form action={action} className="max-w-[520px]">
      <div className="space-y-8">
        <div>
          <label htmlFor="name" className="eyebrow">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            className="field mt-3"
          />
        </div>
        <div>
          <label htmlFor="company" className="eyebrow">
            Company
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            required
            maxLength={LIMITS.company}
            className="field mt-3"
          />
        </div>
        <div>
          <label htmlFor="email" className="eyebrow">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email}
            className="field mt-3"
          />
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company_url">Company website</label>
          <input
            id="company_url"
            name="company_url"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="message" className="eyebrow">
            What would you like help with? (optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={LIMITS.message}
            className="field mt-3 resize-none"
          />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <SubmitButton disabled={pending}>
          {pending ? "Checking…" : "Send enquiry"}
        </SubmitButton>
        {state && (
          <p className="max-w-[360px] text-[13.5px] leading-relaxed text-[var(--body)]" role="status">
            {state.message}{" "}
            {state.mailHref && (
              <a href={state.mailHref} className="link-underline text-[var(--ink)]">
                Open email
              </a>
            )}
            {state.code === "rate_limit" && (
              <>
                {" "}
                <a href={`mailto:${SITE.email}`} className="link-underline text-[var(--ink)]">
                  {SITE.email}
                </a>
              </>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
