// components/Inbox.js

import axios from "axios";
import { useEffect, useState } from "react";
import TicketCard from "../components/TicketCard";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";

function Inbox() {
  const [tickets, setTickets] = useState([]);
  const [visibleTickets, setVisibleTickets] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    axios.get(`https://complaintmanagment.onrender.com/api/v1/query`)
      .then(res => {
        setTickets(res.data);
        setVisibleTickets(res.data); // Initialize
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    // Filter after search update
    const filtered = tickets.filter(
      t =>
        t.message.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.channel.toLowerCase().includes(search.toLowerCase())
    );
    setVisibleTickets(filtered);
  }, [search, tickets]);

  const handleSort = type => {
    let sorted = [...visibleTickets];
    if (type === "priority") {
      // Priority custom order
      const order = { critical: 1, high: 2, medium: 3, low: 4 };
      sorted.sort((a, b) => (order[a.priority] || 99) - (order[b.priority] || 99));
    }
    if (type === "origin") {
      sorted.sort((a, b) => a.channel.localeCompare(b.channel));
    }
    if (type === "latest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (type === "oldest") {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    setVisibleTickets(sorted);
  };

  if(!tickets.length) {
    return <div className="p-6">Loading tickets...</div>;
  }
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Inbox</h2>
      <div className="flex gap-4">
        <SearchBar value={search} onChange={setSearch} />
        <SortDropdown onSort={handleSort} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleTickets.map(ticket => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
export default Inbox;

