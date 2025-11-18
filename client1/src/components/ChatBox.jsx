import React, { useEffect, useState, useRef } from "react";
import { socket } from "../utils/socket";
import axios from "axios";
import URL from "../utility/helper";

export default function ChatBox({ queryId, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const ref = useRef();

  useEffect(() => {
    if (!queryId) return;
    // fetch history
    axios.get(`${URL/queryId}/chat`).then((r) => setMessages(r.data));
    // join room
    socket.emit("join:chat", queryId);

    const handler = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };
    socket.on("chat:new", handler);

    return () => {
      socket.off("chat:new", handler);
      socket.emit("leave:chat", queryId);
    };
  }, [queryId]);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!text.trim()) return;
    // emit via socket (it will persist on server side)
    socket.emit("chat:send", { queryId, sender: currentUser || "Agent", text });
    setText("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto p-3 flex-1 space-y-2">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`p-2 rounded-lg ${
              m.sender === currentUser
                ? "bg-blue-50 self-end"
                : "bg-gray-100 self-start"
            }`}
          >
            <div className="text-xs text-gray-500">
              {m.sender} • {new Date(m.createdAt).toLocaleString()}
            </div>
            <div className="text-sm">{m.text}</div>
          </div>
        ))}
        <div ref={ref} />
      </div>

      <div className="p-2 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button onClick={send} className="px-4 rounded bg-blue-600 text-white">
          Send
        </button>
      </div>
    </div>
  );
}
