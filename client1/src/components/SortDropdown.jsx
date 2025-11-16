function SortDropdown({ onSort }) {
  return (
    <select
      onChange={(e) => onSort(e.target.value)}
      className="px-3 py-2 rounded-xl border shadow-sm"
    >
      <option value="">Sort By</option>
      <option value="priority">Priority</option>
      <option value="origin">Origin (A → Z)</option>
      <option value="latest">Latest</option>
      <option value="oldest">Oldest</option>
    </select>
  );
}

export default SortDropdown;