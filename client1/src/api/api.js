import axios from "axios";
import URL from "../utility/helper";


const API = axios.create({
  baseURL: URL,
  timeout: 10000,
});

export default API;
