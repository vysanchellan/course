"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth";
import type { AccessLevel } from "@/lib/access";

interface User {
  id?: string;
  email?: string;
  name?: string;
}

interface NavbarProps {
  variant?: "marketing" | "app";
  user?: User | null;
  accessLevel?: AccessLevel;
}

export function Navbar({ variant = "marketing", user, accessLevel }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const showSupport = accessLevel === "premium" || accessLevel === "admin";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full",
          variant === "app"
            ? "bg-dusk border-b border-panelborder"
            : "bg-dusk/80 backdrop-blur-lg border-b border-white/5"
        )}
      >
        <nav className="flex items-center justify-between px-6 md:px-10 h-14">
          <Link
            href={variant === "app" ? "/dashboard" : "/"}
            className="font-mono text-sm font-medium tracking-tight"
          >
            <span className="text-gold">~</span>
            <span className="text-parchment">
              /course
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {variant === "marketing" ? (
              <>
                <Link
                  href="/about"
                  className="font-mono text-[13px] text-[#7d7b74] hover:text-parchment transition-colors"
                >
                  ABOUT
                </Link>
                <Link
                  href="/faq"
                  className="font-mono text-[13px] text-[#7d7b74] hover:text-parchment transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="/pricing"
                  className="font-mono text-[13px] text-[#7d7b74] hover:text-parchment transition-colors"
                >
                  PRICING
                </Link>
                {user ? (
                  <Link
                    href="/dashboard"
                    className="font-mono text-[13px] text-[#7d7b74] hover:text-parchment transition-colors"
                  >
                    DASHBOARD
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="font-mono text-[13px] text-[#7d7b74] hover:text-parchment transition-colors"
                  >
                    LOGIN
                  </Link>
                )}
                <Link
                  href="/checkout?tier=standard"
                  className="bg-gold text-[#171310] font-mono font-bold text-[12px] px-4 py-2 rounded-sm"
                >
                  GET_ACCESS
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/course/final-project"
                  className={cn(
                    "font-mono text-xs transition-colors",
                    accessLevel === "admin"
                      ? "text-gold hover:text-goldsoft"
                      : "text-muteddark hover:text-parchment"
                  )}
                >
                  Final Project{accessLevel !== "admin" && " 🔒"}
                </Link>
                <Link
                  href="/troubleshooting"
                  className="font-mono text-xs text-muteddark hover:text-parchment transition-colors"
                >
                  Troubleshooting
                </Link>
                {showSupport && (
                  <Link
                    href="/support"
                    className="font-mono text-xs text-muteddark hover:text-parchment transition-colors"
                  >
                    Support
                  </Link>
                )}
                <Link
                  href="/bookmarks"
                  className="font-mono text-xs text-muteddark hover:text-parchment transition-colors"
                >
                  Bookmarks
                </Link>
                <Link
                  href="/settings"
                  className="font-mono text-xs text-muteddark hover:text-parchment transition-colors"
                >
                  Settings
                </Link>
                {user && (
                  <div className="flex items-center gap-3 pl-3 border-l border-panelborder">
                    <span className="font-mono text-xs text-muteddark">
                      {user.name || user.email?.split("@")[0] || "User"}
                    </span>
                    <form action={signOut}>
                      <button
                        type="submit"
                        className="font-mono text-xs text-muteddark hover:text-[#b3503a] transition-colors"
                      >
                        Sign out
                      </button>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-parchment"
            >
              {mobileOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </nav>

        {mobileOpen && (
          <div className="md:hidden border-t border-panelborder bg-panel px-6 py-4 space-y-3">
            {variant === "marketing" ? (
              <>
                <MobileLink href="/about" label="ABOUT" />
                <MobileLink href="/faq" label="FAQ" />
                <MobileLink href="/pricing" label="PRICING" />
                {user ? (
                  <MobileLink href="/dashboard" label="DASHBOARD" />
                ) : (
                  <MobileLink href="/login" label="LOGIN" />
                )}
                <Link
                  href="/checkout?tier=standard"
                  className="block w-full bg-gold text-[#171310] font-mono font-bold text-sm py-3 rounded-sm text-center mt-2"
                >
                  GET_ACCESS
                </Link>
              </>
            ) : (
              <>
                <MobileLink href="/dashboard" label="Dashboard" />
                <MobileLink href="/course" label="Course" />
                <MobileLink href="/course/final-project" label="Final Project" />
                <MobileLink href="/bookmarks" label="Bookmarks" />
                <MobileLink href="/troubleshooting" label="Troubleshooting" />
                {showSupport && (
                  <MobileLink href="/support" label="Support" />
                )}
                <MobileLink href="/settings" label="Settings" />
                {user && (
                  <div className="pt-2 border-t border-panelborder">
                    <form action={signOut}>
                      <button
                        type="submit"
                        className="font-mono text-sm text-muteddark hover:text-[#b3503a] transition-colors py-1"
                      >
                        Sign out
                      </button>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}

function MobileLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block font-mono text-sm text-muteddark hover:text-parchment transition-colors py-1"
    >
      {label}
    </Link>
  );
}
