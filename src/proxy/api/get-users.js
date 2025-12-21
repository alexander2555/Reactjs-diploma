export const getUsers = () =>
  fetch('http://localhost:3000/users')
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    // .then(users => users && users.map(transformUser))
    .catch(err => {
      console.error('[Fetching users]', err)
      return []
    })
