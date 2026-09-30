import { NextRequest, NextResponse } from "next/server";

const MARKETING_USER = process.env.AUTH_USER || "admin";
const MARKETING_PASS = process.env.AUTH_PASS || "password";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (username === MARKETING_USER && password === MARKETING_PASS) {
    const response = NextResponse.json({ success: true });
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    };
    response.cookies.set("auth", "authenticated", cookieOptions);
    return response;
  }

  return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
}

// Handle GET requests to prevent 405 errors
export async function GET() {
  return NextResponse.redirect(new URL("/login", "http://localhost"));
}
