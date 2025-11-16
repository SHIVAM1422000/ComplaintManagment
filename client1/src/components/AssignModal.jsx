export default function AssignModal({ visible, onClose, onAssign }) {
  if (!visible) return null;

  const TEAM = ["Riya", "Karan", "Meera", "Support Bot"];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl w-80 shadow-xl">
        <h2 className="text-lg font-bold mb-3">Assign To</h2>

        {TEAM.map(t => (
          <div 
            key={t}
            className="p-2 border rounded mt-2 cursor-pointer hover:bg-indigo-50"
            onClick={() => onAssign(t)}
          >
            {t}
          </div>
        ))}

        <button onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
      </div>
    </div>
  );
}

