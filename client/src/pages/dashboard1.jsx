


import { useEffect, useState } from "react";
import { API } from "../api/api";


export default function Dashboard1() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/analytics")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div className="p-6">Loading Analytics...</div>;

  const { total, priorities, status, slaBreach, avgSentiment, topTags } = data;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      {/* Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-gray-700 font-semibold">Total Queries</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-red-100 p-4 rounded shadow">
          <p className="text-gray-700 font-semibold">Critical Priority</p>
          <p className="text-2xl font-bold">{priorities.critical}</p>
        </div>

        <div className="bg-orange-100 p-4 rounded shadow">
          <p className="text-gray-700 font-semibold">High Priority</p>
          <p className="text-2xl font-bold">{priorities.high}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-gray-700 font-semibold">Medium Priority</p>
          <p className="text-2xl font-bold">{priorities.medium}</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-gray-700 font-semibold">Low Priority</p>
          <p className="text-2xl font-bold">{priorities.low}</p>
        </div>

        <div className="bg-indigo-100 p-4 rounded shadow">
          <p className="text-gray-700 font-semibold">SLA Breaches (24h+)</p>
          <p className="text-2xl font-bold">{slaBreach}</p>
        </div>

      </div>


      {/* Status Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-200 p-4 rounded shadow">
          <p className="text-gray-800 font-semibold">Open Tickets</p>
          <p className="text-3xl font-bold">{status.open}</p>
        </div>

        <div className="bg-gray-300 p-4 rounded shadow">
          <p className="text-gray-800 font-semibold">Closed Tickets</p>
          <p className="text-3xl font-bold">{status.closed}</p>
        </div>
      </div>

      {/* Sentiment */}
      <div className="bg-purple-100 p-4 rounded shadow">
        <p className="text-gray-700 font-semibold">Average Sentiment</p>
        <p className="text-2xl font-bold">{avgSentiment.toFixed(2)}</p>
      </div>

      {/* Top Tags */}
      <div className="bg-white border p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Top Tags</h2>

        <ul className="list-disc ml-5">
          {topTags.map(tag => (
            <li key={tag._id} className="text-gray-700">
              {tag._id} — <strong>{tag.count}</strong>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

