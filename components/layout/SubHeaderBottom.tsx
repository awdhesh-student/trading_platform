"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  SlidersHorizontal,
  Bookmark,
  EyeOff,
  LayoutList,
  AlignJustify,
} from "lucide-react";

import FilterModal from "../modals/FilterModal";

export default function SubHeaderBottom() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <div className="mx-auto mt-4 w-full max-w-[1920px] px-4 border-b border-white/5 pb-2">
        <div className="flex flex-col gap-4 overflow-x-auto pb-3 sm:flex-row sm:items-center sm:justify-between lg:overflow-visible">
          <div className="flex items-center gap-6 text-sm font-medium whitespace-nowrap">
            <button className="text-blue-400 hover:text-blue-300">Top</button>
            <button className="text-white hover:text-white/80 font-bold border-b-2 border-white pb-0.5">
              Trending
            </button>
            <button className="text-white/40 hover:text-white transition-colors">
              Surge
            </button>
            <button className="text-white/40 hover:text-white transition-colors">
              DEX Screener
            </button>

            <button className="flex items-center gap-1 text-white/40 hover:text-white transition-colors">
              Pump Live
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="flex items-center gap-3 lg:gap-4 ml-auto pt-2 sm:pt-0">
            <div className="flex items-center gap-3 text-xs font-bold text-white/40">
              <button className="hover:text-white transition-colors">1m</button>
              <button className="text-blue-400 hover:text-blue-300">5m</button>
              <button className="hover:text-white transition-colors">
                30m
              </button>
              <button className="hover:text-white transition-colors">1h</button>
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 rounded bg-[#1C232B] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2a3441] transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filter
              <ChevronDown size={14} />
            </button>

            <div className="flex items-center gap-3 text-white/40">
              <button className="hover:text-white transition-colors">
                <Bookmark size={16} />
              </button>
              <button className="hover:text-white transition-colors">
                <EyeOff size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#151A21] p-1">
              <button className="rounded p-1 sm:px-2 flex items-center gap-1 hover:bg-white/5 transition-colors">
                <LayoutList size={14} className="text-white/60" />
                <span className="text-xs font-bold text-white">1</span>
              </button>
              <button className="rounded p-1 sm:px-2 flex items-center gap-1 hover:bg-white/5 transition-colors">
                <AlignJustify size={14} className="text-blue-400" />
                <span className="text-xs font-bold text-white">0</span>
                <ChevronDown size={12} className="text-white/40 ml-1" />
              </button>
            </div>

            <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-[#151A21] px-3 py-1.5 lg:flex">
              <span className="text-xs text-white/40">Quick Buy</span>
              <span className="text-xs font-medium text-white">0.0</span>
            </div>

            <div className="hidden items-center gap-0.5 rounded-lg border border-white/10 bg-[#151A21] p-0.5 lg:flex text-[10px] font-bold">
              <button className="px-2 py-1 text-blue-400 bg-white/5 rounded">
                <AlignJustify size={10} />
              </button>
              <button className="px-2 py-1 text-blue-400 hover:text-blue-300">
                P1
              </button>
              <button className="px-2 py-1 text-white/40 hover:text-white">
                P2
              </button>
              <button className="px-2 py-1 text-white/40 hover:text-white">
                P3
              </button>
            </div>
          </div>
        </div>
      </div>
      <FilterModal open={isFilterOpen} onOpenChange={setIsFilterOpen} />
    </>
  );
}
