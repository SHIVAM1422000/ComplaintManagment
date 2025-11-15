export default function AnalyticsCards({ title, value }) {
  return (
    <div className="card text-center">
      <h3 className="text-lg text-gray-700">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
