"use client";

import { useState } from "react";
import { SubmitButton } from "@/components/ui/Button";
import { SITE } from "@/lib/site";

const FIELD =
  "w-full border-b border-[var(--line)] bg-transparent py-3 text-[15px] text-white outline-none transition-colors placeholder:text-[var(--fg-faint)] focus:border-white";

/**
 * No backend exists, so this composes a mail draft rather than pretending to
 * submit. Better an obvious mailto than a form that silently drops enquiries.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company")}`,
      `Email: ${data.get("email")}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `Enquiry from ${data.get("company") || data.get("name")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="max-w-[520px]">
      <div className="space-y-8">
        <div>
          <label htmlFor="name" className="eyebrow">
            Name
          </label>
          <input id="name" name="name" required className={`${FIELD} mt-3`} />
        </div>
        <div>
          <label htmlFor="company" className="eyebrow">
            Company
          </label>
          <input id="company" name="company" required className={`${FIELD} mt-3`} />
        </div>
        <div>
          <label htmlFor="email" className="eyebrow">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={`${FIELD} mt-3`}
          />
        </div>
        <div>
          <label htmlFor="message" className="eyebrow">
            What are you trying to automate?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className={`${FIELD} mt-3 resize-none`}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-5">
        <SubmitButton>Send enquiry</SubmitButton>
        {sent && (
          <p className="text-[13.5px] text-[var(--fg-muted)]">
            Opening your mail client — if nothing happens, write to{" "}
            <a href={`mailto:${SITE.email}`} className="link-underline text-white">
              {SITE.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
