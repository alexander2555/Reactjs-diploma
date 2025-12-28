import { nowDateTime } from '../../utils'
import { API_URL } from '../constants'

export const addDoc = docData =>
  fetch(`${API_URL}documents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      ...docData,
      created_at: nowDateTime(),
    }),
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    .catch(err => {
      console.error('[API] Adding document', err)
      return null
    })
