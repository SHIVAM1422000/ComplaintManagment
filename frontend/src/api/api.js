const API_BASE = "http://localhost:8000/api/v1/query";

async function request(path, opts = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export const api = {
  list: () => request("/"),
  create: (payload) =>
    request("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  get: (id) => request(`/${id}`),
  patch: (id, payload) =>
    request(`/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
  analytics: () => request("/analytics"),
  suggest: (id) => request(`/${id}/suggest-reply`), // optional if you add endpoint
};
