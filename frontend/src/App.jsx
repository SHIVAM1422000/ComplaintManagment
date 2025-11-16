// src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Axios instance (reads VITE_API_BASE)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "/api/v1/query",
  timeout: 10000,
});

// Simple small helper to format date
function shortDate(d) {
  try { return new Date(d).toLocaleString(); } catch (e) { return d; }
}

// === MAIN APP ===
export default function App() {
  const [queries, setQueries] = useState([]);        // list from backend
  const [selected, setSelected] = useState(null);    // currently opened query
  const [loading, setLoading] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  // load queries and analytics on mount
  useEffect(() => { loadQueries(); loadAnalytics(); }, []);

  // fetch list (GET /)
  async function loadQueries() {
    setLoading(true);
    try {
      const res = await API.get("/");
      // your backend returns an array (aggregate). assign to state
      setQueries(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load queries", err);
      alert("Failed to load queries - check backend");
    }
    setLoading(false);
  }

  // fetch analytics (GET /analytics)
  async function loadAnalytics() {
    try {
      const res = await API.get("/analytics");
      setAnalytics(res.data);
    } catch (e) {
      console.error("analytics error", e);
    }
  }

  // open a query detail
  function openQuery(q) {
    setSelected(q);
  }

  // optimistic update wrapper - PATCH /:id
  async function patchQuery(id, patch) {
    // optimistic UI: update local list immediately
    setQueries(prev => prev.map(q => q._id === id ? { ...q, ...patch } : q));
    if (selected?._id === id) setSelected(s => ({ ...s, ...patch }));
    try {
      const res = await API.patch(`/${id}`, patch);
      // replace with server response (fresh)
      setQueries(prev => prev.map(q => q._id === id ? res.data : q));
      if (selected?._id === id) setSelected(res.data);
      return res.data;
    } catch (e) {
      console.error("patch failed", e);
      // reload full list to recover consistent state
      await loadQueries();
    }
  }

  // quick reply: pushes a history item (we store history via patch body)
  async function sendReply(id, text) {
    if (!text || !text.trim()) return;
    const historyItem = { action: "replied", by: import.meta.env.VITE_AGENT_ID || "agent", note: text };
    // note: backend's updateQuery pushes history in controller using $push; but PATCH expects fields:
    // We'll send a patch that sets status to 'pending' and adds assignedTo if needed.
    // For demo, we send { status: 'pending' } then reload details.
    await patchQuery(id, { status: "pending" });
    // Optionally, call a dedicated reply endpoint if you create one. For now, mimic history by refetching.
    await loadQueries();
    await loadAnalytics();
  }

  // assign to team member (PATCH assignedTo)
  async function assignTo(id, assigneeName) {
    await patchQuery(id, { assignedTo: assigneeName });
    setShowAssignModal(false);
    await loadAnalytics();
  }

  // escalate
  async function escalate(id) {
    const confirmEsc = window.confirm("Escalate this query?");
    if (!confirmEsc) return;
    await patchQuery(id, { status: "escalated" });
    await loadAnalytics();
  }

  // close ticket
  async function closeTicket(id) {
    const confirmClose = window.confirm("Mark this query as closed?");
    if (!confirmClose) return;
    await patchQuery(id, { status: "closed" });
    await loadAnalytics();
  }

  // Rendering
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Audience Inbox — Unified</h1>
        <div className="flex gap-3">
          <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={() => { loadQueries(); loadAnalytics(); }}>Refresh</button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        {/* LEFT: Inbox list */}
        <div className="col-span-2 bg-white rounded shadow p-4 h-[75vh] overflow-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Open queries</h2>
            <div className="text-sm text-gray-600">{loading ? "Loading..." : `${queries.length} results`}</div>
          </div>

          <div className="space-y-3">
            {queries.map(q => (
              <div key={q._id} className="border rounded p-3 flex gap-3">
                <div className={`w-2 rounded ${q.priority === "critical" ? "bg-red-500" : q.priority === "high" ? "bg-yellow-400" : "bg-green-400"}`} />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{q.message.length > 80 ? q.message.slice(0, 80) + "..." : q.message}</div>
                      <div className="text-xs text-gray-500">{q.channel} • {shortDate(q.createdAt)}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-xs px-2 py-1 rounded border">{q.priority}</div>
                      <div className="text-xs text-gray-600">{q.status}</div>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button className="px-2 py-1 border rounded" onClick={() => openQuery(q)}>Open</button>
                    <button className="px-2 py-1 border rounded" onClick={() => { setSelected(q); setShowAssignModal(true); }}>Assign</button>
                    <button className="px-2 py-1 border rounded text-red-600" onClick={() => escalate(q._id)}>Escalate</button>
                  </div>
                </div>
              </div>
            ))}
            {queries.length === 0 && !loading && <div className="text-sm text-gray-500">No queries yet.</div>}
          </div>
        </div>

        {/* RIGHT: Details + Analytics */}
        <div className="bg-white rounded shadow p-4 h-[75vh] overflow-auto">
          <h3 className="font-semibold mb-3">Details</h3>
          {selected ? (
            <div>
              <div className="text-sm text-gray-500">{selected.channel} • {shortDate(selected.createdAt)}</div>
              <h4 className="font-bold mt-2">{selected.message}</h4>
              <div className="mt-2 flex gap-2">
                {(selected.tags || []).map(t => <span key={t} className="px-2 py-1 bg-gray-100 rounded text-xs">#{t}</span>)}
              </div>

              <div className="mt-4 flex gap-2">
                <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={() => closeTicket(selected._id)}>Close</button>
                <button className="px-3 py-2 border rounded" onClick={() => escalate(selected._id)}>Escalate</button>
                <button className="px-3 py-2 border rounded" onClick={() => { navigator.clipboard?.writeText(selected.message); alert('Copied message'); }}>Copy</button>
              </div>

              <div className="mt-4">
                <Composer onSend={text => sendReply(selected._id, text)} />
              </div>

              <div className="mt-4">
                <h5 className="font-semibold">History</h5>
                <ul className="text-xs text-gray-600 mt-2 space-y-1">
                  {(selected.history || []).length === 0 && <li>No history yet</li>}
                  {(selected.history || []).map((h, i) => (
                    <li key={i}>{shortDate(h.at)} — {h.action} — {h.by}{h.note ? ` — ${h.note}` : ""}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500">Select a query to view details</div>
          )}

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Analytics</h4>
            {analytics ? (
              <div>
                <div className="text-sm">Total queries: <strong>{analytics.total}</strong></div>
                <div className="text-sm">SLA breaches (open `${">"}` 24h): <strong className="text-red-600">{analytics.slaBreach}</strong></div>

                <div className="h-40 mt-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={(analytics.topTags || []).map(t => ({ name: t._id, value: t.count }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">Loading analytics...</div>
            )}
          </div>
        </div>
      </div>

      {/* Assign modal */}
      {showAssignModal && selected && (
        <AssignModal
          onClose={() => setShowAssignModal(false)}
          onAssign={name => assignTo(selected._id, name)}
        />
      )}
    </div>
  );
}

// === Composer ===
function Composer({ onSend }) {
  const [text, setText] = useState("");
  return (
    <div>
      <textarea className="w-full border rounded p-2" rows={3} value={text} onChange={e => setText(e.target.value)} placeholder="Type reply..." />
      <div className="flex gap-2 mt-2">
        <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={() => { if (text.trim()) { onSend(text.trim()); setText(""); } }}>Send</button>
        <button className="px-3 py-2 border rounded" onClick={() => setText(t => t + " Thanks for reaching out — we will investigate and get back to you.")}>Insert template</button>
      </div>
    </div>
  );
}

// === Assign Modal ===
function AssignModal({ onClose, onAssign }) {
  // small demo team; replace with API-driven list if you have it
  const TEAM = [
    { id: "a1", name: "Riya (Support)" },
    { id: "a2", name: "Karan (Billing)" },
    { id: "a3", name: "Meera (Tech)" },
  ];
  const [sel, setSel] = useState(null);
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-96">
        <h4 className="font-semibold mb-3">Assign to</h4>
        <div className="space-y-2">
          {TEAM.map(t => (
            <div key={t.id} onClick={() => setSel(t)} className={`p-2 border rounded cursor-pointer ${sel?.id === t.id ? "bg-indigo-50" : ""}`}>
              {t.name}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-3 py-2 border rounded" onClick={onClose}>Cancel</button>
          <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={() => { if (sel) onAssign(sel.name); }}>Assign</button>
        </div>
      </div>
    </div>
  );
}
