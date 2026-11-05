import { NextResponse } from "next/server";
import { COMING_SOON } from "@/lib/site-status";

const ALWAYS_ALLOWED_PREFIXES = ["/admin", "/api", "/coming-soon", "/_next"];
const ALWAYS_ALLOWED_EXACT = ["/favicon.ico", "/icon-512.png"];

export function middleware(request) {
  if (!COMING_SOON) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (
    ALWAYS_ALLOWED_PREFIXES.some((p) => pathname.startsWith(p)) ||
    ALWAYS_ALLOWED_EXACT.includes(pathname) ||
    pathname.startsWith("/images/")
  ) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/coming-soon", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
