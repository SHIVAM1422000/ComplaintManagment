import { useState } from "react";

export default function Composer({ onSend }) {
  const [text, setText] = useState("");

  return (
    <div className="mt-4">
      <textarea 
        rows={3}
        className="w-full border p-3 rounded-lg shadow-sm"
        placeholder="Write a reply ✍️..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button 
        onClick={() => { onSend(text); setText(""); }}
        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Send Reply 🚀
      </button>
    </div>
  );
}
