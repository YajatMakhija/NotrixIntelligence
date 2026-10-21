"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { clip, isEmail, LIMITS } from "@/lib/forms";
import { hitRateLimit, requestKey } from "@/lib/rate-limit";
import {
  SESSION_COOKIE,
  SESSION_VALUE,
  WORKSPACE_COOKIE,
  DEFAULT_WORKSPACE,
  sessionCookieOptions,
  workspaceCookieValue,
} from "@/lib/session";

export type LoginState = {
  code: "rate_limit" | "invalid";
  message: string;
} | null;

/**
 * Opens an illustrative console session on this marketing site.
 * Production Company Brain access still requires a security review and SSO.
 * The password is checked for presence only, then discarded — never stored.
 */
export async function signIn(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const key = await requestKey("login");
  const { limited } = hitRateLimit(key, 8, 15 * 60 * 1000);
  if (limited) {
    return {
      code: "rate_limit",
      message: "Too many attempts. Try again later, or request a demo.",
    };
  }

  const email = clip(formData.get("email"), LIMITS.email);
  const secret = formData.get("password");
  const hasSecret =
    typeof secret === "string" &&
    secret.length > 0 &&
    secret.length <= LIMITS.password;

  if (!isEmail(email) || !hasSecret) {
    return {
      code: "invalid",
      message: "Enter a work email and password.",
    };
  }

  const jar = await cookies();
  jar.set(SESSION_COOKIE, SESSION_VALUE, sessionCookieOptions());
  if (!jar.get(WORKSPACE_COOKIE)) {
    jar.set(
      WORKSPACE_COOKIE,
      workspaceCookieValue(DEFAULT_WORKSPACE),
      sessionCookieOptions(),
    );
  }

  redirect("/console");
}

export async function signOut() {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, "", sessionCookieOptions(0));
  jar.set(WORKSPACE_COOKIE, "", sessionCookieOptions(0));
  redirect("/");
}
