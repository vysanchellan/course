"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { AccessLevel } from "@/lib/access";

interface MobileNavProps {
  accessLevel?: AccessLevel;
}

export function MobileNav({ accessLevel }: MobileNavProps) {
  const pathname = usePathname();
  const showSupport = accessLevel === "premium" || accessLevel === "admin";

  const items = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      href: "/course",
      label: "Course",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 19.5Z" />
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        </svg>
      ),
    },
    {
      href: "/bookmarks",
      label: "Bookmarks",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
      ),
    },
  ];

  // Add final project — always visible
  items.push({
    href: "/course/final-project",
    label: "Capstone",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  });

  // Add troubleshooting — always available
  items.push({
    href: "/troubleshooting",
    label: "Troubleshooting",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
  });

  // Add support if the user has access
  if (showSupport) {
    items.push({
      href: "/support",
      label: "Support",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    });
  }

  // Hide on lesson reader pages
  if (pathname.startsWith("/course/") && pathname !== "/course") {
    return null;
  }

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-dusk border-t border-panelborder">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-sm transition-colors",
                isActive ? "text-gold" : "text-muteddark hover:text-parchment"
              )}
            >
              {item.icon}
              <span className="font-mono text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
