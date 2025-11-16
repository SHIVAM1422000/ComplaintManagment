import { io } from "socket.io-client";
const url =
  process.env.NODE_ENV === "production"
    ? "https://query-management-360-backend.onrender.com/api/v1/query"
    : "http://localhost:8000/api/v1/query";

const socket = io(url);
export default socket;
