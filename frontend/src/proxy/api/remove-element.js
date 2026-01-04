// export const removeElement = id =>
//   fetch(`${API_URL}elements/${id}`, {
//     method: 'DELETE',
//   })
//     .then(resp => {
//       if (!resp.ok) throw new Error(resp.statusText)
//       return true
//     })
//     .catch(err => {
//       console.error('[API] Deleting element', err)
//       return false
//     })

import { apiRequest } from '../../utils/api-request'

export const removeElement = id =>
  apiRequest(`elements/${id}`, { method: 'DELETE' })
    .then(() => true)
    .catch(err => {
      console.error('[API] Deleting element (integration)', err)
      return false
    })
