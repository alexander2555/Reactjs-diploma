export const getRoles = () =>
  fetch('http://localhost:3000/roles')
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    .catch(err => {
      console.error('[Fetching roles]', err)
      return []
    })
