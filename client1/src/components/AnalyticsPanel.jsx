import { BarChart, Bar, XAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function AnalyticsPanel({ data }) {
  if (!data) return <p>Loading analytics 📊...</p>;

  const formatted = data.topTags.map(t => ({ name: t._id, value: t.count }));

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-lg font-bold mb-2">📊 Analytics</h2>

      <p>Total queries: {data.total}</p>
      <p className="text-red-500">SLA Breaches: {data.slaBreach}</p>

      <div className="h-48 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
