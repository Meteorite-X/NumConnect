// ══════════════════════════════════════════════════════════════
//  Backend API client (Лаб 7 — MongoDB-р дамжуулдаг backend-тэй холбоо)
// ══════════════════════════════════════════════════════════════
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function request(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(BASE_URL + path, {
    method,
    headers: { 'Content-Type': 'application/json', ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await res.text();
  const json = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const msg = json?.error || `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return json;
}

export const api = {
  get:    (path)        => request(path),
  post:   (path, body)  => request(path, { method: 'POST',   body }),
  put:    (path, body)  => request(path, { method: 'PUT',    body }),
  delete: (path)        => request(path, { method: 'DELETE' })
};

// Хариу нь { count, data: [...] } хэлбэртэй эсэхийг шалгаж data-г гаргаж авна
export const unwrap = (res) => (Array.isArray(res?.data) ? res.data : res);

export { BASE_URL };
