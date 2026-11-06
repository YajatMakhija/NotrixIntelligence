import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ConsoleShell } from "@/components/cnosole/ConsoleShell";
import { parseWorkspaceCookie, WORKSPACE_COOKIE } from "@/lib/session";
export const metadata: Metadata = {
  title: "Company Brain Console | Notrix",
  robots: { index: false, follow: false },
};
export default async function ConsolePage() {
  const jar = await cookies();
  const workspace = parseWorkspaceCookie(jar.get(WORKSPACE_COOKIE)?.value);
  return <ConsoleShell workspace={workspace} />;
}
