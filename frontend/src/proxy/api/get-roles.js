// интеграция: прежний запрос через json-server (порт 3000)
// export const getRoles = id =>
//   fetch(`${API_URL}roles${id || id === 0 ? '?id=' + id : ''}`)
//     .then(resp => {
//       if (resp.ok) {
//         return resp.json()
//       }
//       throw new Error(resp.statusText)
//     })
//     .catch(err => {
//       console.error('[API] Fetching roles', err)
//       return []
//     })

import { apiRequest } from '../../utils/api'

export const getRoles = () =>
  apiRequest('users/roles').catch(err => {
    console.error('[API] Fetching roles (integration)', err)
    return []
  })
