import { addGraphicsItem } from '.'

import { apiRequest } from '../../utils/api'

export const graphicsUploadAsync = elData => async dispatch => {
  try {
    const res = await apiRequest('elements', {
      method: 'POST',
      body: elData,
    })

    dispatch(addGraphicsItem(res))

    return { err: null }
  } catch (err) {
    console.warn('[ACTIONS] Graphics upload error', err.message)
    return { err: err.message }
  }
}
