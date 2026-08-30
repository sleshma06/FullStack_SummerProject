const BASE = `${import.meta.env.VITE_API_URL}/api`;

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle(res) {
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Request failed: ${res.status} ${body}`);
  }
  return res.json();
}

export function getExpenses() {
  return fetch(`${BASE}/expenses`, { headers: authHeaders() }).then(handle);
}

export function createExpense(data) {
  return fetch(`${BASE}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  }).then(handle);
}

export function updateExpense(id, data) {
  return fetch(`${BASE}/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(data),
  }).then(handle);
}

export function deleteExpense(id) {
  return fetch(`${BASE}/expenses/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  }).then(handle);
}

export function getBudget() {
  return fetch(`${BASE}/budget`, { headers: authHeaders() }).then(handle);
}

export function setBudget(amount) {
  return fetch(`${BASE}/budget`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ amount }),
  }).then(handle);
}
