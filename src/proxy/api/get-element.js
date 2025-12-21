/** DEPRICATED */

export const getElement = id =>
  fetch(`http://localhost:3000/elements?id=${id}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    .catch(err => {
      console.error(`[Fetching element ${id}]`, err)
      return {}
    })
