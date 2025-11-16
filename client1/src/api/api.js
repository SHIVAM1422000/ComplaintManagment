import axios from "axios";

const API = axios.create({
  baseURL:"https://complaintmanagment.onrender.com/api/v1/query",
  timeout: 10000,
});

export default API;
