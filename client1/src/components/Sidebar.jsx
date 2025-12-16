import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Sidebar() {
  const { isAdmin, isAgent, isUser } = useAuth();
  return (
    <div className="w-60 bg-white shadow-xl p-6 flex flex-col gap-5">
      {(isAdmin || isAgent) && (
        <>
          <Link to="/dashboard">📊 Dashboard</Link>
          <Link to="/inbox">📥 Inbox</Link>
        </>
      )}

      {isUser && <Link to="/add-fake">➕ Submit Complaint</Link>}
    </div>
  );
}
