export default function StatusBadge({ status }) {
  const colors = {
    open: "bg-red-100 text-red-600",
    progress: "bg-yellow-100 text-yellow-600",
    resolved: "bg-green-100 text-green-600",
  };

  return (
    <span className={`badge ${colors[status] || "bg-gray-200"}`}>
      {status}
    </span>
  );
}
