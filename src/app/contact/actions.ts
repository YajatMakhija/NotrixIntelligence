"use server";

import { clip, isEmail, LIMITS, oneLine } from "@/lib/forms";
import { hitRateLimit, requestKey } from "@/lib/rate-limit";
import { SITE } from "@/lib/site";

export type ContactState = {
  code: "ok" | "rate_limit" | "invalid";
  message: string;
  mailHref?: string;
} | null;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const key = await requestKey("contact");
  const { limited } = hitRateLimit(key, 8, 15 * 60 * 1000);
  if (limited) {
    return {
      code: "rate_limit",
      message: "Too many attempts. Email us directly, or try again later.",
    };
  }

  // Honeypot — bots that fill hidden fields are dropped without a special error.
  const trap = String(formData.get("company_url") ?? "").trim();
  if (trap) {
    return {
      code: "ok",
      message: `Write to ${SITE.email} with the same details. This site does not operate a public mailer.`,
    };
  }

  const name = clip(formData.get("name"), LIMITS.name);
  const company = clip(formData.get("company"), LIMITS.company);
  const email = clip(formData.get("email"), LIMITS.email);
  const message = clip(formData.get("message"), LIMITS.message);

  if (!name || !company || !isEmail(email)) {
    return {
      code: "invalid",
      message:
        "Check name, company, and a valid work email.",
    };
  }

  const subject = oneLine(`Enquiry from ${company}`);
  const body = [
    `Name: ${oneLine(name)}`,
    `Company: ${oneLine(company)}`,
    `Email: ${oneLine(email)}`,
    "",
    message || "No additional details provided.",
  ].join("\n");

  const mailHref = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return {
    code: "ok",
    message: `This site does not send mail from the server. Open a message to ${SITE.email} with the details you entered — the address is ours, not a redirect.`,
    mailHref,
  };
}
