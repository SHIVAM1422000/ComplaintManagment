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
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};
    console.log("Upating Ticket:", ticket._id, updateData);

    try {
      await axios.patch(
        `http://localhost:8000/api/v1/query/${ticket._id}`,
        updateData, config
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border">
      {/* main */}
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold"> Ticked ID: 📝 {ticket._id}</h3>
        <PriorityTag level={ticket.priority} />
      </div>
      <p className="text-gray-600 mt-2">{ticket.message}</p>
      <p className="text-sm text-gray-400 mt-3">Status: {ticket.status}</p>
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
      {/* // assignment dropdown */}
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
    </div>
  );
}
