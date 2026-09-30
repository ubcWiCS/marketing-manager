import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("auth")?.value === "authenticated";

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/login";

  // Admin-only routes (dashboard and ticket management)
  const isAdminRoute = pathname === "/" || pathname.startsWith("/requests");

  // /submit and /submissions are public: anyone can view the board and submit a request

  if (!isAuthenticated && isAdminRoute) {
    // Visitors landing on the home page see the public ticket board
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/submissions", request.url));
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Already logged in visiting login page → admin dashboard
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
