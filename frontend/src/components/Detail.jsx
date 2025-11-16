import React, { useState } from "react";
import { api } from "../api";

export default function Detail({ query, onUpdate }) {
  const [reply, setReply] = useState("");

  if (!query)
    return (
      <div className="bg-white p-6 rounded shadow text-slate-500">
        Select a query to view details
      </div>
    );

  const id = query._id || query.id;

  const doReply = async () => {
    if (!reply) return alert("Write a reply");
    try {
      await api.patch(id, { status: "responded" });
      setReply("");
      onUpdate();
    } catch (e) {
      console.error(e);
      alert("Failed");
    }
  };

  const doAssign = async () => {
    const who = prompt("Assign to (email/id)");
    if (!who) return;
    try {
      await api.patch(id, { assignedTo: who });
      onUpdate();
    } catch (e) {
      console.error(e);
    }
  };

  const setStatus = async () => {
    const s = prompt("status (open/responded/closed)", query.status || "open");
    if (!s) return;
    try {
      await api.patch(id, { status: s });
      onUpdate();
    } catch (e) {
      console.error(e);
    }
  };

  const getSuggested = async () => {
    try {
      const res = await api.suggest(id);
      setReply(res.text);
    } catch (e) {
      console.warn("no suggest");
      alert("No suggestion endpoint");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {(query.tags || []).join(", ") || query.channel}
          </h3>
          <div className="text-sm text-slate-500">
            {query.channel} ·{" "}
            {query.assignedTo
              ? `Assigned to ${query.assignedTo}`
              : "Unassigned"}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">
            {new Date(query.createdAt).toLocaleString()}
          </div>
          <div className="mt-2">
            Priority: <span className="font-semibold">{query.priority}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 border rounded bg-slate-50 whitespace-pre-wrap">
        {query.message}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={getSuggested}
          className="px-3 py-2 border rounded text-sm"
        >
          Suggest
        </button>
        <button onClick={doAssign} className="px-3 py-2 border rounded text-sm">
          Assign
        </button>
        <button
          onClick={setStatus}
          className="px-3 py-2 border rounded text-sm"
        >
          Set Status
        </button>
      </div>

      <div className="mt-4">
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={4}
          className="w-full border px-3 py-2 rounded"
          placeholder="Write reply..."
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={doReply}
            className="px-4 py-2 bg-slate-900 text-white rounded"
          >
            Send Reply
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-sm mb-2">History</h4>
        <div className="space-y-2">
          {(query.history || [])
            .slice()
            .reverse()
            .map((h, i) => (
              <div key={i} className="p-2 border rounded bg-white">
                <div className="text-xs text-slate-400">
                  {h.by || h.action || h.type} ·{" "}
                  {h.at ? new Date(h.at).toLocaleString() : ""}
                </div>
                <div className="text-sm">
                  {h.text || h.body || h.action || JSON.stringify(h)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
