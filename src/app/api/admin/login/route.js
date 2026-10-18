import { NextResponse } from "next/server";
import { checkPassword, createSessionToken, isConfigured, SESSION_COOKIE } from "@/lib/admin-auth";

export async function POST(req) {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: "Admin login isn't configured yet. Set ADMIN_PASSWORD in environment variables and redeploy." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!checkPassword(body.password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = createSessionToken();
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
