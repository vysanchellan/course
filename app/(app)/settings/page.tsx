"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

// TODO: Replace with backend-connected settings in Phase 2

export default function SettingsPage() {
  const [readerMode, setReaderMode] = useState<"serif" | "sans">("serif");
  const [fontSize, setFontSize] = useState(100);

  return (
    <div className="px-6 md:px-12 py-10 max-w-2xl mx-auto">
      <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-2">
        Settings
      </div>
      <h1 className="font-serif text-2xl md:text-3xl font-medium text-parchment mb-8">
        Preferences.
      </h1>

      <div className="space-y-6">
        <div className="bg-panel border border-panelborder rounded-md p-6">
          <h2 className="font-mono text-sm text-parchment mb-4">
            Reading Mode
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => setReaderMode("serif")}
              className={`flex-1 p-3 rounded-sm border text-center transition-colors ${
                readerMode === "serif"
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-panelborder text-muteddark hover:text-parchment"
              }`}
            >
              <span className="font-serif text-lg">Serif</span>
            </button>
            <button
              onClick={() => setReaderMode("sans")}
              className={`flex-1 p-3 rounded-sm border text-center transition-colors ${
                readerMode === "sans"
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-panelborder text-muteddark hover:text-parchment"
              }`}
            >
              <span className="font-sans text-lg">Sans</span>
            </button>
          </div>
        </div>

        <div className="bg-panel border border-panelborder rounded-md p-6">
          <h2 className="font-mono text-sm text-parchment mb-4">
            Font Size
          </h2>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-muteddark">A</span>
            <input
              type="range"
              min={80}
              max={150}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="flex-1 accent-gold"
            />
            <span className="font-mono text-lg text-parchment">A</span>
            <span className="font-mono text-xs text-muteddark w-8">
              {fontSize}%
            </span>
          </div>
        </div>

        <div className="bg-panel border border-panelborder rounded-md p-6">
          <h2 className="font-mono text-sm text-parchment mb-4">Account</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="font-mono text-xs text-muteddark">Email</span>
              <span className="font-mono text-xs text-parchment">
                user@example.com
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="font-mono text-xs text-muteddark">Member since</span>
              <span className="font-mono text-xs text-parchment">
                July 2026
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-panelborder">
            {/* TODO: Connect to auth system in Phase 2 */}
            <Button variant="outline" size="sm">
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
