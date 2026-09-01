// Defaults to same-origin /api. Set VITE_API_URL for separate API deployments.
const API_ORIGIN = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const BASE = `${API_ORIGIN}/api/auth`;

async function handle(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed: ${res.status}`);
  return data;
}

export function register(name, email, password) {
  return fetch(`${BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  }).then(handle);
}

export function login(email, password) {
  return fetch(`${BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handle);
}

export function getMe(token) {
  return fetch(`${BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(handle);
}

export function updateProfile(token, data) {
  return fetch(`${BASE}/me`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  }).then(handle);
}
