"use client";

import React, { useRef, useEffect } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="group relative w-full max-w-xs transition-all focus-within:max-w-sm">
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white">
        <Search className="h-4 w-4" />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search by token or CA..."
        className="h-9 w-[280px] rounded-lg border border-white/10 bg-[#151A21] pl-9 pr-10 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-blue-500/50 focus:bg-[#0B0E11] focus:ring-1 focus:ring-blue-500/50"
      />
      <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-white/50 group-focus-within:hidden">
        /
      </div>
    </div>
  );
}
