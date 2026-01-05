import { io } from "socket.io-client";
import URL, { SocketURL } from "../utility/helper";

let socket = null;

export const connectSocket = () => {
  if (socket) return socket;

  const token = localStorage.getItem("token");

  socket = io(SocketURL, {
    auth: {
      token,
    },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("🟢 Socket connected (main):", socket.id);
  });
  
  socket.on("connect_error", (err) => {
  console.error("🔴 SOCKET ERROR:", err.message);
});

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected");
  });

  return socket;
};

// ✅ disconnect cleanly (on logout)
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export default () => socket;
