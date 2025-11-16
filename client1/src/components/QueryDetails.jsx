import Composer from "./Composer";
import PriorityBadge from "./PriorityBadge";

export default function QueryDetails({ q, onClose, onReply, onEscalate, onCloseTicket }) {
  if (!q) return <p className="text-gray-500">Select a query to view details 👀</p>;

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-2">📄 Query Details</h2>

      <PriorityBadge level={q.priority} />

      <p className="mt-3 text-gray-800">{q.message}</p>

      <div className="mt-4 flex gap-2">
        <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={() => onCloseTicket(q._id)}>Close</button>
        <button className="px-3 py-2 bg-red-500 text-white rounded" onClick={() => onEscalate(q._id)}>Escalate</button>
      </div>

      <Composer onSend={(t) => onReply(q._id, t)} />
    </div>
  );
}
