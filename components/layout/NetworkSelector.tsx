"use client";

import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../common/utils";

const NETWORKS = [
  { id: "sol", name: "Solana", icon: "S", color: "text-green-400" },
  { id: "bnb", name: "BNB Chain", icon: "B", color: "text-yellow-400" },
];

export default function NetworkSelector() {
  const [selected, setSelected] = useState(NETWORKS[0]);
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 rounded-lg border border-white/10 bg-[#151A21] px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-white/5",
            open && "border-white/20 bg-white/10"
          )}
        >
          <span className={cn("font-bold", selected.color)}>{selected.icon}</span>
          <span className="hidden sm:inline-block">SOL</span>
          <ChevronDown className="h-4 w-4 text-white/40" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-50 min-w-[160px] overflow-hidden rounded-xl border border-white/10 bg-[#151A21] p-1 shadow-xl animate-in fade-in zoom-in-95 duration-200"
          sideOffset={5}
          align="end"
        >
          <div className="flex flex-col gap-0.5">
             <span className="px-2 py-1.5 text-xs font-semibold text-white/40">Select Network</span>
            {NETWORKS.map((net) => (
              <button
                key={net.id}
                onClick={() => {
                  setSelected(net);
                  setOpen(false);
                }}
                className={cn(
                  "group flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm transition-colors hover:bg-white/5",
                  selected.id === net.id ? "text-white bg-white/5" : "text-white/70"
                )}
              >
                <div className="flex items-center gap-2">
                   <div className={cn("flex h-6 w-6 items-center justify-center rounded bg-white/5 font-bold", net.color)}>
                     {net.icon}
                   </div>
                   {net.name}
                </div>
                {selected.id === net.id && <Check className="h-4 w-4 text-blue-400" />}
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
