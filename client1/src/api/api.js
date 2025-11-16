import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "https://query-management-360-backend.onrender.com/api/v1/query"
    : "http://localhost:8000/api/v1/query";
const API = axios.create({
  baseURL: url,
  timeout: 10000,
});

export default API;
