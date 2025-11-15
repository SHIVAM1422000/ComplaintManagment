export default function PriorityBadge({ level }) {
  const colors = {
    high: "bg-red-200 text-red-700",
    medium: "bg-orange-200 text-orange-700",
    low: "bg-green-200 text-green-700",
  };

  return (
    <span className={`badge ${colors[level]}`}>
      {level}
    </span>
  );
}
