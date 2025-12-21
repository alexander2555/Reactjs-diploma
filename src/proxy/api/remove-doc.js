export const removeDoc = id =>
  fetch(`http://localhost:3000/documents/${id}`, {
    method: 'DELETE',
  })
    .then(resp => {
      if (!resp.ok) throw new Error(resp.statusText)
      return true
    })
    .catch(err => {
      console.error('[API] Error deleting document:', err)
      return false
    })
