"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "../common/utils";

export default function MobileMenu({ navItems }: { navItems: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="flex h-9 w-9 items-center justify-center rounded text-white/70 hover:bg-white/10 hover:text-white">
          <Menu className="h-5 w-5" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 h-full w-3/4 gap-4 border-r border-white/10 bg-[#0B0E11] p-6 shadow-2xl transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm">
          <div className="flex items-center justify-between mb-8">
            <span className="text-lg font-bold text-white">AXIOM Pro</span>
            <Dialog.Close asChild>
              <button className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                <X className="h-5 w-5 text-white" />
                <span className="sr-only">Close</span>
              </button>
            </Dialog.Close>
          </div>
          
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-4 py-3 text-lg font-medium text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-colors",
                  item === "Pulse" && "text-blue-400 bg-blue-500/10"
                )}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="mt-auto border-t border-white/10 pt-6">
             <button className="w-full rounded-lg bg-[#5865F2] py-3 font-semibold text-white">
                Connect Wallet
             </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
