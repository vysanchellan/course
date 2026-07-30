"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { lessons, defaultProgress } from "@/lib/data";
import { getLessonContent } from "@/lib/content";
import Link from "next/link";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results = query
    ? lessons.filter((l) => {
        const q = query.toLowerCase();
        if (l.title.toLowerCase().includes(q)) return true;
        if (l.description.toLowerCase().includes(q)) return true;
        const content = stripHtml(getLessonContent(l.id));
        if (content.toLowerCase().includes(q)) return true;
        return false;
      })
    : [];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && results[selectedIndex]) {
        window.location.href = `/course/${results[selectedIndex].id}`;
        onClose();
      }
    },
    [onClose, results, selectedIndex]
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-dusk/80 backdrop-blur-md" />
      <div
        className="relative w-full max-w-lg bg-dusk/90 backdrop-blur-xl border border-panelborder/60 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-panelborder/50">
          <div className="flex items-center gap-3 px-4 py-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muteddark shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search lessons by title, description, or content..."
              className="flex-1 bg-transparent font-mono text-sm text-parchment placeholder:text-muteddark/50 focus:outline-none"
            />
            <kbd className="hidden md:inline-flex font-mono text-[11px] text-muteddark bg-panelborder/50 px-2 py-0.5 rounded">
              ESC
            </kbd>
          </div>
        </div>
        <div className="max-h-[40vh] overflow-y-auto">
          {query && results.length === 0 && (
            <div className="px-4 py-8 text-center font-mono text-sm text-muteddark">
              No results for &ldquo;{query}&rdquo;
            </div>
          )}
          {results.map((lesson, i) => {
            const prog = defaultProgress[lesson.id];
            return (
              <Link
                key={lesson.id}
                href={`/course/${lesson.id}`}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 border-b border-panelborder/30 last:border-0 transition-colors",
                  i === selectedIndex
                    ? "bg-panelborder/20"
                    : "hover:bg-panelborder/10"
                )}
              >
                <span className="font-mono text-[11px] text-gold shrink-0">
                  {String(lesson.chapter).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-sm text-parchment truncate">
                    {lesson.title}
                  </div>
                  <div className="font-mono text-[11px] text-muteddark truncate mt-0.5">
                    {lesson.description}
                  </div>
                </div>
                {prog?.completed && (
                  <span className="font-mono text-[10px] text-diffadd shrink-0">
                    done
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
