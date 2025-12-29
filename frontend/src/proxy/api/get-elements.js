import { API_URL } from '../constants'

export const getElements = id =>
  fetch(`${API_URL}elements${id ? '?id=' + id : ''}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    .catch(err => {
      console.error('[API] Fetching elements', err)
      return []
    })
