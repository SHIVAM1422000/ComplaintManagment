import React, { useEffect, useState } from "react";

const TicketHistory = ({ ticket }) => {
  const [viewTH, setViewTH] = useState([]);
  useEffect(() => {
    setViewTH(ticket.history.slice(-10));
    // console.log(" &&&&& " , ticket.history.slice(-10));
    
  }, []);

  return (
    <>
      <details className="mt-2">
        <summary className="text-sm text-gray-600 cursor-pointer">
          Track Progress History
        </summary>
        {
          <ul className="list-disc ml-6">
            {viewTH.length > 0
              ? viewTH.map((h, i) => (
                  <li key={i} className="text-xs text-gray-500">
                    {h.action} by {h.by} at {new Date(h.at).toLocaleString()}
                  </li>
                ))
              : (
                  <li className="text-xs text-gray-500">
                    {"No History Found"}
                  </li>
                )}
          </ul>
        }
      </details>
    </>
  );
};

export default TicketHistory;
