// export const getDocEl = elId =>
//   fetch(`${API_URL}doc_el${elId ? '?el_id=' + elId : ''}`)
//     .then(resp => {
//       if (resp.ok) {
//         return resp.json()
//       }
//       throw new Error(resp.statusText)
//     })
//     .catch(err => {
//       console.error('[API] Fetching dcoument elements', err)
//       return null
//     })

import { apiRequest } from '../../utils'

export const getDocEl = elId => {
  const path = elId ? `doc_el?el_id=${elId}` : 'doc_el'

  return apiRequest(path).catch(err => {
    console.error('[API] Fetching document elements', err)
    return null
  })
}
