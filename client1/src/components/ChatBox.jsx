
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import URL from "../utility/helper";
import socket from "../socket/socket";

export default function ChatBox({ queryId, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const ref = useRef();

  useEffect(() => {
    if (!queryId) return;

    //  etch history
    axios.get(`${URL}/${queryId}/chat`).then((res) => {
      setMessages(res.data);
    });

    // Join room
    socket.emit("join:chat", queryId);

    // Listen for incoming messages
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

    socket.emit("chat:send", {
      queryId,
      sender: currentUser,
      text,
    });

    // Optional: Also persist on backend
    await axios.post(`${URL}/${queryId}/chat`, {
      sender: currentUser,
      text,
    });

    setText("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto flex-1 p-3 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg ${
              m.sender === currentUser ? "bg-blue-100 self-end" : "bg-gray-100"
            }`}
          >
            <div className="text-xs text-gray-500 mb-1">
              {m.sender} • {new Date(m.createdAt).toLocaleString()}
            </div>
            {m.text}
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
        <button onClick={send} className="bg-blue-600 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
