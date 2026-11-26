"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signIn, type LoginState } from "@/app/login/actions";
import { SubmitButton } from "@/components/ui/Button";
import { LIMITS } from "@/lib/forms";
import { SITE } from "@/lib/site";

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, null as LoginState);
  const [ssoNote, setSsoNote] = useState(false);

  return (
    <div>
      <form action={action} autoComplete="on" className="space-y-5">
        <label className="auth-field-wrap">
          <span>Company email</span>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="username"
            required
            maxLength={LIMITS.email}
            className="auth-field"
          />
        </label>
        <label className="auth-field-wrap">
          <span className="flex items-center justify-between">Password <a href={`mailto:${SITE.email}?subject=Notrix password reset`} className="font-normal text-[var(--body)] hover:text-[var(--ink)]">Forgot password?</a></span>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            maxLength={LIMITS.password}
            className="auth-field"
          />
        </label>

        <SubmitButton disabled={pending} className="auth-primary w-full">
          {pending ? "Signing in…" : "Open workspace preview"}
        </SubmitButton>
      </form>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => setSsoNote(true)}
          className="auth-secondary w-full"
        >
          Continue with SSO
        </button>
      </div>

      {ssoNote && (
        <p
          className="mt-4 text-[13.5px] leading-relaxed text-[var(--body)]"
          role="status"
        >
          SSO is configured by your company administrator. Contact your Notrix
          workspace owner to enable it.
        </p>
      )}

      {state && (
        <p
          className="mt-6 text-[13.5px] leading-relaxed text-[var(--body)]"
          role="status"
          aria-live="polite"
        >
          {state.message}
          {state.code === "rate_limit" && (
            <>
              {" "}
              <Link href="/contact" className="link-underline text-[var(--ink)]">
                Request a demo
              </Link>
            </>
          )}
        </p>
      )}
      <p className="mt-8 text-center text-[13px] text-[var(--body)]">New to Notrix? <Link href="/signup" className="font-medium text-[var(--ink)] underline">Create a company workspace</Link></p>
    </div>
  );
}
