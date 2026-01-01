"use client";

import React from "react";
import { Settings, Star, Activity } from "lucide-react";

export default function SubHeaderTop() {
  return (
    <div className="flex flex-col bg-[#0B0E11] text-white">
      <div className="w-full border-b border-white/5 bg-[#0B0E11]">
        <div className="mx-auto w-full max-w-[1920px] px-4 py-2">
          <div className="flex items-center gap-4 text-white/40">
            <button className="hover:text-white transition-colors">
              <Settings size={16} />
            </button>
            <button className="hover:text-white transition-colors">
              <Star size={16} />
            </button>
            <button className="hover:text-white transition-colors">
              <Activity size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
