export default function PriorityTag({ level }) {
  const colors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-white text-sm ${colors[level]}`}>
      {level.toUpperCase()}
    </span>
  );
}
