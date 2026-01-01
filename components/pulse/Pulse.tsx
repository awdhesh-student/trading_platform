import React from "react";
import PulseColumn from "./PulseColumn";
import { PulseCardData } from "./PulseCard";
import TAB_DATA from "../../data.json";

export default function Pulse() {
  const pulseData = TAB_DATA.pulse;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-white">Pulse</h1>
        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        <PulseColumn
          title="New Pairs"
          data={pulseData.newPairs as PulseCardData[]}
          headerColor="text-blue-400"
        />
        <PulseColumn
          title="Final Stretch"
          data={pulseData.finalStretch as PulseCardData[]}
          headerColor="text-white"
        />
        <PulseColumn
          title="Migrated"
          data={pulseData.migrated as PulseCardData[]}
          headerColor="text-white"
        />
      </div>
    </div>
  );
}
