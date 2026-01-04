// export const getUsers = id =>
//   fetch(`${API_URL}users${id || id === 0 ? '?id=' + id : ''}`)
//     .then(resp => {
//       if (resp.ok) {
//         return resp.json()
//       }
//       throw new Error(resp.statusText)
//     })
//     .catch(err => {
//       console.error('[API] Fetching users', err)
//       return []
//     })

import { apiRequest } from '../../utils/api-request'

export const getUsers = () =>
  apiRequest('users').catch(err => {
    console.error('[API] Fetching users', err)
    return []
  })
