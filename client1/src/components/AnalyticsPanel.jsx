import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadialBarChart,
  RadialBar,
} from "recharts";
import SentimentGauge from "./SentimentGauge";

export default function AnalyticsPanel({ data }) {
  if (!data) return <p>Loading analytics 📊...</p>;

  // --- Colors ---
  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"];

  // --- Top tags bar chart ---
  const topTags = data.topTags.map((t, i) => ({
    name: t._id,
    value: t.count,
    fill: COLORS[i % COLORS.length],
  }));

  // --- Priority pie chart ---
  const priorityData = [
    { name: "Critical", value: data.priorities.critical },
    { name: "High", value: data.priorities.high },
    { name: "Medium", value: data.priorities.medium },
    { name: "Low", value: data.priorities.low },
  ];

  // --- Status pie chart ---
  const statusData = [
    { name: "Open", value: data.status.open },
    { name: "Closed", value: data.status.closed },
  ];

  const sentimentPercent = Math.round(data.avgSentiment * 100);

  // --- Sentiment gauge (0 to 1 scale) ---
  const sentiment = [
    {
      name: "Sentiment",
      value: sentimentPercent,
      fill:
        sentimentPercent > 60
          ? "#10b981"
          : sentimentPercent > 30
          ? "#f59e0b"
          : "#ef4444",
    },
  ];

  return (
    
    <div className="grid grid-cols-3 gap-6 w-full h-full">

      {/* Summary Cards */}
      <div className="col-span-3 grid grid-cols-4 gap-4">
        <div className="p-4 rounded-xl shadow bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <h3 className="text-sm">Total Queries</h3>
          <p className="text-2xl font-bold">{data.total}</p>
        </div>

        <div className="p-4 rounded-xl shadow bg-gradient-to-r from-red-500 to-red-600 text-white">
          <h3 className="text-sm">SLA Breaches</h3>
          <p className="text-2xl font-bold">{data.slaBreach}</p>
        </div>

        <div className="p-4 rounded-xl shadow bg-gradient-to-r from-green-500 to-green-600 text-white">
          <h3 className="text-sm">Avg Sentiment</h3>
          <p className="text-2xl font-bold">{data.avgSentiment.toFixed(2)}</p>
        </div>

        <div className="p-4 rounded-xl shadow bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <h3 className="text-sm">Top Tag</h3>
          <p className="text-xl font-semibold">
            {data.topTags[0]?._id || "N/A"}
          </p>
        </div>
      </div>

      {/* Priority Breakdown */}
      <div className="bg-white p-4 shadow rounded-xl">
        <h3 className="font-semibold mb-2">🔥 Priority Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={priorityData} dataKey="value" outerRadius={90} label>
              {priorityData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Status Breakdown */}
      <div className="bg-white p-4 shadow rounded-xl">
        <h3 className="font-semibold mb-2">📌 Status Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={statusData} dataKey="value" outerRadius={90} label>
              {statusData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Sentiment Gauge */}
      <div className="bg-white p-4 shadow rounded-xl">
        <h3 className="font-semibold mb-2">💬 Sentiment Score</h3>
        <div className="w-full flex justify-center">
          <SentimentGauge score={data.avgSentiment} />
        </div>
      </div>

      {/* Top Tags Bar Chart (Full Width) */}
      <div className="col-span-3 bg-white p-4 shadow rounded-xl">
        <h3 className="font-semibold mb-2">🏷️ Most Used Tags</h3>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={topTags}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" barSize={40}>
              {topTags.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
