// интеграция: прежний запрос через json-server (порт 3000)
// export const updDocEl = (docElements = []) =>
//   Promise.all(
//     docElements.map(el =>
//       fetch(`${API_URL}doc_el/${el.id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(el),
//       }),
//     ),
//   )
//     .then(resp => {
//       if (!resp?.length) return []
//       const failed = resp.filter(r => !r.ok)
//       if (failed.length) {
//         throw new Error(failed.map(f => f.statusText).join('; '))
//       }
//       return Promise.all(resp.map(r => r.json()))
//     })
//     .catch(err => {
//       console.error('[API] Patching document elements errors:', err)
//       return null
//     })

import { apiRequest } from '../../utils/api'

export const updDocEl = (docElements = []) =>
  Promise.all(
    docElements.map(el =>
      apiRequest(`doc_el/${el.id}`, {
        method: 'PATCH',
        body: el,
      }),
    ),
  )
    .then(resp => resp)
    .catch(err => {
      console.error('[API] Patching document elements errors (integration):', err)
      return null
    })
