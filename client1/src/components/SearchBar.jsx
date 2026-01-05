export default function SearchBar({ value, setSearch, searchChangeHandler }) {
  return (
    <input
      placeholder="🔍 Search tickets..."
      className="px-4 py-2 rounded-xl border w-full shadow-sm"
      value={value}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    />
  );
}
