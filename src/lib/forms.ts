const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LIMITS = {
  name: 120,
  company: 160,
  email: 254,
  message: 4000,
  password: 256,
} as const;

export function clip(value: unknown, max: number): string {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, max);
}

export function isEmail(value: string): boolean {
  return value.length > 3 && value.length <= LIMITS.email && EMAIL_RE.test(value);
}

/** Strip CR/LF so values cannot inject extra headers into a mailto body. */
export function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}
