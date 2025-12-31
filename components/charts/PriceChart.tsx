"use client";

import { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip
);

type Props = {
  data: number[];
};

export default function PriceChart({ data }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create chart ONCE
    if (!chartRef.current) {
      chartRef.current = new Chart(canvasRef.current, {
        type: "line",
        data: {
          labels: data.map((_, i) => i.toString()),
          datasets: [
            {
              data,
              borderColor: "#22c55e",
              borderWidth: 2,
              tension: 0.3,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              intersect: false,
              mode: "index",
            },
          },
          scales: {
            x: { display: false },
            y: { display: false },
          },
        },
      });
    } else {
      // Update chart data
      chartRef.current.data.labels = data.map((_, i) => i.toString());
      chartRef.current.data.datasets[0].data = data;
      chartRef.current.update("none");
    }
  }, [data]);

  // Cleanup
  useEffect(() => {
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  return (
    <div className="h-32 w-full">
      <canvas ref={canvasRef} />
    </div>
  );
}
