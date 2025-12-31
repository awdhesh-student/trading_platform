"use client";

import { memo } from "react";
import {
  User,
  Search,
  Globe,
  Send,
  ShieldCheck,
  ShieldAlert,
  Flame,
  Lock,
  Copy,
} from "lucide-react";
import RowSparkline from "../charts/RowSparkline";
import { usePriceHistory } from "../../hooks/usePriceHistory";

type Security = {
  noMint: boolean;
  hasBlacklist: boolean;
  isBurnt: boolean;
  top10Percentage: number;
  devPercentage: number;
};

type TokenData = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  priceChange: number;
  marketCap: number;
  marketCapChange: number;
  liquidity: number;
  volume: number;
  txns: number;
  buys: number;
  sells: number;
  age: string;
  holders: number;
  top10: number;
  security: Security;
};

type Props = {
  data: TokenData;
};

function formatMarketCap(val: number) {
  if (val >= 1_000_000_000) {
    return (val / 1_000_000_000).toFixed(2) + "B";
  }
  if (val >= 1_000_000) {
    return (val / 1_000_000).toFixed(2) + "M";
  }
  if (val >= 1000) {
    const kVal = val / 1000;
    if (kVal >= 100) return kVal.toFixed(0) + "K";
    return kVal.toFixed(1) + "K";
  }
  return val.toFixed(2);
}

function TokenRow({ data }: Props) {
  const history = usePriceHistory(data.price);

  return (
    <tr className="group border-b border-white/5 bg-[#0B0E11] hover:bg-white/[0.02] transition-colors">
      <td className="px-4 py-3 align-top">
        <div className="flex gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-white/10">
            <img
              src={data.image}
              alt={data.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border border-black bg-yellow-400"></div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-sm font-bold text-white">
              <span>{data.name}</span>
              <span className="font-normal text-white/50">{data.symbol}</span>
              <Copy
                size={12}
                className="cursor-pointer text-white/30 hover:text-white"
              />
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs text-blue-400">
              <span className="text-white/60">{data.age}</span>
              <div className="flex gap-1 text-blue-400">
                <User size={12} />
                <Globe size={12} />
                <Send size={12} />
              </div>
              <div className="flex items-center gap-1 text-white/40">
                <Search size={12} />
                <span>{data.top10}</span>
              </div>
            </div>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 align-middle">
        <div className="flex items-center gap-4">
          <div className="h-8 w-16 opacity-80">
            <RowSparkline
              data={history}
              color={data.marketCapChange >= 0 ? "#4ade80" : "#f87171"}
            />
          </div>
        </div>
      </td>

      <td className="px-4 py-3 align-middle">
        <div className="flex items-center gap-4">
          <div className="flex flex-col text-right">
            <span className="font-bold text-white">
              ${formatMarketCap(data.marketCap)}
            </span>
            <span
              className={`text-xs ${
                data.marketCapChange >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {data.marketCapChange >= 0 ? "+" : ""}
              {data.marketCapChange}%
            </span>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 align-middle font-medium text-white">
        ${formatMarketCap(data.liquidity)}
      </td>

      <td className="px-4 py-3 align-middle font-medium text-white">
        ${formatMarketCap(data.volume)}
      </td>
      <td className="px-4 py-3 align-middle">
        <div className="flex flex-col">
          <span className="font-bold text-white">{data.txns}</span>
          <div className="flex gap-1 text-xs">
            <span className="text-green-400">{data.buys}</span>
            <span className="text-white/30">/</span>
            <span className="text-red-400">{data.sells}</span>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 align-middle">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] whitespace-nowrap">
          <div
            className={`flex items-center gap-1 ${
              data.security.top10Percentage > 50
                ? "text-red-400"
                : "text-red-400"
            }`}
          >
            <User size={10} />
            <span>{data.security.top10Percentage}%</span>
          </div>

          <div className="flex items-center gap-1 text-green-400">
            <ShieldCheck size={10} />
            <span>0%</span>
          </div>

          <div className="flex items-center gap-1 text-green-400">
            <ShieldCheck size={10} />
            <span>0%</span>
          </div>

          <div className="flex items-center gap-1 text-green-400">
            <Lock size={10} />
            <span>0%</span>
          </div>

          <div
            className={`flex items-center gap-1 ${
              data.security.devPercentage > 0
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            <User size={10} />
            <span>
              {data.security.devPercentage > 0
                ? `${data.security.devPercentage}%`
                : "Paid"}
            </span>
          </div>

          <div className="flex items-center gap-1 text-green-400">
            <Flame size={10} />
            <span>Unpaid</span>
          </div>
        </div>
        <div className="mt-1 flex gap-4 text-[10px] text-white">
          <div className="flex items-center gap-1">
            <User size={10} className="text-white/40" />
            <span>{data.holders}</span>
          </div>
          <div className="flex items-center gap-1">
            <Lock size={10} className="text-blue-400" />
            <span>{data.top10}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 align-middle text-right">
        <button className="rounded-full bg-[#526FFF] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#4259cc] transition-colors shadow-lg shadow-blue-900/20">
          Buy
        </button>
      </td>
    </tr>
  );
}

export default memo(TokenRow);
