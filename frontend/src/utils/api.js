import { API_URL } from '../proxy/constants'

/**
 * Универсальный запрос к backend.
 * Автоматически включает cookies (для auth), сериализует body и парсит JSON.
 */
export async function apiRequest(path, options = {}) {
  const {
    method = 'GET',
    body,
    headers = {},
    credentials = 'include', // нужны cookie для JWT токена
  } = options

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
    // если backend вернул пустой ответ
  }

  const errorFromPayload = data && data.error ? data.error : null

  if (!resp.ok || errorFromPayload) {
    throw new Error(errorFromPayload || resp.statusText)
  }

  // если backend оборачивает ответ в { data }, возвращаем содержимое
  if (data && Object.prototype.hasOwnProperty.call(data, 'data')) {
    return data.data
  }

  return data
}
