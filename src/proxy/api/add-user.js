import { API_URL } from '../constants'

export const addUser = (login, password, role = 2) =>
  fetch(`${API_URL}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      login,
      password,
      registeredAt: new Date().toISOString().substring(0, 16).replace('T', ' '),
      role_id: role,
    }),
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    .catch(err => {
      console.error('[API] Adding user', err)
      return null
    })
