"use client";

import { memo, useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

function RowSparkline({
  data,
  color = "#22c55e",
}: {
  data: number[];
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  // ✅ HOOKS MUST COME FIRST
  useEffect(() => {
    if (!canvasRef.current) return;

    // Not enough data → do nothing (but DO NOT return JSX here)
    if (!data || data.length < 2) return;

    // StrictMode safe
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: data.map((_, i) => i),
        datasets: [
          {
            data,
            borderColor: color,
            borderWidth: 1.5,
            tension: 0.3,
            pointRadius: 0,
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [data, color]);

  // ✅ CONDITIONAL UI AFTER HOOKS
  if (!data || data.length < 2) {
    return <div className="relative h-[20px] w-[96px] rounded bg-white/5" />;
  }

  return (
    <div className="relative h-[20px] min-h-[20px] w-[96px] min-w-[96px]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

export default memo(RowSparkline);
