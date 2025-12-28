import { proxy } from '../../proxy'
import { addGraphicsItem } from './add-graphics-item'

export const graphicsUploadAsync = elData => async dispatch => {
  const { res, err } = await proxy.createElelement(elData)

  if (err) {
    console.warn('[ACTIONS] Graphics upload error', err)
    return { err }
  }

  dispatch(addGraphicsItem(res))

  return { err: null }
}
