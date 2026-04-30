const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const err = new Error(data?.error || 'API request failed')
    err.status = res.status
    err.data = data
    throw err
  }

  return data
}

export const auth = {
  register: (body) => apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  logout: () => apiFetch('/api/auth/logout', { method: 'POST' }),
  profile: () => apiFetch('/api/auth/profile'),
}

export const crypto = {
  all: () => apiFetch('/api/crypto'),
  gainers: () => apiFetch('/api/crypto/gainers'),
  newListings: () => apiFetch('/api/crypto/new'),
  add: (body) => apiFetch('/api/crypto', { method: 'POST', body: JSON.stringify(body) }),
}

export default BASE
