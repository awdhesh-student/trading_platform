"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setFilters, FilterState } from "../../store/tableSlice";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function FilterModal({ open, onOpenChange }: Props) {
  const dispatch = useDispatch();
  const currentFilters = useSelector((state: RootState) => state.table.filters);
  const [localFilters, setLocalFilters] = useState<FilterState>(currentFilters);
  const [activeTab, setActiveTab] = useState<"audit" | "metrics">("audit");

  const handleApply = () => {
    dispatch(setFilters(localFilters));
    onOpenChange(false);
  };

  const renderRangeInput = (
    label: string,
    minKey: keyof FilterState,
    maxKey: keyof FilterState
  ) => (
    <div className="space-y-2">
      <label className="text-xs text-white/50">{label}</label>
      <div className="flex items-center gap-4">
        <input
          type="number"
          placeholder="Min"
          className="flex-1 rounded bg-[#181C21] border border-white/10 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          value={localFilters[minKey] as number | ""}
          onChange={(e) =>
            setLocalFilters({
              ...localFilters,
              [minKey]: e.target.value ? Number(e.target.value) : "",
            })
          }
        />
        <input
          type="number"
          placeholder="Max"
          className="flex-1 rounded bg-[#181C21] border border-white/10 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
          value={localFilters[maxKey] as number | ""}
          onChange={(e) =>
            setLocalFilters({
              ...localFilters,
              [maxKey]: e.target.value ? Number(e.target.value) : "",
            })
          }
        />
      </div>
    </div>
  );

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#0F1419] p-6 shadow-2xl border border-white/10 z-50 text-white max-h-[85vh] flex flex-col">
          <div className="shrink-0 space-y-6 mb-4">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-lg font-bold">Filter</Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-white/50 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-white/50">Search Keywords</label>
                <input
                  type="text"
                  placeholder="keyword1, keyword2..."
                  className="w-full rounded bg-[#181C21] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-blue-500 focus:outline-none"
                  value={localFilters.keywords}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      keywords: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-white/50">
                  Exclude Keywords
                </label>
                <input
                  type="text"
                  placeholder="keyword1, keyword2..."
                  className="w-full rounded bg-[#181C21] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-blue-500 focus:outline-none"
                  value={localFilters.exclude}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      exclude: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex gap-4 border-b border-white/10 pb-2">
              <button
                onClick={() => setActiveTab("audit")}
                className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
                  activeTab === "audit"
                    ? "bg-[#1C232B] text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Audit
              </button>
              <button
                onClick={() => setActiveTab("metrics")}
                className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
                  activeTab === "metrics"
                    ? "bg-[#1C232B] text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Metrics
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {activeTab === "audit" && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="dexpaid"
                    className="rounded border-white/20 bg-[#181C21] text-blue-500 focus:ring-0 cursor-pointer"
                    checked={localFilters.dexPaid}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        dexPaid: e.target.checked,
                      })
                    }
                  />
                  <label
                    htmlFor="dexpaid"
                    className="text-sm font-medium text-white cursor-pointer select-none"
                  >
                    Dex Paid
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-white/50">Age</label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full rounded bg-[#181C21] border border-white/10 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                        value={localFilters.minAge}
                        onChange={(e) =>
                          setLocalFilters({
                            ...localFilters,
                            minAge: e.target.value
                              ? Number(e.target.value)
                              : "",
                          })
                        }
                      />
                      <div className="flex items-center justify-between rounded bg-[#181C21] border border-white/10 px-3 py-2 w-20">
                        <span className="text-sm">m</span>
                        <ChevronDown size={14} className="text-white/40" />
                      </div>
                    </div>
                    <div className="flex-1 flex gap-2">
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full rounded bg-[#181C21] border border-white/10 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
                        value={localFilters.maxAge}
                        onChange={(e) =>
                          setLocalFilters({
                            ...localFilters,
                            maxAge: e.target.value
                              ? Number(e.target.value)
                              : "",
                          })
                        }
                      />
                      <div className="flex items-center justify-between rounded bg-[#181C21] border border-white/10 px-3 py-2 w-20">
                        <span className="text-sm">m</span>
                        <ChevronDown size={14} className="text-white/40" />
                      </div>
                    </div>
                  </div>
                </div>

                {renderRangeInput(
                  "Top 10 Holders %",
                  "minHolders",
                  "maxHolders"
                )}
                {renderRangeInput(
                  "Insider Holding %",
                  "minInsider",
                  "maxInsider"
                )}
                {renderRangeInput("Bundlers %", "minBundlers", "maxBundlers")}
                {renderRangeInput("Pro Traders Count", "minPro", "maxPro")}
                {renderRangeInput(
                  "Recent Visitors",
                  "minVisitors",
                  "maxVisitors"
                )}
              </div>
            )}

            {activeTab === "metrics" && (
              <div className="space-y-6">
                {renderRangeInput(
                  "Liquidity ($)",
                  "minLiquidity",
                  "maxLiquidity"
                )}
                {renderRangeInput("Volume ($)", "minVolume", "maxVolume")}
                {renderRangeInput(
                  "Market Cap ($)",
                  "minMarketCap",
                  "maxMarketCap"
                )}
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-end border-t border-white/10 pt-6 shrink-0">
            <button
              onClick={handleApply}
              className="rounded-full bg-[#526FFF] px-6 py-2 text-sm font-bold text-white hover:bg-[#4259cc]"
            >
              Apply All
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
