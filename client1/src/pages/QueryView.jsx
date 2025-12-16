import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import API from "../api/api";
import socket from "../socket/socket";
import ChatBox from "../components/ChatBox";

export default function QueryView() {
  const { id } = useParams();
  const [query, setQuery] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  const chatEndRef = useRef(null);

  const loadQuery = async () => {
    const res = await API.get(`/${id}`);
    setQuery(res.data);
  };

  useEffect(() => {
    loadQuery();

    socket.on("chat-message", (msg) => {
      if (msg.queryId === id) {
        setQuery((prev) => ({
          ...prev,
          chat: [...prev.chat, msg],
        }));
      }
    });

    return () => socket.off("chat-message");
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [query?.chat]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    await API.post(`/${id}/chat`, {
      sender: "Support Agent", // dynamic later
      message: newMsg,
    });

    setNewMsg("");
  };

  if (!query) return <p>Loading query…</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-xl h-[80vh] flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Query Chat 🗨️</h1>

      {/* Query Info */}
      <div className="p-4 bg-gray-100 rounded-lg mb-4">
        <p>
          <strong>Message:</strong> {query.message}
        </p>
        <p>
          <strong>Priority:</strong> {query.priority}
        </p>
        <p>
          <strong>Status:</strong> {query.status}
        </p>
        <p>
          <strong>Tags:</strong> {query.tags.join(", ")}
        </p>
      </div>


        <ChatBox queryId={query._id}/>

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto border p-4 rounded-lg bg-gray-50">
        {query.chat?.map((c, idx) => (
          <div key={idx} className="mb-3">
            <p className="text-sm font-semibold text-blue-600">{c.sender}</p>
            <p className="bg-white p-2 rounded-lg shadow inline-block">
              {c.message}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(c.timestamp).toLocaleString()}
            </p>
          </div>
        ))}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input Box */}
      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 border p-2 rounded-lg"
          placeholder="Type message…"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send ➤
        </button>
      </div>
    </div>
  );
}
