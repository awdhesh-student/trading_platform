"use client";

import React, { useEffect, useState } from "react";
import TokenRow from "./TokerRow";
import TAB_DATA from "../../data.json";
import { startMockPriceSocket } from "../../lib/mockPriceSocket";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function parseK(val: string | number) {
  if (typeof val === "number") return val;
  if (!val) return 0;
  const n = parseFloat(val.replace(/[^\d.-]/g, ""));
  if (val.includes("K")) return n * 1000;
  if (val.includes("M")) return n * 1000000;
  return n;
}

export default function TokenTable() {
  const [loading, setLoading] = useState(true);
  const filters = useSelector((state: RootState) => state.table.filters);
  const [rows, setRows] = useState(() => {
    // Parse strings "12.3K" -> 12300 for initial numeric manipulations
    return (TAB_DATA.trending || []).map((row) => ({
      ...row,
      liquidity: parseK(row.liquidity),
      volume: parseK(row.volume),
    }));
  });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  // 🔄 Mock real-time updates
  useEffect(() => {
    const stop = startMockPriceSocket(
      rows.map((r) => r.id),
      (update) => {
        setRows((prev) =>
          prev.map((r) => {
            if (r.id === update.id) {
              const priceRatio = update.price / r.price;

              // 1. Market Cap & Liquidity moving with price
              const newMarketCap = r.marketCap * priceRatio;
              const newLiquidity = r.liquidity * priceRatio; // Liquidity value syncs with price

              // 2. Volume & TXNS always increasing (activity)
              const volIncrement = Math.random() * 500;
              const newVolume = r.volume + volIncrement;
              const newTxns = r.txns + 1;

              // 3. Buy/Sell Logic
              const isBuy = Math.random() > 0.45;
              const newBuys = isBuy ? r.buys + 1 : r.buys;
              const newSells = !isBuy ? r.sells + 1 : r.sells;

              // 4. Holders & Info slight fluctuation
              const holderChange = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
              const newHolders = Math.max(0, r.holders + holderChange);

              const secUpdate = { ...r.security };
              if (Math.random() > 0.7) {
                secUpdate.top10Percentage = +(
                  secUpdate.top10Percentage +
                  (Math.random() - 0.5)
                ).toFixed(2);
              }

              return {
                ...r,
                price: update.price,
                priceChange: update.change,
                marketCap: newMarketCap,
                marketCapChange: update.change,
                liquidity: newLiquidity,
                volume: newVolume,
                txns: newTxns,
                buys: newBuys,
                sells: newSells,
                holders: newHolders,
                security: secUpdate,
              };
            }
            return r;
          })
        );
      }
    );
    return stop;
  }, []); // Run once on mount

  const filteredRows = rows.filter((r) => {
    // 1. Keyword search
    if (filters.keywords) {
      const keys = filters.keywords
        .toLowerCase()
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
      const match = keys.some(
        (k) =>
          r.name.toLowerCase().includes(k) || r.symbol.toLowerCase().includes(k)
      );
      if (!match) return false;
    }
    // 2. Exclude
    if (filters.exclude) {
      const keys = filters.exclude
        .toLowerCase()
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
      const match = keys.some(
        (k) =>
          r.name.toLowerCase().includes(k) || r.symbol.toLowerCase().includes(k)
      );
      if (match) return false;
    }

    // 3. Age (assume age string like "10m", convert to minutes for simple check)
    // Note: This is a robust simplification. "10m" -> 10, "1h" -> 60.
    const ageVal = parseInt(r.age);
    const ageMin = r.age.includes("h") ? ageVal * 60 : ageVal; // Normalize to minutes roughly

    if (filters.minAge !== "" && ageMin < filters.minAge) return false;
    if (filters.maxAge !== "" && ageMin > filters.maxAge) return false;

    // 4. Dex Paid (assume security.devPercentage > 0 means paid for mock)
    if (filters.dexPaid && r.security.devPercentage === 0) return false;

    // 5. Holders
    if (
      filters.minHolders !== "" &&
      r.security.top10Percentage < filters.minHolders
    )
      return false;
    if (
      filters.maxHolders !== "" &&
      r.security.top10Percentage > filters.maxHolders
    )
      return false;

    return true;
  });

  return (
    <div className="rounded-xl border border-white/10 bg-[#0F1419] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#0B0E11] text-xs font-medium text-white/40 uppercase tracking-wide border-b border-white/5">
            <tr>
              <th className="px-4 py-3 text-left w-[250px]">Pair Info</th>
              <th className="px-4 py-3 text-left"></th>
              <th className="px-4 py-3 text-left">Market Cap</th>
              <th className="px-4 py-3 text-left">Liquidity</th>
              <th className="px-4 py-3 text-left">Volume</th>
              <th className="px-4 py-3 text-left">
                TXNS <span className="ml-1">↓</span>
              </th>
              <th className="px-4 py-3 text-left">Token Info</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {filteredRows.map((row, i) => (
              <TokenRow key={i} data={row} />
            ))}
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-white/40">
                  No tokens match filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
