// export const getDocs = () =>
//   fetch(`${API_URL}documents`)
//     .then(resp => {
//       if (resp.ok) {
//         return resp.json()
//       }
//       throw new Error(resp.statusText)
//     })
//     .catch(err => {
//       console.error('[API] Fetching docs', err)
//       return []
//     })

import { apiRequest } from '../../utils/api-request'

export const getDocs = () =>
  apiRequest('documents').catch(err => {
    console.error('[API] Fetching docs (integration)', err)
    return []
  })
