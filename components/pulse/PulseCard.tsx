import React from "react";
import {
  Globe,
  Lock,
  MessageCircle,
  Search,
  Twitter,
  User,
  Zap,
} from "lucide-react";
import Image from "next/image";

export interface PulseCardData {
  id: string;
  name: string;
  symbol: string;
  image?: string;
  description?: string;
  timeAgo: string;
  marketCap: string;
  volume: string;
  txCount: number;
  stats: {
    label: string;
    value: string;
    isPositive?: boolean;
    icon?: React.ReactNode;
  }[];
  actions: {
    solValue: string;
  };
}

interface PulseCardProps {
  data: PulseCardData;
}

export default function PulseCard({ data }: PulseCardProps) {
  return (
    <div className="relative flex flex-col gap-3 rounded-lg border border-white/5 bg-[#151A21] p-3 transition-colors hover:border-white/10 hover:bg-[#1C232B]">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          {/* Image/Avatar */}
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-white/10 bg-black/50">
            {data.image ? (
              <Image
                src={data.image}
                alt={data.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-xs text-white/30">
                IMG
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-white max-w-[100px] truncate">
                {data.name}
              </span>
              <span className="text-xs text-white/40">{data.symbol}</span>
              <span className="cursor-pointer text-white/40 hover:text-white">
                <Lock size={10} />
              </span>
            </div>

            <div className="mt-1 flex items-center gap-2 text-[10px] text-white/50">
              <span className="text-green-400">{data.timeAgo}</span>
              <div className="flex items-center gap-1">
                <Search size={10} />
                <User size={10} />
                <span>{data.txCount || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Stats (MC/Vol) */}
        <div className="flex flex-col items-end text-xs">
          <div className="flex items-center gap-1">
            <span className="text-white/40 text-[10px]">MC</span>
            <span className="font-bold text-blue-400">{data.marketCap}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white/40 text-[10px]">V</span>
            <span className="font-medium text-white">{data.volume}</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-2 border-t border-white/5 pt-2">
        {data.stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-start gap-0.5">
            <span
              className={`text-[10px] font-medium ${
                stat.isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              {stat.value}
            </span>
            {stat.label && (
              <span className="text-[9px] text-white/30">{stat.label}</span>
            )}
          </div>
        ))}
      </div>

      {/* Action Row */}
      <div className="mt-1 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/20">
          <Globe size={14} className="hover:text-white cursor-pointer" />
          <Twitter size={14} className="hover:text-white cursor-pointer" />
          <MessageCircle
            size={14}
            className="hover:text-white cursor-pointer"
          />
        </div>

        <button className="flex items-center gap-1 rounded bg-[#5865F2] px-3 py-1 text-[10px] font-bold text-white transition-colors hover:bg-[#4752c4]">
          <Zap size={10} fill="currentColor" />
          {data.actions.solValue} SOL
        </button>
      </div>
    </div>
  );
}
