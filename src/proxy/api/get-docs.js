import { API_URL } from '../constants'

export const getDocs = () =>
  fetch(`${API_URL}documents`)
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    .catch(err => {
      console.error('[API] Fetching docs', err)
      return []
    })
