"use client";
import React, { useEffect, useState } from "react";
import {
  Settings,
  Wallet,
  X as XIcon,
  Wifi,
  Monitor,
  Bell,
  MessageSquare,
  LayoutTemplate,
  Terminal,
  Globe,
  Link as LinkIcon,
} from "lucide-react";

export default function Footer() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);
  if (isOnline === null) return null;
  return (
    <footer className="h-9 bg-[#0B0E11] border-t border-white/10 flex items-center justify-between px-4 text-[11px] font-medium text-white/60 select-none z-50 fixed bottom-0 left-0 right-0">
      <div className="flex items-center gap-4 h-full">
        <button className="flex items-center gap-1.5 bg-[#526FFF]/20 text-[#526FFF] px-2 py-0.5 rounded text-[10px] hover:bg-[#526FFF]/30 transition-colors">
          <Terminal size={10} />
          PRESET 3
        </button>

        <div className="flex items-center gap-2 h-full border-r border-white/10 pr-4">
          <div className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
            <LayoutTemplate size={12} />
            <span>1</span>
            <span className="text-[9px] bg-white/10 px-1 rounded">0</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
            <Settings size={12} />
          </div>
          <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
            <Wallet size={12} />
            <span>Wallet</span>
            <span className="h-1.5 w-1.5 rounded-full bg-pink-500 ml-0.5" />
          </div>
          <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
            <XIcon size={12} />
            <span>Twitter</span>
            <span className="h-1.5 w-1.5 rounded-full bg-pink-500 ml-0.5" />
          </div>
          <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
            <Globe size={12} />
            <span>Discover</span>
            <span className="h-1.5 w-1.5 rounded-full bg-pink-500 ml-0.5" />
          </div>
          <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
            <Wifi size={12} style={{ transform: "rotate(45deg)" }} />
            <span>Pulse</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors border-l border-white/10 pl-4">
            <span className="text-white/40">PnL</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 border border-white/5">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png"
            className="w-3.5 h-3.5"
            alt="BTC"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg"
            className="w-3.5 h-3.5"
            alt="ETH"
          />
        </div>

        <div className="flex items-center gap-4 text-white/90">
          <div className="flex items-center gap-1.5">
            <span className="text-[#F7931A]">₿</span>
            <span className="font-semibold">$88.9K</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#627EEA]">♦</span>
            <span className="font-semibold">$2978</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#14F195]">◎</span>
            <span className="font-semibold">$124.9</span>
          </div>
        </div>

        <div className="flex items-center gap-4 border-l border-white/10 pl-6">
          <div className="flex items-center gap-1.5">
            <LinkIcon size={10} className="text-white/40" />
            <span>$51.3K</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs">⛽</span>
            <span>0.425</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">☁</span>
            <span>0.432</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 h-full">
        <div
          className="flex items-center gap-1.5 px-2 py-0.5 rounded border
        transition-colors
        ${isOnline
          ? 'bg-[#00C853]/10 text-[#00C853] border-[#00C853]/20'
          : 'bg-red-500/10 text-red-500 border-red-500/20'}
      "
        >
          <span className="relative flex h-1.5 w-1.5">
            {isOnline && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C853] opacity-75"></span>
            )}
            <span
              className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                isOnline ? "bg-[#00C853]" : "bg-red-500"
              }`}
            />
          </span>

          <span
            className={`text-[10px] ${
              isOnline ? "text-[#00C853]" : "text-red-500"
            }`}
          >
            {isOnline ? "Connection is stable" : "Connection lost"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors border-l border-white/10 pl-4 h-full">
          <span>GLOBAL</span>
          <XIcon size={10} className="rotate-45" />
        </div>

        <div className="flex items-center gap-3 border-l border-white/10 pl-4 h-full">
          <LayoutTemplate
            size={14}
            className="hover:text-white cursor-pointer"
          />
          <Bell size={14} className="hover:text-white cursor-pointer" />
          <Monitor size={14} className="hover:text-white cursor-pointer" />
          <MessageSquare
            size={14}
            className="hover:text-white cursor-pointer"
          />
          <XIcon size={14} className="hover:text-white cursor-pointer" />
        </div>

        <div className="w-1 h-full bg-blue-500/20" />
      </div>
    </footer>
  );
}
