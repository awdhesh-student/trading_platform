export function generateNextCandle(prev: number) {
  const open = prev;
  const close = open + (Math.random() - 0.5) * 5;
  const high = Math.max(open, close) + Math.random() * 3;
  const low = Math.min(open, close) - Math.random() * 3;

  return {
    t: Date.now(),
    o: open,
    h: high,
    l: low,
    c: close,
  };
}
