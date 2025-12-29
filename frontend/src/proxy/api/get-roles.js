import { API_URL } from '../constants'

export const getRoles = id =>
  fetch(`${API_URL}roles${id || id === 0 ? '?id=' + id : ''}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    .catch(err => {
      console.error('[API] Fetching roles', err)
      return []
    })
