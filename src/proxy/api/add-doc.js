import { nowDateTime } from '../../utils'

export const addDoc = docData =>
  fetch('http://localhost:3000/documents', {
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
      console.error('Error adding document:', err)
      return null
    })
