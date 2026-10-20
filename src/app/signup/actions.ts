"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { clip, isEmail, LIMITS } from "@/lib/forms";
import { hitRateLimit, requestKey } from "@/lib/rate-limit";
import {
  SESSION_COOKIE,
  SESSION_VALUE,
  WORKSPACE_COOKIE,
  sessionCookieOptions,
  workspaceCookieValue,
} from "@/lib/session";

export type SignupState = { message: string } | null;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export async function createWorkspace(
  _previous: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const key = await requestKey("signup");
  const { limited } = hitRateLimit(key, 5, 15 * 60 * 1000);
  if (limited) return { message: "Too many attempts. Please try again later." };

  const fullName = clip(formData.get("fullName"), LIMITS.name);
  const email = clip(formData.get("email"), LIMITS.email);
  const password = String(formData.get("password") ?? "");
  const companyName = clip(formData.get("companyName"), LIMITS.company);
  const companyType = clip(formData.get("companyType"), 64);
  const employees = clip(formData.get("employees"), 32);
  const country = clip(formData.get("country"), 80);
  const role = clip(formData.get("role"), 80);
  const primaryGoal = clip(formData.get("primaryGoal"), 120);
  const accepted = formData.get("terms") === "on";
  const slug = slugify(companyName);

  if (!fullName || !isEmail(email) || password.length < 8 || password.length > LIMITS.password || !companyName || !slug || !companyType || !employees || !country || !role || !primaryGoal || !accepted) {
    return { message: "Complete every field and accept the terms to continue." };
  }

  const jar = await cookies();
  jar.set(SESSION_COOKIE, SESSION_VALUE, sessionCookieOptions());
  jar.set(WORKSPACE_COOKIE, workspaceCookieValue({ companyName, slug, companyType, employees, country, role, primaryGoal }), sessionCookieOptions());
  redirect("/console?welcome=1");
}
