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
  "/checkout",
  "/auth/callback",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/set-password",
  "/api/seed",
  "/api/payments",
];

const appPaths = [
  "/dashboard",
  "/course",
  "/bookmarks",
  "/settings",
  "/support",
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

  // App paths require a purchase (or admin role)
  const isAppPath = appPaths.some((p) => pathname.startsWith(p));
  if (isAppPath && user) {
    const isAdmin = user.user_metadata?.role === "admin";
    const hasPurchase = user.user_metadata?.has_active_purchase === true;
    if (!isAdmin && !hasPurchase) {
      const pricingUrl = new URL("/pricing", request.url);
      pricingUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(pricingUrl);
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
