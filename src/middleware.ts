import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth");
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isProtectedRoute = request.nextUrl.pathname === "/" ||
                          request.nextUrl.pathname.startsWith("/requests");

  if (authCookie?.value === "authenticated" || isLoginPage) {
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};