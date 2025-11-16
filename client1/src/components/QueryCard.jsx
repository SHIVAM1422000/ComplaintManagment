import PriorityBadge from "./PriorityBadge";

export default function QueryCard({ q, onOpen, onAssign, onEscalate }) {
  return (
    <div 
      className="p-4 bg-white/80 backdrop-blur-md rounded-xl shadow hover:shadow-lg 
                 border border-gray-200 transition cursor-pointer hover:scale-[1.01]"
    >
      <div className="flex justify-between">
        <div>
          <div className="font-semibold text-gray-800 text-lg flex gap-1">
            📩 {q.message.slice(0, 50)}...
          </div>
          <div className="text-xs text-gray-500 mt-1">{q.channel} • {new Date(q.createdAt).toLocaleString()}</div>
        </div>
        <PriorityBadge level={q.priority} />
      </div>

      <div className="flex gap-2 mt-3">
        <button className="px-3 py-1 bg-indigo-500 text-white rounded"
          onClick={() => onOpen(q)}>Open</button>

        <button className="px-3 py-1 border rounded"
          onClick={() => onAssign(q)}>Assign</button>

        <button className="px-3 py-1 bg-red-500 text-white rounded"
          onClick={() => onEscalate(q._id)}>Escalate</button>
      </div>
    </div>
  );
}
