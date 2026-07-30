"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchModal } from "@/components/ui/search-modal";

interface NavbarProps {
  variant?: "marketing" | "app";
}

export function Navbar({ variant = "marketing" }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full",
          variant === "app"
            ? "bg-dusk border-b border-panelborder"
            : "bg-parchment/95 backdrop-blur-sm border-b border-ink/5"
        )}
      >
        <nav className="flex items-center justify-between px-6 md:px-10 h-14">
          <Link
            href={variant === "app" ? "/dashboard" : "/"}
            className="font-mono text-sm font-medium tracking-tight"
          >
            <span className="text-gold">~</span>
            <span className={variant === "app" ? "text-parchment" : "text-ink"}>
              /course
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {variant === "marketing" ? (
              <>
                <Link
                  href="/about"
                  className="font-mono text-xs text-ink/60 hover:text-ink transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/faq"
                  className="font-mono text-xs text-ink/60 hover:text-ink transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="/pricing"
                  className="font-mono text-xs text-ink/60 hover:text-ink transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/login"
                  className="font-mono text-xs text-ink/60 hover:text-ink transition-colors"
                >
                  Login
                </Link>
                <Button variant="primary" size="sm" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center gap-2 font-mono text-xs text-muteddark hover:text-parchment transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  Search
                  <kbd className="font-mono text-[10px] text-muteddark bg-panel border border-panelborder px-1.5 py-0.5 rounded">
                    Ctrl+K
                  </kbd>
                </button>
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
              className={variant === "app" ? "text-parchment" : "text-ink"}
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
          <div className="md:hidden border-t border-ink/10 bg-parchment px-6 py-4 space-y-3">
            {variant === "marketing" ? (
              <>
                <MobileLink href="/about" label="About" />
                <MobileLink href="/faq" label="FAQ" />
                <MobileLink href="/pricing" label="Pricing" />
                <MobileLink href="/login" label="Login" />
                <Button variant="primary" size="md" className="w-full mt-2" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            ) : (
              <>
                <MobileLink href="/dashboard" label="Dashboard" />
                <MobileLink href="/course" label="Course" />
                <MobileLink href="/bookmarks" label="Bookmarks" />
                <MobileLink href="/search" label="Search" />
                <MobileLink href="/settings" label="Settings" />
              </>
            )}
          </div>
        )}
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function MobileLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block font-mono text-sm text-ink/70 hover:text-ink transition-colors py-1"
    >
      {label}
    </Link>
  );
}
