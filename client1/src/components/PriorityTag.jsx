export default function PriorityTag({ level }) {
  const color = {
    critical: "bg-red-600 text-white",
    high: "bg-yellow-500 text-black",
    medium: "bg-blue-400 text-white",
    low: "bg-green-600 text-white",
  }[level] || "bg-gray-300 text-black";
  return (
    <span className={`px-3 py-1 rounded-xl font-bold shadow-sm ${color}`}>
      {"PRIORITY: " + level?.toUpperCase() || "N/A"}
    </span>
  );
}