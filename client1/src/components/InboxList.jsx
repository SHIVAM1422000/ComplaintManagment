import QueryCard from "./QueryCard";

export default function InboxList({ list, onOpen, onAssign, onEscalate }) {
  return (
    <div className="space-y-4">
      {list.length === 0 && <p className="text-gray-500">No queries yet 😢</p>}

      {list.map(q => (
        <QueryCard 
          key={q._id}
          q={q}
          onOpen={onOpen}
          onAssign={onAssign}
          onEscalate={onEscalate}
        />
      ))}
    </div>
  );
}
