import axios from "axios";
import URL from "../utility/helper";

 
const API = axios.create({
  baseURL: URL,
  timeout: 10000,
});


API.interceptors.request.use((config) => {
  const token =  localStorage.getItem("token");
  const slug = localStorage.getItem("company_slug");
  // console.log("Intercept" , slug, " ",token);
  

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  if (slug) {
    config.headers["x-company-slug"] = slug;
  } else {
    delete config.headers["x-company-slug"];
  }

  return config;
},(error) => Promise.reject(error));

export default API;
