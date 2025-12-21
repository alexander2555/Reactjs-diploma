export const updDocEl = (docElements = []) =>
  Promise.all(
    docElements.map(el =>
      fetch(`http://localhost:3000/doc_el/${el.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(el),
      }),
    ),
  )
    .then(resp => {
      if (!resp?.length) return []
      if (resp.ok) {
        return resp.json()
      }
      throw new Error(resp.statusText)
    })
    .catch(err => {
      console.error('[API] Error patching document elements:', err)
      return null
    })
