export default function OriginTag({ origin }) {
  const colors = {
    facebook: "bg-blue-600",
    instagram: "bg-pink-500",
    linkedIn: "bg-blue-700",
    email: "bg-green-600",
    website: "bg-gray-700",
    whatsapp: "bg-green-500",
    twitter: "bg-blue-400", 
  };

  return (
    <span className={`px-2 py-1 text-white text-xs rounded ${colors[origin.toLowerCase()]}`}>
      {origin}
    </span>
  );
}