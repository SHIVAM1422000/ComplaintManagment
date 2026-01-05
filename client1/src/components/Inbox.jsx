import { BarLoader } from "react-spinners";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import { useQuery } from "../context/QueryContext";
import OriginTag from "./OriginTag";

const priorityGlow = {
  critical: "text-red-400",
  high: "text-orange-400",
  medium: "text-yellow-300",
  low: "text-green-400",
};

export default function Inbox() {
  const { tickets, loadingTickets, visibleTickets, setVisibleTickets } =
    useQuery();

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // column widths
  const [widths, setWidths] = useState({
    priority: 120,
    ticket: 120,
    message: 420,
    origin: 120,
    status: 120,
    created: 180,
  });

  const resizing = useRef(null);

  const onMouseMove = (e) => {
    if (!resizing.current) return;
    const { key, startX, startWidth } = resizing.current;
    const delta = e.clientX - startX;

    setWidths((w) => ({
      ...w,
      [key]: Math.max(80, startWidth + delta),
    }));
  };

  const onMouseUp = () => {
    resizing.current = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const startResize = (key) => (e) => {
    resizing.current = {
      key,
      startX: e.clientX,
      startWidth: widths[key],
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const searchChangeHandler = () => {
    setVisibleTickets(
      tickets.filter(
        (t) =>
          t.message.toLowerCase().includes(search.toLowerCase()) ||
          t._id.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (!tickets.length) return;
    setVisibleTickets(
      tickets.filter(
        (t) =>
          t.message.toLowerCase().includes(search.toLowerCase()) ||
          t._id.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [tickets]);

  if (loadingTickets) {
    return <BarLoader width="100%" height="3px" color="#6366f1" />;
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Inbox
        </h1>
        <div className="flex gap-3">
          <SearchBar
            value={search}
            setSearch={setSearch}
            searchChangeHandler={searchChangeHandler}
          />
          <SortDropdown onSort={() => {}} />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(99,102,241,0.15)] overflow-auto max-h-[75vh]">
        <table className="w-full text-sm">
          {/* ✅ REQUIRED FOR RESIZING */}
          <colgroup>
            <col style={{ width: widths.priority }} />
            <col style={{ width: widths.ticket }} />
            <col style={{ width: widths.message }} />
            <col style={{ width: widths.origin }} />
            <col style={{ width: widths.status }} />
            <col style={{ width: widths.created }} />
          </colgroup>

          <thead className="bg-gradient-to-r from-indigo-600/30 to-purple-600/20 text-gray-300 uppercase text-xs">
            <tr>
              {[
                ["Priority", "priority"],
                ["Ticket", "ticket"],
                ["Message", "message"],
                ["Origin", "origin"],
                ["Status", "status"],
                ["Created", "created"],
              ].map(([label, key]) => (
                <th
                  key={key}
                  className="px-4 py-3 text-left relative select-none"
                >
                  {label}
                  <span
                    className="resize-handle"
                    onMouseDown={startResize(key)}
                  />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleTickets.map((t) => (
              <tr
                key={t._id}
                onClick={() => navigate(`/query/${t._id}`)}
                className="border-t border-white/5 hover:bg-indigo-500/10 hover:shadow-[inset_0_0_0_1px_rgba(99,102,241,0.4)] transition cursor-pointer"
              >
                <td className={`px-4 py-3 ${priorityGlow[t.priority]}`}>
                  {t.priority.toUpperCase()}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-gray-400">
                  #{t._id.slice(-6)}
                </td>
                <td className="px-4 py-3 truncate">{t.message}</td>
                <td className="px-4 py-3">
                  <OriginTag origin={t.channel} />
                </td>
                <td className="px-4 py-3 text-indigo-300">{t.status}</td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {new Date(t.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
