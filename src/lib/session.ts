/**
 * Illustrative marketing-site session for the console mock.
 * Not production SSO. Cookie proves the visitor signed into the demo only.
 */

export const SESSION_COOKIE = "notrix_console_session";
export const WORKSPACE_COOKIE = "notrix_workspace";

/** 8 hours — long enough for a demo walkthrough. */
export const SESSION_MAX_AGE = 60 * 60 * 8;

export const SESSION_VALUE = "illustrative";

export function sessionCookieOptions(maxAge = SESSION_MAX_AGE) {
  return {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}

export function isSessionValue(value: string | undefined | null) {
  return value === SESSION_VALUE;
}

export type WorkspaceProfile = {
  companyName: string;
  slug: string;
  companyType?: string;
  employees?: string;
  country?: string;
  role?: string;
  primaryGoal?: string;
};

export const DEFAULT_WORKSPACE: WorkspaceProfile = {
  companyName: "Acme Company",
  slug: "acme-company",
};

export function workspaceCookieValue(profile: WorkspaceProfile) {
  return encodeURIComponent(JSON.stringify(profile));
}

export function parseWorkspaceCookie(value: string | undefined): WorkspaceProfile {
  if (!value) return DEFAULT_WORKSPACE;
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Partial<WorkspaceProfile>;
    if (typeof parsed.companyName === "string" && typeof parsed.slug === "string") {
      return {
        companyName: parsed.companyName,
        slug: parsed.slug,
        companyType: parsed.companyType,
        employees: parsed.employees,
        country: parsed.country,
        role: parsed.role,
        primaryGoal: parsed.primaryGoal,
      };
    }
  } catch {
    // A malformed illustrative cookie falls back to the demo workspace.
  }
  return DEFAULT_WORKSPACE;
}
