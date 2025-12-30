// интеграция: прежний запрос через json-server (порт 3000)
// export const removeDoc = id =>
//   fetch(`${API_URL}documents/${id}`, {
//     method: 'DELETE',
//   })
//     .then(resp => {
//       if (!resp.ok) throw new Error(resp.statusText)
//       return true
//     })
//     .catch(err => {
//       console.error('[API] Deleting document', err)
//       return false
//     })

import { apiRequest } from '../../utils/api'

export const removeDoc = id =>
  apiRequest(`documents/${id}`, { method: 'DELETE' })
    .then(() => true)
    .catch(err => {
      console.error('[API] Deleting document (integration)', err)
      return false
    })
