import { useEffect, useState } from "react";

export function usePriceHistory(price: number) {
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    setHistory((prev) => {
      const next = [...prev, price];
      return next.length > 30 ? next.slice(-30) : next;
    });
  }, [price]);

  return history;
}
