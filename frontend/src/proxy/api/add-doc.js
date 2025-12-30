// интеграция: прежний запрос через json-server (порт 3000)
// export const addDoc = docData =>
//   fetch(`${API_URL}documents`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8',
//     },
//     body: JSON.stringify({
//       ...docData,
//       created_at: nowDateTime(),
//     }),
//   })
//     .then(resp => {
//       if (resp.ok) {
//         return resp.json()
//       }
//       throw new Error(resp.statusText)
//     })
//     .catch(err => {
//       console.error('[API] Adding document', err)
//       return null
//     })

import { apiRequest } from '../../utils/api'

export const addDoc = docData =>
  apiRequest('documents', {
    method: 'POST',
    body: docData,
  }).catch(err => {
    console.error('[API] Adding document (integration)', err)
    return null
  })
