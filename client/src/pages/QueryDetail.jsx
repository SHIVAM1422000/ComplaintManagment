import { useEffect, useState } from "react";
import AIReplyBox from "../components/AIReplyBox";
import { API } from "../api/api";

export default function QueryDetail() {
  const id = location.pathname.split("/")[2];
  const [q, setQ] = useState(null);

  useEffect(() => {
    API.get(`/${id}`).then(res => setQ(res.data));
  }, []);

  if (!q) return "Loading...";

  return (
    <div className="card max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-3">Customer Query</h2>

      <p className="text-gray-700 mb-6">{q.message}</p>

      {/* <AIReplyBox message={q.message} /> */}

      <div className="mt-8">
        <select
          className="p-3 rounded-xl border"
          onChange={e =>
            API.patch(`/${q._id}`, { status: e.target.value })
          }
        >
          <option value="open">Open</option>
          <option value="progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
    </div>
  );
}
