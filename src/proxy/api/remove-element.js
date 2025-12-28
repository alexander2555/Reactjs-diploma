import { API_URL } from '../constants'

export const removeElement = id =>
  fetch(`${API_URL}elements/${id}`, {
    method: 'DELETE',
  })
    .then(resp => {
      if (!resp.ok) throw new Error(resp.statusText)
      return true
    })
    .catch(err => {
      console.error('[API] Deleting element', err)
      return false
    })
