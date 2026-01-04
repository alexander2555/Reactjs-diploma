import { API_URL } from '../constants'

export async function apiRequest(path, options = {}) {
  const { method = 'GET', body, headers = {}, credentials = 'include' } = options

  const fetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials,
  }

  if (body !== undefined) {
    fetchOptions.body = JSON.stringify(body)
  }

  const resp = await fetch(`${API_URL}${path}`, fetchOptions)

  let data = null
  try {
    data = await resp.json()
  } catch (_) {
    data = null
  }

  const error = data && data.error ? data.error : null

  if (!resp.ok || error) {
    throw new Error(error || resp.statusText)
  }

  return data
}
