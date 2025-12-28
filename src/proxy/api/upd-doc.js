import { nowDateTime } from '../../utils'
import { API_URL } from '../constants'

export const updDoc = (id, docData) =>
  fetch(`${API_URL}documents/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ ...docData, updated_at: nowDateTime() }),
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    .catch(err => {
      console.error('[API] Patching document', err)
      return null
    })
