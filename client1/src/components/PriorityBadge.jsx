export default function PriorityBadge({ level }) {
  const map = {
    critical: "bg-red-500 text-white",
    high: "bg-orange-400 text-white",
    medium: "bg-yellow-300 text-black",
    low: "bg-green-400 text-black",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${map[level]}`}>
      {level.toUpperCase()}
    </span>
  );
}
