import { NextRequest, NextResponse } from "next/server";

const AUTH_USER = process.env.AUTH_USER || "admin";
const AUTH_PASS = process.env.AUTH_PASS || "password";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (username === AUTH_USER && password === AUTH_PASS) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return response;
  }

  return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
}