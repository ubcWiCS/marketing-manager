import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth");
  const roleCookie = request.cookies.get("role");
  const role = roleCookie?.value; // "marketing" | "events" | undefined

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/login";

  // Routes only for marketing team
  const isMarketingRoute =
    pathname === "/" || pathname.startsWith("/requests");

  // Events submission portal
  const isEventsRoute = pathname === "/submit";

  const isAuthenticated = authCookie?.value === "authenticated";

  // Not logged in at all → send to login (for protected routes)
  if (!isAuthenticated && !isLoginPage) {
    if (isMarketingRoute || isEventsRoute) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Already logged in visiting login page → redirect home
  if (isAuthenticated && isLoginPage) {
    if (role === "events") {
      return NextResponse.redirect(new URL("/submit", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Events user trying to access Marketing routes → send to /submit
  if (isAuthenticated && role === "events" && isMarketingRoute) {
    return NextResponse.redirect(new URL("/submit", request.url));
  }

  // Marketing user trying to access Events route → send to /
  if (isAuthenticated && role === "marketing" && isEventsRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};