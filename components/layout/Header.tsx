"use client";

import React, { useState } from "react";
import Link from "next/link"; // Assuming next/link is available
import {
  Search,
  Star,
  Bell,
  Wallet,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "../common/utils";
import NetworkSelector from "./NetworkSelector";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";

import ActionDropdown from "./ActionDropdown";

const NAV_ITEMS = [
  "Discover",
  "Pulse",
  "Trackers",
  "Perpetuals",
  "Yield",
  "Vision",
  "Portfolio",
  "Rewards",
];

export default function Header() {
  const [startIndex, setStartIndex] = useState(0);
  const ITEMS_PER_VIEW = 6;

  const visibleItems = NAV_ITEMS.slice(startIndex, startIndex + ITEMS_PER_VIEW);
  const canScrollPrev = startIndex > 0;
  const canScrollNext = startIndex + ITEMS_PER_VIEW < NAV_ITEMS.length;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(NAV_ITEMS.length - ITEMS_PER_VIEW, prev + 1)
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0B0E11] text-white">
      <div className="mx-auto flex h-14 max-w-[1920px] items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="md:hidden">
            <MobileMenu navItems={NAV_ITEMS} />
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-white"
            >
              <path d="M12 2L2 22h20L12 2z" />
            </svg>
            <span className="text-lg font-bold tracking-tight text-white">
              AXIOM <span className="font-normal text-white">Pro</span>
            </span>
          </Link>

          {/* Nav Carousel */}
          <div className="flex flex-1 items-center gap-6 overflow-hidden relative group">
            <nav className="hidden items-center gap-1 md:flex">
              {canScrollPrev && (
                <button
                  onClick={handlePrev}
                  className="absolute left-0 p-1 text-white/40 hover:text-white transition-opacity opacity-0 group-hover:opacity-100 bg-[#0B0E11]/80 backdrop-blur-sm z-10"
                  aria-label="Previous options"
                >
                  <ChevronLeft size={16} />
                </button>
              )}

              <div className="flex items-center gap-1 overflow-hidden">
                {visibleItems.map((item) => (
                  <Link
                    key={item}
                    href={item === "Discover" ? "/" : `/${item.toLowerCase()}`}
                    className={cn(
                      "px-3 py-1.5 text-sm font-semibold transition-colors whitespace-nowrap rounded-md",
                      item === "Discover"
                        ? "text-[#526FFF] hover:text-[#4259cc]"
                        : "text-white hover:bg-white/5"
                    )}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0B0E11] to-transparent pointer-events-none" />

            {canScrollNext && (
              <button
                onClick={handleNext}
                className="absolute right-0 p-1 text-white/40 hover:text-white transition-opacity opacity-0 group-hover:opacity-100 bg-[#0B0E11]/80 backdrop-blur-sm z-10"
                aria-label="Next options"
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden lg:block">
            <SearchBar />
          </div>

          <NetworkSelector />

          <button className="hidden rounded bg-[#5865F2] px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-[#4752c4] sm:block">
            Deposit
          </button>
          <div className="hidden h-5 w-[1px] bg-white/10 sm:block" />

          <div className="flex items-center gap-1">
            <ActionDropdown
              icon={Star}
              label="Favorites"
              content="No favorites added yet."
            />
            <ActionDropdown
              icon={Bell}
              label="Notifications"
              content="You're all caught up!"
            />
          </div>

          <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-[#151A21] p-1 pr-3 sm:flex transition-colors hover:bg-white/5 cursor-pointer">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#1C232B]">
              <Wallet className="h-4 w-4 text-blue-400" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] text-white/40">Balance</span>
              <span className="text-xs font-medium text-white">0</span>
            </div>
            <Settings className="ml-2 h-3 w-3 text-white/40" />
          </div>

          {/* Profile / Connection Indicator */}
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#1C232B] text-white/40 hover:text-white transition-colors cursor-pointer">
            <div className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-[#0B0E11] bg-green-500" />
            <span className="text-xs font-bold">B4</span>
          </div>
        </div>
      </div>
    </header>
  );
}
