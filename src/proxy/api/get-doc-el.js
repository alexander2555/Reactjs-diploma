import { API_URL } from '../constants'

export const getDocEl = elId =>
  fetch(`${API_URL}doc_el${elId ? '?el_id=' + elId : ''}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    .catch(err => {
      console.error('[API] Fetching dcoument elements', err)
      return null
    })
