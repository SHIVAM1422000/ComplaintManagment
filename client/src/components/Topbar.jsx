export default function Topbar() {
  return (
    <div className="h-16 glass flex items-center px-6 justify-between">
      <input
        placeholder="Search queries…"
        className="w-72 px-4 py-2 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
      />
      <div className="font-medium">Team Dashboard</div>
    </div>
  );
}
