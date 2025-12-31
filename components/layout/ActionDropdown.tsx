"use client";

import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "../common/utils";

interface ActionDropdownProps {
  icon: any;
  label: string;
  content?: React.ReactNode;
}

export default function ActionDropdown({ icon: Icon, label, content }: ActionDropdownProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="group flex h-9 w-9 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10 data-[state=open]:text-white"
          title={label}
        >
          <Icon className="h-5 w-5" />
        </button>
      </Popover.Trigger>
      
      <Popover.Portal>
        <Popover.Content 
            className="z-50 w-64 rounded-xl border border-white/10 bg-[#151A21] p-4 shadow-xl animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[side=bottom]:slide-in-from-top-2" 
            sideOffset={5} 
            align="end"
        >
          <h3 className="mb-2 text-sm font-semibold text-white">{label}</h3>
          <div className="text-xs text-white/50">
            {content || "No new updates."}
          </div>
          <Popover.Arrow className="fill-[#151A21] stroke-white/10" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
