export type PriceUpdate = {
  id: string;
  price: number;
  change: number;
};

export function startMockPriceSocket(
  ids: string[],
  onMessage: (update: PriceUpdate) => void
) {
  const interval = setInterval(() => {
    const id = ids[Math.floor(Math.random() * ids.length)];

    const delta = (Math.random() - 0.5) * 0.8;
    const price = Math.max(
      0.1,
      Number((100 + Math.random() * 3000).toFixed(2))
    );

    onMessage({
      id,
      price,
      change: Number(delta.toFixed(2)),
    });
  }, 1200);

  return () => clearInterval(interval);
}
