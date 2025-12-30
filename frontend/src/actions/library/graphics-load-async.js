import { setGraphics } from '.'

import { apiRequest } from '../../utils/api'

export const graphicsLoadAsync = isCancelled => async dispatch => {
  try {
    const res = await apiRequest('elements')

    if (isCancelled) return

    if (!(res || res?.length)) return { err: '[ACTIONS] Graphics array is empty' }

    dispatch(setGraphics(res))

    return { err: null }
  } catch (err) {
    if (isCancelled) return
    console.warn('[ACTIONS] Graphics load error', err.message)
    return { err: err.message }
  }
}
