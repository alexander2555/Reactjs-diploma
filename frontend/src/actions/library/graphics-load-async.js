import { setGraphics } from '.'

import { apiRequest } from '../../utils/api-request'

export const graphicsLoadAsync = isCancelled => async dispatch => {
  try {
    const res = await apiRequest('elements')

    if (isCancelled) return

    if (!res?.length) return { err: '[ACTIONS] Graphics array is empty' }

    dispatch(setGraphics(res))

    return { err: null }
  } catch (err) {
    if (isCancelled) return
    console.warn('[ACTIONS] Graphics loading', err.message)
    return { err: err.message }
  }
}
