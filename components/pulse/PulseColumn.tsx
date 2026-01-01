import React from "react";
import PulseCard, { PulseCardData } from "./PulseCard";
import { SlidersHorizontal, Zap } from "lucide-react";

interface PulseColumnProps {
  title: string;
  data: PulseCardData[];
  headerColor?: string;
}

export default function PulseColumn({
  title,
  data,
  headerColor = "text-white",
}: PulseColumnProps) {
  return (
    <div className="flex flex-col gap-4 min-w-[460px] flex-1">
      {/* Column Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <h2 className={`text-lg font-bold ${headerColor}`}>{title}</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded bg-[#1C232B] px-2 py-1 text-xs text-white/60">
            <Zap size={12} className="text-yellow-500" />
            <span>0</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span className="cursor-pointer hover:text-blue-400">P1</span>
            <span className="cursor-pointer hover:text-blue-400">P2</span>
            <span className="cursor-pointer hover:text-blue-400">P3</span>
          </div>
          <button className="text-white/40 hover:text-white">
            <SlidersHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Cards List */}
      <div className="flex flex-col gap-3">
        {data.map((item) => (
          <PulseCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
