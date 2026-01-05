import { useEffect, useState, useRef } from "react";
import URL from "../utility/helper";
import { connectSocket } from "../socket/socket";
import API from "../api/query";

export default function ChatBox({ queryId, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const ref = useRef();
  const socketRef = useRef();


  useEffect(() => {
    API.get(`${URL}/${queryId}/chat`).then((res) => {
      setMessages(res.data);
    });
  }, [queryId]);

  //for SOCKET SETUP
  useEffect(() => {
    
    if (!queryId) return;
    
    console.log("Changed to " , queryId);
    const socket = connectSocket();
    socketRef.current = socket;

  
    const onNewMessage = (msg) => {
      console.log("📨 realtime msg received:", msg);
      if (!socketRef.current) return;
      setMessages((prev) => {
        return [...prev, {...msg, createdAt: new Date().toISOString()}];
      });
    };

    socket.emit("join:query", queryId);
    socket.on("chat:new", onNewMessage);

    return () => {
      socket.emit("leave:query", queryId);
      // socket.emit("join:query", queryId);
      socket.off("chat:new", onNewMessage);
    };
  }, [queryId]);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessageHandler = async (e) => {
    if (!socketRef.current) return;
    console.log(socketRef.current);

    e.preventDefault();
    if (!text.trim()) {
      return;
    }

    const chatEntry = {
      sender: currentUser,
      message: text,
    };

    try {
      await API.post(`${URL}/${queryId}/chat`, chatEntry);
      socketRef.current.emit("chat:new", chatEntry);
      setText("");
    } catch (error) {
      console.log(error);
    }
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
            {m.message}
          </div>
        ))}
        <div ref={ref} />
      </div>

      <form
        className="p-2 flex gap-2"
        onSubmit={(e) => {
          sendMessageHandler(e);
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          disabled={!text.trim()}
          type="submit"
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
}
