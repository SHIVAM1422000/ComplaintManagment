import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 bg-white shadow-xl p-6 flex flex-col gap-5 border-r">
      <Link className="font-semibold text-lg hover:text-purple-600" to="/dashboard">📊 Dashboard</Link>
      <Link className="font-semibold text-lg hover:text-purple-600" to="/inbox">📥 Inbox</Link>
      <Link className="font-semibold text-lg hover:text-purple-600" to="/add-fake">➕ Submit Complaint</Link>
    </div>
  );
}
