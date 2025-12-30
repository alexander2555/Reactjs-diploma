// интеграция: прежний запрос через json-server (порт 3000)
// export const getElements = id =>
//   fetch(`${API_URL}elements${id ? '?id=' + id : ''}`)
//     .then(resp => {
//       if (resp.ok) {
//         return resp.json()
//       }
//       throw new Error(resp.statusText)
//     })
//     .catch(err => {
//       console.error('[API] Fetching elements', err)
//       return []
//     })

import { apiRequest } from '../../utils/api'

export const getElements = id => {
  const path = id ? `elements/${id}` : 'elements'
  return apiRequest(path).catch(err => {
    console.error('[API] Fetching elements (integration)', err)
    return []
  })
}
