import { removeGraphicsItem } from '.'

import { apiRequest } from '../../utils/api'

export const graphicsRemoveAsync = elId => async dispatch => {
  try {
    await apiRequest(`elements/${elId}`, { method: 'DELETE' })
    dispatch(removeGraphicsItem(elId))
    return { err: null }
  } catch (err) {
    console.warn('[ACTIONS] Graphics removing error', err.message)
    return { err: err.message }
  }
}
