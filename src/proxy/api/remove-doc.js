import { API_URL } from '../constants'

export const removeDoc = id =>
  fetch(`${API_URL}documents/${id}`, {
    method: 'DELETE',
  })
    .then(resp => {
      if (!resp.ok) throw new Error(resp.statusText)
      return true
    })
    .catch(err => {
      console.error('[API] Deleting document', err)
      return false
    })
