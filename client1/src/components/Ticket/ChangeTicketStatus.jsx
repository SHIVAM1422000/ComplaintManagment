import React from "react";
import { useAuth } from "../../context/AuthContext";

const ChangeTicketStatus = ({ ticketData, updateTicket }) => {
  const { isAgent, isAdmin } = useAuth();
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {(isAgent || isAdmin) && (
          <select
            className="border px-2 py-1 rounded"
            value={ticketData.status}
            onChange={(e) => updateTicket("status", e.target.value)}
            placeHolder=" Change Status"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        )}
      </div>
    </>
  );
};

export default ChangeTicketStatus;
