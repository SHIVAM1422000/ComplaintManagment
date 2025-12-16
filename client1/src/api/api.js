import axios from "axios";
import URL from "../utility/helper";

const API = axios.create({
  baseURL: URL,
  timeout: 10000,
});

export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};

export const setCompanySlug = (slug) => {
  if (slug) API.defaults.headers.common["x-company-slug"] = slug;
  else delete API.defaults.headers.common["x-company-slug"];
};

API.interceptors.request.use((config) => {
  const slug = localStorage.getItem("company_slug");
  if (slug) config.headers["x-company-slug"] = slug;
  return config;
});

export default API;
