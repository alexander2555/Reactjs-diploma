import { nowDateTime } from '../../utils'

export const updDoc = (id, docData) =>
  fetch(`http://localhost:3000/documents/${id}`, {
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
      console.error('Error patching document:', err)
      return null
    })
