// export const getDoc = docId =>
//   Promise.all([
//     fetch(`${API_URL}documents?id=${docId}`)
//       .then(respDoc => {
//         if (respDoc.ok) {
//           return respDoc.json()
//         }
//         throw new Error(respDoc.statusText)
//       })
//       .catch(err => {
//         console.error('[API] Fetching dcoument', err)
//         return []
//       }),
//     fetch(`${API_URL}doc_el?doc_id=${docId}`)
//       .then(respEl => {
//         if (respEl.ok) {
//           return respEl.json()
//         }
//         throw new Error(respEl.statusText)
//       })
//       .catch(err => {
//         console.error('[API] Fetching dcoument elements', err)
//         return []
//       }),
//   ])

import { apiRequest } from '../../utils'

export const getDoc = docId =>
  Promise.all([
    apiRequest(`documents/${docId}`).catch(err => {
      console.error('[API] Fetching document', err)
      return null
    }),
    apiRequest(`doc_el?doc_id=${docId}`).catch(err => {
      console.error('[API] Fetching document elements', err)
      return []
    }),
  ])
