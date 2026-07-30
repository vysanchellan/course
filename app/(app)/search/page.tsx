"use client";

import { useState } from "react";
import Link from "next/link";
import { lessons } from "@/lib/data";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = lessons.filter(
    (l) =>
      l.title.toLowerCase().includes(query.toLowerCase()) ||
      l.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="px-6 md:px-12 py-10 max-w-3xl mx-auto">
      <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-2">
        Search
      </div>
      <h1 className="font-serif text-2xl md:text-3xl font-medium text-parchment mb-6">
        Find a lesson.
      </h1>

      <div className="relative mb-8">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muteddark"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search lessons by title or description..."
          className="w-full pl-11 pr-4 py-3 bg-panel border border-panelborder rounded-md font-mono text-sm text-parchment placeholder:text-muteddark/50 focus:outline-none focus:border-gold transition-colors"
          autoFocus
        />
      </div>

      {query && results.length === 0 && (
        <div className="bg-panel border border-panelborder rounded-md p-10 text-center">
          <p className="font-mono text-sm text-muteddark">
            No lessons match &ldquo;{query}&rdquo;
          </p>
        </div>
      )}

      {query && (
        <div className="space-y-3">
          {results.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/course/${lesson.id}`}
              className="block bg-panel border border-panelborder rounded-md p-4 hover:border-gold/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-gold shrink-0">
                  {String(lesson.chapter).padStart(2, "0")}
                </span>
                <div>
                  <div className="font-mono text-sm text-parchment">
                    {lesson.title}
                  </div>
                  <div className="font-mono text-xs text-muteddark mt-0.5">
                    {lesson.description}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!query && (
        <div className="bg-panel border border-panelborder rounded-md p-10 text-center">
          <p className="font-mono text-sm text-muteddark">
            Type above to search through all {lessons.length} lessons.
          </p>
        </div>
      )}
    </div>
  );
}
