import axios from "axios";
import { useEffect, useState } from "react";
import TicketCard from "../components/TicketCard";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";

function Inbox() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/query/")
      .then((res) => {
        setTickets(res.data);
        console.log("Tickets loaded:", res.data);
      })
      .catch(console.error);
  }, []);

  const filtered = tickets.filter((t) =>
    t.message.toLowerCase().includes(search.toLowerCase()) || t._id.toLowerCase().includes(search.toLowerCase()) || t.channel.toLowerCase().includes(search.toLowerCase())
  );

  const handleSort = (type) => {
    let sorted = [...filtered];

    if (type === "priority") {
      sorted.sort((a, b) => a.priority - b.priority);
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

    setTickets(sorted);
  };

  if (!tickets) return <div>Loading...</div>;
  return (
    filtered && (
      <div className="p-6 space-y-6">
        <h2 className="text-3xl font-bold">📥 Inbox</h2>

        <div className="flex gap-4">
          <SearchBar value={search} onChange={setSearch} />
          <SortDropdown onSort={handleSort} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      </div>
    )
  );
}

export default Inbox;
