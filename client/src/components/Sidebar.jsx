import { Inbox, BarChart3, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white/70 backdrop-blur-lg border-r border-gray-200 p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-10">Unified Inbox</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/">
          <div className="flex items-center gap-3 text-lg p-3 rounded-xl hover:bg-gray-100 transition">
            <Inbox size={22} /> Inbox
          </div>
        </Link>

        <Link to="/analytics">
          <div className="flex items-center gap-3 text-lg p-3 rounded-xl hover:bg-gray-100 transition">
            <BarChart3 size={22} /> Analytics
          </div>
        </Link>
      </nav>
    </div>
  );
}
