import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Proxy leaves API routes to route-level authorization", async () => {
  const proxy = await readFile("src/proxy.ts", "utf8");
  assert.match(proxy, /\(\?!api\|_next\/static/);
});

test("marketing site cannot forward questions with a demo cookie or bearer token", async () => {
  const route = await readFile(
    "src/app/api/company-brain/ask/route.ts",
    "utf8",
  );
  assert.match(route, /DEMO_DISABLED/);
  assert.doesNotMatch(route, /COMPANY_BRAIN_DEMO_TOKEN|authorization:/);
});

test("marketing login and signup hand off to the authenticated application", async () => {
  const login = await readFile("src/app/login/page.tsx", "utf8");
  const signup = await readFile("src/app/signup/page.tsx", "utf8");
  const proxy = await readFile("src/proxy.ts", "utf8");
  assert.match(login, /redirect\(notrixAppUrl\("\/login"\)\)/);
  assert.match(signup, /redirect\(notrixAppUrl\("\/signup"\)\)/);
  assert.match(proxy, /NextResponse\.redirect\(notrixAppUrl\("\/login"\)\)/);
  assert.doesNotMatch(proxy, /isSessionValue|SESSION_COOKIE/);
});
