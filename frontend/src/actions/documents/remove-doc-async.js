import { proxy } from '../../proxy'

export const removeDocAsync = docId => async () => {
  await proxy.deleteDocument(docId)
  return proxy.fetchDocs()
}
