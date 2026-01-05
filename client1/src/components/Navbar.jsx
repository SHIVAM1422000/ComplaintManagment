import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header
      className="
        sticky top-0 z-30
        bg-gradient-to-r from-[#020617]/95 via-[#020617]/85 to-[#020617]/95
        backdrop-blur-xl
        border-b border-white/10
        shadow-[0_4px_30px_rgba(99,102,241,0.18)]
      "
    >
      <div className="relative h-14 flex items-center px-6">
        
        {/* CENTER BRAND (true visual center) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <h2 className="text-xl font-semibold tracking-wide bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Query360
            <span className="text-m font-normal text-gray-400 ml-2">
              An AI Complaint Manager
            </span>
          </h2>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="ml-auto">
          {user && (
            <button
              onClick={logout}
              className="
                px-4 py-1.5 rounded-lg text-sm font-semibold
                bg-gradient-to-r from-red-500/80 to-red-600/80
                text-white
                hover:shadow-[0_0_18px_rgba(239,68,68,0.6)]
                transition
              "
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
