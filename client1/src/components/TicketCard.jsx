import axios from "axios";
import PriorityTag from "./PriorityTag";
import OriginTag from "./OriginTag";
import API from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TicketCard({ ticket }) {
  const [ticketData, setTicketData] = useState({
    status: ticket.status,
    assignedTo: ticket.assignedTo,
  });
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/query/${ticket._id}`);
  };

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
      await API.patch(`/${ticket._id}`, updateData, config);
      setTicketData((prev) => ({
        ...prev,
        [field]: value,
      }));
      //  window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const capitalize = (s) => {
    const sol = s.charAt(0).toUpperCase() + s.slice(1);
    return sol;
  };

  const { isAgent, isAdmin } = useAuth();

  return (
    <div className="p-5 bg-white rounded-2xl shadow-xl hover:shadow-2xl border transition-all duration-300">
      <div className="flex justify-between items-center align-middle">
        <h3 className="text-xl font-semibold"> {capitalize(ticket.message)}</h3>
        <PriorityTag level={ticket.priority} />
      </div>
      <p className="text-black-800 mt-2">TICKED ID:{ticket._id}</p>
      <p
        className="text-sm text-gray-400 mt-3"
        style={{ fontWeight: "bold", color: "red" }}
      >
        STATUS: {ticketData.status}
      </p>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8  p-3 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold">
          {ticket?.assignedTo
            ?.split(" ")
            .map((w) => w[0])
            .join("") || "?"}
        </div>
      </div>
      {/* // change status dropdown */}( (isAgent || isAdmin) &&{" "}
      <select
        className="border px-2 py-1 rounded"
        value={ticketData.status}
        onChange={(e) => updateTicket("status", e.target.value)}
      >
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      ) ( (isAgent || isAdmin) &&{" "}
      <select
        className="border px-2 py-1 rounded"
        value={ticketData.assignedTo}
        onChange={(e) => updateTicket("assignedTo", e.target.value)}
      >
        <option value="">Unassigned</option>
        <option value="Support Team">Support Team</option>
        <option value="Tech Team">Tech Team</option>
        <option value="Sales Team">Sales Team</option>
      </select>
      )
      <button
        onClick={handleClick}
        type="button"
        class="cursor-pointer text-dark bg-success box-border border border border-dark hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
      >
        View Details
      </button>
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
