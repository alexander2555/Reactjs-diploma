// export const addElement = elData =>
//   fetch(`${API_URL}elements`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json; charset=UTF-8',
//     },
//     body: JSON.stringify({
//       ...elData,
//       added_at: nowDateTime(),
//     }),
//   })
//     .then(resp => {
//       if (resp.ok) {
//         return resp.json()
//       }
//       throw new Error(resp.statusText)
//     })
//     .catch(err => {
//       console.error('[API] Adding element', err)
//       return null
//     })

import { apiRequest } from '../../utils/api-request'

export const addElement = elData =>
  apiRequest('elements', {
    method: 'POST',
    body: elData,
  }).catch(err => {
    console.error('[API] Adding element (integration)', err)
    return null
  })
