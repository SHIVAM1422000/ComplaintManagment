import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, isAdmin, isAgent, isUser } = useAuth();

  const linkBase =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition text-gray-300 hover:bg-white/10";

  const linkActive =
    "bg-gradient-to-r from-indigo-500/30 to-purple-500/20 text-white shadow-[0_0_18px_rgba(99,102,241,0.5)]";

  // ✅ SAFE DATA
  const companyName =
    typeof user?.company === "string"
      ? user.company.toUpperCase()
      : "ORGANIZATION";

  const userName = user?.name || "User";
  const userRole = user?.role || "user";

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-[#020617] to-[#020617] border-r border-white/10 backdrop-blur-xl flex flex-col">
      
      {/* BRAND */}
      <div className="px-5 pt-6 pb-4 border-b border-white/10">
        <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Query360
        </h1>
      </div>

      {/* USER STATUS (ONLINE) */}
      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          
          {/* Online Dot */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>

          {/* User Info */}
          <div className="leading-tight">
            <div className="text-sm font-semibold text-gray-200">
              {userName || "not logged in"}
            </div>
            <div className="text-xs text-gray-400 capitalize">
              {userRole} • {companyName}
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {(isAdmin || isAgent) && (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              📊 <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/inbox"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              📥 <span>Inbox</span>
            </NavLink>
          </>
        )}

        {isUser && (
          <NavLink
            to="/add-fake"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
          >
            ➕ <span>Submit Complaint</span>
          </NavLink>
        )}
      </nav>

      {/* FOOTER */}
      <div className="px-5 py-4 border-t border-white/10 text-xs text-gray-500">
        © {new Date().getFullYear()} Query360
      </div>
    </aside>
  );
}
