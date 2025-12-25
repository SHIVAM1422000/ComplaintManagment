import axios from "axios";
import PriorityTag from "../PriorityTag";
import OriginTag from "../OriginTag";
import API from "../../api/query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ChangeTicketStatus from "./ChangeTicketStatus";
import { Label } from "recharts";
import ChangeTeam from "./ChangeTeam";
import TicketStatusDisplay from "./TicketStatusDisplay";
import TicketHistory from "./TicketHistory";
import { useQuery } from "../../context/QueryContext";

export default function TicketCard({ ticket }) {
  const { user } = useAuth();

  const { tickets, setTickets, visibleTickets, setVisibleTickets } = useQuery();
  const [ticketData, setTicketData] = useState({
    status: ticket.status,
    assignedTo: ticket.assignedTo,
  });
  const navigate = useNavigate();
  const handleViewDetailsClick = () => {
    navigate(`/query/${ticket._id}`);
  };

  const deleteTicket = async () => {
    try {
      await API.delete(`/${ticket._id}`, deleteTicket);
      setVisibleTickets(visibleTickets.filter((t) => t._id !== ticket._id));
    } catch (error) {
      alert("Error Deleteing Ticket");
      console.log(error.message);
    }
  };

  const updateTicket = async (field, value) => {
    //  "status": "againOPened",
    //  "assignedTo": "ROHAN",
    const updateData = {
      [field]: value,
      userName: user.name,
    };

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    try {
      await API.patch(`/${ticket._id}`, updateData, config);
      setTicketData((prev) => ({
        ...prev,
        [field]: value,
      }));

      const newTicketsData = tickets.map((t) => {
        if (t._id === ticket._id) {
          const temp = {
            ...t,
            [field]: value,
            history: [...t.history, {action:"updated", [field]: value, by: user.name }],
          };
          console.log(temp);
          return temp;
          
        }
        return t;
      });

      setVisibleTickets(newTicketsData);



      //  window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const capitalize = (s) => {
    const sol = s.charAt(0).toUpperCase() + s.slice(1);
    return sol;
  };

  return (
    <div className="p-5 bg-white rounded-2xl shadow-xl hover:shadow-2xl border transition-all duration-300">
      <div className="flex justify-between items-center align-center">
        <h3 className="text-xl font-semibold"> {capitalize(ticket.message)}</h3>
        <PriorityTag level={ticket.priority} />
      </div>
      <p className="my-0 text-black-800 mt-2">TICKED ID:{ticket._id}</p>

      <TicketStatusDisplay ticketData={ticketData} />

      <div className="flex flex-row align-center justify-between">
        <button
          onClick={handleViewDetailsClick}
          className="bg-purple-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          View Details
        </button>

        <ChangeTeam updateTicket={updateTicket} ticketData={ticketData} />
        <ChangeTicketStatus
          updateTicket={updateTicket}
          ticketData={ticketData}
        />

        <OriginTag origin={ticket.channel} />
      </div>
      {/* Change History */}
      <TicketHistory ticket={ticket} />
    </div>
  );
}
