export default function TokenRowSkeleton() {
  return (
    <tr className="border-t border-white/5">
      {Array.from({ length: 5 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 w-full rounded shimmer" />
        </td>
      ))}
    </tr>
  );
}
