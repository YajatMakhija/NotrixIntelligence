import { NextResponse, type NextRequest } from "next/server";
import { notrixAppUrl } from "@/lib/notrix-app-url";

/**
 * The marketing preview is not a customer workspace. Do not accept its old demo
 * cookie as authentication or let visitors mistake /console for the real app.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isConsole = pathname === "/console" || pathname.startsWith("/console/");
  if (isConsole) {
    return NextResponse.redirect(notrixAppUrl("/login"));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Skip Next internals and static assets.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
