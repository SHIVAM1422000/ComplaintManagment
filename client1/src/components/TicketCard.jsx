import axios from "axios";
import PriorityTag from "./PriorityTag";
import OriginTag from "./OriginTag";

export default function TicketCard({ ticket }) {
  const updateTicket = async (field, value) => {
    //  "status": "againOPened",
    //  "assignedTo": "ROHAN",
    const updateData = {
      [field]: value,
    };
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    console.log("Upating Ticket:", ticket._id, updateData);

    try {
      await axios.patch(
        `http://localhost:8000/api/v1/query/${ticket._id}`,
        updateData,
        config
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-5 bg-white rounded-2xl shadow-xl hover:shadow-2xl border transition-all duration-300">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold"> Ticked ID: 📝 {ticket._id}</h3>
        <PriorityTag level={ticket.priority} />
      </div>

      <p className="text-gray-600 mt-2">{ticket.message}</p>
      <p
        className="text-sm text-gray-400 mt-3"
        style={{ fontWeight: "bold", color: "red" }}
      >
        STATUS: {ticket.status}
      </p>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8  p-3 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold">
          {ticket?.assignedTo
            ?.split(" ")
            .map((w) => w[0])
            .join("") || "?"}
        </div>
      </div>
      {/* // change status dropdown */}
      <select
        className="border px-2 py-1 rounded"
        value={ticket.status}
        onChange={(e) => updateTicket("status", e.target.value)}
      >
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>

      <select
        className="border px-2 py-1 rounded"
        value={ticket.assignedTo}
        onChange={(e) => updateTicket("assignedTo", e.target.value)}
      >
        <option value="">Unassigned</option>
        <option value="Support Team">Support Team</option>
        <option value="Tech Team">Tech Team</option>
        <option value="Sales Team">Sales Team</option>
      </select>
      <OriginTag origin={ticket.channel} />

      {/* Change History */}
      {ticket.history && (
        <details className="mt-2">
          <summary className="text-sm text-gray-600 cursor-pointer">
            Track Progress History
          </summary>
          <ul className="list-disc ml-6">
            {ticket.history.map((h, i) => (
              <li key={i} className="text-xs text-gray-500">
                {h.action} by {h.by} at {new Date(h.at).toLocaleString()}
              </li>
            ))}
          </ul>
        </details>
      )}

    </div>
  );
}
