import { NextRequest, NextResponse } from "next/server";

const MARKETING_USER = process.env.AUTH_USER || "admin";
const MARKETING_PASS = process.env.AUTH_PASS || "password";

const EVENTS_USER = process.env.EVENTS_USER || "events";
const EVENTS_PASS = process.env.EVENTS_PASS || "events123";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  let role: "marketing" | "events" | null = null;

  if (username === MARKETING_USER && password === MARKETING_PASS) {
    role = "marketing";
  } else if (username === EVENTS_USER && password === EVENTS_PASS) {
    role = "events";
  }

  if (role) {
    const response = NextResponse.json({ success: true, role });
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    };
    response.cookies.set("auth", "authenticated", cookieOptions);
    response.cookies.set("role", role, cookieOptions);
    return response;
  }

  return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
}

// Handle GET requests to prevent 405 errors
export async function GET() {
  return NextResponse.redirect(new URL("/login", "http://localhost"));
}
