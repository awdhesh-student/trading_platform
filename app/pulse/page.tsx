import React from "react";
import Pulse from "../../components/pulse/Pulse";

export default function PulsePage() {
  return (
    <div className="overflow-y-auto w-full h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      <div className="mx-auto w-full max-w-[1920px]">
        <Pulse />
      </div>
      <div className="h-10" />
    </div>
  );
}
