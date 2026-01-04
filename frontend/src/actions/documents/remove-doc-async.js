import { apiRequest } from '../../utils/api-request'

export const removeDocAsync = docId => async () => {
  try {
    await apiRequest(`documents/${docId}`, { method: 'DELETE' })
    return { err: null }
  } catch (err) {
    console.warn('[ACTIONS] Document deleting', err.message)
    return { err: err.message }
  }
}
