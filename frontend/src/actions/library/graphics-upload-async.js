import { addGraphicsItem } from '.'

import { proxy } from '../../proxy'

export const graphicsUploadAsync = elData => async dispatch => {
  const { res, err } = await proxy.createElelement(elData)

  if (err) {
    console.warn('[ACTIONS] Graphics upload error', err)
    return { err }
  }

  dispatch(addGraphicsItem(res))

  return { err: null }
}
