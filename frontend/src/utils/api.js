import { API_URL } from '../proxy/constants'

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
  } catch (e) {
    console.warn('[API] Parsing response', e)
    data = null
  }

  const errorFromPayload = data && data.error ? data.error : null

  if (!resp.ok || errorFromPayload) {
    throw new Error(errorFromPayload || resp.statusText)
  }

  // if (data && Object.prototype.hasOwnProperty.call(data, 'data')) {
  //   return data.data
  // }

  return data
}
