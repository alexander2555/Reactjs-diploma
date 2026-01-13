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

  let response
  try {
    response = await fetch(`${API_URL}${path}`, fetchOptions)
  } catch (err) {
    throw new Error(`[FETCH] ${err.message}`)
  }

  if (
    response.status === 204 ||
    response.status === 304 ||
    response.headers.get('content-length') === '0'
  )
    return

  let data
  try {
    data = await response.json()
  } catch (err) {
    data = null
    if (response.ok) throw new Error(err.message)
    throw new Error(response.statusText)
  }

  if (!response.ok) throw new Error(data.error || response.statusText)

  return data
}
