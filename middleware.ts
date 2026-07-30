import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const publicPaths = [
  "/",
  "/about",
  "/faq",
  "/pricing",
  "/contact",
  "/login",
  "/register",
  "/auth/callback",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/api/seed",
];

const appPaths = [
  "/dashboard",
  "/course",
  "/bookmarks",
  "/settings",
];

const adminPaths = ["/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  // Allow static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next();
  }

  const { supabaseResponse, user } = await updateSession(request);

  // Require authentication for app and admin paths
  if (!user) {
    const isAppPath = appPaths.some((p) => pathname.startsWith(p));
    const isAdminPath = adminPaths.some((p) => pathname.startsWith(p));

    if (isAppPath || isAdminPath) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Admin access check
  if (pathname.startsWith("/admin") && user?.user_metadata?.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
