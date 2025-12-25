import React from "react";
import { useAuth } from "../../context/AuthContext";

const ChangeTeam = ({ ticketData, updateTicket }) => {
  const { isAgent, isAdmin } = useAuth();

  return (
    <>
      <div className="flex items-center gap-2">
        {(isAgent || isAdmin) && (
          <label>
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
          </label>
        )}
      </div>
    </>
  );
};

export default ChangeTeam;
